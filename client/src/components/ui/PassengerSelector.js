import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Users, Plus, Minus, UserCheck, AlertCircle } from 'lucide-react';

const PassengerSelector = ({
  passengers,
  onChange,
  maxTotal = 9
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [popupStyle, setPopupStyle] = useState({});
  const triggerRef = useRef(null);
  const popupRef = useRef(null);

  const { adt = 1, chd = 0, inf = 0, um = 0 } = passengers;
  const totalPax = adt + chd + inf + um;
  const isUmActive = um > 0;
  const isStandardActive = (adt + chd + inf) > 0;

  // Position popup using fixed coords derived from trigger button rect.
  const updatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const popupWidth = window.innerWidth < 640 ? Math.min(320, window.innerWidth - 24) : 384;
    const spaceBelow = window.innerHeight - rect.bottom - 8;
    const spaceAbove = rect.top - 8;
    const openUpward = spaceBelow < 420 && spaceAbove > spaceBelow;

    let left = rect.right - popupWidth;
    if (left < 8) left = 8;
    if (left + popupWidth > window.innerWidth - 8) left = window.innerWidth - popupWidth - 8;

    setPopupStyle({
      position: 'fixed',
      zIndex: 9999,
      width: popupWidth,
      left,
      maxHeight: Math.min(openUpward ? spaceAbove : spaceBelow, 480),
      overflowY: 'auto',
      ...(openUpward
        ? { bottom: window.innerHeight - rect.top + 8 }
        : { top: rect.bottom + 8 }),
    });
  };

  useEffect(() => {
    if (!isOpen) return;
    updatePosition();
    const handleClose = (e) => {
      if (
        triggerRef.current && !triggerRef.current.contains(e.target) &&
        popupRef.current && !popupRef.current.contains(e.target)
      ) {
        if (totalPax === 0) {
          onChange({ adt: 1, chd: 0, inf: 0, um: 0 });
        }
        setIsOpen(false);
      }
    };
    const handleScroll = () => updatePosition();
    document.addEventListener('mousedown', handleClose);
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      document.removeEventListener('mousedown', handleClose);
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, totalPax, onChange]);

  // Handlers enforcing passenger & airline rules
  const handleUpdate = (type, delta) => {
    const next = { ...passengers };

    if (type === 'um') {
      if (delta > 0) {
        // UM is mutually exclusive with ADT, CHD, INF
        next.um = Math.min((next.um || 0) + 1, maxTotal);
        next.adt = 0;
        next.chd = 0;
        next.inf = 0;
      } else {
        next.um = Math.max((next.um || 0) - 1, 0);
      }
    } else {
      // Standard passengers (ADT, CHD, INF)
      // Reset UM to 0 when selecting standard passengers
      next.um = 0;

      if (type === 'adt') {
        if (delta > 0 && totalPax >= maxTotal) return;
        const nextAdt = Math.max(0, next.adt + delta);
        next.adt = nextAdt;
        // Rule: Infant count cannot exceed Adult count
        if (next.inf > next.adt) {
          next.inf = next.adt;
        }
        // Rule: Children and Infants require at least 1 Adult
        if (next.adt === 0) {
          next.chd = 0;
          next.inf = 0;
        }
      } else if (type === 'chd') {
        if (delta > 0) {
          if (totalPax >= maxTotal) return;
          // Rule: Children must be accompanied by at least 1 Adult
          if (next.adt <= 0) return;
          next.chd = next.chd + 1;
        } else {
          next.chd = Math.max(0, next.chd - 1);
        }
      } else if (type === 'inf') {
        if (delta > 0) {
          if (totalPax >= maxTotal) return;
          // Rule: Infant count cannot exceed Adult count, requires ADT >= 1
          if (next.adt <= 0 || next.inf >= next.adt) return;
          next.inf = next.inf + 1;
        } else {
          next.inf = Math.max(0, next.inf - 1);
        }
      }
    }

    onChange(next);
  };

  // Summary text for input trigger
  const getSummary = () => {
    if (totalPax === 0) {
      return 'Select Passengers';
    }
    if (isUmActive) {
      return `${um} Unaccompanied Minor${um > 1 ? 's' : ''}`;
    }
    const parts = [];
    if (adt > 0) parts.push(`${adt} Adult${adt > 1 ? 's' : ''}`);
    if (chd > 0) parts.push(`${chd} Child${chd > 1 ? 'ren' : ''}`);
    if (inf > 0) parts.push(`${inf} Infant${inf > 1 ? 's' : ''}`);
    return parts.length > 0 ? parts.join(', ') : 'Select Passengers';
  };

  // Popup rendered via portal
  const popup = isOpen && (
    <div
      ref={popupRef}
      style={popupStyle}
      className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 animate-fade-in-up text-[#172B4D]"
    >
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
        <div>
          <h4 className="font-bold text-sm text-[#091E42] font-display">Select Passengers</h4>
          <p className="text-[11px] text-slate-500">Maximum {maxTotal} passengers per booking</p>
        </div>
        <div className="text-right">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
            totalPax === 0 ? 'text-red-700 bg-red-50' : 'text-[#0052CC] bg-[#DEEBFF]'
          }`}>
            {totalPax} / {maxTotal}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {/* 1. ADT: Adult */}
        <div className="flex items-center justify-between">
          <div className="pr-2">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-sm text-[#091E42]">Adult</span>
              <span className="text-[10px] font-bold text-[#0052CC] bg-blue-50 px-1.5 py-0.5 rounded">ADT</span>
            </div>
            <p className="text-[11px] text-slate-500">Age 12+ years</p>
            <p className="text-[10px] text-slate-400">Standard seat reservation</p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              disabled={adt <= 0 || isUmActive}
              onClick={() => handleUpdate('adt', -1)}
              className="w-8 h-8 rounded-lg border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-[#DEEBFF] hover:border-[#0052CC] hover:text-[#0052CC] disabled:opacity-30 disabled:cursor-not-allowed transition active:scale-95"
              aria-label="Decrease Adults"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center font-bold text-sm text-[#091E42]">{adt}</span>
            <button
              type="button"
              disabled={totalPax >= maxTotal || isUmActive}
              onClick={() => handleUpdate('adt', 1)}
              className="w-8 h-8 rounded-lg border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-[#DEEBFF] hover:border-[#0052CC] hover:text-[#0052CC] disabled:opacity-30 disabled:cursor-not-allowed transition active:scale-95"
              aria-label="Increase Adults"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. CHD: Child */}
        <div className="flex items-center justify-between">
          <div className="pr-2">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-sm text-[#091E42]">Child</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">CHD</span>
            </div>
            <p className="text-[11px] text-slate-500">Age 2 to 11 years</p>
            <p className="text-[10px] text-emerald-600 font-medium">Occupies an individual seat</p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              disabled={chd <= 0 || isUmActive}
              onClick={() => handleUpdate('chd', -1)}
              className="w-8 h-8 rounded-lg border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-[#DEEBFF] hover:border-[#0052CC] hover:text-[#0052CC] disabled:opacity-30 disabled:cursor-not-allowed transition active:scale-95"
              aria-label="Decrease Children"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center font-bold text-sm text-[#091E42]">{chd}</span>
            <button
              type="button"
              disabled={totalPax >= maxTotal || adt === 0 || isUmActive}
              onClick={() => handleUpdate('chd', 1)}
              className="w-8 h-8 rounded-lg border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-[#DEEBFF] hover:border-[#0052CC] hover:text-[#0052CC] disabled:opacity-30 disabled:cursor-not-allowed transition active:scale-95"
              title={adt === 0 ? 'Children must be accompanied by at least 1 Adult' : 'Add Child'}
              aria-label="Increase Children"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3. INF: Infant */}
        <div className="flex items-center justify-between">
          <div className="pr-2">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-sm text-[#091E42]">Infant</span>
              <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">INF</span>
            </div>
            <p className="text-[11px] text-slate-500">Under 2 years</p>
            <p className="text-[10px] text-purple-600 font-medium">Sits on adult's lap (max 1 per adult)</p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              disabled={inf <= 0 || isUmActive}
              onClick={() => handleUpdate('inf', -1)}
              className="w-8 h-8 rounded-lg border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-[#DEEBFF] hover:border-[#0052CC] hover:text-[#0052CC] disabled:opacity-30 disabled:cursor-not-allowed transition active:scale-95"
              aria-label="Decrease Infants"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center font-bold text-sm text-[#091E42]">{inf}</span>
            <button
              type="button"
              disabled={totalPax >= maxTotal || inf >= adt || adt === 0 || isUmActive}
              onClick={() => handleUpdate('inf', 1)}
              className="w-8 h-8 rounded-lg border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-[#DEEBFF] hover:border-[#0052CC] hover:text-[#0052CC] disabled:opacity-30 disabled:cursor-not-allowed transition active:scale-95"
              title={adt === 0 ? 'Requires at least 1 Adult' : inf >= adt ? 'Every infant must be accompanied by an adult' : 'Add Infant'}
              aria-label="Increase Infants"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Divider for UM/UNMR */}
        <div className="pt-3 border-t border-slate-100">
          {/* 4. UM / UNMR: Unaccompanied Minor */}
          <div className="flex items-center justify-between">
            <div className="pr-2">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sm text-[#091E42]">Unaccompanied Minor</span>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">UM / UNMR</span>
              </div>
              <p className="text-[11px] text-slate-500">Solo traveler under 12 yrs</p>
              <p className="text-[10px] text-amber-700 font-medium">Mutually exclusive with ADT/CHD/INF</p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                disabled={um <= 0}
                onClick={() => handleUpdate('um', -1)}
                className="w-8 h-8 rounded-lg border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-[#DEEBFF] hover:border-[#0052CC] hover:text-[#0052CC] disabled:opacity-30 disabled:cursor-not-allowed transition active:scale-95"
                aria-label="Decrease Unaccompanied Minors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center font-bold text-sm text-[#091E42]">{um}</span>
              <button
                type="button"
                disabled={totalPax >= maxTotal}
                onClick={() => handleUpdate('um', 1)}
                className="w-8 h-8 rounded-lg border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-[#DEEBFF] hover:border-[#0052CC] hover:text-[#0052CC] disabled:opacity-30 disabled:cursor-not-allowed transition active:scale-95"
                title="Select Unaccompanied Minor"
                aria-label="Increase Unaccompanied Minors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Explanatory banner if UM active */}
        {isUmActive && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-2.5 rounded-xl text-[11px] flex items-start gap-1.5 animate-fade-in-up">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
            <span>
              Unaccompanied Minor service selected. Adult, child, and infant selections are cleared. Dedicated airport assistance is included.
            </span>
          </div>
        )}
      </div>

      {/* Confirm Selection Footer Button */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="text-xs font-medium">
          {totalPax === 0 ? (
            <span className="text-red-600 flex items-center gap-1 font-bold text-[11px]">
              <AlertCircle className="w-3.5 h-3.5 text-red-500" />
              Select at least 1 passenger
            </span>
          ) : (
            <span className="text-slate-500 font-semibold">{getSummary()}</span>
          )}
        </div>

        <button
          type="button"
          disabled={totalPax === 0}
          onClick={() => {
            if (totalPax > 0) setIsOpen(false);
          }}
          className="bg-[#0052CC] hover:bg-[#003A8C] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-sm active:scale-95 flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Confirm Selection</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative w-full">
      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center">
        <Users className="w-3.5 h-3.5 mr-1 text-[#0052CC]" />
        Passengers / PAX
      </label>

      {/* Selector Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#F4F5F7] border border-slate-300 rounded-xl px-3.5 py-3 text-[#091E42] font-bold text-sm focus:ring-2 focus:ring-[#0052CC] focus:outline-none focus:bg-white text-left flex items-center justify-between transition hover:border-[#0052CC]"
      >
        <span className="truncate">{getSummary()}</span>
        <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ml-2 ${
          totalPax === 0 ? 'bg-red-100 text-red-700' : 'bg-[#DEEBFF] text-[#0052CC]'
        }`}>
          {totalPax} PAX
        </span>
      </button>

      {/* Render popup via portal */}
      {ReactDOM.createPortal(popup, document.body)}
    </div>
  );
};

export default PassengerSelector;
