# ENUM AIRWAYS — Staff Registry & Crew Assignment Implementation Plan

> **Purpose**: This document describes every change needed to implement  
> Admin-managed Staff ID creation and Crew Assignment for flights.  
> An AI agent (or developer) should be able to read this file and  
> implement the entire feature without additional context.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Current State of the Codebase](#2-current-state-of-the-codebase)
3. [Database Changes](#3-database-changes)
4. [Backend Changes](#4-backend-changes)
5. [Frontend Changes](#5-frontend-changes)
6. [Seed Data Changes](#6-seed-data-changes)
7. [Execution Order](#7-execution-order)
8. [Testing Checklist](#8-testing-checklist)
9. [Important Rules](#9-important-rules)

---

## 1. Overview

### What We Are Building

Two admin-only features inside the existing Staff Portal:

1. **Staff ID Management** — Admins can create Staff IDs (e.g. `EA-STF001`).
   When a new employee receives one of these IDs, they use it during
   registration on the website. The backend validates the Staff ID against
   the `StaffRegistry` table and assigns the user the `'Staff'` role.

2. **Crew Assignment** — Admins can assign Staff users to flights with
   specific crew roles (`Pilot`, `Co-Pilot`, `Cabin Crew Lead`,
   `Cabin Crew`).

### What Already Exists

- **StaffRegistry table**: Already added to `database/schema.sql` (as of this plan).
- **Registration with Staff ID**: The frontend `Register.js` already has an
  "Airline Staff" account type toggle and a Staff ID input field.
- **Backend Staff ID validation**: `server/services/authService.js` already
  queries `StaffRegistry` during registration and assigns the `'Staff'` role.
- **Crew routes/controller/service**: `crew.routes.js`, `crewController.js`,
  and `crewService.js` already exist with basic CRUD for `CrewAssignment`.
- **Admin dashboard pages**: `AdminDashboard.js` and `AdminFlights.js`
  already exist.

### What Does NOT Exist Yet

- No API endpoints for admins to **create/list/delete Staff IDs**.
- No frontend page/section for admins to **manage Staff IDs**.
- No frontend page/section for admins to **assign crew to flights**.
- No flight status update API endpoint (AdminFlights.js tries to call
  `PATCH /flights/:id/status` but it doesn't exist on the server).

---

## 2. Current State of the Codebase

### Database

| Item | File | Status |
|------|------|--------|
| `StaffRegistry` table | `database/schema.sql` | ✅ Created |
| Admin users (Tanmay, Lokesh) | `database/schema.sql` | ✅ Seeded |
| All other data (airports, aircraft, flights, seats) | `database/seed.sql` | ✅ Ready to execute |

### Backend (Server)

| File | Current State |
|------|---------------|
| `server/services/authService.js` | ✅ Already queries `StaffRegistry` during registration |
| `server/controllers/authController.js` | ✅ Passes `staffId` to service |
| `server/routes/admin.routes.js` | ⚠️ Only has `/dashboard`, `/revenue`, `/flights`, `/bookings`, `/users` |
| `server/controllers/adminController.js` | ⚠️ Only has dashboard/stats endpoints |
| `server/services/adminService.js` | ⚠️ Only has analytics queries |
| `server/routes/crew.routes.js` | ✅ Has GET/POST/DELETE for crew assignments |
| `server/controllers/crewController.js` | ✅ Has CRUD for crew assignments |
| `server/services/crewService.js` | ✅ Has full crew assignment logic with validation |
| `server/routes/flights.routes.js` | ❌ Missing `PATCH /:id/status` endpoint |
| `server/controllers/flightController.js` | ❌ Missing status update handler |
| `server/services/flightService.js` | ❌ Missing status update method |

### Frontend (Client)

| File | Current State |
|------|---------------|
| `client/src/pages/auth/Register.js` | ✅ Has Staff ID input and "Airline Staff" toggle |
| `client/src/pages/admin/AdminDashboard.js` | ⚠️ No Staff ID management section |
| `client/src/pages/admin/AdminFlights.js` | ⚠️ Calls non-existent PATCH endpoint |
| Staff Management page | ❌ Does not exist |
| Crew Assignment page | ❌ Does not exist |
| `client/src/App.js` | ⚠️ Only routes for `/admin/dashboard` and `/admin/flights` |

### Route Protection Issue

In `App.js`, admin routes use `<ProtectedRoute requiredRole="Staff">`,
but the backend `admin.routes.js` uses `authorize('Admin')`. This means:

- A `Staff` user can access the React page but gets 403 from the API.
- An `Admin` user passes the API check but the frontend `ProtectedRoute`
  might not recognize `Admin` as satisfying `requiredRole="Staff"`.

**Fix needed**: The `ProtectedRoute` component should allow `Admin` users
to access routes that require `Staff` (Admin ≥ Staff ≥ Passenger).

---

## 3. Database Changes

### 3.1 StaffRegistry Table (ALREADY DONE)

The table has already been added to `schema.sql`:

```sql
CREATE TABLE StaffRegistry (
    StaffID VARCHAR2(20) PRIMARY KEY,
    IsAssigned NUMBER(1) DEFAULT 0 NOT NULL,
    AssignedUserID NUMBER(10),

    CONSTRAINT chk_staff_assigned
        CHECK (IsAssigned IN (0, 1)),

    CONSTRAINT fk_staff_assigned_user
        FOREIGN KEY (AssignedUserID)
        REFERENCES Users(UserID)
);
```

### 3.2 No Other Schema Changes Required

The existing `CrewAssignment`, `Users`, `Flights` tables already have
everything needed. Do NOT modify any other tables.

---

## 4. Backend Changes

### 4.1 Staff Registry API Endpoints

**Add to `server/routes/admin.routes.js`:**

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| `GET` | `/api/admin/staff` | List all Staff IDs with assignment status | Admin only |
| `POST` | `/api/admin/staff` | Create a new Staff ID | Admin only |
| `DELETE` | `/api/admin/staff/:staffId` | Delete an unassigned Staff ID | Admin only |

**Add to `server/controllers/adminController.js`:**

Three new handler methods:

1. `getStaffRegistry` — calls `adminService.getStaffRegistry()`
2. `createStaffId` — receives `{ staffId }` in body, calls `adminService.createStaffId(staffId)`
3. `deleteStaffId` — receives `staffId` from params, calls `adminService.deleteStaffId(staffId)`

**Add to `server/services/adminService.js`:**

```
getStaffRegistry()
  → SELECT sr.StaffID, sr.IsAssigned,
           u.UserID, u.FirstName, u.LastName, u.Email
    FROM StaffRegistry sr
    LEFT JOIN Users u ON sr.AssignedUserID = u.UserID
    ORDER BY sr.StaffID

createStaffId(staffId)
  → Validate format (must start with 'EA-STF' and be ≤ 20 chars)
  → INSERT INTO StaffRegistry (StaffID) VALUES (:staffId)
  → Handle duplicate key error gracefully

deleteStaffId(staffId)
  → Check IsAssigned = 0 first (cannot delete assigned IDs)
  → DELETE FROM StaffRegistry WHERE StaffID = :staffId AND IsAssigned = 0
  → Throw error if already assigned to a user
```

### 4.2 Flight Status Update Endpoint

**Add to `server/routes/flights.routes.js`:**

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| `PATCH` | `/api/flights/:id/status` | Update flight status | Admin only |

**Add to `server/controllers/flightController.js`:**

```
updateFlightStatus(req, res, next)
  → Extract flightId from req.params.id
  → Extract status from req.body.status
  → Validate status is one of: 'Scheduled', 'Delayed', 'Departed', 'Arrived', 'Cancelled'
  → Call flightService.updateFlightStatus(flightId, status)
```

**Add to `server/services/flightService.js`:**

```
updateFlightStatus(flightId, status)
  → UPDATE Flights SET Status = :status WHERE FlightID = :flightId
  → Return updated flight
```

### 4.3 List Staff Users Endpoint (for Crew Assignment dropdown)

The crew assignment UI needs a list of users with role `'Staff'` or `'Admin'`
to populate a dropdown.

**Add to `server/routes/admin.routes.js`:**

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| `GET` | `/api/admin/staff-users` | List all users with Staff or Admin role | Admin only |

**Add to `server/services/adminService.js`:**

```
getStaffUsers()
  → SELECT UserID, FirstName, LastName, Email, Role
    FROM Users
    WHERE Role IN ('Staff', 'Admin')
    ORDER BY LastName, FirstName
```

### 4.4 Crew Assignment Endpoints (ALREADY EXIST)

These routes already exist in `server/routes/crew.routes.js`:

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/crew/flight/:flightId` | Get crew for a specific flight |
| `POST` | `/api/crew/assign` | Assign crew member to flight |
| `DELETE` | `/api/crew/:assignmentId` | Remove crew assignment |

The existing `crewService.js` already validates that the assigned user
is not a `'Passenger'` (must be `'Staff'` or `'Admin'`).

**No changes needed to crew routes/controller/service.**

---

## 5. Frontend Changes

### 5.1 Fix ProtectedRoute Role Hierarchy

**File**: `client/src/components/layout/ProtectedRoute.js`

The current `ProtectedRoute` checks `requiredRole` with exact string match.
It needs a role hierarchy so `Admin` users can access `Staff`-level routes:

```
Role hierarchy: Admin > Staff > Passenger

If requiredRole="Staff", allow users with role "Staff" OR "Admin".
If requiredRole="Admin", allow only users with role "Admin".
If no requiredRole, allow any authenticated user.
```

### 5.2 New Admin Page: Staff Management

**Create**: `client/src/pages/admin/StaffManagement.js`

This page allows admins to:

1. **View** all Staff IDs in a table:
   - StaffID
   - Status (Assigned / Available)
   - Assigned To (name + email, if assigned)

2. **Create** a new Staff ID:
   - Input field with format hint: `EA-STF___`
   - "Create Staff ID" button
   - Calls `POST /api/admin/staff`

3. **Delete** an unassigned Staff ID:
   - Delete button (only shown for unassigned IDs)
   - Confirmation prompt
   - Calls `DELETE /api/admin/staff/:staffId`

**UI Design**: Follow the existing Enum Airways design system:
- White card with `border-slate-200 rounded-3xl`
- `text-[#091E42]` headings
- `bg-[#0052CC]` primary buttons
- `text-xs font-bold uppercase` labels
- Same spacing and layout patterns as `AdminDashboard.js`

### 5.3 New Admin Page: Crew Assignment

**Create**: `client/src/pages/admin/CrewAssignment.js`

This page allows admins to:

1. **Select a flight** from a dropdown or searchable list
   - Calls `GET /api/flights` to load all flights
   - Shows flight number, route, date

2. **View current crew** assigned to the selected flight
   - Calls `GET /api/crew/flight/:flightId`
   - Shows table: Name, Role, Remove button

3. **Assign a new crew member**:
   - Dropdown of staff users (calls `GET /api/admin/staff-users`)
   - Dropdown of crew roles: `Pilot`, `Co-Pilot`, `Cabin Crew Lead`, `Cabin Crew`
   - "Assign" button
   - Calls `POST /api/crew/assign` with `{ flightId, userId, crewRole }`

4. **Remove a crew assignment**:
   - "Remove" button next to each assignment
   - Calls `DELETE /api/crew/:assignmentId`

### 5.4 Update App.js Routes

**File**: `client/src/App.js`

Add new routes:

```jsx
import StaffManagement from './pages/admin/StaffManagement';
import CrewAssignment from './pages/admin/CrewAssignment';

// Inside <Routes>:
<Route
  path="/admin/staff"
  element={
    <ProtectedRoute requiredRole="Admin">
      <StaffManagement />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/crew"
  element={
    <ProtectedRoute requiredRole="Admin">
      <CrewAssignment />
    </ProtectedRoute>
  }
/>
```

**Important**: These routes should use `requiredRole="Admin"`, NOT `"Staff"`,
because only Admins should manage Staff IDs and crew assignments.

### 5.5 Update AdminDashboard.js Navigation

**File**: `client/src/pages/admin/AdminDashboard.js`

Add navigation links/buttons to the new pages in the header section,
alongside the existing "Manage Flights" button:

- **"Manage Staff"** → `/admin/staff`
- **"Crew Assignment"** → `/admin/crew`

Use the same button style as the existing "Manage Flights" link.

### 5.6 Update Navbar (Optional)

If the Navbar has a "Staff Portal" dropdown or link, consider adding
sub-links for Staff Management and Crew Assignment. Only show these
to users with `role === 'Admin'`.

---

## 6. Seed Data Changes

### 6.1 Add StaffRegistry IDs to seed.sql

**File**: `database/seed.sql`

Add a section **after** the Airport/Aircraft/Flight/Seat MERGE statements
to seed initial Staff IDs:

```sql
-- ============================================
-- STAFF REGISTRY — Pre-assigned Staff IDs
-- ============================================
MERGE INTO StaffRegistry sr
USING (SELECT 'EA-STF001' AS StaffID FROM DUAL UNION ALL
       SELECT 'EA-STF002' FROM DUAL UNION ALL
       SELECT 'EA-STF003' FROM DUAL UNION ALL
       SELECT 'EA-STF004' FROM DUAL UNION ALL
       SELECT 'EA-STF005' FROM DUAL UNION ALL
       SELECT 'EA-STF006' FROM DUAL UNION ALL
       SELECT 'EA-STF007' FROM DUAL UNION ALL
       SELECT 'EA-STF008' FROM DUAL UNION ALL
       SELECT 'EA-STF009' FROM DUAL UNION ALL
       SELECT 'EA-STF010' FROM DUAL UNION ALL
       SELECT 'EA-STF011' FROM DUAL UNION ALL
       SELECT 'EA-STF012' FROM DUAL UNION ALL
       SELECT 'EA-STF013' FROM DUAL UNION ALL
       SELECT 'EA-STF014' FROM DUAL UNION ALL
       SELECT 'EA-STF015' FROM DUAL UNION ALL
       SELECT 'EA-STF016' FROM DUAL UNION ALL
       SELECT 'EA-STF017' FROM DUAL UNION ALL
       SELECT 'EA-STF018' FROM DUAL UNION ALL
       SELECT 'EA-STF019' FROM DUAL UNION ALL
       SELECT 'EA-STF020' FROM DUAL) src
ON (sr.StaffID = src.StaffID)
WHEN NOT MATCHED THEN
  INSERT (StaffID) VALUES (src.StaffID);
```

This creates 20 unassigned Staff IDs. Admins can create more via the UI.

### 6.2 Do NOT seed fake staff Users or bookings

The seed script should NOT create fake User accounts for staff.
Staff members register themselves using a Staff ID.

---

## 7. Execution Order

### For a Fresh Database (first time setup):

1. Run `database/schema.sql` in Oracle SQL Developer
   - Creates all tables including `StaffRegistry`
   - Inserts the 2 Admin users (Tanmay & Lokesh)
   - Identity counters start at 1

2. Run `database/seed.sql` in Oracle SQL Developer
   - Inserts airports, aircraft, flights, seats
   - Inserts Staff IDs into `StaffRegistry`
   - All done via safe `MERGE` statements

3. Start the backend server: `cd server && npm start`
4. Start the frontend: `cd client && npm start`
5. Login as Admin: `tanmaygurav2326@gmail.com` / `Tanmay9987`

### For an Existing Database with old data:

If old demo data still exists from a previous schema run, you must
re-run `schema.sql` which will DROP and recreate all tables cleanly.
Then run `seed.sql`.

> **Yes, you DO need to run these scripts in Oracle SQL Developer
> for the data to appear in the application.**

---

## 8. Testing Checklist

After implementation, verify:

### Staff ID Management
- [ ] Admin can view the Staff Registry table (shows all IDs)
- [ ] Admin can create a new Staff ID (e.g. `EA-STF021`)
- [ ] Duplicate Staff ID creation shows an error
- [ ] Admin can delete an unassigned Staff ID
- [ ] Admin CANNOT delete an assigned (in-use) Staff ID
- [ ] A new user registers with account type "Airline Staff"
- [ ] Entering a valid, unassigned Staff ID → user gets `'Staff'` role
- [ ] Entering an invalid Staff ID → registration fails with error
- [ ] Entering an already-assigned Staff ID → registration fails with error
- [ ] After successful staff registration, the StaffRegistry shows `IsAssigned = 1`

### Crew Assignment
- [ ] Admin can see a list of flights
- [ ] Admin can select a flight and see its current crew
- [ ] Admin can assign a Staff user to a flight with a crew role
- [ ] Admin cannot assign a Passenger user to a flight
- [ ] Admin can remove a crew assignment
- [ ] Assigning duplicate role to same user on same flight shows error

### Flight Status Update
- [ ] Admin can change flight status via dropdown on AdminFlights page
- [ ] Status actually updates in the database
- [ ] The status badge reflects the new status after update

### Role-Based Access
- [ ] Admin can access `/admin/dashboard`, `/admin/flights`, `/admin/staff`, `/admin/crew`
- [ ] Staff user CANNOT access `/admin/staff` or `/admin/crew`
- [ ] Passenger user CANNOT access any `/admin/*` routes
- [ ] Unauthenticated user is redirected to `/login`

---

## 9. Important Rules

> [!CAUTION]
> READ THESE BEFORE IMPLEMENTING

1. **DO NOT** rebuild the application or redesign existing pages.
2. **DO NOT** change the database schema beyond what's already done
   (`StaffRegistry` table is already in `schema.sql`).
3. **DO NOT** modify the existing authentication flow. The `authService.js`
   Staff ID validation logic already works correctly.
4. **DO NOT** add new npm packages unless absolutely necessary.
5. **DO NOT** change the existing design system. Use the same colors,
   fonts, spacing, and component patterns as the existing admin pages.
6. **DO NOT** seed fake user accounts, bookings, or payments.
7. **DO NOT** touch booking logic, payment logic, or seat selection logic.
8. **DO NOT** modify `Register.js` — it already has the Staff ID field.
9. Follow the existing code patterns:
   - Routes → Controller → Service → Database
   - Use `executeQuery()` or `getConnection()` from `server/db.js`
   - Use `ApiResponse` from `server/utils/response.js`
   - Use `authorize()` middleware from `server/middleware/authorize.js`
   - Use `auth` middleware from `server/middleware/auth.js`
10. All new admin API endpoints must be protected with both `auth` and
    `authorize('Admin')` middleware.

---

## Files to Create

| File | Type | Description |
|------|------|-------------|
| `client/src/pages/admin/StaffManagement.js` | React Page | Staff ID CRUD interface |
| `client/src/pages/admin/CrewAssignment.js` | React Page | Flight crew assignment interface |

## Files to Modify

| File | What to Change |
|------|----------------|
| `server/routes/admin.routes.js` | Add Staff Registry API routes |
| `server/controllers/adminController.js` | Add Staff Registry handlers |
| `server/services/adminService.js` | Add Staff Registry DB queries |
| `server/routes/flights.routes.js` | Add `PATCH /:id/status` route |
| `server/controllers/flightController.js` | Add status update handler |
| `server/services/flightService.js` | Add status update query |
| `client/src/App.js` | Add routes for StaffManagement and CrewAssignment |
| `client/src/pages/admin/AdminDashboard.js` | Add navigation links to new pages |
| `client/src/components/layout/ProtectedRoute.js` | Fix role hierarchy (Admin > Staff) |
| `database/seed.sql` | Add StaffRegistry MERGE statements |
