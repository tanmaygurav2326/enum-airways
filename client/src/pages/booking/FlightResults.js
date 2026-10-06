import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import FlightCard from '../../components/flights/FlightCard';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { useCurrency } from '../../context/CurrencyContext';
import {
  Plane,
  ArrowRight,
  SlidersHorizontal,
  Calendar,
  AlertCircle,
  ArrowUpDown,
  RotateCcw,
  Search,
  ArrowLeft
} from 'lucide-react';

const CLASS_MULTIPLIERS = {
  'Economy': 1.0,
  'Premium Economy': 1.4,
  'Business': 2.2,
  'First': 3.5
};

// Known city mappings fallback
const AIRPORT_CITIES = {
  BOM: 'Mumbai',
  DEL: 'Delhi',
  BLR: 'Bengaluru',
  PNQ: 'Pune',
  HYD: 'Hyderabad',
  MAA: 'Chennai',
  CCU: 'Kolkata',
  GOI: 'Goa',
  COK: 'Kochi',
  AMD: 'Ahmedabad',
  JAI: 'Jaipur',
  NAG: 'Nagpur',
  JLG: 'Jalgaon',
  KLH: 'Kolhapur',
  IXC: 'Chandigarh',
  IXB: 'Bagdogra',
  PAT: 'Patna',
  BBI: 'Bhubaneswar',
  DXB: 'Dubai',
  SIN: 'Singapore',
  LHR: 'London',
  BKK: 'Bangkok'
};

const FlightResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();

  const from = searchParams.get('from') || 'BOM';
  const to = searchParams.get('to') || 'DEL';
  const todayStr = new Date().toISOString().split('T')[0];
  const date = searchParams.get('date') || todayStr;
  const initialClass = searchParams.get('class') || 'Economy';
  const passengers = parseInt(searchParams.get('passengers') || searchParams.get('totalPax') || '1');

  const [flights, setFlights] = useState([]);
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Date availability & route fallback state
  const [noFlightOnDate, setNoFlightOnDate] = useState(false);
  const [isShowingRouteFallback, setIsShowingRouteFallback] = useState(false);
  const [loadingRouteFallback, setLoadingRouteFallback] = useState(false);

  // Filters & Sorting state
  const [selectedClass, setSelectedClass] = useState(initialClass);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [timeOfDayFilter, setTimeOfDayFilter] = useState('ALL'); // 'ALL' | 'morning' | 'afternoon' | 'evening'
  const [sortBy, setSortBy] = useState('price_asc');

  // Load airports list for city lookup
  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const res = await api.get('/airports');
        const data = res?.data || res || [];
        if (Array.isArray(data)) {
          setAirports(data);
        }
      } catch (err) {
        // Fall back to built-in dictionary
      }
    };
    fetchAirports();
  }, []);

  const getCityName = (code) => {
    if (!code) return '';
    const upper = code.toUpperCase();
    const found = airports.find(a => (a.AIRPORTCODE || a.AirportCode) === upper);
    if (found) return found.CITY || found.City;
    return AIRPORT_CITIES[upper] || '';
  };

  const fromCityName = getCityName(from);
  const toCityName = getCityName(to);

  const fromLabel = fromCityName ? `${fromCityName} (${from.toUpperCase()})` : from.toUpperCase();
  const toLabel = toCityName ? `${toCityName} (${to.toUpperCase()})` : to.toUpperCase();

  const adt = searchParams.get('adt') || '1';
  const chd = searchParams.get('chd') || '0';
  const inf = searchParams.get('inf') || '0';
  const um = searchParams.get('um') || '0';

  const handleReturnToSearch = () => {
    const returnPath = `/?from=${from}&to=${to}&date=${date}&class=${encodeURIComponent(selectedClass)}&passengers=${passengers}&totalPax=${passengers}&adt=${adt}&chd=${chd}&inf=${inf}&um=${um}`;
    navigate(returnPath, {
      state: {
        from,
        to,
        date,
        cabinClass: selectedClass,
        passengers: {
          adt: parseInt(adt, 10) || 1,
          chd: parseInt(chd, 10) || 0,
          inf: parseInt(inf, 10) || 0,
          um: parseInt(um, 10) || 0
        }
      }
    });
  };

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      setError(null);
      setNoFlightOnDate(false);
      setIsShowingRouteFallback(false);

      try {
        let res;
        try {
          res = await api.get(`/flights/search?from=${from}&to=${to}&date=${date}`);
        } catch (searchErr) {
          res = { data: [] };
        }

        const extractList = (response) => {
          if (!response) return [];
          const payload = response.data !== undefined ? response.data : response;
          if (Array.isArray(payload)) return payload;
          if (Array.isArray(payload?.data)) return payload.data;
          if (Array.isArray(response)) return response;
          return [];
        };

        const list = extractList(res);

        if (list.length === 0) {
          setFlights([]);
          setNoFlightOnDate(true);
        } else {
          setFlights(list);
          setNoFlightOnDate(false);
        }
      } catch (err) {
        setError(err.message || 'Failed to search flights');
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [from, to, date]);

  // Handler to fetch all upcoming flights specifically for this route (from today)
  const handleShowAllRouteFlights = async () => {
    setLoadingRouteFallback(true);
    setError(null);
    try {
      const allRes = await api.get('/flights');
      const extractList = (response) => {
        if (!response) return [];
        const payload = response.data !== undefined ? response.data : response;
        if (Array.isArray(payload)) return payload;
        if (Array.isArray(payload?.data)) return payload.data;
        if (Array.isArray(response)) return response;
        return [];
      };

      const allList = extractList(allRes);

      // Filter by route (from -> to) and departure date >= today
      const routeMatches = allList.filter((f) => {
        const matchesRoute =
          (f.DEPARTUREAIRPORT === from || f.DEPARTURECITY === from) &&
          (f.ARRIVALAIRPORT === to || f.ARRIVALCITY === to);
        if (!matchesRoute) return false;

        if (f.DEPARTURETIME) {
          const flightDateStr = String(f.DEPARTURETIME).split('T')[0].split(' ')[0];
          return flightDateStr >= todayStr;
        }
        return true;
      });

      setFlights(routeMatches);
      setIsShowingRouteFallback(true);
      setNoFlightOnDate(false);
    } catch (err) {
      setError('Failed to retrieve route flights.');
    } finally {
      setLoadingRouteFallback(false);
    }
  };

  const calculateFare = (basePrice, cClass) => {
    const multiplier = CLASS_MULTIPLIERS[cClass] || 1.0;
    return Math.round(Number(basePrice || 3500) * multiplier);
  };

  const getFlightDuration = (f) => {
    if (f.DURATIONMINUTES !== undefined && f.DURATIONMINUTES !== null) {
      return Number(f.DURATIONMINUTES);
    }
    if (f.DEPARTURETIME && f.ARRIVALTIME) {
      const dep = new Date(String(f.DEPARTURETIME).replace(' ', 'T')).getTime();
      const arr = new Date(String(f.ARRIVALTIME).replace(' ', 'T')).getTime();
      if (!isNaN(dep) && !isNaN(arr) && arr > dep) {
        return Math.round((arr - dep) / (1000 * 60));
      }
    }
    return 120;
  };

  const getFlightDepartureTimestamp = (f) => {
    if (!f.DEPARTURETIME) return 0;
    const ts = new Date(String(f.DEPARTURETIME).replace(' ', 'T')).getTime();
    return isNaN(ts) ? 0 : ts;
  };

  // Filter logic
  const filteredFlights = flights.filter((f) => {
    const fare = calculateFare(f.BASEPRICE, selectedClass);
    const matchesPrice = fare <= maxPrice;
    const matchesStatus = statusFilter === 'ALL' || f.STATUS === statusFilter;

    let matchesTime = true;
    if (timeOfDayFilter !== 'ALL' && f.DEPARTURETIME) {
      const depHour = new Date(String(f.DEPARTURETIME).replace(' ', 'T')).getHours();
      if (timeOfDayFilter === 'morning') matchesTime = depHour < 12;
      else if (timeOfDayFilter === 'afternoon') matchesTime = depHour >= 12 && depHour < 18;
      else if (timeOfDayFilter === 'evening') matchesTime = depHour >= 18;
    }

    return matchesPrice && matchesStatus && matchesTime;
  });

  // Sort logic
  const sortedFlights = [...filteredFlights].sort((a, b) => {
    const fareA = calculateFare(a.BASEPRICE, selectedClass);
    const fareB = calculateFare(b.BASEPRICE, selectedClass);

    if (sortBy === 'price_asc') return fareA - fareB;
    if (sortBy === 'price_desc') return fareB - fareA;
    if (sortBy === 'time_asc') {
      return getFlightDepartureTimestamp(a) - getFlightDepartureTimestamp(b);
    }
    if (sortBy === 'time_desc') {
      return getFlightDepartureTimestamp(b) - getFlightDepartureTimestamp(a);
    }
    if (sortBy === 'duration_asc') {
      return getFlightDuration(a) - getFlightDuration(b);
    }
    if (sortBy === 'duration_desc') {
      return getFlightDuration(b) - getFlightDuration(a);
    }
    return 0;
  });

  const handleSelectFlight = (flight) => {
    navigate(`/booking/seats?flightId=${flight.FLIGHTID}&class=${encodeURIComponent(selectedClass)}&passengers=${passengers}`);
  };

  const handleResetFilters = () => {
    setMaxPrice(100000);
    setStatusFilter('ALL');
    setTimeOfDayFilter('ALL');
    setSortBy('price_asc');
    if (noFlightOnDate || (flights.length === 0 && !isShowingRouteFallback)) {
      handleShowAllRouteFlights();
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#172B4D] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Step Indicator & Go to Previous Page Bar */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleReturnToSearch}
            className="inline-flex items-center space-x-2 text-xs font-bold text-[#0052CC] hover:text-[#003A8C] bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-xs transition hover:bg-slate-50 cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go to previous page</span>
          </button>

          <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#0052CC]"></span>
            <span>Step 1 of 4: Select Flight</span>
          </div>
        </div>

        {/* Route Summary & Modification Header */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="bg-[#DEEBFF] text-[#0052CC] p-3.5 rounded-2xl border border-blue-200">
              <Plane className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2 text-xl sm:text-2xl font-extrabold text-[#091E42]">
                <span>{fromLabel}</span>
                <ArrowRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <span>{toLabel}</span>
              </div>
              <p className="text-xs text-slate-500 flex flex-wrap items-center gap-2 mt-1">
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-[#0052CC]" />
                  <span>Departure: {date}</span>
                </span>
                <span>•</span>
                <span>{passengers} {passengers === 1 ? 'Passenger' : 'Passengers'}</span>
                <span>•</span>
                <span className="text-[#0052CC] font-bold">
                  {noFlightOnDate ? '0 Flights on Date' : `${sortedFlights.length} Flights Available`}
                </span>
              </p>
            </div>
          </div>

          {/* Cabin Class Tabs */}
          <div className="flex items-center bg-[#F4F5F7] p-1.5 rounded-xl border border-slate-200">
            {Object.keys(CLASS_MULTIPLIERS).map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedClass === cls
                    ? 'bg-[#0052CC] text-white shadow-sm'
                    : 'text-slate-600 hover:text-[#0052CC]'
                }`}
              >
                {cls}
              </button>
            ))}
          </div>
        </div>

        {/* Main Search Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Sidebar: Filters */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2 font-bold text-[#091E42] text-sm">
                  <SlidersHorizontal className="w-4 h-4 text-[#0052CC]" />
                  <span>Filter Flights</span>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-[#0052CC] hover:underline flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Price Filter */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Max Fare</span>
                  <span className="text-[#0052CC] font-bold">{formatPrice(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="100000"
                  step="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>{formatPrice(2000)}</span>
                  <span>{formatPrice(100000)}</span>
                </div>
              </div>

              {/* Departure Time of Day Filter */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Departure Time
                </label>
                <div className="grid grid-cols-1 gap-1.5 text-xs">
                  {[
                    { id: 'ALL', label: 'Any Time' },
                    { id: 'morning', label: 'Morning (00:00 - 12:00)' },
                    { id: 'afternoon', label: 'Afternoon (12:00 - 18:00)' },
                    { id: 'evening', label: 'Evening (18:00 - 24:00)' },
                  ].map((t) => (
                    <label
                      key={t.id}
                      className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition ${
                        timeOfDayFilter === t.id
                          ? 'bg-[#DEEBFF] text-[#0052CC] font-bold'
                          : 'hover:bg-[#F4F5F7] text-slate-600'
                      }`}
                    >
                      <input
                        type="radio"
                        name="timeOfDay"
                        value={t.id}
                        checked={timeOfDayFilter === t.id}
                        onChange={() => setTimeOfDayFilter(t.id)}
                        className="text-[#0052CC] focus:ring-[#0052CC] h-3.5 w-3.5"
                      />
                      <span>{t.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Flight Status */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Operational Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-[#F4F5F7] border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-[#172B4D] focus:outline-none focus:border-[#0052CC]"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Delayed">Delayed</option>
                  <option value="Departed">Departed</option>
                  <option value="Arrived">Arrived</option>
                </select>
              </div>

              {/* Inclusions summary */}
              <div className="bg-[#F8F9FA] p-3 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
                <p className="font-bold text-[#091E42]">Enum Airways Guarantee:</p>
                <p>• Complimentary meal on all flights {'>'} 2 hrs</p>
                <p>• 15 kg checked baggage included</p>
                <p>• Free seat selection in standard rows</p>
              </div>
            </div>
          </div>

          {/* Right Main Column: Flight Cards List */}
          <div className="lg:col-span-9 space-y-4">

            {/* Banner when showing route fallback flights */}
            {isShowingRouteFallback && (
              <div className="bg-[#DEEBFF] border border-[#B3D4FF] text-[#0052CC] p-4 rounded-2xl flex items-center justify-between gap-3 text-xs animate-fade-in-up">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-[#0052CC] flex-shrink-0" />
                  <span>
                    Showing <strong>{sortedFlights.length}</strong> upcoming flights for <strong>{fromLabel} → {toLabel}</strong> (from today onwards).
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIsShowingRouteFallback(false);
                    setNoFlightOnDate(true);
                    setFlights([]);
                  }}
                  className="text-xs text-[#0052CC] font-bold hover:underline whitespace-nowrap"
                >
                  Back to date notice
                </button>
              </div>
            )}

            {/* Sorting Toolbar */}
            <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-2 text-slate-500 font-medium">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#0052CC]" />
                <span>Sort by:</span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'price_asc', label: 'Price: Low to High' },
                  { id: 'price_desc', label: 'Price: High to Low' },
                  { id: 'time_asc', label: 'Departure: Earliest' },
                  { id: 'time_desc', label: 'Departure: Latest' },
                  { id: 'duration_asc', label: 'Duration: Shortest' },
                  { id: 'duration_desc', label: 'Duration: Longest' }
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSortBy(s.id)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition ${
                      sortBy === s.id
                        ? 'bg-[#0052CC] text-white shadow-xs'
                        : 'bg-[#F4F5F7] text-slate-700 hover:bg-[#DEEBFF] hover:text-[#0052CC]'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Flight Cards Stream / States */}
            {loading || loadingRouteFallback ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
                <LoadingSpinner text="Searching available Enum Airways flights..." />
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl flex items-center space-x-3">
                <AlertCircle className="w-6 h-6 flex-shrink-0" />
                <div>
                  <h4 className="font-bold">Flight Search Error</h4>
                  <p className="text-xs text-red-600">{error}</p>
                </div>
              </div>
            ) : noFlightOnDate && !isShowingRouteFallback ? (
              /* Specific Date No Flights Available Banner + Route Option */
              <div className="bg-white border border-amber-200 rounded-2xl p-8 text-center space-y-5 shadow-sm animate-fade-in-up">
                <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto border border-amber-200 shadow-xs">
                  <AlertCircle className="w-7 h-7" />
                </div>
                <div className="space-y-1.5 max-w-md mx-auto">
                  <h3 className="text-xl font-extrabold text-[#091E42]">
                    No flights available for this route and date.
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    We couldn't find any direct flights scheduled for <strong>{fromLabel} → {toLabel}</strong> on {date}.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleShowAllRouteFlights}
                    className="w-full sm:w-auto bg-[#0052CC] hover:bg-[#003A8C] text-white font-bold px-6 py-3.5 rounded-xl text-xs transition shadow-md flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Search className="w-4 h-4" />
                    <span>Show all flights for {fromLabel} → {toLabel} (from today)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleReturnToSearch}
                    className="w-full sm:w-auto bg-[#F4F5F7] hover:bg-slate-200 text-[#091E42] font-bold px-5 py-3.5 rounded-xl text-xs transition border border-slate-300"
                  >
                    Search Another Route / Date
                  </button>
                </div>
              </div>
            ) : isShowingRouteFallback && sortedFlights.length === 0 ? (
              /* Route has 0 scheduled flights in database */
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4 shadow-sm animate-fade-in-up">
                <Plane className="w-12 h-12 text-slate-400 mx-auto" />
                <h3 className="text-xl font-extrabold text-[#091E42]">
                  No Scheduled Flights for {fromLabel} → {toLabel}
                </h3>
                <p className="text-slate-500 text-xs max-w-md mx-auto leading-relaxed">
                  There are currently no scheduled flights operating on the route from <strong>{fromLabel}</strong> to <strong>{toLabel}</strong>. Please try selecting a primary hub route (e.g. Mumbai, Delhi, Bengaluru).
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-3">
                  <button
                    type="button"
                    onClick={handleReturnToSearch}
                    className="bg-[#0052CC] hover:bg-[#003A8C] text-white font-bold px-6 py-3 rounded-xl text-xs transition shadow-md active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search New Route</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsShowingRouteFallback(false);
                      setNoFlightOnDate(true);
                      setFlights([]);
                    }}
                    className="bg-[#F4F5F7] hover:bg-slate-200 text-[#091E42] font-bold px-5 py-3 rounded-xl text-xs transition border border-slate-300"
                  >
                    Back to Date Notice
                  </button>
                </div>
              </div>
            ) : sortedFlights.length === 0 ? (
              /* Flights exist, but were filtered out by sidebar price/time filters */
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4 shadow-sm animate-fade-in-up">
                <SlidersHorizontal className="w-12 h-12 text-slate-400 mx-auto" />
                <h3 className="text-xl font-extrabold text-[#091E42]">
                  No Flights Matching Your Filters
                </h3>
                <p className="text-slate-500 text-xs max-w-md mx-auto leading-relaxed">
                  Flights are available for this route, but none match your selected price threshold or departure time filters. Click below to clear your filters.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-3">
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="bg-[#0052CC] hover:bg-[#003A8C] text-white font-bold px-6 py-3 rounded-xl text-xs transition shadow-md active:scale-95 flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset All Filters</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleReturnToSearch}
                    className="bg-[#F4F5F7] hover:bg-slate-200 text-[#091E42] font-bold px-5 py-3 rounded-xl text-xs transition border border-slate-300"
                  >
                    Search New Route
                  </button>
                </div>
              </div>
            ) : (
              /* Flights List */
              <div className="space-y-4">
                {sortedFlights.map((flight) => (
                  <FlightCard
                    key={flight.FLIGHTID}
                    flight={flight}
                    selectedClass={selectedClass}
                    passengers={passengers}
                    onSelectFlight={handleSelectFlight}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightResults;
