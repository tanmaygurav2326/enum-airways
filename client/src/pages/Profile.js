import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import {
  User,
  Mail,
  Save,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Award,
  Phone,
  Globe,
  Trash2,
  AlertTriangle,
  Lock,
  KeyRound,
  Briefcase,
  Plane,
  Calendar,
  Clock
} from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [passportNumber, setPassportNumber] = useState('');
  const [nationality, setNationality] = useState('India');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [frequentFlyerNumber, setFrequentFlyerNumber] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Change password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(null);

  // Delete account state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/passengers/me');
        if (res?.data) {
          setPassportNumber(res.data.PASSPORTNUMBER || '');
          setNationality(res.data.NATIONALITY || 'India');
          setPhoneNumber(res.data.PHONENUMBER || '');
          setFrequentFlyerNumber(res.data.FREQUENTFLYERNUMBER || '');
        }
      } catch (err) {
        // Passenger record might not exist yet
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await api.put('/passengers/me', {
        passportNumber: passportNumber.trim(),
        nationality: nationality.trim(),
        phoneNumber: phoneNumber.trim(),
        frequentFlyerNumber: frequentFlyerNumber.trim() || undefined
      });
      setSuccess('Passenger profile details updated successfully.');
    } catch (err) {
      try {
        await api.post('/passengers', {
          passportNumber: passportNumber.trim(),
          nationality: nationality.trim(),
          phoneNumber: phoneNumber.trim(),
          frequentFlyerNumber: frequentFlyerNumber.trim() || undefined
        });
        setSuccess('Passenger profile created successfully.');
      } catch (postErr) {
        setError(postErr.response?.data?.message || postErr.message || 'Failed to save profile');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordError('Please fill in all password fields.');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordError('New password and confirm password do not match.');
      return;
    }

    setPasswordSaving(true);

    try {
      await api.put('/auth/password', {
        currentPassword,
        newPassword
      });

      setPasswordSuccess('Password updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      setPasswordError(err.response?.data?.message || err.message || 'Failed to update password. Please check your current password.');
    } finally {
      setPasswordSaving(false);
    }
  };

  const handleConfirmDelete = async (e) => {
    e.preventDefault();
    if (!deletePassword) return;

    setDeleting(true);
    setDeleteError(null);

    try {
      await api.delete('/auth/account', {
        data: { password: deletePassword }
      });

      // Clear local session & invalidate token
      logout();

      // Redirect to login page with confirmation message
      const message = encodeURIComponent('Your account has been successfully deleted.');
      navigate(`/login?message=${message}`);
    } catch (err) {
      setDeleteError(err.response?.data?.message || err.message || 'Failed to delete account. Please verify your password.');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Retrieving passenger identity..." />;
  }

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#172B4D] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0052CC]">Passenger Center</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#091E42]">My Profile & Travel Credentials</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage your travel identity documents, security credentials, and frequent flyer points.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-bold text-[#0052CC]">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Role: {user?.role || 'Passenger'}</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center space-x-2 text-xs animate-fade-in-up">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center space-x-2 text-xs animate-fade-in-up">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
            <span>{success}</span>
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">

          {/* Account Overview */}
          <div className="flex items-center space-x-4 pb-6 border-b border-slate-100">
            <div className="w-16 h-16 rounded-2xl bg-[#0052CC] text-white flex items-center justify-center font-extrabold text-2xl shadow-md shadow-blue-500/20">
              {(user?.firstName || 'E')[0].toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-[#091E42]">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{user?.email}</span>
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#0052CC]" />
                  Passport / Photo ID Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. Z1234567 or Indian Govt ID"
                  value={passportNumber}
                  onChange={(e) => setPassportNumber(e.target.value.toUpperCase())}
                  className="w-full bg-[#F4F5F7] border border-slate-300 rounded-xl px-3.5 py-2.5 font-mono font-bold text-[#091E42] focus:ring-2 focus:ring-[#0052CC] focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-[#0052CC]" />
                  Nationality
                </label>
                <input
                  type="text"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  placeholder="e.g. India"
                  className="w-full bg-[#F4F5F7] border border-slate-300 rounded-xl px-3.5 py-2.5 font-semibold text-[#091E42] focus:ring-2 focus:ring-[#0052CC] focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#0052CC]" />
                  Mobile Number
                </label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#F4F5F7] border border-slate-300 rounded-xl px-3.5 py-2.5 font-semibold text-[#091E42] focus:ring-2 focus:ring-[#0052CC] focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-[#0052CC]" />
                  Frequent Flyer Code
                </label>
                <input
                  type="text"
                  placeholder="e.g. EA-FLY-8821"
                  value={frequentFlyerNumber}
                  onChange={(e) => setFrequentFlyerNumber(e.target.value.toUpperCase())}
                  className="w-full bg-[#F4F5F7] border border-slate-300 rounded-xl px-3.5 py-2.5 font-mono font-bold text-[#091E42] focus:ring-2 focus:ring-[#0052CC] focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center space-x-2 bg-[#0052CC] hover:bg-[#003A8C] text-white font-bold py-3 px-6 rounded-xl shadow-md transition disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Update Profile'}</span>
              </button>
            </div>
          </form>

        </div>

        {/* Staff Duty Roster & Flight Assignments Section (visible for Staff & Admin) */}
        {(user?.role === 'Staff' || user?.role === 'Admin') && (
          <StaffAssignmentsSection userId={user?.userId} />
        )}

        {/* Change Password Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center space-x-2 text-[#0052CC] font-extrabold text-sm border-b border-slate-100 pb-3 uppercase tracking-wider">
            <Lock className="w-4 h-4 flex-shrink-0" />
            <span>Change Account Password</span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Ensure your account is using a strong password. You will need your current password to set a new one.
          </p>

          {passwordError && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3.5 rounded-xl flex items-center space-x-2 text-xs animate-fade-in-up">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{passwordError}</span>
            </div>
          )}

          {passwordSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-xl flex items-center space-x-2 text-xs animate-fade-in-up">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
              <span>{passwordSuccess}</span>
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <KeyRound className="w-3.5 h-3.5 text-[#0052CC]" />
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-[#F4F5F7] border border-slate-300 rounded-xl px-3.5 py-2.5 text-[#091E42] text-xs focus:ring-2 focus:ring-[#0052CC] focus:outline-none focus:bg-white font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-[#0052CC]" />
                  New Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="At least 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-[#F4F5F7] border border-slate-300 rounded-xl px-3.5 py-2.5 text-[#091E42] text-xs focus:ring-2 focus:ring-[#0052CC] focus:outline-none focus:bg-white font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-[#0052CC]" />
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Repeat new password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="w-full bg-[#F4F5F7] border border-slate-300 rounded-xl px-3.5 py-2.5 text-[#091E42] text-xs focus:ring-2 focus:ring-[#0052CC] focus:outline-none focus:bg-white font-medium"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={passwordSaving || !currentPassword || !newPassword || !confirmNewPassword}
                className="flex items-center space-x-2 bg-[#0052CC] hover:bg-[#003A8C] text-white font-bold py-2.5 px-5 rounded-xl text-xs shadow-md transition disabled:opacity-50 active:scale-95 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{passwordSaving ? 'Updating...' : 'Change Password'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Account Settings & Danger Zone */}
        {user?.role !== 'Admin' ? (
          <div className="bg-white border border-red-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 text-red-600 font-extrabold text-sm border-b border-red-100 pb-3 uppercase tracking-wider">
              <Trash2 className="w-4 h-4 flex-shrink-0" />
              <span>Account Settings & Danger Zone</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-sm text-[#091E42]">Delete Account</h4>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Permanently remove your user account. Historical booking, payment, and ticket records are safely retained for operational and financial compliance.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-slate-100 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 flex items-center gap-2 font-medium">
            <ShieldCheck className="w-4 h-4 text-[#0052CC]" />
            <span>Admin accounts cannot be deleted through this user-facing setting.</span>
          </div>
        )}

      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-6 text-[#172B4D]">

            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#091E42]">Delete Account Confirmation</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  This action is <strong>permanent and cannot be undone</strong>. Your user account and login credentials will be permanently removed.
                </p>
              </div>
            </div>

            {deleteError && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{deleteError}</span>
              </div>
            )}

            <form onSubmit={handleConfirmDelete} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Confirm Current Password
                </label>
                <input
                  type="password"
                  required
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  placeholder="Enter your current password"
                  className="w-full bg-[#F4F5F7] border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-[#091E42] focus:ring-2 focus:ring-red-500 focus:outline-none focus:bg-white font-medium"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  disabled={deleting}
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeletePassword('');
                    setDeleteError(null);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={deleting || !deletePassword}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md transition disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                >
                  {deleting ? (
                    <span>Deleting Account...</span>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      <span>Confirm Deletion</span>
                    </>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};

// Subcomponent: Staff Duty Roster & Flight Assignments Section
const StaffAssignmentsSection = ({ userId }) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await api.get('/crews/my-assignments');
        if (res?.data) {
          setAssignments(res.data);
        }
      } catch (err) {
        console.error('Failed to load staff assignments:', err);
        setError('Failed to load duty assignments.');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchAssignments();
    }
  }, [userId]);

  const roleBadges = {
    'Pilot': 'bg-amber-100 text-amber-900 border-amber-300',
    'Co-Pilot': 'bg-blue-100 text-blue-900 border-blue-300',
    'Cabin Crew Lead': 'bg-purple-100 text-purple-900 border-purple-300',
    'Cabin Crew': 'bg-emerald-100 text-emerald-900 border-emerald-300'
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-2 text-[#0052CC] font-extrabold text-sm uppercase tracking-wider">
          <Briefcase className="w-4 h-4 flex-shrink-0" />
          <span>My Flight Duty Roster & Operational Assignments</span>
        </div>
        <span className="text-xs font-bold text-slate-500">
          {assignments.length} assigned flight{assignments.length === 1 ? '' : 's'}
        </span>
      </div>

      <p className="text-xs text-slate-500 leading-relaxed">
        Below is your live flight duty schedule assigned by Enum Airways Flight Operations.
      </p>

      {loading ? (
        <div className="text-center py-6 text-xs text-slate-500">Loading duty roster...</div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl">{error}</div>
      ) : assignments.length === 0 ? (
        <div className="text-center py-8 text-xs text-slate-500 bg-[#F8F9FA] rounded-2xl border border-dashed border-slate-200 space-y-1">
          <Plane className="w-6 h-6 text-slate-400 mx-auto" />
          <p className="font-bold text-slate-700">No Duty Assignments Active</p>
          <p className="text-[11px]">You currently have no flight assignments on your roster.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {assignments.map((item) => (
            <div
              key={item.assignmentId}
              className="bg-[#F8F9FA] border border-slate-200 rounded-2xl p-4 space-y-2 hover:border-[#0052CC] transition"
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-[#0052CC] text-base font-mono">
                  {item.flightNumber}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${roleBadges[item.crewRole] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                  {item.crewRole}
                </span>
              </div>

              <div className="text-xs text-slate-600 space-y-1 pt-1 border-t border-slate-200/60">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Departure:
                  </span>
                  <span className="font-semibold text-[#091E42]">
                    {new Date(item.departureTime).toLocaleString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    Status:
                  </span>
                  <span className="font-bold text-emerald-700">
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
