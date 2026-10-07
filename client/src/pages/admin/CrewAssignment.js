import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import StatusBadge from '../../components/ui/StatusBadge';
import {
  Users,
  UserPlus,
  Trash2,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  ArrowLeft,
  Shield,
  Award
} from 'lucide-react';

const CREW_ROLES = [
  'Pilot',
  'Co-Pilot',
  'Cabin Crew Lead',
  'Cabin Crew'
];

const CrewAssignment = () => {
  const [flights, setFlights] = useState([]);
  const [staffUsers, setStaffUsers] = useState([]);
  const [selectedFlightId, setSelectedFlightId] = useState('');
  const [crewList, setCrewList] = useState([]);
  const [loadingFlights, setLoadingFlights] = useState(true);
  const [loadingCrew, setLoadingCrew] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedRole, setSelectedRole] = useState(CREW_ROLES[0]);
  const [assigning, setAssigning] = useState(false);
  const [removingId, setRemovingId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // 1. Fetch flight schedule and staff users on mount
  const fetchInitialData = async () => {
    setLoadingFlights(true);
    setError(null);
    try {
      const [flightsRes, staffRes] = await Promise.all([
        api.get('/flights'),
        api.get('/admin/staff-users')
      ]);

      const flightData = Array.isArray(flightsRes?.data) ? flightsRes.data : [];
      setFlights(flightData);

      const staffData = Array.isArray(staffRes?.data) ? staffRes.data : [];
      setStaffUsers(staffData);

      if (flightData.length > 0 && !selectedFlightId) {
        setSelectedFlightId(flightData[0].FLIGHTID.toString());
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to initialize crew assignment data');
    } finally {
      setLoadingFlights(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. Fetch crew roster when selected flight changes
  const fetchFlightCrew = async (flightId) => {
    if (!flightId) return;
    setLoadingCrew(true);
    try {
      const res = await api.get(`/crews/flights/${flightId}`);
      if (res?.data) {
        setCrewList(Array.isArray(res.data) ? res.data : []);
      }
    } catch (err) {
      console.error('Failed to load crew for flight:', err);
      setCrewList([]);
    } finally {
      setLoadingCrew(false);
    }
  };

  useEffect(() => {
    if (selectedFlightId) {
      fetchFlightCrew(selectedFlightId);
    }
  }, [selectedFlightId]);

  // 3. Assign crew member
  const handleAssignCrew = async (e) => {
    e.preventDefault();
    if (!selectedFlightId || !selectedUserId || !selectedRole) {
      setError('Please select a flight, staff member, and crew role.');
      return;
    }

    setAssigning(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await api.post(`/crews/flights/${selectedFlightId}`, {
        userId: parseInt(selectedUserId),
        crewRole: selectedRole
      });

      setSuccess(res?.message || 'Crew member assigned successfully');
      setSelectedUserId('');
      fetchFlightCrew(selectedFlightId);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to assign crew member');
    } finally {
      setAssigning(false);
    }
  };

  // 4. Remove assignment
  const handleRemoveAssignment = async (assignmentId) => {
    if (!window.confirm('Are you sure you want to remove this crew member from the flight roster?')) {
      return;
    }

    setRemovingId(assignmentId);
    setError(null);
    setSuccess(null);

    try {
      const res = await api.delete(`/crews/assignments/${assignmentId}`);
      setSuccess(res?.message || 'Crew member removed from flight');
      fetchFlightCrew(selectedFlightId);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to remove crew assignment');
    } finally {
      setRemovingId(null);
    }
  };

  const selectedFlight = flights.find((f) => f.FLIGHTID.toString() === selectedFlightId.toString());

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#172B4D] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <Link
                to="/admin/dashboard"
                className="text-xs uppercase font-extrabold text-[#0052CC] hover:underline flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Operations Dashboard</span>
              </Link>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500">Flight Crew Operations</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#091E42] mt-1 flex items-center gap-2.5">
              <Users className="w-7 h-7 text-[#0052CC]" />
              <span>Flight Crew Assignment & Roster</span>
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                fetchInitialData();
                if (selectedFlightId) fetchFlightCrew(selectedFlightId);
              }}
              className="flex items-center space-x-1.5 bg-white hover:bg-slate-50 border border-slate-300 px-4 py-2.5 rounded-xl text-xs font-bold text-[#172B4D] transition shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>Refresh Schedule</span>
            </button>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center space-x-2 text-xs animate-fade-in-up">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center space-x-2 text-xs animate-fade-in-up">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
            <span>{success}</span>
          </div>
        )}

        {loadingFlights ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs">
            <LoadingSpinner text="Retrieving flight schedules & staff roster from Oracle 21c..." />
          </div>
        ) : (
          <>
            {/* Flight Selector & Summary Banner */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                <div className="md:col-span-6">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    Select Scheduled Flight
                  </label>
                  <select
                    value={selectedFlightId}
                    onChange={(e) => setSelectedFlightId(e.target.value)}
                    className="w-full bg-[#F4F5F7] border border-slate-300 rounded-xl px-3.5 py-3 text-sm font-bold text-[#091E42] focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:bg-white"
                  >
                    {flights.map((f) => (
                      <option key={f.FLIGHTID} value={f.FLIGHTID}>
                        {f.FLIGHTNUMBER} — {f.DEPARTUREAIRPORT} ➔ {f.ARRIVALAIRPORT} (
                        {new Date(f.DEPARTURETIME).toLocaleDateString([], {
                          month: 'short',
                          day: 'numeric'
                        })}{' '}
                        {new Date(f.DEPARTURETIME).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                        ) - {f.STATUS}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedFlight && (
                  <div className="md:col-span-6 bg-[#F8F9FA] border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-xs uppercase font-extrabold text-[#0052CC] tracking-wider">
                        {selectedFlight.FLIGHTNUMBER}
                      </div>
                      <div className="font-extrabold text-[#091E42] text-sm mt-0.5">
                        {selectedFlight.DEPARTUREAIRPORT} ({selectedFlight.DEPARTURECITY}) ➔{' '}
                        {selectedFlight.ARRIVALAIRPORT} ({selectedFlight.ARRIVALCITY})
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[11px] text-slate-500">
                        {selectedFlight.AIRCRAFTMODEL || `Aircraft #${selectedFlight.AIRCRAFTID}`}
                      </div>
                      <div className="mt-1">
                        <StatusBadge status={selectedFlight.STATUS} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Crew Assign Panel & Current Roster */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* Left Column: Assignment Form */}
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-[#091E42] text-base flex items-center space-x-2">
                    <UserPlus className="w-4 h-4 text-[#0052CC]" />
                    <span>Assign Crew Member</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Assign a certified employee to the flight operations team.
                  </p>
                </div>

                <form onSubmit={handleAssignCrew} className="space-y-4">
                  {/* Select Staff Member */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                      Staff / Crew Member
                    </label>
                    <select
                      required
                      value={selectedUserId}
                      onChange={(e) => setSelectedUserId(e.target.value)}
                      className="w-full bg-[#F4F5F7] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#091E42] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:bg-white"
                    >
                      <option value="">-- Choose Employee --</option>
                      {staffUsers.map((u) => (
                        <option key={u.userId} value={u.userId}>
                          {u.firstName} {u.lastName} ({u.role}) — {u.email}
                        </option>
                      ))}
                    </select>
                    {staffUsers.length === 0 && (
                      <p className="text-[11px] text-amber-600 mt-1">
                        No staff accounts registered yet. Have staff register with a Staff ID first.
                      </p>
                    )}
                  </div>

                  {/* Select Role */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                      Assigned Crew Position / Role
                    </label>
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="w-full bg-[#F4F5F7] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#091E42] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:bg-white"
                    >
                      {CREW_ROLES.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={assigning || !selectedUserId}
                    className="w-full flex items-center justify-center space-x-2 bg-[#0052CC] hover:bg-[#003A8C] text-white font-bold py-3 px-4 rounded-xl shadow-xs transition duration-150 disabled:opacity-50 active:scale-95 text-xs"
                  >
                    {assigning ? (
                      <LoadingSpinner text="Recording crew assignment..." />
                    ) : (
                      <>
                        <Shield className="w-4 h-4" />
                        <span>Confirm Crew Assignment</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Right Column: Current Flight Crew List */}
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs flex flex-col">
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-[#091E42] text-sm flex items-center space-x-2">
                      <Award className="w-4 h-4 text-[#0052CC]" />
                      <span>Active Crew Roster</span>
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Assigned personnel for {selectedFlight?.FLIGHTNUMBER || 'selected flight'}
                    </p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#DEEBFF] text-[#0052CC]">
                    {crewList.length} Personnel
                  </span>
                </div>

                <div className="flex-1 p-0">
                  {loadingCrew ? (
                    <div className="p-12 text-center">
                      <LoadingSpinner text="Loading assigned crew from Oracle 21c..." />
                    </div>
                  ) : crewList.length === 0 ? (
                    <div className="p-12 text-center space-y-2 text-slate-500 text-xs">
                      <Users className="w-8 h-8 mx-auto text-slate-300" />
                      <p className="font-semibold text-slate-700">No crew members assigned to this flight yet.</p>
                      <p className="text-slate-400">Use the assignment panel on the left to assign pilots and cabin crew.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#F8F9FA] text-[11px] uppercase text-slate-500 font-bold border-b border-slate-200">
                          <tr>
                            <th className="py-3 px-6">Role / Position</th>
                            <th className="py-3 px-6">Crew Member</th>
                            <th className="py-3 px-6">Email Address</th>
                            <th className="py-3 px-6 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {crewList.map((crew) => {
                            const assignmentId = crew.ASSIGNMENTID || crew.assignmentId;
                            const role = crew.CREWROLE || crew.crewRole;
                            const name = `${crew.FIRSTNAME || crew.firstName || ''} ${crew.LASTNAME || crew.lastName || ''}`;
                            const email = crew.EMAIL || crew.email;

                            return (
                              <tr key={assignmentId} className="hover:bg-[#F4F5F7] transition">
                                <td className="py-3.5 px-6">
                                  <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                                      role === 'Pilot' || role === 'Co-Pilot'
                                        ? 'bg-purple-100 text-purple-800 border border-purple-200'
                                        : 'bg-blue-100 text-blue-800 border border-blue-200'
                                    }`}
                                  >
                                    {role}
                                  </span>
                                </td>
                                <td className="py-3.5 px-6 font-bold text-[#091E42]">
                                  {name.trim() || '—'}
                                </td>
                                <td className="py-3.5 px-6 text-slate-600 font-mono">
                                  {email || '—'}
                                </td>
                                <td className="py-3.5 px-6 text-right">
                                  <button
                                    disabled={removingId === assignmentId}
                                    onClick={() => handleRemoveAssignment(assignmentId)}
                                    className="inline-flex items-center space-x-1 text-red-600 hover:text-red-800 hover:bg-red-50 px-2.5 py-1.5 rounded-lg text-xs font-bold transition disabled:opacity-50"
                                    title="Remove crew assignment"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Remove</span>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default CrewAssignment;
