import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import {
  Plane,
  UserPlus,
  AlertCircle,
  Mail,
  KeyRound,
  Briefcase,
  CheckCircle2,
  Send,
  ShieldCheck,
  RefreshCw,
  Clock
} from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import logoImg from '../../assets/logo.jpg';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('Passenger'); // 'Passenger' | 'Staff'
  const [staffId, setStaffId] = useState('');

  // Email OTP state
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpNotice, setOtpNotice] = useState(null);
  const [otpError, setOtpError] = useState(null);

  // Live countdown timer (in seconds)
  const [timerSeconds, setTimerSeconds] = useState(600);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Live Countdown Timer effect
  useEffect(() => {
    let interval = null;
    if (otpSent && !emailVerified && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [otpSent, emailVerified, timerSeconds]);

  const formatCountdown = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    // Reset verification if email changes
    if (emailVerified || otpSent) {
      setEmailVerified(false);
      setOtpSent(false);
      setOtpCode('');
      setOtpNotice(null);
      setOtpError(null);
      setTimerSeconds(600);
    }
  };

  const handleSendOTP = async () => {
    if (!email || !email.trim()) {
      setOtpError('Please enter a valid email address first.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setOtpError('Please enter a valid email format (e.g. user@example.com).');
      return;
    }

    setOtpLoading(true);
    setOtpError(null);
    setOtpNotice(null);

    try {
      const res = await api.post('/auth/send-otp', { email: email.trim() });
      setOtpSent(true);
      setTimerSeconds(600); // Reset countdown timer to 10 minutes (600s)
      setOtpNotice(res?.data?.message || 'Verification code sent to your email. Please check your inbox or spam folder.');
    } catch (err) {
      setOtpError(err.response?.data?.message || err.message || 'Failed to dispatch verification code. Please try again.');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otpCode || !otpCode.trim()) {
      setOtpError('Please enter the 6-digit verification code.');
      return;
    }

    if (timerSeconds === 0) {
      setOtpError('Verification code has expired. Please click Resend Code to receive a new OTP.');
      return;
    }

    setVerifyLoading(true);
    setOtpError(null);

    try {
      const res = await api.post('/auth/verify-otp', {
        email: email.trim(),
        otp: otpCode.trim()
      });
      setEmailVerified(true);
      setOtpNotice(res?.data?.message || 'Email verified successfully.');
    } catch (err) {
      setOtpError(err.response?.data?.message || err.message || 'Invalid verification code. Please check your email and try again.');
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!emailVerified) {
      setError('Please verify your email address before completing registration.');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password
      };

      if (accountType === 'Staff') {
        if (!staffId.trim()) {
          throw new Error('Staff ID is required for Airline Staff registration.');
        }
        payload.staffId = staffId.trim().toUpperCase();
      }

      await register(payload);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed. Please verify your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#172B4D] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <img
            src={logoImg}
            alt="Enum Airways"
            className="h-16 w-16 mx-auto rounded-2xl object-cover shadow-sm border border-slate-200"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/logo.jpg';
            }}
          />
          <h2 className="text-3xl font-extrabold text-[#091E42] tracking-tight">
            Create an Account
          </h2>
          <p className="text-xs text-slate-500">
            Join Enum Airways for instant flight bookings, seat reservations, and digital boarding passes.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center space-x-3 text-xs animate-fade-in-up">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Account Type Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAccountType('Passenger')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    accountType === 'Passenger'
                      ? 'bg-[#DEEBFF] text-[#0052CC] border-2 border-[#0052CC]'
                      : 'bg-[#F4F5F7] text-slate-600 border border-slate-200'
                  }`}
                >
                  <Plane className="w-3.5 h-3.5" />
                  <span>Passenger</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAccountType('Staff')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    accountType === 'Staff'
                      ? 'bg-amber-100 text-amber-900 border-2 border-amber-600'
                      : 'bg-[#F4F5F7] text-slate-600 border border-slate-200'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Airline Staff</span>
                </button>
              </div>
            </div>

            {/* Staff ID Input (conditional) */}
            {accountType === 'Staff' && (
              <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 space-y-1.5 animate-fade-in-up">
                <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider">
                  Official Staff ID
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. EA-STF001"
                  value={staffId}
                  onChange={(e) => setStaffId(e.target.value.toUpperCase())}
                  className="w-full bg-white border border-amber-300 rounded-lg px-3 py-2 text-xs font-mono font-bold text-[#091E42] focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <p className="text-[11px] text-amber-700">
                  Enter your pre-assigned Enum Airways staff identification code.
                </p>
              </div>
            )}

            {/* First and Last Name */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  placeholder=""
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-[#F4F5F7] border border-slate-300 rounded-xl px-3.5 py-2.5 text-[#091E42] text-sm focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  placeholder=""
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-[#F4F5F7] border border-slate-300 rounded-xl px-3.5 py-2.5 text-[#091E42] text-sm focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:bg-white"
                />
              </div>
            </div>

            {/* Email Address with Verification Trigger */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center">
                  <Mail className="w-3.5 h-3.5 mr-1 text-[#0052CC]" />
                  Email Address
                </label>
                {emailVerified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 animate-fade-in">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified</span>
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  disabled={emailVerified}
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full bg-[#F4F5F7] border rounded-xl px-3.5 py-2.5 text-[#091E42] text-sm focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:bg-white transition ${
                    emailVerified ? 'border-emerald-300 bg-emerald-50/40 text-emerald-900 font-semibold' : 'border-slate-300'
                  }`}
                />
                {!emailVerified && (
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    disabled={otpLoading || !email}
                    className="px-4 py-2.5 bg-[#DEEBFF] hover:bg-[#B3D4FF] text-[#0052CC] text-xs font-bold rounded-xl transition flex items-center gap-1.5 whitespace-nowrap disabled:opacity-50 active:scale-95 cursor-pointer shadow-xs"
                  >
                    {otpLoading ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>{otpSent ? 'Resend' : 'Send Code'}</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* OTP Verification Box with Live Timer */}
            {otpSent && !emailVerified && (
              <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 space-y-3 animate-fade-in-up">
                <div className="flex items-center justify-between text-xs font-bold text-[#091E42]">
                  <span className="flex items-center gap-1.5 text-[#0052CC]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Enter Verification Code</span>
                  </span>

                  {/* Live Dynamic Countdown Timer */}
                  <span className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-xs font-bold ${
                    timerSeconds > 60
                      ? 'bg-blue-100 text-[#0052CC]'
                      : timerSeconds > 0
                      ? 'bg-amber-100 text-amber-800 animate-pulse'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    <Clock className="w-3 h-3" />
                    <span>{timerSeconds > 0 ? formatCountdown(timerSeconds) : 'Expired'}</span>
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 leading-relaxed">
                  We have dispatched a 6-digit verification code to <strong>{email}</strong>. Please check your inbox or spam folder.
                </p>

                {otpNotice && (
                  <p className="text-[11px] text-emerald-700 font-semibold">{otpNotice}</p>
                )}

                {otpError && (
                  <p className="text-[11px] text-red-600 font-semibold">{otpError}</p>
                )}

                {timerSeconds === 0 && (
                  <div className="bg-red-50 border border-red-200 p-2.5 rounded-xl text-[11px] text-red-700 flex items-center justify-between">
                    <span>Code expired. Please request a new verification code.</span>
                    <button
                      type="button"
                      onClick={handleSendOTP}
                      className="text-xs font-bold text-[#0052CC] underline hover:text-[#003A8C] ml-2"
                    >
                      Resend Code
                    </button>
                  </div>
                )}

                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="• • • • • •"
                    disabled={timerSeconds === 0}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-white border border-blue-300 rounded-xl px-3.5 py-2 font-mono font-bold text-center text-lg tracking-widest text-[#091E42] focus:outline-none focus:ring-2 focus:ring-[#0052CC] disabled:bg-slate-100 disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOTP}
                    disabled={verifyLoading || otpCode.length < 6 || timerSeconds === 0}
                    className="px-5 py-2 bg-[#0052CC] hover:bg-[#003A8C] text-white text-xs font-bold rounded-xl shadow-sm transition disabled:opacity-50 active:scale-95 whitespace-nowrap cursor-pointer"
                  >
                    {verifyLoading ? 'Verifying...' : 'Verify'}
                  </button>
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center">
                <KeyRound className="w-3.5 h-3.5 mr-1 text-[#0052CC]" />
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F4F5F7] border border-slate-300 rounded-xl px-3.5 py-2.5 text-[#091E42] text-sm focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !emailVerified}
              className={`w-full flex items-center justify-center space-x-2 font-extrabold py-3.5 px-4 rounded-xl shadow-md transition duration-150 mt-2 active:scale-95 ${
                emailVerified
                  ? 'bg-[#0052CC] hover:bg-[#003A8C] text-white cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              {loading ? (
                <LoadingSpinner text="Creating account..." />
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>{emailVerified ? 'Complete Registration' : 'Verify Email to Continue'}</span>
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-[#0052CC] font-bold hover:underline">
            Sign In here
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
