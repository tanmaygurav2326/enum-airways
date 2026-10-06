import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useCurrency } from '../../context/CurrencyContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import {
  Armchair,
  ArrowRight,
  AlertCircle,
  LogIn,
  ArrowLeft
} from 'lucide-react';

const CLASS_MULTIPLIERS = {
  'Economy': 1.0,
  'Premium Economy': 1.4,
  'Business': 2.2,
  'First': 3.5
};

const getSeatPositionInfo = (seatNum) => {
  if (!seatNum) return { type: 'Standard', icon: '🪟', label: 'Window' };
  const str = String(seatNum).toUpperCase();
  const letterMatch = str.match(/[A-Z]/);
  const letter = letterMatch ? letterMatch[0] : '';
  if (letter === 'A' || letter === 'F') return { type: 'Window', icon: '🪟', label: 'Window' };
  if (letter === 'B' || letter === 'E') return { type: 'Middle', icon: '●', label: 'Middle' };
  if (letter === 'C' || letter === 'D') return { type: 'Aisle', icon: '⇢', label: 'Aisle' };
  return { type: 'Standard', icon: '🪟', label: 'Seat' };
};

const SeatSelection = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { formatPrice } = useCurrency();

  const flightId = searchParams.get('flightId');
  const targetClass = searchParams.get('class') || 'Economy';
  const passengerCount = parseInt(searchParams.get('passengers') || '1');

  const [flight, setFlight] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!flightId) {
      navigate('/flights');
      return;
    }

    const loadFlightAndSeats = async () => {
      setLoading(true);
      setError(null);
      try {
        const [flightRes, seatsRes] = await Promise.all([
          api.get(`/flights/${flightId}`),
          api.get(`/flights/${flightId}/seats`)
        ]);

        if (flightRes) {
          const flightData = flightRes.data?.data || flightRes.data || flightRes;
          setFlight(flightData);
        }

        if (seatsRes) {
          const payload = seatsRes.data?.data || seatsRes.data || seatsRes;
          let allSeats = [];

          if (Array.isArray(payload)) {
            allSeats = payload;
          } else if (payload?.seatsByClass) {
            Object.values(payload.seatsByClass).forEach(arr => {
              if (Array.isArray(arr)) {
                allSeats.push(...arr);
              }
            });
          } else if (Array.isArray(payload?.seats)) {
            allSeats = payload.seats;
          }

          // Normalize seat properties (status, availability, seat number, class)
          allSeats = allSeats.map(seat => {
            const status = (seat.STATUS || seat.status || '').toUpperCase();
            const isAvailable = status === 'AVAILABLE' || seat.isAvailable === true;
            return {
              ...seat,
              SEATNUMBER: seat.SEATNUMBER || seat.seatNumber || seat.seat_number,
              CLASS: seat.CLASS || seat.class || 'Economy',
              STATUS: status || (isAvailable ? 'AVAILABLE' : 'OCCUPIED'),
              ISAVAILABLE: isAvailable
            };
          });

          setSeats(allSeats);
        }

      } catch (err) {
        setError(err.message || 'Failed to load seats');
      } finally {
        setLoading(false);
      }
    };

    loadFlightAndSeats();
  }, [flightId, navigate]);

  const calculateSeatPrice = (seatClass) => {
    if (!flight) return 0;
    const base = Number(flight.BASEPRICE || 3500);
    const multiplier = CLASS_MULTIPLIERS[seatClass] || 1.0;
    return Math.round(base * multiplier);
  };

  const handleSeatClick = (seat) => {
    if (!seat.ISAVAILABLE) return;

    const isSelected = selectedSeats.some((s) => s.SEATNUMBER === seat.SEATNUMBER);

    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((s) => s.SEATNUMBER !== seat.SEATNUMBER));
    } else {
      if (selectedSeats.length >= passengerCount) {
        if (passengerCount === 1) {
          setSelectedSeats([seat]);
        } else {
          setSelectedSeats([...selectedSeats.slice(1), seat]);
        }
      } else {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  };

  const handleProceedToCheckout = () => {
    const seatsParam = selectedSeats.map((s) => s.SEATNUMBER).join(',');
    const checkoutPath = seatsParam
      ? `/booking/checkout?flightId=${flightId}&seats=${seatsParam}&class=${encodeURIComponent(targetClass)}&passengers=${passengerCount}`
      : `/booking/seats?flightId=${flightId}&class=${encodeURIComponent(targetClass)}&passengers=${passengerCount}`;

    if (!isAuthenticated) {
      const redirect = encodeURIComponent(checkoutPath);
      const reason = encodeURIComponent('Please sign in to your Enum Airways account to enter passenger details and finalize your flight booking.');
      navigate(`/login?redirect=${redirect}&reason=${reason}`);
      return;
    }

    if (selectedSeats.length !== passengerCount) return;

    navigate(checkoutPath, {
      state: { flight, selectedSeats, cabinClass: targetClass, totalPrice }
    });
  };

  const totalPrice = selectedSeats.reduce((sum, s) => sum + calculateSeatPrice(s.CLASS), 0);
  const remainingSeatsNeeded = Math.max(0, passengerCount - selectedSeats.length);

  if (loading) {
    return <LoadingSpinner text="Rendering Enum Airways Aircraft Seat Map..." />;
  }

  if (error || !flight) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-center space-y-3">
        <AlertCircle className="w-10 h-10 mx-auto text-red-500" />
        <h3 className="font-bold text-lg">Unable to Load Flight</h3>
        <p className="text-xs">{error || 'Flight not found in database.'}</p>
        <button
          onClick={() => navigate('/flights')}
          className="mt-2 bg-[#0052CC] hover:bg-[#003A8C] text-white text-xs font-bold px-4 py-2 rounded-xl"
        >
          Back to Search
        </button>
      </div>
    );
  }

  const classGroups = ['First', 'Business', 'Premium Economy', 'Economy'];

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#172B4D] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Step Indicator & Go to Previous Page Bar */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center space-x-2 text-xs font-bold text-[#0052CC] hover:text-[#003A8C] bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-xs transition hover:bg-slate-50 cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go to previous page</span>
          </button>

          <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#0052CC]"></span>
            <span>Step 2 of 4: Aircraft Seat Map</span>
          </div>
        </div>

        {/* Flight Header */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#0052CC] uppercase tracking-wider block">
              Step 2 of 4: Interactive Aircraft Seat Map
            </span>
            <div className="flex items-center space-x-3 mt-1">
              <h1 className="text-2xl font-extrabold text-[#091E42]">
                Flight {flight.FLIGHTNUMBER || 'EA 201'}
              </h1>
              <span className="text-slate-300">•</span>
              <span className="text-sm font-semibold text-slate-700">
                {flight.DEPARTUREAIRPORT} ➔ {flight.ARRIVALAIRPORT}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500">
                {flight.AIRCRAFTMODEL || 'Airbus A320neo'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-6 bg-[#F8F9FA] px-5 py-3 rounded-2xl border border-slate-200">
            <div className="text-right">
              <p className="text-[11px] font-bold text-slate-500 uppercase">Selected Seats</p>
              <p className="text-sm font-extrabold text-[#091E42]">
                {selectedSeats.length} of {passengerCount}
              </p>
            </div>
            <div className="text-right pl-6 border-l border-slate-200">
              <p className="text-[11px] font-bold text-slate-500 uppercase">Total Fare</p>
              <p className="text-xl font-extrabold text-[#0052CC]">{formatPrice(totalPrice)}</p>
            </div>
          </div>
        </div>

        {/* Legends: Statuses & Seat Types */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs shadow-xs space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-6 border-b border-slate-100 pb-2.5">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded-lg bg-[#F4F5F7] border border-slate-300"></div>
              <span className="text-slate-700 font-semibold">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded-lg bg-[#0052CC] border border-[#003A8C] shadow-sm"></div>
              <span className="text-[#0052CC] font-bold">Selected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded-lg bg-slate-200 border border-slate-300 text-slate-400 flex items-center justify-center font-bold text-[10px]">
                ✕
              </div>
              <span className="text-slate-500">Occupied</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <span className="text-base">🪟</span> Window Seat (A, F)
            </span>
            <span className="flex items-center gap-1">
              <span className="text-base text-slate-400">●</span> Middle Seat (B, E)
            </span>
            <span className="flex items-center gap-1">
              <span className="text-base text-[#0052CC]">⇢</span> Aisle Seat (C, D)
            </span>
          </div>
        </div>

        {/* Aircraft Fuselage Container with Side Wings */}
        <div className="relative max-w-2xl mx-auto my-6">

          {/* Left Wing Indicator */}
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 hidden sm:flex flex-col items-center justify-center bg-slate-200 border border-slate-300 text-[10px] font-extrabold uppercase tracking-widest text-slate-500 rounded-l-2xl py-12 px-2 shadow-xs">
            <span>W</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>
          </div>

          {/* Right Wing Indicator */}
          <div className="absolute -right-12 top-1/2 -translate-y-1/2 hidden sm:flex flex-col items-center justify-center bg-slate-200 border border-slate-300 text-[10px] font-extrabold uppercase tracking-widest text-slate-500 rounded-r-2xl py-12 px-2 shadow-xs">
            <span>W</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>
          </div>

          {/* Main Aircraft Fuselage Shell */}
          <div className="bg-white border-2 border-slate-300 rounded-t-[110px] rounded-b-3xl p-6 sm:p-10 shadow-md relative">

            {/* Front / Cockpit Indicator */}
            <div className="text-center pb-6 border-b border-slate-200">
              <div className="text-xs font-bold text-[#0052CC] uppercase tracking-widest flex items-center justify-center gap-1 mb-1">
                <span>FRONT / COCKPIT</span>
              </div>
              <div className="text-slate-400 text-sm font-bold">↓</div>
            </div>

            {/* Seat Grid by Cabin Class */}
            <div className="space-y-8 pt-6">
              {classGroups.map((cls) => {
                const classSeats = seats.filter((s) => s.CLASS === cls);
                if (classSeats.length === 0) return null;

                // Split seats into Left Bank (A, B, C) and Right Bank (D, E, F)
                const leftBank = classSeats.filter(s => {
                  const letter = (s.SEATNUMBER.match(/[A-Z]/) || [''])[0];
                  return ['A', 'B', 'C'].includes(letter);
                });

                const rightBank = classSeats.filter(s => {
                  const letter = (s.SEATNUMBER.match(/[A-Z]/) || [''])[0];
                  return ['D', 'E', 'F'].includes(letter);
                });

                const isStandardSplit = leftBank.length > 0 && rightBank.length > 0;

                return (
                  <div key={cls} className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0052CC]">
                        {cls} Cabin
                      </span>
                      <span className="text-xs text-slate-500 font-bold">
                        {formatPrice(calculateSeatPrice(cls))} / seat
                      </span>
                    </div>

                    {isStandardSplit ? (
                      /* 3–3 Layout with Central AISLE Walkway */
                      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center pt-2">
                        {/* Left Bank: A, B, C */}
                        <div className="grid grid-cols-3 gap-2">
                          {leftBank.map((seat) => {
                            const isSelected = selectedSeats.some((s) => s.SEATNUMBER === seat.SEATNUMBER);
                            const isAvailable = seat.ISAVAILABLE;
                            const pos = getSeatPositionInfo(seat.SEATNUMBER);

                            return (
                              <button
                                key={seat.SEATNUMBER}
                                type="button"
                                disabled={!isAvailable}
                                onClick={() => handleSeatClick(seat)}
                                className={`h-12 rounded-xl flex flex-col items-center justify-center font-mono text-xs font-bold transition-all relative ${
                                  isSelected
                                    ? 'bg-[#0052CC] text-white shadow-md scale-105 ring-2 ring-offset-1 ring-[#0052CC]'
                                    : isAvailable
                                    ? 'bg-[#F4F5F7] hover:bg-[#DEEBFF] hover:text-[#0052CC] text-[#172B4D] border border-slate-200 cursor-pointer'
                                    : 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
                                }`}
                                title={`${seat.SEATNUMBER} (${pos.label}) - ${isAvailable ? 'Available' : 'Occupied'}`}
                              >
                                {isSelected ? (
                                  <Armchair className="w-3.5 h-3.5 mb-0.5 opacity-90" />
                                ) : isAvailable ? (
                                  <span className="text-[10px] opacity-75 mb-0.5">{pos.icon}</span>
                                ) : (
                                  <span className="text-[10px] font-bold text-slate-400 mb-0.5">✕</span>
                                )}
                                <span>{seat.SEATNUMBER}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Central Aisle Column */}
                        <div className="px-2 text-[10px] font-bold text-slate-400 text-center uppercase tracking-widest border-x border-slate-100 py-4 select-none">
                          AISLE
                        </div>

                        {/* Right Bank: D, E, F */}
                        <div className="grid grid-cols-3 gap-2">
                          {rightBank.map((seat) => {
                            const isSelected = selectedSeats.some((s) => s.SEATNUMBER === seat.SEATNUMBER);
                            const isAvailable = seat.ISAVAILABLE;
                            const pos = getSeatPositionInfo(seat.SEATNUMBER);

                            return (
                              <button
                                key={seat.SEATNUMBER}
                                type="button"
                                disabled={!isAvailable}
                                onClick={() => handleSeatClick(seat)}
                                className={`h-12 rounded-xl flex flex-col items-center justify-center font-mono text-xs font-bold transition-all relative ${
                                  isSelected
                                    ? 'bg-[#0052CC] text-white shadow-md scale-105 ring-2 ring-offset-1 ring-[#0052CC]'
                                    : isAvailable
                                    ? 'bg-[#F4F5F7] hover:bg-[#DEEBFF] hover:text-[#0052CC] text-[#172B4D] border border-slate-200 cursor-pointer'
                                    : 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
                                }`}
                                title={`${seat.SEATNUMBER} (${pos.label}) - ${isAvailable ? 'Available' : 'Occupied'}`}
                              >
                                {isSelected ? (
                                  <Armchair className="w-3.5 h-3.5 mb-0.5 opacity-90" />
                                ) : isAvailable ? (
                                  <span className="text-[10px] opacity-75 mb-0.5">{pos.icon}</span>
                                ) : (
                                  <span className="text-[10px] font-bold text-slate-400 mb-0.5">✕</span>
                                )}
                                <span>{seat.SEATNUMBER}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      /* Fallback Grid */
                      <div className="grid grid-cols-6 gap-2 pt-2">
                        {classSeats.map((seat) => {
                          const isSelected = selectedSeats.some((s) => s.SEATNUMBER === seat.SEATNUMBER);
                          const isAvailable = seat.ISAVAILABLE;
                          const pos = getSeatPositionInfo(seat.SEATNUMBER);

                          return (
                            <button
                              key={seat.SEATNUMBER}
                              type="button"
                              disabled={!isAvailable}
                              onClick={() => handleSeatClick(seat)}
                              className={`h-12 rounded-xl flex flex-col items-center justify-center font-mono text-xs font-bold transition-all relative ${
                                isSelected
                                  ? 'bg-[#0052CC] text-white shadow-md scale-105 ring-2 ring-offset-1 ring-[#0052CC]'
                                  : isAvailable
                                  ? 'bg-[#F4F5F7] hover:bg-[#DEEBFF] hover:text-[#0052CC] text-[#172B4D] border border-slate-200 cursor-pointer'
                                  : 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
                              }`}
                              title={`${seat.SEATNUMBER} (${pos.label}) - ${isAvailable ? 'Available' : 'Occupied'}`}
                            >
                              {isSelected ? (
                                <Armchair className="w-3.5 h-3.5 mb-0.5 opacity-90" />
                              ) : isAvailable ? (
                                <span className="text-[10px] opacity-75 mb-0.5">{pos.icon}</span>
                              ) : (
                                <span className="text-[10px] font-bold text-slate-400 mb-0.5">✕</span>
                              )}
                              <span>{seat.SEATNUMBER}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Rear Galley & Lavatory */}
            <div className="text-center pt-8 border-t border-slate-200 mt-8">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                REAR / GALLEY & LAVATORIES
              </span>
            </div>
          </div>
        </div>

        {/* Floating Bottom Action Bar */}
        <div className="sticky bottom-4 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#DEEBFF] text-[#0052CC] flex items-center justify-center font-bold">
              {selectedSeats.length}
            </div>
            <div>
              <p className="text-xs text-slate-500">
                {selectedSeats.length === passengerCount
                  ? 'All seats selected'
                  : `Please select ${remainingSeatsNeeded} more seat${remainingSeatsNeeded > 1 ? 's' : ''}`}
              </p>
              <p className="text-sm font-bold text-[#091E42]">
                Seats: {selectedSeats.map((s) => s.SEATNUMBER).join(', ') || 'None'}
              </p>
            </div>
          </div>

          <button
            onClick={handleProceedToCheckout}
            disabled={isAuthenticated && selectedSeats.length !== passengerCount}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-extrabold text-sm transition shadow-md flex items-center justify-center space-x-2 ${
              !isAuthenticated || selectedSeats.length === passengerCount
                ? 'bg-[#0052CC] hover:bg-[#003A8C] text-white shadow-blue-500/20 active:scale-95 cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {!isAuthenticated ? (
              <>
                <LogIn className="w-4 h-4" />
                <span>Sign In to Proceed to Passenger Details</span>
              </>
            ) : (
              <>
                <span>Proceed to Passenger Details</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default SeatSelection;
