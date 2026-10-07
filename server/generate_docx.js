const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  HeadingLevel,
  Header,
  Footer,
  PageNumber,
  PageBreak,
  ShadingType
} = require('docx');

async function generateReport() {
  const primaryColor = "0052CC"; // Signal Blue
  const darkTextColor = "091E42";
  const lightBgColor = "F4F5F7";
  const borderColor = "D1D5DB";

  const createTableCell = (content, options = {}) => {
    const pChildren = Array.isArray(content) ? content : [new Paragraph({
      children: [new TextRun({ text: content, size: 20, font: "Calibri", color: options.color || darkTextColor, bold: options.bold || false })],
      alignment: options.alignment || AlignmentType.LEFT
    })];

    return new TableCell({
      children: pChildren,
      width: options.width ? { size: options.width, type: WidthType.PERCENTAGE } : undefined,
      shading: options.shading ? { fill: options.shading, type: ShadingType.CLEAR } : undefined,
      margins: { top: 120, bottom: 120, left: 150, right: 150 }
    });
  };

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: "Calibri", size: 22, color: darkTextColor }
        }
      }
    },
    sections: [
      // PAGE 1: TITLE PAGE
      {
        properties: {
          page: {
            margin: { top: 1000, bottom: 1000, left: 1000, right: 1000 }
          }
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spaceAfter: 100,
            children: [
              new TextRun({
                text: "GOVERNMENT POLYTECHNIC PUNE",
                bold: true,
                size: 32,
                color: "000000",
                font: "Times New Roman"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spaceAfter: 300,
            children: [
              new TextRun({
                text: "(An Autonomous Institute of Government of Maharashtra)",
                italic: true,
                size: 22,
                color: "333333",
                font: "Times New Roman"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spaceAfter: 400,
            children: [
              new TextRun({
                text: "____________________________________________________________________",
                color: primaryColor
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spaceAfter: 150,
            children: [
              new TextRun({ text: "➢ Micro Project Title: ", bold: true, size: 26, font: "Times New Roman" }),
              new TextRun({ text: "Airline Management System (Enum Airways)", bold: true, size: 26, color: primaryColor, font: "Times New Roman" })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spaceAfter: 150,
            children: [
              new TextRun({ text: "➢ Programme: ", bold: true, size: 24, font: "Times New Roman" }),
              new TextRun({ text: "Diploma In Computer Engineering", size: 24, font: "Times New Roman" })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spaceAfter: 150,
            children: [
              new TextRun({ text: "➢ Course Name: ", bold: true, size: 24, font: "Times New Roman" }),
              new TextRun({ text: "Software Engineering & Full Stack Web Development (CM31203)", size: 24, font: "Times New Roman" })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spaceAfter: 150,
            children: [
              new TextRun({ text: "➢ Academic Year: ", bold: true, size: 24, font: "Times New Roman" }),
              new TextRun({ text: "ODD26 (2026–27)", size: 24, font: "Times New Roman" })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spaceAfter: 400,
            children: [
              new TextRun({ text: "➢ Faculty Name: ", bold: true, size: 24, font: "Times New Roman" }),
              new TextRun({ text: "Mrs. Sant Mam", size: 24, font: "Times New Roman" })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spaceAfter: 200,
            children: [
              new TextRun({ text: "Presented By:", bold: true, size: 26, color: primaryColor, font: "Times New Roman" })
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createTableCell("Sr No.", { bold: true, shading: "DEEBFF", width: 15, color: primaryColor }),
                  createTableCell("Student Name", { bold: true, shading: "DEEBFF", width: 55, color: primaryColor }),
                  createTableCell("Enrollment No.", { bold: true, shading: "DEEBFF", width: 30, color: primaryColor })
                ]
              }),
              new TableRow({
                children: [
                  createTableCell("1."),
                  createTableCell("Bhushan Shelke", { bold: true }),
                  createTableCell("2506172", { bold: true })
                ]
              }),
              new TableRow({
                children: [
                  createTableCell("2."),
                  createTableCell("Tanmay Gurav", { bold: true }),
                  createTableCell("2506194", { bold: true })
                ]
              }),
              new TableRow({
                children: [
                  createTableCell("3."),
                  createTableCell("Lokesh Sonawane", { bold: true }),
                  createTableCell("2506186", { bold: true })
                ]
              }),
              new TableRow({
                children: [
                  createTableCell("4."),
                  createTableCell("Yash Rajguru", { bold: true }),
                  createTableCell("2506154", { bold: true })
                ]
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spaceBefore: 600,
            children: [
              new TextRun({
                text: "Airline Management System | Government Polytechnic Pune | 2026–27",
                size: 18,
                italic: true,
                color: "666666"
              })
            ]
          })
        ]
      },

      // SECTIONS WITH HEADER & FOOTER
      {
        properties: {
          page: {
            margin: { top: 1000, bottom: 1000, left: 1000, right: 1000 }
          }
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({ text: "Airline Management System (Enum Airways)", size: 16, color: "888888", italic: true })
                ]
              })
            ]
          })
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: "Airline Management System | Government Polytechnic Pune | 2026–27", size: 16, color: "888888" })
                ]
              })
            ]
          })
        },
        children: [
          // INDEX PAGE
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spaceAfter: 300,
            children: [
              new TextRun({ text: "➢ INDEX", bold: true, size: 28, color: primaryColor })
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createTableCell("Section", { bold: true, shading: "DEEBFF", width: 15, color: primaryColor }),
                  createTableCell("Topic", { bold: true, shading: "DEEBFF", width: 70, color: primaryColor }),
                  createTableCell("Page No.", { bold: true, shading: "DEEBFF", width: 15, color: primaryColor })
                ]
              }),
              new TableRow({ children: [createTableCell("1"), createTableCell("Index Page"), createTableCell("2")] }),
              new TableRow({ children: [createTableCell("2"), createTableCell("Introduction & Need of the System"), createTableCell("3")] }),
              new TableRow({ children: [createTableCell("3"), createTableCell("Problem Statement, Objectives & Outcomes"), createTableCell("4")] }),
              new TableRow({ children: [createTableCell("4"), createTableCell("Scope, Hardware & Software Requirements"), createTableCell("5")] }),
              new TableRow({ children: [createTableCell("5"), createTableCell("System Features & Module Description"), createTableCell("6")] }),
              new TableRow({ children: [createTableCell("6"), createTableCell("System Design & Architecture"), createTableCell("7")] }),
              new TableRow({ children: [createTableCell("7"), createTableCell("Full-Stack Tech Stack & Oracle 21c Database Schema"), createTableCell("8")] }),
              new TableRow({ children: [createTableCell("8"), createTableCell("Algorithms & Key Business Logic"), createTableCell("9")] }),
              new TableRow({ children: [createTableCell("9"), createTableCell("API Endpoints & System Operations"), createTableCell("10")] }),
              new TableRow({ children: [createTableCell("10"), createTableCell("Advantages, Limitations & Future Scope"), createTableCell("11")] }),
              new TableRow({ children: [createTableCell("11"), createTableCell("Conclusion"), createTableCell("12")] })
            ]
          }),

          new Paragraph({ children: [new PageBreak()] }),

          // SECTION 1: INTRODUCTION
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spaceAfter: 200,
            children: [
              new TextRun({ text: "1. INTRODUCTION", bold: true, size: 24, color: primaryColor })
            ]
          }),
          new Paragraph({
            spaceAfter: 200,
            children: [
              new TextRun({
                text: "The Airline Management System (Enum Airways) is a full-stack enterprise web application engineered using modern software technologies including Node.js, Express, React, Tailwind CSS, and an Oracle 21cXE relational database pool. The primary purpose of the system is to automate commercial airline operations, passenger bookings, real-time seat locks, baggage tracking, UPI payments, and flight crew assignments in a seamless, secure, and user-friendly web application."
              })
            ]
          }),
          new Paragraph({
            spaceAfter: 200,
            children: [
              new TextRun({
                text: "In this project, users are categorized into Passengers, Airline Staff, and System Administrators. Passengers can search real-time flight schedules across major metro hubs (Mumbai, Delhi, Bengaluru, Pune, Hyderabad, Chennai, etc.), select interactive aircraft seats, add baggage, and execute payments via mock UPI/Card. Staff and Admin accounts can manage passenger baggage statuses, track flight logs, and control staff registry authorizations."
              })
            ]
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spaceAfter: 150,
            children: [
              new TextRun({ text: "Need of the System", bold: true, size: 22, color: primaryColor })
            ]
          }),
          new Paragraph({ bullet: { level: 0 }, spaceAfter: 100, children: [new TextRun("To eliminate manual ticket booking, manual seat assignment, and physical luggage logging.")] }),
          new Paragraph({ bullet: { level: 0 }, spaceAfter: 100, children: [new TextRun("To provide real-time 10-minute auto-expiring seat holds to prevent double-booking or seat holding hoarding.")] }),
          new Paragraph({ bullet: { level: 0 }, spaceAfter: 100, children: [new TextRun("To offer instant digital baggage tracking across operational stages (Checked-In, In-Transit, On-Plane, Ready-for-Pickup, Lost).")] }),
          new Paragraph({ bullet: { level: 0 }, spaceAfter: 100, children: [new TextRun("To support student-friendly UPI (Google Pay, PhonePe, Paytm, BHIM) and Credit/Debit card simulation.")] }),
          new Paragraph({ bullet: { level: 0 }, spaceAfter: 100, children: [new TextRun("To enforce strict role-based access control (RBAC) separating Passenger, Staff, and Admin privileges.")] }),
          new Paragraph({ bullet: { level: 0 }, spaceAfter: 200, children: [new TextRun("To demonstrate practical enterprise application of Node.js RESTful APIs and Oracle 21c relational database pooling.")] }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spaceAfter: 150,
            children: [
              new TextRun({ text: "Project Overview Table", bold: true, size: 22, color: primaryColor })
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({ children: [createTableCell("Item", { bold: true, shading: "DEEBFF", width: 30, color: primaryColor }), createTableCell("Specification / Details", { bold: true, shading: "DEEBFF", width: 70, color: primaryColor })] }),
              new TableRow({ children: [createTableCell("Project Name"), createTableCell("Airline Management System (Enum Airways)")] }),
              new TableRow({ children: [createTableCell("Frontend Architecture"), createTableCell("React 18, React Router v6, Tailwind CSS, Lucide Icons")] }),
              new TableRow({ children: [createTableCell("Backend Architecture"), createTableCell("Node.js, Express.js REST API Architecture")] }),
              new TableRow({ children: [createTableCell("Database Engine"), createTableCell("Oracle Database 21c XE (oracledb Pool connection)")] }),
              new TableRow({ children: [createTableCell("Authentication"), createTableCell("JSON Web Tokens (JWT) & bcryptjs Password Hashing")] }),
              new TableRow({ children: [createTableCell("Core Modules"), createTableCell("Auth, Flights, Seats, Bookings, Tickets, Baggage, Crew, Admin Analytics")] })
            ]
          }),

          new Paragraph({ children: [new PageBreak()] }),

          // SECTION 2: PROBLEM STATEMENT & OBJECTIVES
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spaceAfter: 200,
            children: [
              new TextRun({ text: "2. PROBLEM STATEMENT AND OBJECTIVES", bold: true, size: 24, color: primaryColor })
            ]
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spaceAfter: 150,
            children: [
              new TextRun({ text: "2.1 Problem Statement", bold: true, size: 22, color: primaryColor })
            ]
          }),
          new Paragraph({
            spaceAfter: 200,
            children: [
              new TextRun({
                text: "Traditional manual airline reservation and baggage logging systems suffer from data redundancy, slow passenger processing, lack of real-time seat availability updates, and uncoordinated baggage status tracking. Unconfirmed seat holds often remain locked indefinitely, causing loss of flight seat inventory. Furthermore, missing centralized digital control panels makes staff flight assignments and luggage handling prone to human errors."
              })
            ]
          }),
          new Paragraph({
            spaceAfter: 200,
            children: [
              new TextRun({
                text: "The objective of this micro-project is to build a modern, high-performance, web-based Airline Management System (Enum Airways) using Node.js, Express, React, and Oracle 21c XE that automates real-time flight searches, seat reservations with automatic 10-minute hold expiration, digital boarding pass generation, baggage status tracking, and staff duty management."
              })
            ]
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spaceAfter: 150,
            children: [
              new TextRun({ text: "2.2 Objectives", bold: true, size: 22, color: primaryColor })
            ]
          }),
          new Paragraph({ bullet: { level: 0 }, spaceAfter: 100, children: [new TextRun("To design a responsive full-stack web application for commercial airline operations.")] }),
          new Paragraph({ bullet: { level: 0 }, spaceAfter: 100, children: [new TextRun("To connect Express.js to Oracle 21c database pool for reliable SQL transaction processing.")] }),
          new Paragraph({ bullet: { level: 0 }, spaceAfter: 100, children: [new TextRun("To implement 10-minute automatic seat hold expiration logic for unconfirmed bookings.")] }),
          new Paragraph({ bullet: { level: 0 }, spaceAfter: 100, children: [new TextRun("To provide interactive 3-3 aircraft seat selection with real-time class multipliers (Economy, Business, First).")] }),
          new Paragraph({ bullet: { level: 0 }, spaceAfter: 100, children: [new TextRun("To support simplified student-level UPI (GPay/PhonePe/Paytm/BHIM) and card payment processing.")] }),
          new Paragraph({ bullet: { level: 0 }, spaceAfter: 100, children: [new TextRun("To build a complete digital Baggage Tracking Hub for live luggage status updates.")] }),
          new Paragraph({ bullet: { level: 0 }, spaceAfter: 100, children: [new TextRun("To provide Staff & Admin dashboards for flight duty rosters and revenue analytics.")] }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spaceAfter: 150,
            children: [
              new TextRun({ text: "2.3 Project Outcomes", bold: true, size: 22, color: primaryColor })
            ]
          }),
          new Paragraph({ bullet: { level: 0 }, spaceAfter: 100, children: [new TextRun("Practical mastery of Full-Stack Web Development (React + Node.js REST API + Oracle DB).")] }),
          new Paragraph({ bullet: { level: 0 }, spaceAfter: 100, children: [new TextRun("Understanding database transactions, foreign key constraints, and SQL joins in Oracle 21c.")] }),
          new Paragraph({ bullet: { level: 0 }, spaceAfter: 100, children: [new TextRun("Experience in JWT state management, password hashing, and Role-Based Access Control.")] }),
          new Paragraph({ bullet: { level: 0 }, spaceAfter: 200, children: [new TextRun("Hands-on implementation of responsive web design (320px mobile to 4K desktop).")] }),

          new Paragraph({ children: [new PageBreak()] }),

          // SECTION 3: SCOPE & REQUIREMENTS
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spaceAfter: 200,
            children: [
              new TextRun({ text: "3. SCOPE AND REQUIREMENTS", bold: true, size: 24, color: primaryColor })
            ]
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spaceAfter: 150,
            children: [
              new TextRun({ text: "3.1 Scope of the Project", bold: true, size: 22, color: primaryColor })
            ]
          }),
          new Paragraph({
            spaceAfter: 200,
            children: [
              new TextRun({
                text: "The scope encompasses commercial flight search across domestic metro hubs (Mumbai, Delhi, Bengaluru, Pune, Hyderabad, Chennai) and select international destinations (Singapore, Dubai). It includes online passenger registration, flight ticket reservation, seat selection map, payment simulation, digital ticket receipt, real-time baggage tracking, and staff duty roster management."
              })
            ]
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spaceAfter: 150,
            children: [
              new TextRun({ text: "3.2 Hardware Requirements", bold: true, size: 22, color: primaryColor })
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({ children: [createTableCell("Hardware Component", { bold: true, shading: "DEEBFF", width: 35, color: primaryColor }), createTableCell("Minimum / Recommended Specification", { bold: true, shading: "DEEBFF", width: 65, color: primaryColor })] }),
              new TableRow({ children: [createTableCell("Processor"), createTableCell("Intel Core i3 / i5 10th Gen or AMD Ryzen 5 (or higher)")] }),
              new TableRow({ children: [createTableCell("RAM"), createTableCell("8 GB DDR4 (16 GB recommended for Oracle XE & React dev server)")] }),
              new TableRow({ children: [createTableCell("Hard Disk Space"), createTableCell("15 GB available SSD storage (for Oracle 21c XE database files)")] }),
              new TableRow({ children: [createTableCell("Display"), createTableCell("1366x768 resolution minimum (Fully responsive down to 320px mobile)")] }),
              new TableRow({ children: [createTableCell("Network"), createTableCell("Localhost 127.0.0.1 environment / LAN network interface")] })
            ]
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spaceBefore: 200,
            spaceAfter: 150,
            children: [
              new TextRun({ text: "3.3 Software Requirements", bold: true, size: 22, color: primaryColor })
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({ children: [createTableCell("Software Tool", { bold: true, shading: "DEEBFF", width: 35, color: primaryColor }), createTableCell("Purpose & Role in Project", { bold: true, shading: "DEEBFF", width: 65, color: primaryColor })] }),
              new TableRow({ children: [createTableCell("Operating System"), createTableCell("Windows 10 / Windows 11 (64-bit)")] }),
              new TableRow({ children: [createTableCell("Database Management"), createTableCell("Oracle Database 21c Express Edition (XE) (Port 1521, XEPDB1)")] }),
              new TableRow({ children: [createTableCell("Runtime Environment"), createTableCell("Node.js v18+ / v24+ JS Runtime Engine")] }),
              new TableRow({ children: [createTableCell("Backend Framework"), createTableCell("Express.js (Port 5000 REST API Server)")] }),
              new TableRow({ children: [createTableCell("Frontend Framework"), createTableCell("React.js 18 (Port 3000 Client Single Page Application)")] }),
              new TableRow({ children: [createTableCell("Styling & UI Library"), createTableCell("Tailwind CSS, Lucide React Icon Suite")] }),
              new TableRow({ children: [createTableCell("Code Editor"), createTableCell("Visual Studio Code / Antigravity IDE")] })
            ]
          }),

          new Paragraph({ children: [new PageBreak()] }),

          // SECTION 4: SYSTEM FEATURES & MODULES
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spaceAfter: 200,
            children: [
              new TextRun({ text: "4. SYSTEM FEATURES AND MODULES", bold: true, size: 24, color: primaryColor })
            ]
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spaceAfter: 150,
            children: [
              new TextRun({ text: "4.1 Main Application Features", bold: true, size: 22, color: primaryColor })
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({ children: [createTableCell("Module", { bold: true, shading: "DEEBFF", width: 25, color: primaryColor }), createTableCell("Feature Description", { bold: true, shading: "DEEBFF", width: 75, color: primaryColor })] }),
              new TableRow({ children: [createTableCell("Auth & Security"), createTableCell("User registration (Passenger/Staff), JWT login authentication, bcryptjs password encryption, profile password changes.")] }),
              new TableRow({ children: [createTableCell("Flight Operations"), createTableCell("Real-time flight search by route/date, fare calculation by class (Economy, Business, First), duration computation.")] }),
              new TableRow({ children: [createTableCell("Seat Management"), createTableCell("Interactive 3-3 aircraft seat map, real-time availability check, 10-minute auto-expiry seat holds.")] }),
              new TableRow({ children: [createTableCell("Booking & Payment"), createTableCell("Instant booking confirmation, passenger details retention, UPI (Google Pay, PhonePe, Paytm) & Card payment simulation.")] }),
              new TableRow({ children: [createTableCell("Baggage Control"), createTableCell("Tracking number generation, live status lookup, Admin/Staff status management dropdown.")] }),
              new TableRow({ children: [createTableCell("Staff Duty Roster"), createTableCell("Flight crew assignment (Pilot, Co-Pilot, Cabin Crew Lead), personal staff duty schedule view.")] }),
              new TableRow({ children: [createTableCell("Admin Analytics"), createTableCell("Gross ticket revenue metrics, flight count distribution, booking stats, staff registry management.")] })
            ]
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spaceBefore: 200,
            spaceAfter: 150,
            children: [
              new TextRun({ text: "4.2 Module Description", bold: true, size: 22, color: primaryColor })
            ]
          }),
          new Paragraph({ spaceAfter: 100, children: [new TextRun({ text: "1. Authentication Module: ", bold: true }), new TextRun("Manages JWT token generation and bcrypt password security. Allows pre-assigned Staff IDs (e.g. EA-STF001) during staff account registration.")] }),
          new Paragraph({ spaceAfter: 100, children: [new TextRun({ text: "2. Flight Search & Booking Module: ", bold: true }), new TextRun("Executes SQL queries against Oracle 21c Airports and Flights tables to find matching flights and compute dynamic class fares.")] }),
          new Paragraph({ spaceAfter: 100, children: [new TextRun({ text: "3. Seat Hold & Auto-Expiry Module: ", bold: true }), new TextRun("Monitors seat holds. Pending bookings older than 10 minutes are automatically marked as Cancelled, releasing blocked seats back to inventory.")] }),
          new Paragraph({ spaceAfter: 100, children: [new TextRun({ text: "4. Baggage Software Control Hub: ", bold: true }), new TextRun("Enables passengers to search luggage using tracking codes (e.g. BAG-EA-1001) and gives Staff/Admin permission to update statuses.")] }),
          new Paragraph({ spaceAfter: 200, children: [new TextRun({ text: "5. Admin Operations Dashboard: ", bold: true }), new TextRun("Provides live graphical statistics on flight bookings, ticket revenue, flight schedule status, and staff registry credentials.")] }),

          new Paragraph({ children: [new PageBreak()] }),

          // SECTION 5: SYSTEM DESIGN & ARCHITECTURE
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spaceAfter: 200,
            children: [
              new TextRun({ text: "5. SYSTEM DESIGN AND ARCHITECTURE", bold: true, size: 24, color: primaryColor })
            ]
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spaceAfter: 150,
            children: [
              new TextRun({ text: "5.1 Architecture Overview", bold: true, size: 22, color: primaryColor })
            ]
          }),
          new Paragraph({
            spaceAfter: 200,
            children: [
              new TextRun({
                text: "The application follows a standard 3-Tier Full-Stack Enterprise Architecture:"
              })
            ]
          }),
          new Paragraph({ bullet: { level: 0 }, spaceAfter: 100, children: [new TextRun({ text: "Presentation Layer (Client): ", bold: true }), new TextRun("React 18 Single Page Application styled with Tailwind CSS, communicating via Axios HTTP client.")] }),
          new Paragraph({ bullet: { level: 0 }, spaceAfter: 100, children: [new TextRun({ text: "Application Layer (Server): ", bold: true }), new TextRun("Node.js & Express.js REST API server handling request validation, JWT authentication, and business logic.")] }),
          new Paragraph({ bullet: { level: 0 }, spaceAfter: 200, children: [new TextRun({ text: "Data Layer (Database): ", bold: true }), new TextRun("Oracle Database 21c XE storing Users, Aircraft, Airports, Flights, Bookings, Tickets, Payments, Baggage, and CrewAssignment.")] }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spaceAfter: 150,
            children: [
              new TextRun({ text: "5.2 Database Entity Relationship Overview", bold: true, size: 22, color: primaryColor })
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({ children: [createTableCell("Primary Entity", { bold: true, shading: "DEEBFF", width: 25, color: primaryColor }), createTableCell("Foreign Keys & Relations", { bold: true, shading: "DEEBFF", width: 75, color: primaryColor })] }),
              new TableRow({ children: [createTableCell("Users"), createTableCell("Primary key UserID. Stores Role ('Passenger', 'Staff', 'Admin') and hashed PasswordHash.")] }),
              new TableRow({ children: [createTableCell("Flights"), createTableCell("Foreign keys AircraftID -> Aircraft, DepartureAirport -> Airports, ArrivalAirport -> Airports.")] }),
              new TableRow({ children: [createTableCell("Bookings"), createTableCell("Foreign key UserID -> Users. Tracks TotalAmount, Status ('Pending', 'Confirmed', 'Cancelled').")] }),
              new TableRow({ children: [createTableCell("Tickets"), createTableCell("Foreign keys BookingID -> Bookings, FlightID -> Flights. Stores SeatNumber & Passenger Details.")] }),
              new TableRow({ children: [createTableCell("Payments"), createTableCell("Foreign key BookingID -> Bookings. PaymentMethod ('Credit Card', 'Debit Card', 'UPI', 'Net Banking').")] }),
              new TableRow({ children: [createTableCell("Baggage"), createTableCell("Foreign key TicketID -> Tickets. Status ('Checked-In', 'In-Transit', 'On-Plane', 'Ready-for-Pickup', 'Lost').")] }),
              new TableRow({ children: [createTableCell("CrewAssignment"), createTableCell("Foreign keys FlightID -> Flights, UserID -> Users. CrewRole ('Pilot', 'Co-Pilot', 'Cabin Crew').")] })
            ]
          }),

          new Paragraph({ children: [new PageBreak()] }),

          // SECTION 6: CORE CONCEPTS & DATABASE SCHEMA
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spaceAfter: 200,
            children: [
              new TextRun({ text: "6. ORACLE 21c DATABASE SCHEMA & CONCEPTS", bold: true, size: 24, color: primaryColor })
            ]
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spaceAfter: 150,
            children: [
              new TextRun({ text: "6.1 Oracle 21c Relational Table Structures", bold: true, size: 22, color: primaryColor })
            ]
          }),
          new Paragraph({
            spaceAfter: 150,
            children: [
              new TextRun({
                text: "Below are the key SQL table definitions implemented in the Oracle 21c XE database schema:"
              })
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({ children: [createTableCell("Table Name", { bold: true, shading: "DEEBFF", width: 25, color: primaryColor }), createTableCell("Key Columns & Data Types", { bold: true, shading: "DEEBFF", width: 75, color: primaryColor })] }),
              new TableRow({ children: [createTableCell("Users"), createTableCell("UserID NUMBER (PK), FirstName VARCHAR2(50), LastName VARCHAR2(50), Email VARCHAR2(100) UNIQUE, PasswordHash VARCHAR2(255), Role VARCHAR2(20).")] }),
              new TableRow({ children: [createTableCell("Airports"), createTableCell("AirportCode VARCHAR2(10) (PK), AirportName VARCHAR2(100), City VARCHAR2(50), Country VARCHAR2(50).")] }),
              new TableRow({ children: [createTableCell("Aircraft"), createTableCell("AircraftID NUMBER (PK), Model VARCHAR2(50), TotalSeats NUMBER.")] }),
              new TableRow({ children: [createTableCell("Flights"), createTableCell("FlightID NUMBER (PK), FlightNumber VARCHAR2(20), AircraftID NUMBER (FK), DepartureAirport VARCHAR2(10) (FK), ArrivalAirport VARCHAR2(10) (FK), DepartureTime TIMESTAMP, BasePrice NUMBER.")] }),
              new TableRow({ children: [createTableCell("Bookings"), createTableCell("BookingID NUMBER (PK), UserID NUMBER (FK), BookingDate TIMESTAMP, TotalAmount NUMBER, Status VARCHAR2(20).")] }),
              new TableRow({ children: [createTableCell("Tickets"), createTableCell("TicketID NUMBER (PK), BookingID NUMBER (FK), FlightID NUMBER (FK), SeatNumber VARCHAR2(10), Price NUMBER.")] }),
              new TableRow({ children: [createTableCell("Payments"), createTableCell("PaymentID NUMBER (PK), BookingID NUMBER (FK), Amount NUMBER, PaymentMethod VARCHAR2(50), PaymentStatus VARCHAR2(20), TransactionRef VARCHAR2(100).")] }),
              new TableRow({ children: [createTableCell("Baggage"), createTableCell("BaggageID NUMBER (PK), TicketID NUMBER (FK), WeightKG NUMBER, Status VARCHAR2(50), TrackingNumber VARCHAR2(50).")] }),
              new TableRow({ children: [createTableCell("StaffRegistry"), createTableCell("StaffID VARCHAR2(20) (PK), IsAssigned NUMBER(1), AssignedUserID NUMBER (FK).")] })
            ]
          }),

          new Paragraph({ children: [new PageBreak()] }),

          // SECTION 7: ALGORITHM & PROGRAM LOGIC
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spaceAfter: 200,
            children: [
              new TextRun({ text: "7. ALGORITHMS AND BUSINESS LOGIC", bold: true, size: 24, color: primaryColor })
            ]
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spaceAfter: 150,
            children: [
              new TextRun({ text: "7.1 Auto-Expiring Seat Hold Algorithm (10-Minute Policy)", bold: true, size: 22, color: primaryColor })
            ]
          }),
          new Paragraph({ spaceAfter: 100, children: [new TextRun("Step 1: User selects flight and seat numbers on the React interactive seat map.")] }),
          new Paragraph({ spaceAfter: 100, children: [new TextRun("Step 2: Server creates a Booking record with Status = 'Pending' and records BookingDate timestamp.")] }),
          new Paragraph({ spaceAfter: 100, children: [new TextRun("Step 3: When another user queries seat availability, the seat service checks for existing Tickets.")] }),
          new Paragraph({ spaceAfter: 100, children: [new TextRun("Step 4: If a ticket belongs to a 'Pending' booking created within the last 10 minutes, the seat is marked OCCUPIED.")] }),
          new Paragraph({ spaceAfter: 100, children: [new TextRun("Step 5: If the 'Pending' booking is older than 10 minutes, the background release service updates Status = 'Cancelled'.")] }),
          new Paragraph({ spaceAfter: 200, children: [new TextRun("Step 6: The expired seat automatically returns to AVAILABLE inventory for other passengers.")] }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spaceAfter: 150,
            children: [
              new TextRun({ text: "7.2 Staff Registration Verification Algorithm", bold: true, size: 22, color: primaryColor })
            ]
          }),
          new Paragraph({ spaceAfter: 100, children: [new TextRun("Step 1: User fills registration form with Account Type = 'Staff' and inputs pre-assigned Staff ID.")] }),
          new Paragraph({ spaceAfter: 100, children: [new TextRun("Step 2: Server queries StaffRegistry table in Oracle DB for matching StaffID where IsAssigned = 0.")] }),
          new Paragraph({ spaceAfter: 100, children: [new TextRun("Step 3: If Staff ID is invalid or already assigned, server rejects registration with HTTP 400 error.")] }),
          new Paragraph({ spaceAfter: 100, children: [new TextRun("Step 4: If valid, server inserts user record into Users table with Role = 'Staff'.")] }),
          new Paragraph({ spaceAfter: 200, children: [new TextRun("Step 5: Server updates StaffRegistry setting IsAssigned = 1 and AssignedUserID = :assignedUserId.")] }),

          new Paragraph({ children: [new PageBreak()] }),

          // SECTION 8: SAMPLE OUTPUT & ENDPOINTS
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spaceAfter: 200,
            children: [
              new TextRun({ text: "8. SAMPLE ENDPOINTS AND OPERATIONAL OUTPUT", bold: true, size: 24, color: primaryColor })
            ]
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spaceAfter: 150,
            children: [
              new TextRun({ text: "8.1 Key Backend REST API Endpoints", bold: true, size: 22, color: primaryColor })
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({ children: [createTableCell("Method", { bold: true, shading: "DEEBFF", width: 15, color: primaryColor }), createTableCell("Endpoint URL", { bold: true, shading: "DEEBFF", width: 45, color: primaryColor }), createTableCell("Access Level & Description", { bold: true, shading: "DEEBFF", width: 40, color: primaryColor })] }),
              new TableRow({ children: [createTableCell("POST"), createTableCell("/api/auth/register"), createTableCell("Public: Registers passenger or staff account")] }),
              new TableRow({ children: [createTableCell("POST"), createTableCell("/api/auth/login"), createTableCell("Public: Authenticates user & issues JWT token")] }),
              new TableRow({ children: [createTableCell("GET"), createTableCell("/api/flights/search"), createTableCell("Public: Searches flights by route & date")] }),
              new TableRow({ children: [createTableCell("GET"), createTableCell("/api/flights/:flightId/seats"), createTableCell("Public: Retrieves available seats for flight")] }),
              new TableRow({ children: [createTableCell("POST"), createTableCell("/api/bookings"), createTableCell("Protected: Creates pending booking & locks seats")] }),
              new TableRow({ children: [createTableCell("POST"), createTableCell("/api/payments/simulate"), createTableCell("Protected: Processes UPI/Card payment & confirms booking")] }),
              new TableRow({ children: [createTableCell("GET"), createTableCell("/api/baggage/tracking/:trackNum"), createTableCell("Public: Searches baggage status by tracking ID")] }),
              new TableRow({ children: [createTableCell("GET"), createTableCell("/api/admin/dashboard"), createTableCell("Staff/Admin: Fetches gross revenue & flight analytics")] }),
              new TableRow({ children: [createTableCell("GET"), createTableCell("/api/crews/my-assignments"), createTableCell("Staff/Admin: Retrieves flight duty roster for staff")] })
            ]
          }),

          new Paragraph({ children: [new PageBreak()] }),

          // SECTION 9: ADVANTAGES AND LIMITATIONS
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spaceAfter: 200,
            children: [
              new TextRun({ text: "9. ADVANTAGES AND LIMITATIONS", bold: true, size: 24, color: primaryColor })
            ]
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spaceAfter: 150,
            children: [
              new TextRun({ text: "9.1 Advantages", bold: true, size: 22, color: primaryColor })
            ]
          }),
          new Paragraph({ bullet: { level: 0 }, spaceAfter: 100, children: [new TextRun("Full-stack web execution with instant React UI updates and Oracle 21c pool performance.")] }),
          new Paragraph({ bullet: { level: 0 }, spaceAfter: 100, children: [new TextRun("Automated 10-minute seat hold release prevents seat inventory hoarding.")] }),
          new Paragraph({ bullet: { level: 0 }, spaceAfter: 100, children: [new TextRun("Student-level payment integration supporting UPI apps (Google Pay, PhonePe, Paytm, BHIM).")] }),
          new Paragraph({ bullet: { level: 0 }, spaceAfter: 100, children: [new TextRun("Comprehensive Baggage Tracking Hub with software status dropdown control for Staff/Admin.")] }),
          new Paragraph({ bullet: { level: 0 }, spaceAfter: 100, children: [new TextRun("Fully responsive design across mobile (320px+), tablet, and 4K desktop screens.")] }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spaceBefore: 150,
            spaceAfter: 150,
            children: [
              new TextRun({ text: "9.2 Limitations", bold: true, size: 22, color: primaryColor })
            ]
          }),
          new Paragraph({ bullet: { level: 0 }, spaceAfter: 100, children: [new TextRun("Payment module uses simulated gateway verification rather than live bank API hooks.")] }),
          new Paragraph({ bullet: { level: 0 }, spaceAfter: 100, children: [new TextRun("Barcode hardware scanner integration is simulated via software dropdown controls.")] }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spaceBefore: 150,
            spaceAfter: 150,
            children: [
              new TextRun({ text: "9.3 Future Scope", bold: true, size: 22, color: primaryColor })
            ]
          }),
          new Paragraph({ bullet: { level: 0 }, spaceAfter: 100, children: [new TextRun("Integrate Cashfree / Razorpay live payment gateway hooks for real money transactions.")] }),
          new Paragraph({ bullet: { level: 0 }, spaceAfter: 100, children: [new TextRun("Implement hardware barcode / QR code scanning for baggage check-in terminals.")] }),
          new Paragraph({ bullet: { level: 0 }, spaceAfter: 100, children: [new TextRun("Add automated SMS / WhatsApp flight boarding notifications.")] }),

          new Paragraph({ children: [new PageBreak()] }),

          // SECTION 10: CONCLUSION
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spaceAfter: 200,
            children: [
              new TextRun({ text: "10. CONCLUSION", bold: true, size: 24, color: primaryColor })
            ]
          }),
          new Paragraph({
            spaceAfter: 200,
            children: [
              new TextRun({
                text: "The Airline Management System (Enum Airways) successfully demonstrates the practical implementation of full-stack software engineering principles for commercial airline operations. The application seamlessly integrates Node.js, Express RESTful APIs, React.js 18, and Oracle 21c XE database pool to deliver an end-to-end airline booking, seat reservation, payment simulation, baggage tracking, and flight duty management system."
              })
            ]
          }),
          new Paragraph({
            spaceAfter: 200,
            children: [
              new TextRun({
                text: "The implementation of the 10-minute auto-expiring seat hold policy ensures optimal seat inventory utilization, while the baggage control hub provides complete operational visibility. The project provides invaluable practical experience in database normalization, REST API design, JWT security, and responsive web design."
              })
            ]
          })
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  const rootPath = path.join(__dirname, '..', 'Airline_Management_System_Microproject_Report.docx');
  const artifactPath = path.join('C:\\Users\\lokes\\.gemini\\antigravity\\brain\\38980dfe-ac0e-40ce-bbbd-9570edb87483', 'Airline_Management_System_Microproject_Report.docx');

  fs.writeFileSync(rootPath, buffer);
  fs.writeFileSync(artifactPath, buffer);
  console.log('Report generated successfully at:', rootPath);
}

generateReport().catch(err => console.error('Error generating report:', err));
