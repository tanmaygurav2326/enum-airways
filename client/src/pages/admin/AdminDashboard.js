import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useCurrency } from '../../context/CurrencyContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import StatusBadge from '../../components/ui/StatusBadge';
import {
  DollarSign,
  Plane,
  Ticket,
  Users,
  TrendingUp,
  BarChart3,
  Layers,
  RefreshCw,
  Shield,
  UserCheck,
  AlertCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accessError, setAccessError] = useState(null);
  const { formatPrice } = useCurrency();

  const handleAdminOnlyNavigation = (targetPath, featureName) => {
    if (user?.role !== 'Admin') {
      setAccessError(`Access Denied: Only System Administrators can access ${featureName}.`);
    } else {
      setAccessError(null);
      navigate(targetPath);
    }
  };

  const fetchDashboardStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/admin/dashboard');
      if (res?.data) {
        setStats(res.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load operational analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  if (loading) {
    return <LoadingSpinner text="Aggregating live operational metrics from Oracle 21c..." />;
  }

  if (error || !stats) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 bg-red-50 border border-red-200 rounded-3xl text-center space-y-4">
        <h3 className="font-bold text-lg text-red-700">Analytics Error</h3>
        <p className="text-xs text-red-600">{error || 'Failed to load statistics'}</p>
        <button
          onClick={fetchDashboardStats}
          className="bg-[#0052CC] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  const { revenue, flights, bookings, users } = stats;

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#172B4D] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase font-extrabold text-[#0052CC] tracking-wider">
                Enum Airways Operations
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500">Oracle 21c Pool Live</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#091E42] mt-1">
              Flight Operations & Analytics Portal
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={fetchDashboardStats}
              className="flex items-center space-x-1.5 bg-white hover:bg-slate-50 border border-slate-300 px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#172B4D] transition shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>Refresh</span>
            </button>
            <button
              onClick={() => handleAdminOnlyNavigation('/admin/staff', 'Staff Registry')}
              className="flex items-center space-x-1.5 bg-white hover:bg-slate-50 border border-slate-300 px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#0052CC] shadow-xs transition cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-[#0052CC]" />
              <span>Staff Registry</span>
            </button>
            <button
              onClick={() => handleAdminOnlyNavigation('/admin/crew', 'Crew Assignment')}
              className="flex items-center space-x-1.5 bg-white hover:bg-slate-50 border border-slate-300 px-3.5 py-2.5 rounded-xl text-xs font-bold text-purple-700 shadow-xs transition cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-purple-600" />
              <span>Crew Assignment</span>
            </button>
            <Link
              to="/admin/flights"
              className="flex items-center space-x-1.5 bg-[#0052CC] hover:bg-[#003A8C] px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-sm transition"
            >
              <Plane className="w-3.5 h-3.5" />
              <span>Manage Flights</span>
            </Link>
          </div>
        </div>

        {accessError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center justify-between space-x-2 text-xs animate-fade-in-up">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{accessError}</span>
            </div>
            <button
              onClick={() => setAccessError(null)}
              className="text-xs font-bold text-red-600 hover:text-red-900 underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* 4 KPI Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {/* Revenue */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Gross Ticket Sales</span>
              <div className="bg-emerald-50 text-emerald-700 p-2 rounded-xl">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#091E42] font-mono">
              {formatPrice(revenue?.totalRevenue || 0)}
            </div>
            <p className="text-[11px] text-emerald-700 flex items-center gap-1 font-semibold">
              <TrendingUp className="w-3 h-3" />
              <span>Live settlement via Oracle Transactions</span>
            </p>
          </div>

          {/* Bookings */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Confirmed Bookings</span>
              <div className="bg-[#DEEBFF] text-[#0052CC] p-2 rounded-xl">
                <Ticket className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#091E42] font-mono">
              {bookings?.totalBookings || '0'}
            </div>
            <p className="text-[11px] text-slate-500">
              Avg value: <span className="font-bold text-[#091E42]">{formatPrice(Math.round(bookings?.averageBookingValue || 0))}</span>
            </p>
          </div>

          {/* Fleet Occupancy */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Network Occupancy</span>
              <div className="bg-purple-50 text-purple-700 p-2 rounded-xl">
                <BarChart3 className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#091E42] font-mono">
              {flights?.overallOccupancy?.occupancyRate || '0'}%
            </div>
            <p className="text-[11px] text-slate-500">
              {flights?.overallOccupancy?.occupiedSeats || 0} / {flights?.overallOccupancy?.totalSeats || 0} seats reserved
            </p>
          </div>

          {/* Users */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Registered Users</span>
              <div className="bg-amber-50 text-amber-700 p-2 rounded-xl">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#091E42] font-mono">
              {users?.activeUsers || '0'}
            </div>
            <p className="text-[11px] text-slate-500">
              {users?.usersWithPassengerProfiles || 0} passenger profiles
            </p>
          </div>
        </div>

        {/* Breakdown Grids */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Revenue by Cabin Class */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-[#091E42] text-base flex items-center space-x-2">
                <Layers className="w-4 h-4 text-[#0052CC]" />
                <span>Revenue by Cabin Class</span>
              </h3>
            </div>

            <div className="space-y-3">
              {(revenue?.revenueByClass || []).map((item) => (
                <div
                  key={item.cabinClass}
                  className="bg-[#F8F9FA] p-3.5 rounded-xl flex items-center justify-between border border-slate-100"
                >
                  <div>
                    <p className="font-bold text-[#091E42] text-sm">{item.cabinClass}</p>
                    <p className="text-xs text-slate-500">{item.ticketCount} tickets reserved</p>
                  </div>
                  <p className="text-base font-extrabold text-[#0052CC] font-mono">
                    {formatPrice(item.revenue || 0)}
                  </p>
                </div>
              ))}
              {(!revenue?.revenueByClass || revenue.revenueByClass.length === 0) && (
                <p className="text-xs text-slate-500 text-center py-4">No ticket reservations recorded yet.</p>
              )}
            </div>
          </div>

          {/* Flight Status Distribution */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-[#091E42] text-base flex items-center space-x-2">
                <Plane className="w-4 h-4 text-[#0052CC]" />
                <span>Flight Operations Schedule</span>
              </h3>
            </div>

            <div className="space-y-3">
              {(flights?.flightsByStatus || []).map((f) => (
                <div
                  key={f.status}
                  className="bg-[#F8F9FA] p-3.5 rounded-xl flex items-center justify-between border border-slate-100"
                >
                  <div className="flex items-center space-x-3">
                    <StatusBadge status={f.status} />
                  </div>
                  <span className="font-extrabold text-base text-[#091E42] font-mono">{f.count} flights</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Baggage Operations & Status Manager Card */}
        <AdminBaggageControl />

      </div>
    </div>
  );
};

// Subcomponent: Admin Baggage Status Control
const AdminBaggageControl = () => {
  const [baggageList, setBaggageList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [msg, setMsg] = useState(null);

  const fetchBaggage = async () => {
    setLoading(true);
    try {
      const res = await api.get('/baggage');
      if (res?.data) {
        setBaggageList(res.data);
      }
    } catch (err) {
      console.error('Failed to load baggage:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBaggage();
  }, []);

  const handleStatusChange = async (baggageId, newStatus) => {
    setUpdatingId(baggageId);
    setMsg(null);
    try {
      await api.patch(`/baggage/${baggageId}/status`, { status: newStatus });
      setMsg(`Updated baggage #${baggageId} status to "${newStatus}"`);
      await fetchBaggage();
    } catch (err) {
      setMsg(`Failed to update status: ${err.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  const statusColors = {
    'Checked-In': 'bg-blue-50 text-blue-700 border-blue-200',
    'In-Transit': 'bg-amber-50 text-amber-800 border-amber-200',
    'On-Plane': 'bg-[#DEEBFF] text-[#0052CC] border-[#0052CC]',
    'Ready-for-Pickup': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Lost': 'bg-red-50 text-red-700 border-red-200'
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs uppercase font-extrabold text-[#0052CC] tracking-wider block">
            Software Control Center
          </span>
          <h3 className="font-extrabold text-[#091E42] text-xl mt-0.5">
            Passenger Baggage Operations & Tracking Manager
          </h3>
        </div>
        <button
          onClick={fetchBaggage}
          className="bg-[#F4F5F7] hover:bg-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl transition self-start sm:self-auto cursor-pointer"
        >
          Refresh Baggage List
        </button>
      </div>

      {msg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold p-3 rounded-xl">
          {msg}
        </div>
      )}

      {loading ? (
        <div className="text-center py-6 text-xs text-slate-500">Loading registered baggage items...</div>
      ) : baggageList.length === 0 ? (
        <div className="text-center py-8 text-xs text-slate-500 bg-[#F8F9FA] rounded-2xl border border-dashed border-slate-200">
          No registered luggage entries found in the database.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px] bg-[#F8F9FA]">
                <th className="py-3 px-4">Tracking Number</th>
                <th className="py-3 px-4">Passenger & Seat</th>
                <th className="py-3 px-4">Flight & Route</th>
                <th className="py-3 px-4">Weight</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {baggageList.map((bag) => (
                <tr key={bag.baggageId} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#0052CC]">
                    {bag.trackingNumber || `BAG-EA-${bag.baggageId}`}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-[#091E42] block">{bag.passengerName}</span>
                    <span className="text-[11px] text-slate-500">Seat {bag.seatNumber}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-[#091E42] block">{bag.flightNumber}</span>
                    <span className="text-[11px] text-slate-500">{bag.departureAirport} → {bag.arrivalAirport}</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-700">
                    {bag.weightKg} kg
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold border ${statusColors[bag.status] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                      {bag.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <select
                      disabled={updatingId === bag.baggageId}
                      value={bag.status}
                      onChange={(e) => handleStatusChange(bag.baggageId, e.target.value)}
                      className="bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-bold text-[#091E42] focus:ring-2 focus:ring-[#0052CC] focus:outline-none cursor-pointer"
                    >
                      <option value="Checked-In">Checked-In</option>
                      <option value="In-Transit">In-Transit</option>
                      <option value="On-Plane">On-Plane</option>
                      <option value="Ready-for-Pickup">Ready-for-Pickup</option>
                      <option value="Lost">Lost</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
