import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import {
  Users,
  UserCheck,
  UserPlus,
  Trash2,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Search,
  KeyRound,
  Shield,
  ArrowLeft
} from 'lucide-react';

const StaffManagement = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [newStaffId, setNewStaffId] = useState('');
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchStaffRegistry = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/admin/staff');
      if (res?.data) {
        setStaffList(Array.isArray(res.data) ? res.data : []);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to retrieve staff registry');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffRegistry();
  }, []);

  const handleCreateStaffId = async (e) => {
    e.preventDefault();
    if (!newStaffId.trim()) return;

    setCreating(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await api.post('/admin/staff', { staffId: newStaffId.trim().toUpperCase() });
      setSuccess(res?.message || `Staff ID ${newStaffId.trim().toUpperCase()} created successfully`);
      setNewStaffId('');
      fetchStaffRegistry();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to create Staff ID');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteStaffId = async (staffId) => {
    if (!window.confirm(`Are you sure you want to delete unassigned Staff ID ${staffId}?`)) {
      return;
    }

    setDeletingId(staffId);
    setError(null);
    setSuccess(null);

    try {
      const res = await api.delete(`/admin/staff/${staffId}`);
      setSuccess(res?.message || `Staff ID ${staffId} deleted successfully`);
      fetchStaffRegistry();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to delete Staff ID');
    } finally {
      setDeletingId(null);
    }
  };

  // Filtered staff list
  const filteredList = staffList.filter((item) => {
    const q = searchQuery.toLowerCase();
    const idMatch = item.staffId.toLowerCase().includes(q);
    const userMatch = item.assignedUser
      ? `${item.assignedUser.firstName} ${item.assignedUser.lastName} ${item.assignedUser.email}`
          .toLowerCase()
          .includes(q)
      : false;
    return idMatch || userMatch;
  });

  const totalCount = staffList.length;
  const assignedCount = staffList.filter((s) => s.isAssigned).length;
  const availableCount = totalCount - assignedCount;

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
              <span className="text-xs text-slate-500">Staff Credentials Security</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#091E42] mt-1 flex items-center gap-2.5">
              <Shield className="w-7 h-7 text-[#0052CC]" />
              <span>Staff ID Registry & Management</span>
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={fetchStaffRegistry}
              className="flex items-center space-x-1.5 bg-white hover:bg-slate-50 border border-slate-300 px-4 py-2.5 rounded-xl text-xs font-bold text-[#172B4D] transition shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>Refresh Registry</span>
            </button>
          </div>
        </div>

        {/* Notification Alerts */}
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

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Registry Entries</span>
              <div className="bg-blue-50 text-[#0052CC] p-2 rounded-xl">
                <KeyRound className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-[#091E42] font-mono">{totalCount}</div>
            <p className="text-[11px] text-slate-500">Total authorized staff identifiers</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Staff Accounts</span>
              <div className="bg-emerald-50 text-emerald-700 p-2 rounded-xl">
                <UserCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-[#091E42] font-mono">{assignedCount}</div>
            <p className="text-[11px] text-emerald-700 font-semibold">Registered & assigned to employees</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Available Pre-issued IDs</span>
              <div className="bg-amber-50 text-amber-700 p-2 rounded-xl">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-[#091E42] font-mono">{availableCount}</div>
            <p className="text-[11px] text-slate-500">Ready for onboarding new staff</p>
          </div>
        </div>

        {/* Creation Form & Filter Search */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left: Create New Staff ID */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-bold text-[#091E42] text-base flex items-center space-x-2">
                <UserPlus className="w-4 h-4 text-[#0052CC]" />
                <span>Issue New Staff Identification Code</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Generate an official credential for a new airline employee before they register.
              </p>
            </div>

            <form onSubmit={handleCreateStaffId} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Staff ID Code
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. EA-STF021"
                    value={newStaffId}
                    onChange={(e) => setNewStaffId(e.target.value.toUpperCase())}
                    className="w-full bg-[#F4F5F7] border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-[#091E42] uppercase focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:bg-white"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Must start with prefix <span className="font-mono font-bold text-slate-600">EA-STF</span> (Max 20 chars).
                </p>
              </div>

              <button
                type="submit"
                disabled={creating || !newStaffId.trim()}
                className="w-full flex items-center justify-center space-x-2 bg-[#0052CC] hover:bg-[#003A8C] text-white font-bold py-3 px-4 rounded-xl shadow-xs transition duration-150 disabled:opacity-50 active:scale-95 text-xs"
              >
                {creating ? (
                  <LoadingSpinner text="Registering ID in Oracle 21c..." />
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Create Staff ID</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right: Search / Filter info */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-[#091E42] text-base flex items-center space-x-2 border-b border-slate-100 pb-3">
                <Search className="w-4 h-4 text-[#0052CC]" />
                <span>Search & Filter Registry</span>
              </h3>
              <p className="text-xs text-slate-500 mt-2">
                Quickly locate staff ID credentials by employee code, employee name, or email address.
              </p>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search by Staff ID (e.g. EA-STF001) or employee name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F4F5F7] border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-[#091E42] focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Staff Registry Table */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-[#091E42] text-sm">
              Staff Registry Roster ({filteredList.length} of {totalCount})
            </h3>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <LoadingSpinner text="Querying StaffRegistry from Oracle 21c..." />
            </div>
          ) : filteredList.length === 0 ? (
            <div className="p-12 text-center space-y-2 text-slate-500 text-xs">
              <KeyRound className="w-8 h-8 mx-auto text-slate-300" />
              <p className="font-semibold">No Staff Registry records matching criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8F9FA] text-[11px] uppercase text-slate-500 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-6">Staff ID</th>
                    <th className="py-3.5 px-6">Status</th>
                    <th className="py-3.5 px-6">Assigned Employee</th>
                    <th className="py-3.5 px-6">Email Address</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredList.map((item) => (
                    <tr key={item.staffId} className="hover:bg-[#F4F5F7] transition">
                      <td className="py-4 px-6 font-mono font-bold text-sm text-[#0052CC]">
                        {item.staffId}
                      </td>
                      <td className="py-4 px-6">
                        {item.isAssigned ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            Assigned / Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                            Available / Unclaimed
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        {item.assignedUser ? (
                          <div className="font-semibold text-[#091E42]">
                            {item.assignedUser.firstName} {item.assignedUser.lastName}
                            <span className="text-[10px] text-slate-400 ml-1.5 font-mono">
                              (ID: {item.assignedUser.userId})
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">Not claimed yet</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-slate-600 font-mono">
                        {item.assignedUser?.email || '—'}
                      </td>
                      <td className="py-4 px-6 text-right">
                        {!item.isAssigned ? (
                          <button
                            disabled={deletingId === item.staffId}
                            onClick={() => handleDeleteStaffId(item.staffId)}
                            className="inline-flex items-center space-x-1 text-red-600 hover:text-red-800 hover:bg-red-50 px-2.5 py-1.5 rounded-lg text-xs font-bold transition disabled:opacity-50"
                            title="Delete unassigned Staff ID"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">In Use</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default StaffManagement;
