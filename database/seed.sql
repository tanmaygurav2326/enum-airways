-- =============================================================================
-- ENUM AIRWAYS - COMPREHENSIVE SEED DATASET (Oracle 21c Compatible)
-- 
-- Airline: Enum Airways (Fictional India-Focused Airline Demo Dataset)
-- Target Schema: Airports, Aircraft, AircraftSeats, Flights
-- 
-- Dataset Summary:
--   - 41 Airports (21 Real Indian, 7 Demo Indian, 11 Real Intl, 2 Demo Intl)
--   - 8 Aircraft Fleet (Free Fire Character Names: Alok, Chrono, Kelly, etc.)
--   - 1,923 Aircraft Seats (Complete inventories matching TotalSeats per aircraft)
--   - ~1,350 Scheduled Flights dynamically computed relative to TRUNC(SYSDATE)
--   - Idempotent (Safe to run multiple times using MERGE / PL/SQL blocks)
-- =============================================================================

-- =============================================================================
-- 1. AIRPORTS (41 Destinations: 21 Real Indian, 7 Demo Indian, 11 Real Intl, 2 Demo Intl)
-- =============================================================================

MERGE INTO Airports tgt
USING (
  SELECT 'BOM' AS AirportCode, 'Chhatrapati Shivaji Maharaj International Airport' AS AirportName, 'Mumbai' AS City, 'India' AS Country FROM DUAL
  UNION ALL
  SELECT 'PNQ' AS AirportCode, 'Pune International Airport' AS AirportName, 'Pune' AS City, 'India' AS Country FROM DUAL
  UNION ALL
  SELECT 'NAG' AS AirportCode, 'Dr. Babasaheb Ambedkar International Airport' AS AirportName, 'Nagpur' AS City, 'India' AS Country FROM DUAL
  UNION ALL
  SELECT 'JLG' AS AirportCode, 'Jalgaon Airport' AS AirportName, 'Jalgaon' AS City, 'India' AS Country FROM DUAL
  UNION ALL
  SELECT 'KLH' AS AirportCode, 'Chhatrapati Rajaram Maharaj Airport' AS AirportName, 'Kolhapur' AS City, 'India' AS Country FROM DUAL
  UNION ALL
  SELECT 'CCU' AS AirportCode, 'Netaji Subhash Chandra Bose International Airport' AS AirportName, 'Kolkata' AS City, 'India' AS Country FROM DUAL
  UNION ALL
  SELECT 'MAA' AS AirportCode, 'Chennai International Airport' AS AirportName, 'Chennai' AS City, 'India' AS Country FROM DUAL
  UNION ALL
  SELECT 'DEL' AS AirportCode, 'Indira Gandhi International Airport' AS AirportName, 'Delhi' AS City, 'India' AS Country FROM DUAL
  UNION ALL
  SELECT 'BLR' AS AirportCode, 'Kempegowda International Airport' AS AirportName, 'Bengaluru' AS City, 'India' AS Country FROM DUAL
  UNION ALL
  SELECT 'GOI' AS AirportCode, 'Dabolim Airport' AS AirportName, 'Panaji' AS City, 'India' AS Country FROM DUAL
  UNION ALL
  SELECT 'COK' AS AirportCode, 'Cochin International Airport' AS AirportName, 'Kochi' AS City, 'India' AS Country FROM DUAL
  UNION ALL
  SELECT 'JAI' AS AirportCode, 'Jaipur International Airport' AS AirportName, 'Jaipur' AS City, 'India' AS Country FROM DUAL
  UNION ALL
  SELECT 'BHO' AS AirportCode, 'Raja Bhoj Airport' AS AirportName, 'Bhopal' AS City, 'India' AS Country FROM DUAL
  UNION ALL
  SELECT 'GAU' AS AirportCode, 'Lokpriya Gopinath Bordoloi International Airport' AS AirportName, 'Guwahati' AS City, 'India' AS Country FROM DUAL
  UNION ALL
  SELECT 'AMD' AS AirportCode, 'Sardar Vallabhbhai Patel International Airport' AS AirportName, 'Ahmedabad' AS City, 'India' AS Country FROM DUAL
  UNION ALL
  SELECT 'HYD' AS AirportCode, 'Rajiv Gandhi International Airport' AS AirportName, 'Hyderabad' AS City, 'India' AS Country FROM DUAL
  UNION ALL
  SELECT 'PAT' AS AirportCode, 'Jayprakash Narayan International Airport' AS AirportName, 'Patna' AS City, 'India' AS Country FROM DUAL
  UNION ALL
  SELECT 'SLV' AS AirportCode, 'Shimla Airport' AS AirportName, 'Shimla' AS City, 'India' AS Country FROM DUAL
  UNION ALL
  SELECT 'RPR' AS AirportCode, 'Swami Vivekananda Airport' AS AirportName, 'Raipur' AS City, 'India' AS Country FROM DUAL
  UNION ALL
  SELECT 'VTZ' AS AirportCode, 'Visakhapatnam International Airport' AS AirportName, 'Visakhapatnam' AS City, 'India' AS Country FROM DUAL
  UNION ALL
  SELECT 'IXL' AS AirportCode, 'Kushok Bakula Rimpochee Airport' AS AirportName, 'Leh' AS City, 'India' AS Country FROM DUAL
  UNION ALL
  SELECT 'XBA' AS AirportCode, 'Enum Airways Baramati Airport' AS AirportName, 'Baramati' AS City, 'India' AS Country FROM DUAL
  UNION ALL
  SELECT 'XKA' AS AirportCode, 'Enum Airways Kallamb Airport' AS AirportName, 'Kallamb' AS City, 'India' AS Country FROM DUAL
  UNION ALL
  SELECT 'XMK' AS AirportCode, 'Enum Airways Malkapur Airport' AS AirportName, 'Malkapur' AS City, 'India' AS Country FROM DUAL
  UNION ALL
  SELECT 'XNI' AS AirportCode, 'Enum Airways Nira Airport' AS AirportName, 'Nira' AS City, 'India' AS Country FROM DUAL
  UNION ALL
  SELECT 'XBD' AS AirportCode, 'Enum Airways Beed Airport' AS AirportName, 'Beed' AS City, 'India' AS Country FROM DUAL
  UNION ALL
  SELECT 'XBO' AS AirportCode, 'Enum Airways Bokaro Airport' AS AirportName, 'Bokaro' AS City, 'India' AS Country FROM DUAL
  UNION ALL
  SELECT 'XMR' AS AirportCode, 'Enum Airways Mirzapur Airport' AS AirportName, 'Mirzapur' AS City, 'India' AS Country FROM DUAL
  UNION ALL
  SELECT 'LAX' AS AirportCode, 'Los Angeles International Airport' AS AirportName, 'Los Angeles' AS City, 'USA' AS Country FROM DUAL
  UNION ALL
  SELECT 'PVG' AS AirportCode, 'Shanghai Pudong International Airport' AS AirportName, 'Shanghai' AS City, 'China' AS Country FROM DUAL
  UNION ALL
  SELECT 'PEK' AS AirportCode, 'Beijing Capital International Airport' AS AirportName, 'Beijing' AS City, 'China' AS Country FROM DUAL
  UNION ALL
  SELECT 'BKK' AS AirportCode, 'Suvarnabhumi Airport' AS AirportName, 'Bangkok' AS City, 'Thailand' AS Country FROM DUAL
  UNION ALL
  SELECT 'CDG' AS AirportCode, 'Paris Charles de Gaulle Airport' AS AirportName, 'Paris' AS City, 'France' AS Country FROM DUAL
  UNION ALL
  SELECT 'LHR' AS AirportCode, 'London Heathrow Airport' AS AirportName, 'London' AS City, 'UK' AS Country FROM DUAL
  UNION ALL
  SELECT 'SVO' AS AirportCode, 'Sheremetyevo International Airport' AS AirportName, 'Moscow' AS City, 'Russia' AS Country FROM DUAL
  UNION ALL
  SELECT 'DXB' AS AirportCode, 'Dubai International Airport' AS AirportName, 'Dubai' AS City, 'UAE' AS Country FROM DUAL
  UNION ALL
  SELECT 'YYZ' AS AirportCode, 'Toronto Pearson International Airport' AS AirportName, 'Toronto' AS City, 'Canada' AS Country FROM DUAL
  UNION ALL
  SELECT 'GIG' AS AirportCode, 'Rio de Janeiro/Galeao International Airport' AS AirportName, 'Rio de Janeiro' AS City, 'Brazil' AS Country FROM DUAL
  UNION ALL
  SELECT 'SIN' AS AirportCode, 'Singapore Changi Airport' AS AirportName, 'Singapore' AS City, 'Singapore' AS Country FROM DUAL
  UNION ALL
  SELECT 'XCA' AS AirportCode, 'Enum Airways California Demo Airport' AS AirportName, 'California' AS City, 'USA' AS Country FROM DUAL
  UNION ALL
  SELECT 'XKS' AS AirportCode, 'Enum Airways Kasukabe Demo Airport' AS AirportName, 'Kasukabe' AS City, 'Japan' AS Country FROM DUAL
) src
ON (tgt.AirportCode = src.AirportCode)
WHEN MATCHED THEN
  UPDATE SET tgt.AirportName = src.AirportName, tgt.City = src.City, tgt.Country = src.Country
WHEN NOT MATCHED THEN
  INSERT (AirportCode, AirportName, City, Country)
  VALUES (src.AirportCode, src.AirportName, src.City, src.Country);

COMMIT;

-- =============================================================================
-- 2. AIRCRAFT FLEET (8 Aircraft: 5 Narrow-Body 3-3, 3 Widebody 3-3-3)
-- =============================================================================

MERGE INTO Aircraft tgt
USING (
  SELECT 'Alok - Airbus A320-200' AS Model, 'EA-A01' AS TailNumber, 180 AS TotalSeats, 2020 AS ManufactureYear FROM DUAL
  UNION ALL
  SELECT 'Chrono - Airbus A320-200' AS Model, 'EA-A02' AS TailNumber, 180 AS TotalSeats, 2021 AS ManufactureYear FROM DUAL
  UNION ALL
  SELECT 'Kelly - Airbus A321neo' AS Model, 'EA-A03' AS TailNumber, 216 AS TotalSeats, 2022 AS ManufactureYear FROM DUAL
  UNION ALL
  SELECT 'Hayato - Airbus A321neo' AS Model, 'EA-A04' AS TailNumber, 216 AS TotalSeats, 2023 AS ManufactureYear FROM DUAL
  UNION ALL
  SELECT 'Moco - Boeing 737-800' AS Model, 'EA-A05' AS TailNumber, 186 AS TotalSeats, 2019 AS ManufactureYear FROM DUAL
  UNION ALL
  SELECT 'K - Boeing 787-9' AS Model, 'EA-A06' AS TailNumber, 297 AS TotalSeats, 2021 AS ManufactureYear FROM DUAL
  UNION ALL
  SELECT 'Skyler - Airbus A350-900' AS Model, 'EA-A07' AS TailNumber, 351 AS TotalSeats, 2022 AS ManufactureYear FROM DUAL
  UNION ALL
  SELECT 'Dimitri - Boeing 787-9' AS Model, 'EA-A08' AS TailNumber, 297 AS TotalSeats, 2024 AS ManufactureYear FROM DUAL
) src
ON (tgt.TailNumber = src.TailNumber)
WHEN MATCHED THEN
  UPDATE SET tgt.Model = src.Model, tgt.TotalSeats = src.TotalSeats, tgt.ManufactureYear = src.ManufactureYear
WHEN NOT MATCHED THEN
  INSERT (Model, TailNumber, TotalSeats, ManufactureYear)
  VALUES (src.Model, src.TailNumber, src.TotalSeats, src.ManufactureYear);

COMMIT;

-- =============================================================================
-- 3. AIRCRAFT SEATS INVENTORY (1,923 Total Seats across 8 Aircraft)
-- =============================================================================
-- Complete seat map for each aircraft:
--   - Narrow-body (3-3): A B C | D E F (Rows 1-4 Business, 5-6 Premium Economy, Remaining Economy)
--   - Widebody (3-3-3): A B C | D E F | G H I (Rows 1-3 Business, 4-5 Premium Economy, Remaining Economy)
-- =============================================================================

DECLARE
  PROCEDURE generate_seats_3_3(p_tail VARCHAR2, p_total_rows NUMBER) IS
    v_aircraft_id NUMBER;
    v_class VARCHAR2(20);
    v_letters VARCHAR2(6) := 'ABCDEF';
    v_seat VARCHAR2(5);
  BEGIN
    SELECT AircraftID INTO v_aircraft_id FROM Aircraft WHERE TailNumber = p_tail;
    FOR r IN 1..p_total_rows LOOP
      IF r <= 4 THEN
        v_class := 'Business';
      ELSIF r <= 6 THEN
        v_class := 'Premium Economy';
      ELSE
        v_class := 'Economy';
      END IF;
      FOR l IN 1..6 LOOP
        v_seat := TO_CHAR(r) || SUBSTR(v_letters, l, 1);
        MERGE INTO AircraftSeats tgt
        USING (SELECT v_aircraft_id AS AircraftID, v_seat AS SeatNumber, v_class AS Class, 'AVAILABLE' AS Status FROM DUAL) src
        ON (tgt.AircraftID = src.AircraftID AND tgt.SeatNumber = src.SeatNumber)
        WHEN MATCHED THEN
          UPDATE SET tgt.Class = src.Class, tgt.Status = src.Status
        WHEN NOT MATCHED THEN
          INSERT (AircraftID, SeatNumber, Class, Status)
          VALUES (src.AircraftID, src.SeatNumber, src.Class, src.Status);
      END LOOP;
    END LOOP;
  END;

  PROCEDURE generate_seats_3_3_3(p_tail VARCHAR2, p_total_rows NUMBER) IS
    v_aircraft_id NUMBER;
    v_class VARCHAR2(20);
    v_letters VARCHAR2(9) := 'ABCDEFGHI';
    v_seat VARCHAR2(5);
  BEGIN
    SELECT AircraftID INTO v_aircraft_id FROM Aircraft WHERE TailNumber = p_tail;
    FOR r IN 1..p_total_rows LOOP
      IF r <= 3 THEN
        v_class := 'Business';
      ELSIF r <= 5 THEN
        v_class := 'Premium Economy';
      ELSE
        v_class := 'Economy';
      END IF;
      FOR l IN 1..9 LOOP
        v_seat := TO_CHAR(r) || SUBSTR(v_letters, l, 1);
        MERGE INTO AircraftSeats tgt
        USING (SELECT v_aircraft_id AS AircraftID, v_seat AS SeatNumber, v_class AS Class, 'AVAILABLE' AS Status FROM DUAL) src
        ON (tgt.AircraftID = src.AircraftID AND tgt.SeatNumber = src.SeatNumber)
        WHEN MATCHED THEN
          UPDATE SET tgt.Class = src.Class, tgt.Status = src.Status
        WHEN NOT MATCHED THEN
          INSERT (AircraftID, SeatNumber, Class, Status)
          VALUES (src.AircraftID, src.SeatNumber, src.Class, src.Status);
      END LOOP;
    END LOOP;
  END;
BEGIN
  -- Narrow-body (3-3 Layout)
  generate_seats_3_3('EA-A01', 30); -- Alok: 180 seats
  generate_seats_3_3('EA-A02', 30); -- Chrono: 180 seats
  generate_seats_3_3('EA-A03', 36); -- Kelly: 216 seats
  generate_seats_3_3('EA-A04', 36); -- Hayato: 216 seats
  generate_seats_3_3('EA-A05', 31); -- Moco: 186 seats

  -- Widebody (3-3-3 Layout)
  generate_seats_3_3_3('EA-A06', 33); -- K: 297 seats
  generate_seats_3_3_3('EA-A07', 39); -- Skyler: 351 seats
  generate_seats_3_3_3('EA-A08', 33); -- Dimitri: 297 seats
END;
/

COMMIT;

-- =============================================================================
-- 4. SCHEDULED FLIGHTS (Dynamic 30-Day Window relative to TRUNC(SYSDATE))
-- =============================================================================

DECLARE
  v_base_date DATE := TRUNC(SYSDATE);
  PROCEDURE upsert_flight(
    p_flnum   VARCHAR2,
    p_tail    VARCHAR2,
    p_from    VARCHAR2,
    p_to      VARCHAR2,
    p_day_off NUMBER,
    p_dep_h   NUMBER,
    p_dep_m   NUMBER,
    p_dur_m   NUMBER,
    p_price   NUMBER
  ) IS
    v_aircraft_id NUMBER;
    v_dep_ts      TIMESTAMP;
    v_arr_ts      TIMESTAMP;
  BEGIN
    SELECT AircraftID INTO v_aircraft_id FROM Aircraft WHERE TailNumber = p_tail;
    v_dep_ts := FROM_TZ(CAST(v_base_date + p_day_off + NUMTODSINTERVAL(p_dep_h, 'HOUR') + NUMTODSINTERVAL(p_dep_m, 'MINUTE') AS TIMESTAMP), 'UTC');
    v_arr_ts := v_dep_ts + NUMTODSINTERVAL(p_dur_m, 'MINUTE');
    
    MERGE INTO Flights tgt
    USING (SELECT p_flnum AS FlightNumber FROM DUAL) src
    ON (tgt.FlightNumber = src.FlightNumber)
    WHEN MATCHED THEN
      UPDATE SET tgt.AircraftID = v_aircraft_id,
                 tgt.DepartureAirport = p_from,
                 tgt.ArrivalAirport = p_to,
                 tgt.DepartureTime = CAST(v_dep_ts AS TIMESTAMP),
                 tgt.ArrivalTime = CAST(v_arr_ts AS TIMESTAMP),
                 tgt.BasePrice = p_price,
                 tgt.Status = 'Scheduled'
    WHEN NOT MATCHED THEN
      INSERT (FlightNumber, AircraftID, DepartureAirport, ArrivalAirport, DepartureTime, ArrivalTime, BasePrice, Status)
      VALUES (p_flnum, v_aircraft_id, p_from, p_to, CAST(v_dep_ts AS TIMESTAMP), CAST(v_arr_ts AS TIMESTAMP), p_price, 'Scheduled');
  END;
BEGIN
  -- Day +0
  upsert_flight('EA1001', 'EA-A03', 'BOM', 'DEL', 0, 6, 30, 130, 4800);
  upsert_flight('EA1002', 'EA-A03', 'DEL', 'BOM', 0, 10, 0, 130, 4800);
  upsert_flight('EA1003', 'EA-A01', 'BOM', 'BLR', 0, 7, 0, 105, 3800);
  upsert_flight('EA1004', 'EA-A01', 'BLR', 'BOM', 0, 10, 0, 105, 3800);
  upsert_flight('EA1005', 'EA-A03', 'DEL', 'BLR', 0, 13, 15, 165, 5600);
  upsert_flight('EA1006', 'EA-A03', 'BLR', 'DEL', 0, 17, 0, 165, 5600);
  upsert_flight('EA1007', 'EA-A02', 'BOM', 'CCU', 0, 8, 15, 155, 5100);
  upsert_flight('EA1008', 'EA-A02', 'CCU', 'BOM', 0, 12, 0, 155, 5100);
  upsert_flight('EA1009', 'EA-A02', 'BOM', 'HYD', 0, 16, 0, 90, 3400);
  upsert_flight('EA1010', 'EA-A02', 'HYD', 'BOM', 0, 18, 30, 90, 3400);
  upsert_flight('EA1011', 'EA-A05', 'BOM', 'MAA', 0, 9, 30, 120, 4200);
  upsert_flight('EA1012', 'EA-A05', 'MAA', 'BOM', 0, 12, 45, 120, 4200);
  upsert_flight('EA1013', 'EA-A02', 'BOM', 'GOI', 0, 6, 0, 75, 3200);
  upsert_flight('EA1014', 'EA-A02', 'GOI', 'BOM', 0, 21, 0, 75, 3200);
  upsert_flight('EA1015', 'EA-A02', 'BOM', 'COK', 0, 13, 30, 115, 4300);
  upsert_flight('EA1016', 'EA-A02', 'COK', 'BOM', 0, 16, 15, 115, 4300);
  upsert_flight('EA1017', 'EA-A03', 'BOM', 'AMD', 0, 7, 0, 70, 2900);
  upsert_flight('EA1018', 'EA-A03', 'AMD', 'BOM', 0, 8, 45, 70, 2900);
  upsert_flight('EA1019', 'EA-A03', 'DEL', 'JAI', 0, 18, 0, 55, 2700);
  upsert_flight('EA1020', 'EA-A03', 'JAI', 'DEL', 0, 19, 30, 55, 2700);
  upsert_flight('EA1021', 'EA-A04', 'DEL', 'GAU', 0, 10, 45, 150, 5400);
  upsert_flight('EA1022', 'EA-A04', 'GAU', 'DEL', 0, 14, 0, 150, 5400);
  upsert_flight('EA1023', 'EA-A05', 'DEL', 'SLV', 0, 7, 15, 60, 3500);
  upsert_flight('EA1024', 'EA-A05', 'SLV', 'DEL', 0, 9, 0, 60, 3500);
  upsert_flight('EA1025', 'EA-A05', 'BOM', 'NAG', 0, 13, 0, 85, 3500);
  upsert_flight('EA1026', 'EA-A05', 'NAG', 'BOM', 0, 15, 15, 85, 3500);
  upsert_flight('EA1027', 'EA-A01', 'BLR', 'VTZ', 0, 16, 45, 95, 3700);
  upsert_flight('EA1028', 'EA-A01', 'VTZ', 'BLR', 0, 19, 0, 95, 3700);
  upsert_flight('EA1029', 'EA-A01', 'PNQ', 'BOM', 0, 6, 0, 45, 2200);
  upsert_flight('EA1030', 'EA-A01', 'BOM', 'PNQ', 0, 22, 30, 45, 2200);
  upsert_flight('EA1031', 'EA-A02', 'PNQ', 'DEL', 0, 7, 30, 130, 4700);
  upsert_flight('EA1032', 'EA-A02', 'DEL', 'PNQ', 0, 21, 0, 130, 4700);
  upsert_flight('EA1033', 'EA-A02', 'BOM', 'JLG', 0, 8, 30, 60, 2500);
  upsert_flight('EA1034', 'EA-A02', 'JLG', 'BOM', 0, 10, 15, 60, 2500);
  upsert_flight('EA1035', 'EA-A01', 'PNQ', 'XBA', 0, 15, 0, 35, 1800);
  upsert_flight('EA1036', 'EA-A01', 'XBA', 'PNQ', 0, 16, 15, 35, 1800);
  upsert_flight('EA1037', 'EA-A02', 'PNQ', 'XKA', 0, 17, 30, 55, 2400);
  upsert_flight('EA1038', 'EA-A02', 'XKA', 'PNQ', 0, 19, 15, 55, 2400);
  upsert_flight('EA1039', 'EA-A05', 'NAG', 'XMK', 0, 17, 0, 45, 2100);
  upsert_flight('EA1040', 'EA-A05', 'XMK', 'NAG', 0, 18, 30, 45, 2100);
  upsert_flight('EA1041', 'EA-A01', 'CCU', 'XBO', 0, 8, 0, 50, 2200);
  upsert_flight('EA1042', 'EA-A01', 'XBO', 'CCU', 0, 9, 30, 50, 2200);
  upsert_flight('EA8001', 'EA-A06', 'BOM', 'DXB', 0, 8, 30, 210, 16500);
  upsert_flight('EA8002', 'EA-A06', 'DXB', 'BOM', 0, 13, 30, 210, 16500);
  upsert_flight('EA8003', 'EA-A08', 'DEL', 'DXB', 0, 9, 0, 240, 17500);
  upsert_flight('EA8004', 'EA-A08', 'DXB', 'DEL', 0, 14, 30, 240, 17500);
  upsert_flight('EA8005', 'EA-A07', 'BLR', 'SIN', 0, 8, 0, 290, 19500);
  upsert_flight('EA8006', 'EA-A07', 'SIN', 'BLR', 0, 14, 30, 290, 19500);
  upsert_flight('EA8007', 'EA-A07', 'BOM', 'LHR', 0, 2, 30, 570, 48000);
  upsert_flight('EA8008', 'EA-A07', 'LHR', 'BOM', 0, 13, 30, 570, 48000);
  upsert_flight('EA8009', 'EA-A08', 'DEL', 'SVO', 0, 3, 30, 390, 38000);
  upsert_flight('EA8010', 'EA-A08', 'SVO', 'DEL', 0, 11, 30, 390, 38000);
  upsert_flight('EA8011', 'EA-A07', 'BOM', 'XCA', 0, 2, 15, 990, 59000);
  upsert_flight('EA8012', 'EA-A07', 'XCA', 'BOM', 0, 17, 30, 990, 59000);
  -- Day +1
  upsert_flight('EA1043', 'EA-A03', 'BOM', 'DEL', 1, 6, 30, 130, 4800);
  upsert_flight('EA1044', 'EA-A03', 'DEL', 'BOM', 1, 10, 0, 130, 4800);
  upsert_flight('EA1045', 'EA-A01', 'BOM', 'BLR', 1, 7, 0, 105, 3800);
  upsert_flight('EA1046', 'EA-A01', 'BLR', 'BOM', 1, 10, 0, 105, 3800);
  upsert_flight('EA1047', 'EA-A03', 'DEL', 'BLR', 1, 13, 15, 165, 5600);
  upsert_flight('EA1048', 'EA-A03', 'BLR', 'DEL', 1, 17, 0, 165, 5600);
  upsert_flight('EA1049', 'EA-A01', 'DEL', 'CCU', 1, 13, 0, 135, 4600);
  upsert_flight('EA1050', 'EA-A01', 'CCU', 'DEL', 1, 16, 15, 135, 4600);
  upsert_flight('EA1051', 'EA-A04', 'DEL', 'HYD', 1, 8, 0, 135, 4500);
  upsert_flight('EA1052', 'EA-A04', 'HYD', 'DEL', 1, 11, 15, 135, 4500);
  upsert_flight('EA1053', 'EA-A04', 'DEL', 'MAA', 1, 14, 30, 170, 5800);
  upsert_flight('EA1054', 'EA-A04', 'MAA', 'DEL', 1, 18, 30, 170, 5800);
  upsert_flight('EA1055', 'EA-A02', 'BOM', 'GOI', 1, 6, 0, 75, 3200);
  upsert_flight('EA1056', 'EA-A02', 'GOI', 'BOM', 1, 21, 0, 75, 3200);
  upsert_flight('EA1057', 'EA-A04', 'DEL', 'BHO', 1, 6, 30, 85, 3300);
  upsert_flight('EA1058', 'EA-A04', 'BHO', 'DEL', 1, 8, 30, 85, 3300);
  upsert_flight('EA1059', 'EA-A01', 'DEL', 'PAT', 1, 6, 45, 95, 3600);
  upsert_flight('EA1060', 'EA-A01', 'PAT', 'DEL', 1, 9, 0, 95, 3600);
  upsert_flight('EA1061', 'EA-A03', 'DEL', 'IXL', 1, 6, 15, 85, 6200);
  upsert_flight('EA1062', 'EA-A03', 'IXL', 'DEL', 1, 8, 30, 85, 6200);
  upsert_flight('EA1063', 'EA-A04', 'DEL', 'RPR', 1, 15, 0, 110, 4100);
  upsert_flight('EA1064', 'EA-A04', 'RPR', 'DEL', 1, 17, 30, 110, 4100);
  upsert_flight('EA1065', 'EA-A01', 'PNQ', 'BOM', 1, 6, 0, 45, 2200);
  upsert_flight('EA1066', 'EA-A01', 'BOM', 'PNQ', 1, 22, 30, 45, 2200);
  upsert_flight('EA1067', 'EA-A05', 'BOM', 'KLH', 1, 10, 0, 55, 2600);
  upsert_flight('EA1068', 'EA-A05', 'KLH', 'BOM', 1, 11, 45, 55, 2600);
  upsert_flight('EA1069', 'EA-A03', 'BOM', 'XBA', 1, 11, 30, 50, 2300);
  upsert_flight('EA1070', 'EA-A03', 'XBA', 'BOM', 1, 13, 0, 50, 2300);
  upsert_flight('EA1071', 'EA-A01', 'PNQ', 'XNI', 1, 17, 15, 35, 1900);
  upsert_flight('EA1072', 'EA-A01', 'XNI', 'PNQ', 1, 18, 30, 35, 1900);
  upsert_flight('EA1073', 'EA-A02', 'HYD', 'XBD', 1, 11, 0, 55, 2400);
  upsert_flight('EA1074', 'EA-A02', 'XBD', 'HYD', 1, 12, 45, 55, 2400);
  upsert_flight('EA1075', 'EA-A04', 'DEL', 'XMR', 1, 12, 30, 75, 2900);
  upsert_flight('EA1076', 'EA-A04', 'XMR', 'DEL', 1, 14, 30, 75, 2900);
  upsert_flight('EA8013', 'EA-A06', 'BOM', 'SIN', 1, 23, 15, 330, 22000);
  upsert_flight('EA8014', 'EA-A06', 'SIN', 'BOM', 1, 7, 45, 330, 22000);
  upsert_flight('EA8015', 'EA-A08', 'DEL', 'SIN', 1, 22, 30, 345, 23500);
  upsert_flight('EA8016', 'EA-A08', 'SIN', 'DEL', 1, 7, 0, 345, 23500);
  upsert_flight('EA8017', 'EA-A03', 'MAA', 'SIN', 1, 9, 15, 260, 18000);
  upsert_flight('EA8018', 'EA-A03', 'SIN', 'MAA', 1, 15, 0, 260, 18000);
  upsert_flight('EA8019', 'EA-A08', 'DEL', 'LHR', 1, 1, 45, 540, 49500);
  upsert_flight('EA8020', 'EA-A08', 'LHR', 'DEL', 1, 12, 0, 540, 49500);
  upsert_flight('EA8021', 'EA-A06', 'DEL', 'PEK', 1, 3, 0, 360, 34000);
  upsert_flight('EA8022', 'EA-A06', 'PEK', 'DEL', 1, 11, 0, 360, 34000);
  upsert_flight('EA8023', 'EA-A08', 'DEL', 'XKS', 1, 23, 15, 450, 39000);
  upsert_flight('EA8024', 'EA-A08', 'XKS', 'DEL', 1, 10, 0, 450, 39000);
  -- Day +2
  upsert_flight('EA1077', 'EA-A03', 'BOM', 'DEL', 2, 6, 30, 130, 4800);
  upsert_flight('EA1078', 'EA-A03', 'DEL', 'BOM', 2, 10, 0, 130, 4800);
  upsert_flight('EA1079', 'EA-A01', 'BOM', 'BLR', 2, 7, 0, 105, 3800);
  upsert_flight('EA1080', 'EA-A01', 'BLR', 'BOM', 2, 10, 0, 105, 3800);
  upsert_flight('EA1081', 'EA-A03', 'DEL', 'BLR', 2, 13, 15, 165, 5600);
  upsert_flight('EA1082', 'EA-A03', 'BLR', 'DEL', 2, 17, 0, 165, 5600);
  upsert_flight('EA1083', 'EA-A02', 'BOM', 'CCU', 2, 8, 15, 155, 5100);
  upsert_flight('EA1084', 'EA-A02', 'CCU', 'BOM', 2, 12, 0, 155, 5100);
  upsert_flight('EA1085', 'EA-A02', 'BOM', 'HYD', 2, 16, 0, 90, 3400);
  upsert_flight('EA1086', 'EA-A02', 'HYD', 'BOM', 2, 18, 30, 90, 3400);
  upsert_flight('EA1087', 'EA-A05', 'BOM', 'MAA', 2, 9, 30, 120, 4200);
  upsert_flight('EA1088', 'EA-A05', 'MAA', 'BOM', 2, 12, 45, 120, 4200);
  upsert_flight('EA1089', 'EA-A02', 'BOM', 'GOI', 2, 6, 0, 75, 3200);
  upsert_flight('EA1090', 'EA-A02', 'GOI', 'BOM', 2, 21, 0, 75, 3200);
  upsert_flight('EA1091', 'EA-A02', 'BOM', 'COK', 2, 13, 30, 115, 4300);
  upsert_flight('EA1092', 'EA-A02', 'COK', 'BOM', 2, 16, 15, 115, 4300);
  upsert_flight('EA1093', 'EA-A03', 'BOM', 'AMD', 2, 7, 0, 70, 2900);
  upsert_flight('EA1094', 'EA-A03', 'AMD', 'BOM', 2, 8, 45, 70, 2900);
  upsert_flight('EA1095', 'EA-A03', 'DEL', 'JAI', 2, 18, 0, 55, 2700);
  upsert_flight('EA1096', 'EA-A03', 'JAI', 'DEL', 2, 19, 30, 55, 2700);
  upsert_flight('EA1097', 'EA-A04', 'DEL', 'GAU', 2, 10, 45, 150, 5400);
  upsert_flight('EA1098', 'EA-A04', 'GAU', 'DEL', 2, 14, 0, 150, 5400);
  upsert_flight('EA1099', 'EA-A05', 'DEL', 'SLV', 2, 7, 15, 60, 3500);
  upsert_flight('EA1100', 'EA-A05', 'SLV', 'DEL', 2, 9, 0, 60, 3500);
  upsert_flight('EA1101', 'EA-A05', 'BOM', 'NAG', 2, 13, 0, 85, 3500);
  upsert_flight('EA1102', 'EA-A05', 'NAG', 'BOM', 2, 15, 15, 85, 3500);
  upsert_flight('EA1103', 'EA-A01', 'BLR', 'VTZ', 2, 16, 45, 95, 3700);
  upsert_flight('EA1104', 'EA-A01', 'VTZ', 'BLR', 2, 19, 0, 95, 3700);
  upsert_flight('EA1105', 'EA-A01', 'PNQ', 'BOM', 2, 6, 0, 45, 2200);
  upsert_flight('EA1106', 'EA-A01', 'BOM', 'PNQ', 2, 22, 30, 45, 2200);
  upsert_flight('EA1107', 'EA-A02', 'PNQ', 'DEL', 2, 7, 30, 130, 4700);
  upsert_flight('EA1108', 'EA-A02', 'DEL', 'PNQ', 2, 21, 0, 130, 4700);
  upsert_flight('EA1109', 'EA-A02', 'BOM', 'JLG', 2, 8, 30, 60, 2500);
  upsert_flight('EA1110', 'EA-A02', 'JLG', 'BOM', 2, 10, 15, 60, 2500);
  upsert_flight('EA1111', 'EA-A01', 'PNQ', 'XBA', 2, 15, 0, 35, 1800);
  upsert_flight('EA1112', 'EA-A01', 'XBA', 'PNQ', 2, 16, 15, 35, 1800);
  upsert_flight('EA1113', 'EA-A02', 'PNQ', 'XKA', 2, 17, 30, 55, 2400);
  upsert_flight('EA1114', 'EA-A02', 'XKA', 'PNQ', 2, 19, 15, 55, 2400);
  upsert_flight('EA1115', 'EA-A05', 'NAG', 'XMK', 2, 17, 0, 45, 2100);
  upsert_flight('EA1116', 'EA-A05', 'XMK', 'NAG', 2, 18, 30, 45, 2100);
  upsert_flight('EA1117', 'EA-A01', 'CCU', 'XBO', 2, 8, 0, 50, 2200);
  upsert_flight('EA1118', 'EA-A01', 'XBO', 'CCU', 2, 9, 30, 50, 2200);
  upsert_flight('EA8025', 'EA-A06', 'BOM', 'DXB', 2, 8, 30, 210, 16500);
  upsert_flight('EA8026', 'EA-A06', 'DXB', 'BOM', 2, 13, 30, 210, 16500);
  upsert_flight('EA8027', 'EA-A04', 'CCU', 'BKK', 2, 7, 30, 165, 14000);
  upsert_flight('EA8028', 'EA-A04', 'BKK', 'CCU', 2, 12, 0, 165, 14000);
  upsert_flight('EA8029', 'EA-A06', 'BOM', 'CDG', 2, 2, 0, 580, 46000);
  upsert_flight('EA8030', 'EA-A06', 'CDG', 'BOM', 2, 13, 0, 580, 46000);
  upsert_flight('EA8031', 'EA-A07', 'CCU', 'PVG', 2, 1, 30, 330, 32000);
  upsert_flight('EA8032', 'EA-A07', 'PVG', 'CCU', 2, 9, 0, 330, 32000);
  -- Day +3
  upsert_flight('EA1119', 'EA-A03', 'BOM', 'DEL', 3, 6, 30, 130, 4800);
  upsert_flight('EA1120', 'EA-A03', 'DEL', 'BOM', 3, 10, 0, 130, 4800);
  upsert_flight('EA1121', 'EA-A01', 'BOM', 'BLR', 3, 7, 0, 105, 3800);
  upsert_flight('EA1122', 'EA-A01', 'BLR', 'BOM', 3, 10, 0, 105, 3800);
  upsert_flight('EA1123', 'EA-A03', 'DEL', 'BLR', 3, 13, 15, 165, 5600);
  upsert_flight('EA1124', 'EA-A03', 'BLR', 'DEL', 3, 17, 0, 165, 5600);
  upsert_flight('EA1125', 'EA-A01', 'DEL', 'CCU', 3, 13, 0, 135, 4600);
  upsert_flight('EA1126', 'EA-A01', 'CCU', 'DEL', 3, 16, 15, 135, 4600);
  upsert_flight('EA1127', 'EA-A04', 'DEL', 'HYD', 3, 8, 0, 135, 4500);
  upsert_flight('EA1128', 'EA-A04', 'HYD', 'DEL', 3, 11, 15, 135, 4500);
  upsert_flight('EA1129', 'EA-A04', 'DEL', 'MAA', 3, 14, 30, 170, 5800);
  upsert_flight('EA1130', 'EA-A04', 'MAA', 'DEL', 3, 18, 30, 170, 5800);
  upsert_flight('EA1131', 'EA-A02', 'BOM', 'GOI', 3, 6, 0, 75, 3200);
  upsert_flight('EA1132', 'EA-A02', 'GOI', 'BOM', 3, 21, 0, 75, 3200);
  upsert_flight('EA1133', 'EA-A04', 'DEL', 'BHO', 3, 6, 30, 85, 3300);
  upsert_flight('EA1134', 'EA-A04', 'BHO', 'DEL', 3, 8, 30, 85, 3300);
  upsert_flight('EA1135', 'EA-A01', 'DEL', 'PAT', 3, 6, 45, 95, 3600);
  upsert_flight('EA1136', 'EA-A01', 'PAT', 'DEL', 3, 9, 0, 95, 3600);
  upsert_flight('EA1137', 'EA-A03', 'DEL', 'IXL', 3, 6, 15, 85, 6200);
  upsert_flight('EA1138', 'EA-A03', 'IXL', 'DEL', 3, 8, 30, 85, 6200);
  upsert_flight('EA1139', 'EA-A04', 'DEL', 'RPR', 3, 15, 0, 110, 4100);
  upsert_flight('EA1140', 'EA-A04', 'RPR', 'DEL', 3, 17, 30, 110, 4100);
  upsert_flight('EA1141', 'EA-A01', 'PNQ', 'BOM', 3, 6, 0, 45, 2200);
  upsert_flight('EA1142', 'EA-A01', 'BOM', 'PNQ', 3, 22, 30, 45, 2200);
  upsert_flight('EA1143', 'EA-A05', 'BOM', 'KLH', 3, 10, 0, 55, 2600);
  upsert_flight('EA1144', 'EA-A05', 'KLH', 'BOM', 3, 11, 45, 55, 2600);
  upsert_flight('EA1145', 'EA-A03', 'BOM', 'XBA', 3, 11, 30, 50, 2300);
  upsert_flight('EA1146', 'EA-A03', 'XBA', 'BOM', 3, 13, 0, 50, 2300);
  upsert_flight('EA1147', 'EA-A01', 'PNQ', 'XNI', 3, 17, 15, 35, 1900);
  upsert_flight('EA1148', 'EA-A01', 'XNI', 'PNQ', 3, 18, 30, 35, 1900);
  upsert_flight('EA1149', 'EA-A02', 'HYD', 'XBD', 3, 11, 0, 55, 2400);
  upsert_flight('EA1150', 'EA-A02', 'XBD', 'HYD', 3, 12, 45, 55, 2400);
  upsert_flight('EA1151', 'EA-A04', 'DEL', 'XMR', 3, 12, 30, 75, 2900);
  upsert_flight('EA1152', 'EA-A04', 'XMR', 'DEL', 3, 14, 30, 75, 2900);
  upsert_flight('EA8033', 'EA-A08', 'DEL', 'DXB', 3, 9, 0, 240, 17500);
  upsert_flight('EA8034', 'EA-A08', 'DXB', 'DEL', 3, 14, 30, 240, 17500);
  upsert_flight('EA8035', 'EA-A06', 'BOM', 'SIN', 3, 23, 15, 330, 22000);
  upsert_flight('EA8036', 'EA-A06', 'SIN', 'BOM', 3, 7, 45, 330, 22000);
  upsert_flight('EA8037', 'EA-A04', 'DEL', 'BKK', 3, 18, 0, 250, 16800);
  upsert_flight('EA8038', 'EA-A04', 'BKK', 'DEL', 3, 23, 30, 250, 16800);
  upsert_flight('EA8039', 'EA-A07', 'BLR', 'LAX', 3, 23, 0, 1020, 68000);
  upsert_flight('EA8040', 'EA-A07', 'LAX', 'BLR', 3, 18, 0, 1020, 68000);
  -- Day +4
  upsert_flight('EA1153', 'EA-A03', 'BOM', 'DEL', 4, 6, 30, 130, 4800);
  upsert_flight('EA1154', 'EA-A03', 'DEL', 'BOM', 4, 10, 0, 130, 4800);
  upsert_flight('EA1155', 'EA-A01', 'BOM', 'BLR', 4, 7, 0, 105, 3800);
  upsert_flight('EA1156', 'EA-A01', 'BLR', 'BOM', 4, 10, 0, 105, 3800);
  upsert_flight('EA1157', 'EA-A03', 'DEL', 'BLR', 4, 13, 15, 165, 5600);
  upsert_flight('EA1158', 'EA-A03', 'BLR', 'DEL', 4, 17, 0, 165, 5600);
  upsert_flight('EA1159', 'EA-A02', 'BOM', 'CCU', 4, 8, 15, 155, 5100);
  upsert_flight('EA1160', 'EA-A02', 'CCU', 'BOM', 4, 12, 0, 155, 5100);
  upsert_flight('EA1161', 'EA-A02', 'BOM', 'HYD', 4, 16, 0, 90, 3400);
  upsert_flight('EA1162', 'EA-A02', 'HYD', 'BOM', 4, 18, 30, 90, 3400);
  upsert_flight('EA1163', 'EA-A05', 'BOM', 'MAA', 4, 9, 30, 120, 4200);
  upsert_flight('EA1164', 'EA-A05', 'MAA', 'BOM', 4, 12, 45, 120, 4200);
  upsert_flight('EA1165', 'EA-A02', 'BOM', 'GOI', 4, 6, 0, 75, 3200);
  upsert_flight('EA1166', 'EA-A02', 'GOI', 'BOM', 4, 21, 0, 75, 3200);
  upsert_flight('EA1167', 'EA-A02', 'BOM', 'COK', 4, 13, 30, 115, 4300);
  upsert_flight('EA1168', 'EA-A02', 'COK', 'BOM', 4, 16, 15, 115, 4300);
  upsert_flight('EA1169', 'EA-A03', 'BOM', 'AMD', 4, 7, 0, 70, 2900);
  upsert_flight('EA1170', 'EA-A03', 'AMD', 'BOM', 4, 8, 45, 70, 2900);
  upsert_flight('EA1171', 'EA-A03', 'DEL', 'JAI', 4, 18, 0, 55, 2700);
  upsert_flight('EA1172', 'EA-A03', 'JAI', 'DEL', 4, 19, 30, 55, 2700);
  upsert_flight('EA1173', 'EA-A04', 'DEL', 'GAU', 4, 10, 45, 150, 5400);
  upsert_flight('EA1174', 'EA-A04', 'GAU', 'DEL', 4, 14, 0, 150, 5400);
  upsert_flight('EA1175', 'EA-A05', 'DEL', 'SLV', 4, 7, 15, 60, 3500);
  upsert_flight('EA1176', 'EA-A05', 'SLV', 'DEL', 4, 9, 0, 60, 3500);
  upsert_flight('EA1177', 'EA-A05', 'BOM', 'NAG', 4, 13, 0, 85, 3500);
  upsert_flight('EA1178', 'EA-A05', 'NAG', 'BOM', 4, 15, 15, 85, 3500);
  upsert_flight('EA1179', 'EA-A01', 'BLR', 'VTZ', 4, 16, 45, 95, 3700);
  upsert_flight('EA1180', 'EA-A01', 'VTZ', 'BLR', 4, 19, 0, 95, 3700);
  upsert_flight('EA1181', 'EA-A01', 'PNQ', 'BOM', 4, 6, 0, 45, 2200);
  upsert_flight('EA1182', 'EA-A01', 'BOM', 'PNQ', 4, 22, 30, 45, 2200);
  upsert_flight('EA1183', 'EA-A02', 'PNQ', 'DEL', 4, 7, 30, 130, 4700);
  upsert_flight('EA1184', 'EA-A02', 'DEL', 'PNQ', 4, 21, 0, 130, 4700);
  upsert_flight('EA1185', 'EA-A02', 'BOM', 'JLG', 4, 8, 30, 60, 2500);
  upsert_flight('EA1186', 'EA-A02', 'JLG', 'BOM', 4, 10, 15, 60, 2500);
  upsert_flight('EA1187', 'EA-A01', 'PNQ', 'XBA', 4, 15, 0, 35, 1800);
  upsert_flight('EA1188', 'EA-A01', 'XBA', 'PNQ', 4, 16, 15, 35, 1800);
  upsert_flight('EA1189', 'EA-A02', 'PNQ', 'XKA', 4, 17, 30, 55, 2400);
  upsert_flight('EA1190', 'EA-A02', 'XKA', 'PNQ', 4, 19, 15, 55, 2400);
  upsert_flight('EA1191', 'EA-A05', 'NAG', 'XMK', 4, 17, 0, 45, 2100);
  upsert_flight('EA1192', 'EA-A05', 'XMK', 'NAG', 4, 18, 30, 45, 2100);
  upsert_flight('EA1193', 'EA-A01', 'CCU', 'XBO', 4, 8, 0, 50, 2200);
  upsert_flight('EA1194', 'EA-A01', 'XBO', 'CCU', 4, 9, 30, 50, 2200);
  upsert_flight('EA8041', 'EA-A06', 'BOM', 'DXB', 4, 8, 30, 210, 16500);
  upsert_flight('EA8042', 'EA-A06', 'DXB', 'BOM', 4, 13, 30, 210, 16500);
  upsert_flight('EA8043', 'EA-A08', 'DEL', 'SIN', 4, 22, 30, 345, 23500);
  upsert_flight('EA8044', 'EA-A08', 'SIN', 'DEL', 4, 7, 0, 345, 23500);
  upsert_flight('EA8045', 'EA-A07', 'BLR', 'SIN', 4, 8, 0, 290, 19500);
  upsert_flight('EA8046', 'EA-A07', 'SIN', 'BLR', 4, 14, 30, 290, 19500);
  upsert_flight('EA8047', 'EA-A08', 'DEL', 'YYZ', 4, 22, 0, 960, 65000);
  upsert_flight('EA8048', 'EA-A08', 'YYZ', 'DEL', 4, 16, 0, 960, 65000);
  -- Day +5
  upsert_flight('EA1195', 'EA-A03', 'BOM', 'DEL', 5, 6, 30, 130, 4800);
  upsert_flight('EA1196', 'EA-A03', 'DEL', 'BOM', 5, 10, 0, 130, 4800);
  upsert_flight('EA1197', 'EA-A01', 'BOM', 'BLR', 5, 7, 0, 105, 3800);
  upsert_flight('EA1198', 'EA-A01', 'BLR', 'BOM', 5, 10, 0, 105, 3800);
  upsert_flight('EA1199', 'EA-A03', 'DEL', 'BLR', 5, 13, 15, 165, 5600);
  upsert_flight('EA1200', 'EA-A03', 'BLR', 'DEL', 5, 17, 0, 165, 5600);
  upsert_flight('EA1201', 'EA-A01', 'DEL', 'CCU', 5, 13, 0, 135, 4600);
  upsert_flight('EA1202', 'EA-A01', 'CCU', 'DEL', 5, 16, 15, 135, 4600);
  upsert_flight('EA1203', 'EA-A04', 'DEL', 'HYD', 5, 8, 0, 135, 4500);
  upsert_flight('EA1204', 'EA-A04', 'HYD', 'DEL', 5, 11, 15, 135, 4500);
  upsert_flight('EA1205', 'EA-A04', 'DEL', 'MAA', 5, 14, 30, 170, 5800);
  upsert_flight('EA1206', 'EA-A04', 'MAA', 'DEL', 5, 18, 30, 170, 5800);
  upsert_flight('EA1207', 'EA-A02', 'BOM', 'GOI', 5, 6, 0, 75, 3200);
  upsert_flight('EA1208', 'EA-A02', 'GOI', 'BOM', 5, 21, 0, 75, 3200);
  upsert_flight('EA1209', 'EA-A04', 'DEL', 'BHO', 5, 6, 30, 85, 3300);
  upsert_flight('EA1210', 'EA-A04', 'BHO', 'DEL', 5, 8, 30, 85, 3300);
  upsert_flight('EA1211', 'EA-A01', 'DEL', 'PAT', 5, 6, 45, 95, 3600);
  upsert_flight('EA1212', 'EA-A01', 'PAT', 'DEL', 5, 9, 0, 95, 3600);
  upsert_flight('EA1213', 'EA-A03', 'DEL', 'IXL', 5, 6, 15, 85, 6200);
  upsert_flight('EA1214', 'EA-A03', 'IXL', 'DEL', 5, 8, 30, 85, 6200);
  upsert_flight('EA1215', 'EA-A04', 'DEL', 'RPR', 5, 15, 0, 110, 4100);
  upsert_flight('EA1216', 'EA-A04', 'RPR', 'DEL', 5, 17, 30, 110, 4100);
  upsert_flight('EA1217', 'EA-A01', 'PNQ', 'BOM', 5, 6, 0, 45, 2200);
  upsert_flight('EA1218', 'EA-A01', 'BOM', 'PNQ', 5, 22, 30, 45, 2200);
  upsert_flight('EA1219', 'EA-A05', 'BOM', 'KLH', 5, 10, 0, 55, 2600);
  upsert_flight('EA1220', 'EA-A05', 'KLH', 'BOM', 5, 11, 45, 55, 2600);
  upsert_flight('EA1221', 'EA-A03', 'BOM', 'XBA', 5, 11, 30, 50, 2300);
  upsert_flight('EA1222', 'EA-A03', 'XBA', 'BOM', 5, 13, 0, 50, 2300);
  upsert_flight('EA1223', 'EA-A01', 'PNQ', 'XNI', 5, 17, 15, 35, 1900);
  upsert_flight('EA1224', 'EA-A01', 'XNI', 'PNQ', 5, 18, 30, 35, 1900);
  upsert_flight('EA1225', 'EA-A02', 'HYD', 'XBD', 5, 11, 0, 55, 2400);
  upsert_flight('EA1226', 'EA-A02', 'XBD', 'HYD', 5, 12, 45, 55, 2400);
  upsert_flight('EA1227', 'EA-A04', 'DEL', 'XMR', 5, 12, 30, 75, 2900);
  upsert_flight('EA1228', 'EA-A04', 'XMR', 'DEL', 5, 14, 30, 75, 2900);
  upsert_flight('EA8049', 'EA-A06', 'BOM', 'SIN', 5, 23, 15, 330, 22000);
  upsert_flight('EA8050', 'EA-A06', 'SIN', 'BOM', 5, 7, 45, 330, 22000);
  upsert_flight('EA8051', 'EA-A03', 'MAA', 'SIN', 5, 9, 15, 260, 18000);
  upsert_flight('EA8052', 'EA-A03', 'SIN', 'MAA', 5, 15, 0, 260, 18000);
  upsert_flight('EA8053', 'EA-A07', 'BOM', 'LHR', 5, 2, 30, 570, 48000);
  upsert_flight('EA8054', 'EA-A07', 'LHR', 'BOM', 5, 13, 30, 570, 48000);
  upsert_flight('EA8055', 'EA-A06', 'BOM', 'GIG', 5, 1, 0, 1140, 72000);
  upsert_flight('EA8056', 'EA-A06', 'GIG', 'BOM', 5, 20, 0, 1140, 72000);
  -- Day +6
  upsert_flight('EA1229', 'EA-A03', 'BOM', 'DEL', 6, 6, 30, 130, 4800);
  upsert_flight('EA1230', 'EA-A03', 'DEL', 'BOM', 6, 10, 0, 130, 4800);
  upsert_flight('EA1231', 'EA-A01', 'BOM', 'BLR', 6, 7, 0, 105, 3800);
  upsert_flight('EA1232', 'EA-A01', 'BLR', 'BOM', 6, 10, 0, 105, 3800);
  upsert_flight('EA1233', 'EA-A03', 'DEL', 'BLR', 6, 13, 15, 165, 5600);
  upsert_flight('EA1234', 'EA-A03', 'BLR', 'DEL', 6, 17, 0, 165, 5600);
  upsert_flight('EA1235', 'EA-A02', 'BOM', 'CCU', 6, 8, 15, 155, 5100);
  upsert_flight('EA1236', 'EA-A02', 'CCU', 'BOM', 6, 12, 0, 155, 5100);
  upsert_flight('EA1237', 'EA-A02', 'BOM', 'HYD', 6, 16, 0, 90, 3400);
  upsert_flight('EA1238', 'EA-A02', 'HYD', 'BOM', 6, 18, 30, 90, 3400);
  upsert_flight('EA1239', 'EA-A05', 'BOM', 'MAA', 6, 9, 30, 120, 4200);
  upsert_flight('EA1240', 'EA-A05', 'MAA', 'BOM', 6, 12, 45, 120, 4200);
  upsert_flight('EA1241', 'EA-A02', 'BOM', 'GOI', 6, 6, 0, 75, 3200);
  upsert_flight('EA1242', 'EA-A02', 'GOI', 'BOM', 6, 21, 0, 75, 3200);
  upsert_flight('EA1243', 'EA-A02', 'BOM', 'COK', 6, 13, 30, 115, 4300);
  upsert_flight('EA1244', 'EA-A02', 'COK', 'BOM', 6, 16, 15, 115, 4300);
  upsert_flight('EA1245', 'EA-A03', 'BOM', 'AMD', 6, 7, 0, 70, 2900);
  upsert_flight('EA1246', 'EA-A03', 'AMD', 'BOM', 6, 8, 45, 70, 2900);
  upsert_flight('EA1247', 'EA-A03', 'DEL', 'JAI', 6, 18, 0, 55, 2700);
  upsert_flight('EA1248', 'EA-A03', 'JAI', 'DEL', 6, 19, 30, 55, 2700);
  upsert_flight('EA1249', 'EA-A04', 'DEL', 'GAU', 6, 10, 45, 150, 5400);
  upsert_flight('EA1250', 'EA-A04', 'GAU', 'DEL', 6, 14, 0, 150, 5400);
  upsert_flight('EA1251', 'EA-A05', 'DEL', 'SLV', 6, 7, 15, 60, 3500);
  upsert_flight('EA1252', 'EA-A05', 'SLV', 'DEL', 6, 9, 0, 60, 3500);
  upsert_flight('EA1253', 'EA-A05', 'BOM', 'NAG', 6, 13, 0, 85, 3500);
  upsert_flight('EA1254', 'EA-A05', 'NAG', 'BOM', 6, 15, 15, 85, 3500);
  upsert_flight('EA1255', 'EA-A01', 'BLR', 'VTZ', 6, 16, 45, 95, 3700);
  upsert_flight('EA1256', 'EA-A01', 'VTZ', 'BLR', 6, 19, 0, 95, 3700);
  upsert_flight('EA1257', 'EA-A01', 'PNQ', 'BOM', 6, 6, 0, 45, 2200);
  upsert_flight('EA1258', 'EA-A01', 'BOM', 'PNQ', 6, 22, 30, 45, 2200);
  upsert_flight('EA1259', 'EA-A02', 'PNQ', 'DEL', 6, 7, 30, 130, 4700);
  upsert_flight('EA1260', 'EA-A02', 'DEL', 'PNQ', 6, 21, 0, 130, 4700);
  upsert_flight('EA1261', 'EA-A02', 'BOM', 'JLG', 6, 8, 30, 60, 2500);
  upsert_flight('EA1262', 'EA-A02', 'JLG', 'BOM', 6, 10, 15, 60, 2500);
  upsert_flight('EA1263', 'EA-A01', 'PNQ', 'XBA', 6, 15, 0, 35, 1800);
  upsert_flight('EA1264', 'EA-A01', 'XBA', 'PNQ', 6, 16, 15, 35, 1800);
  upsert_flight('EA1265', 'EA-A02', 'PNQ', 'XKA', 6, 17, 30, 55, 2400);
  upsert_flight('EA1266', 'EA-A02', 'XKA', 'PNQ', 6, 19, 15, 55, 2400);
  upsert_flight('EA1267', 'EA-A05', 'NAG', 'XMK', 6, 17, 0, 45, 2100);
  upsert_flight('EA1268', 'EA-A05', 'XMK', 'NAG', 6, 18, 30, 45, 2100);
  upsert_flight('EA1269', 'EA-A01', 'CCU', 'XBO', 6, 8, 0, 50, 2200);
  upsert_flight('EA1270', 'EA-A01', 'XBO', 'CCU', 6, 9, 30, 50, 2200);
  upsert_flight('EA8057', 'EA-A06', 'BOM', 'DXB', 6, 8, 30, 210, 16500);
  upsert_flight('EA8058', 'EA-A06', 'DXB', 'BOM', 6, 13, 30, 210, 16500);
  upsert_flight('EA8059', 'EA-A08', 'DEL', 'DXB', 6, 9, 0, 240, 17500);
  upsert_flight('EA8060', 'EA-A08', 'DXB', 'DEL', 6, 14, 30, 240, 17500);
  upsert_flight('EA8061', 'EA-A04', 'CCU', 'BKK', 6, 7, 30, 165, 14000);
  upsert_flight('EA8062', 'EA-A04', 'BKK', 'CCU', 6, 12, 0, 165, 14000);
  upsert_flight('EA8063', 'EA-A08', 'DEL', 'LHR', 6, 1, 45, 540, 49500);
  upsert_flight('EA8064', 'EA-A08', 'LHR', 'DEL', 6, 12, 0, 540, 49500);
  upsert_flight('EA8065', 'EA-A08', 'DEL', 'SVO', 6, 3, 30, 390, 38000);
  upsert_flight('EA8066', 'EA-A08', 'SVO', 'DEL', 6, 11, 30, 390, 38000);
  upsert_flight('EA8067', 'EA-A07', 'BOM', 'XCA', 6, 2, 15, 990, 59000);
  upsert_flight('EA8068', 'EA-A07', 'XCA', 'BOM', 6, 17, 30, 990, 59000);
  -- Day +7
  upsert_flight('EA1271', 'EA-A03', 'BOM', 'DEL', 7, 6, 30, 130, 4800);
  upsert_flight('EA1272', 'EA-A03', 'DEL', 'BOM', 7, 10, 0, 130, 4800);
  upsert_flight('EA1273', 'EA-A01', 'BOM', 'BLR', 7, 7, 0, 105, 3800);
  upsert_flight('EA1274', 'EA-A01', 'BLR', 'BOM', 7, 10, 0, 105, 3800);
  upsert_flight('EA1275', 'EA-A03', 'DEL', 'BLR', 7, 13, 15, 165, 5600);
  upsert_flight('EA1276', 'EA-A03', 'BLR', 'DEL', 7, 17, 0, 165, 5600);
  upsert_flight('EA1277', 'EA-A01', 'DEL', 'CCU', 7, 13, 0, 135, 4600);
  upsert_flight('EA1278', 'EA-A01', 'CCU', 'DEL', 7, 16, 15, 135, 4600);
  upsert_flight('EA1279', 'EA-A04', 'DEL', 'HYD', 7, 8, 0, 135, 4500);
  upsert_flight('EA1280', 'EA-A04', 'HYD', 'DEL', 7, 11, 15, 135, 4500);
  upsert_flight('EA1281', 'EA-A04', 'DEL', 'MAA', 7, 14, 30, 170, 5800);
  upsert_flight('EA1282', 'EA-A04', 'MAA', 'DEL', 7, 18, 30, 170, 5800);
  upsert_flight('EA1283', 'EA-A02', 'BOM', 'GOI', 7, 6, 0, 75, 3200);
  upsert_flight('EA1284', 'EA-A02', 'GOI', 'BOM', 7, 21, 0, 75, 3200);
  upsert_flight('EA1285', 'EA-A04', 'DEL', 'BHO', 7, 6, 30, 85, 3300);
  upsert_flight('EA1286', 'EA-A04', 'BHO', 'DEL', 7, 8, 30, 85, 3300);
  upsert_flight('EA1287', 'EA-A01', 'DEL', 'PAT', 7, 6, 45, 95, 3600);
  upsert_flight('EA1288', 'EA-A01', 'PAT', 'DEL', 7, 9, 0, 95, 3600);
  upsert_flight('EA1289', 'EA-A03', 'DEL', 'IXL', 7, 6, 15, 85, 6200);
  upsert_flight('EA1290', 'EA-A03', 'IXL', 'DEL', 7, 8, 30, 85, 6200);
  upsert_flight('EA1291', 'EA-A04', 'DEL', 'RPR', 7, 15, 0, 110, 4100);
  upsert_flight('EA1292', 'EA-A04', 'RPR', 'DEL', 7, 17, 30, 110, 4100);
  upsert_flight('EA1293', 'EA-A01', 'PNQ', 'BOM', 7, 6, 0, 45, 2200);
  upsert_flight('EA1294', 'EA-A01', 'BOM', 'PNQ', 7, 22, 30, 45, 2200);
  upsert_flight('EA1295', 'EA-A05', 'BOM', 'KLH', 7, 10, 0, 55, 2600);
  upsert_flight('EA1296', 'EA-A05', 'KLH', 'BOM', 7, 11, 45, 55, 2600);
  upsert_flight('EA1297', 'EA-A03', 'BOM', 'XBA', 7, 11, 30, 50, 2300);
  upsert_flight('EA1298', 'EA-A03', 'XBA', 'BOM', 7, 13, 0, 50, 2300);
  upsert_flight('EA1299', 'EA-A01', 'PNQ', 'XNI', 7, 17, 15, 35, 1900);
  upsert_flight('EA1300', 'EA-A01', 'XNI', 'PNQ', 7, 18, 30, 35, 1900);
  upsert_flight('EA1301', 'EA-A02', 'HYD', 'XBD', 7, 11, 0, 55, 2400);
  upsert_flight('EA1302', 'EA-A02', 'XBD', 'HYD', 7, 12, 45, 55, 2400);
  upsert_flight('EA1303', 'EA-A04', 'DEL', 'XMR', 7, 12, 30, 75, 2900);
  upsert_flight('EA1304', 'EA-A04', 'XMR', 'DEL', 7, 14, 30, 75, 2900);
  upsert_flight('EA8069', 'EA-A06', 'BOM', 'SIN', 7, 23, 15, 330, 22000);
  upsert_flight('EA8070', 'EA-A06', 'SIN', 'BOM', 7, 7, 45, 330, 22000);
  upsert_flight('EA8071', 'EA-A08', 'DEL', 'SIN', 7, 22, 30, 345, 23500);
  upsert_flight('EA8072', 'EA-A08', 'SIN', 'DEL', 7, 7, 0, 345, 23500);
  upsert_flight('EA8073', 'EA-A04', 'DEL', 'BKK', 7, 18, 0, 250, 16800);
  upsert_flight('EA8074', 'EA-A04', 'BKK', 'DEL', 7, 23, 30, 250, 16800);
  upsert_flight('EA8075', 'EA-A06', 'BOM', 'CDG', 7, 2, 0, 580, 46000);
  upsert_flight('EA8076', 'EA-A06', 'CDG', 'BOM', 7, 13, 0, 580, 46000);
  upsert_flight('EA8077', 'EA-A06', 'DEL', 'PEK', 7, 3, 0, 360, 34000);
  upsert_flight('EA8078', 'EA-A06', 'PEK', 'DEL', 7, 11, 0, 360, 34000);
  upsert_flight('EA8079', 'EA-A08', 'DEL', 'XKS', 7, 23, 15, 450, 39000);
  upsert_flight('EA8080', 'EA-A08', 'XKS', 'DEL', 7, 10, 0, 450, 39000);
  -- Day +8
  upsert_flight('EA1305', 'EA-A03', 'BOM', 'DEL', 8, 6, 30, 130, 4800);
  upsert_flight('EA1306', 'EA-A03', 'DEL', 'BOM', 8, 10, 0, 130, 4800);
  upsert_flight('EA1307', 'EA-A01', 'BOM', 'BLR', 8, 7, 0, 105, 3800);
  upsert_flight('EA1308', 'EA-A01', 'BLR', 'BOM', 8, 10, 0, 105, 3800);
  upsert_flight('EA1309', 'EA-A03', 'DEL', 'BLR', 8, 13, 15, 165, 5600);
  upsert_flight('EA1310', 'EA-A03', 'BLR', 'DEL', 8, 17, 0, 165, 5600);
  upsert_flight('EA1311', 'EA-A02', 'BOM', 'CCU', 8, 8, 15, 155, 5100);
  upsert_flight('EA1312', 'EA-A02', 'CCU', 'BOM', 8, 12, 0, 155, 5100);
  upsert_flight('EA1313', 'EA-A02', 'BOM', 'HYD', 8, 16, 0, 90, 3400);
  upsert_flight('EA1314', 'EA-A02', 'HYD', 'BOM', 8, 18, 30, 90, 3400);
  upsert_flight('EA1315', 'EA-A05', 'BOM', 'MAA', 8, 9, 30, 120, 4200);
  upsert_flight('EA1316', 'EA-A05', 'MAA', 'BOM', 8, 12, 45, 120, 4200);
  upsert_flight('EA1317', 'EA-A02', 'BOM', 'GOI', 8, 6, 0, 75, 3200);
  upsert_flight('EA1318', 'EA-A02', 'GOI', 'BOM', 8, 21, 0, 75, 3200);
  upsert_flight('EA1319', 'EA-A02', 'BOM', 'COK', 8, 13, 30, 115, 4300);
  upsert_flight('EA1320', 'EA-A02', 'COK', 'BOM', 8, 16, 15, 115, 4300);
  upsert_flight('EA1321', 'EA-A03', 'BOM', 'AMD', 8, 7, 0, 70, 2900);
  upsert_flight('EA1322', 'EA-A03', 'AMD', 'BOM', 8, 8, 45, 70, 2900);
  upsert_flight('EA1323', 'EA-A03', 'DEL', 'JAI', 8, 18, 0, 55, 2700);
  upsert_flight('EA1324', 'EA-A03', 'JAI', 'DEL', 8, 19, 30, 55, 2700);
  upsert_flight('EA1325', 'EA-A04', 'DEL', 'GAU', 8, 10, 45, 150, 5400);
  upsert_flight('EA1326', 'EA-A04', 'GAU', 'DEL', 8, 14, 0, 150, 5400);
  upsert_flight('EA1327', 'EA-A05', 'DEL', 'SLV', 8, 7, 15, 60, 3500);
  upsert_flight('EA1328', 'EA-A05', 'SLV', 'DEL', 8, 9, 0, 60, 3500);
  upsert_flight('EA1329', 'EA-A05', 'BOM', 'NAG', 8, 13, 0, 85, 3500);
  upsert_flight('EA1330', 'EA-A05', 'NAG', 'BOM', 8, 15, 15, 85, 3500);
  upsert_flight('EA1331', 'EA-A01', 'BLR', 'VTZ', 8, 16, 45, 95, 3700);
  upsert_flight('EA1332', 'EA-A01', 'VTZ', 'BLR', 8, 19, 0, 95, 3700);
  upsert_flight('EA1333', 'EA-A01', 'PNQ', 'BOM', 8, 6, 0, 45, 2200);
  upsert_flight('EA1334', 'EA-A01', 'BOM', 'PNQ', 8, 22, 30, 45, 2200);
  upsert_flight('EA1335', 'EA-A02', 'PNQ', 'DEL', 8, 7, 30, 130, 4700);
  upsert_flight('EA1336', 'EA-A02', 'DEL', 'PNQ', 8, 21, 0, 130, 4700);
  upsert_flight('EA1337', 'EA-A02', 'BOM', 'JLG', 8, 8, 30, 60, 2500);
  upsert_flight('EA1338', 'EA-A02', 'JLG', 'BOM', 8, 10, 15, 60, 2500);
  upsert_flight('EA1339', 'EA-A01', 'PNQ', 'XBA', 8, 15, 0, 35, 1800);
  upsert_flight('EA1340', 'EA-A01', 'XBA', 'PNQ', 8, 16, 15, 35, 1800);
  upsert_flight('EA1341', 'EA-A02', 'PNQ', 'XKA', 8, 17, 30, 55, 2400);
  upsert_flight('EA1342', 'EA-A02', 'XKA', 'PNQ', 8, 19, 15, 55, 2400);
  upsert_flight('EA1343', 'EA-A05', 'NAG', 'XMK', 8, 17, 0, 45, 2100);
  upsert_flight('EA1344', 'EA-A05', 'XMK', 'NAG', 8, 18, 30, 45, 2100);
  upsert_flight('EA1345', 'EA-A01', 'CCU', 'XBO', 8, 8, 0, 50, 2200);
  upsert_flight('EA1346', 'EA-A01', 'XBO', 'CCU', 8, 9, 30, 50, 2200);
  upsert_flight('EA8081', 'EA-A06', 'BOM', 'DXB', 8, 8, 30, 210, 16500);
  upsert_flight('EA8082', 'EA-A06', 'DXB', 'BOM', 8, 13, 30, 210, 16500);
  upsert_flight('EA8083', 'EA-A07', 'BLR', 'SIN', 8, 8, 0, 290, 19500);
  upsert_flight('EA8084', 'EA-A07', 'SIN', 'BLR', 8, 14, 30, 290, 19500);
  upsert_flight('EA8085', 'EA-A07', 'CCU', 'PVG', 8, 1, 30, 330, 32000);
  upsert_flight('EA8086', 'EA-A07', 'PVG', 'CCU', 8, 9, 0, 330, 32000);
  -- Day +9
  upsert_flight('EA1347', 'EA-A03', 'BOM', 'DEL', 9, 6, 30, 130, 4800);
  upsert_flight('EA1348', 'EA-A03', 'DEL', 'BOM', 9, 10, 0, 130, 4800);
  upsert_flight('EA1349', 'EA-A01', 'BOM', 'BLR', 9, 7, 0, 105, 3800);
  upsert_flight('EA1350', 'EA-A01', 'BLR', 'BOM', 9, 10, 0, 105, 3800);
  upsert_flight('EA1351', 'EA-A03', 'DEL', 'BLR', 9, 13, 15, 165, 5600);
  upsert_flight('EA1352', 'EA-A03', 'BLR', 'DEL', 9, 17, 0, 165, 5600);
  upsert_flight('EA1353', 'EA-A01', 'DEL', 'CCU', 9, 13, 0, 135, 4600);
  upsert_flight('EA1354', 'EA-A01', 'CCU', 'DEL', 9, 16, 15, 135, 4600);
  upsert_flight('EA1355', 'EA-A04', 'DEL', 'HYD', 9, 8, 0, 135, 4500);
  upsert_flight('EA1356', 'EA-A04', 'HYD', 'DEL', 9, 11, 15, 135, 4500);
  upsert_flight('EA1357', 'EA-A04', 'DEL', 'MAA', 9, 14, 30, 170, 5800);
  upsert_flight('EA1358', 'EA-A04', 'MAA', 'DEL', 9, 18, 30, 170, 5800);
  upsert_flight('EA1359', 'EA-A02', 'BOM', 'GOI', 9, 6, 0, 75, 3200);
  upsert_flight('EA1360', 'EA-A02', 'GOI', 'BOM', 9, 21, 0, 75, 3200);
  upsert_flight('EA1361', 'EA-A04', 'DEL', 'BHO', 9, 6, 30, 85, 3300);
  upsert_flight('EA1362', 'EA-A04', 'BHO', 'DEL', 9, 8, 30, 85, 3300);
  upsert_flight('EA1363', 'EA-A01', 'DEL', 'PAT', 9, 6, 45, 95, 3600);
  upsert_flight('EA1364', 'EA-A01', 'PAT', 'DEL', 9, 9, 0, 95, 3600);
  upsert_flight('EA1365', 'EA-A03', 'DEL', 'IXL', 9, 6, 15, 85, 6200);
  upsert_flight('EA1366', 'EA-A03', 'IXL', 'DEL', 9, 8, 30, 85, 6200);
  upsert_flight('EA1367', 'EA-A04', 'DEL', 'RPR', 9, 15, 0, 110, 4100);
  upsert_flight('EA1368', 'EA-A04', 'RPR', 'DEL', 9, 17, 30, 110, 4100);
  upsert_flight('EA1369', 'EA-A01', 'PNQ', 'BOM', 9, 6, 0, 45, 2200);
  upsert_flight('EA1370', 'EA-A01', 'BOM', 'PNQ', 9, 22, 30, 45, 2200);
  upsert_flight('EA1371', 'EA-A05', 'BOM', 'KLH', 9, 10, 0, 55, 2600);
  upsert_flight('EA1372', 'EA-A05', 'KLH', 'BOM', 9, 11, 45, 55, 2600);
  upsert_flight('EA1373', 'EA-A03', 'BOM', 'XBA', 9, 11, 30, 50, 2300);
  upsert_flight('EA1374', 'EA-A03', 'XBA', 'BOM', 9, 13, 0, 50, 2300);
  upsert_flight('EA1375', 'EA-A01', 'PNQ', 'XNI', 9, 17, 15, 35, 1900);
  upsert_flight('EA1376', 'EA-A01', 'XNI', 'PNQ', 9, 18, 30, 35, 1900);
  upsert_flight('EA1377', 'EA-A02', 'HYD', 'XBD', 9, 11, 0, 55, 2400);
  upsert_flight('EA1378', 'EA-A02', 'XBD', 'HYD', 9, 12, 45, 55, 2400);
  upsert_flight('EA1379', 'EA-A04', 'DEL', 'XMR', 9, 12, 30, 75, 2900);
  upsert_flight('EA1380', 'EA-A04', 'XMR', 'DEL', 9, 14, 30, 75, 2900);
  upsert_flight('EA8087', 'EA-A08', 'DEL', 'DXB', 9, 9, 0, 240, 17500);
  upsert_flight('EA8088', 'EA-A08', 'DXB', 'DEL', 9, 14, 30, 240, 17500);
  upsert_flight('EA8089', 'EA-A06', 'BOM', 'SIN', 9, 23, 15, 330, 22000);
  upsert_flight('EA8090', 'EA-A06', 'SIN', 'BOM', 9, 7, 45, 330, 22000);
  upsert_flight('EA8091', 'EA-A03', 'MAA', 'SIN', 9, 9, 15, 260, 18000);
  upsert_flight('EA8092', 'EA-A03', 'SIN', 'MAA', 9, 15, 0, 260, 18000);
  upsert_flight('EA8093', 'EA-A07', 'BLR', 'LAX', 9, 23, 0, 1020, 68000);
  upsert_flight('EA8094', 'EA-A07', 'LAX', 'BLR', 9, 18, 0, 1020, 68000);
  -- Day +10
  upsert_flight('EA1381', 'EA-A03', 'BOM', 'DEL', 10, 6, 30, 130, 4800);
  upsert_flight('EA1382', 'EA-A03', 'DEL', 'BOM', 10, 10, 0, 130, 4800);
  upsert_flight('EA1383', 'EA-A01', 'BOM', 'BLR', 10, 7, 0, 105, 3800);
  upsert_flight('EA1384', 'EA-A01', 'BLR', 'BOM', 10, 10, 0, 105, 3800);
  upsert_flight('EA1385', 'EA-A03', 'DEL', 'BLR', 10, 13, 15, 165, 5600);
  upsert_flight('EA1386', 'EA-A03', 'BLR', 'DEL', 10, 17, 0, 165, 5600);
  upsert_flight('EA1387', 'EA-A02', 'BOM', 'CCU', 10, 8, 15, 155, 5100);
  upsert_flight('EA1388', 'EA-A02', 'CCU', 'BOM', 10, 12, 0, 155, 5100);
  upsert_flight('EA1389', 'EA-A02', 'BOM', 'HYD', 10, 16, 0, 90, 3400);
  upsert_flight('EA1390', 'EA-A02', 'HYD', 'BOM', 10, 18, 30, 90, 3400);
  upsert_flight('EA1391', 'EA-A05', 'BOM', 'MAA', 10, 9, 30, 120, 4200);
  upsert_flight('EA1392', 'EA-A05', 'MAA', 'BOM', 10, 12, 45, 120, 4200);
  upsert_flight('EA1393', 'EA-A02', 'BOM', 'GOI', 10, 6, 0, 75, 3200);
  upsert_flight('EA1394', 'EA-A02', 'GOI', 'BOM', 10, 21, 0, 75, 3200);
  upsert_flight('EA1395', 'EA-A02', 'BOM', 'COK', 10, 13, 30, 115, 4300);
  upsert_flight('EA1396', 'EA-A02', 'COK', 'BOM', 10, 16, 15, 115, 4300);
  upsert_flight('EA1397', 'EA-A03', 'BOM', 'AMD', 10, 7, 0, 70, 2900);
  upsert_flight('EA1398', 'EA-A03', 'AMD', 'BOM', 10, 8, 45, 70, 2900);
  upsert_flight('EA1399', 'EA-A03', 'DEL', 'JAI', 10, 18, 0, 55, 2700);
  upsert_flight('EA1400', 'EA-A03', 'JAI', 'DEL', 10, 19, 30, 55, 2700);
  upsert_flight('EA1401', 'EA-A04', 'DEL', 'GAU', 10, 10, 45, 150, 5400);
  upsert_flight('EA1402', 'EA-A04', 'GAU', 'DEL', 10, 14, 0, 150, 5400);
  upsert_flight('EA1403', 'EA-A05', 'DEL', 'SLV', 10, 7, 15, 60, 3500);
  upsert_flight('EA1404', 'EA-A05', 'SLV', 'DEL', 10, 9, 0, 60, 3500);
  upsert_flight('EA1405', 'EA-A05', 'BOM', 'NAG', 10, 13, 0, 85, 3500);
  upsert_flight('EA1406', 'EA-A05', 'NAG', 'BOM', 10, 15, 15, 85, 3500);
  upsert_flight('EA1407', 'EA-A01', 'BLR', 'VTZ', 10, 16, 45, 95, 3700);
  upsert_flight('EA1408', 'EA-A01', 'VTZ', 'BLR', 10, 19, 0, 95, 3700);
  upsert_flight('EA1409', 'EA-A01', 'PNQ', 'BOM', 10, 6, 0, 45, 2200);
  upsert_flight('EA1410', 'EA-A01', 'BOM', 'PNQ', 10, 22, 30, 45, 2200);
  upsert_flight('EA1411', 'EA-A02', 'PNQ', 'DEL', 10, 7, 30, 130, 4700);
  upsert_flight('EA1412', 'EA-A02', 'DEL', 'PNQ', 10, 21, 0, 130, 4700);
  upsert_flight('EA1413', 'EA-A02', 'BOM', 'JLG', 10, 8, 30, 60, 2500);
  upsert_flight('EA1414', 'EA-A02', 'JLG', 'BOM', 10, 10, 15, 60, 2500);
  upsert_flight('EA1415', 'EA-A01', 'PNQ', 'XBA', 10, 15, 0, 35, 1800);
  upsert_flight('EA1416', 'EA-A01', 'XBA', 'PNQ', 10, 16, 15, 35, 1800);
  upsert_flight('EA1417', 'EA-A02', 'PNQ', 'XKA', 10, 17, 30, 55, 2400);
  upsert_flight('EA1418', 'EA-A02', 'XKA', 'PNQ', 10, 19, 15, 55, 2400);
  upsert_flight('EA1419', 'EA-A05', 'NAG', 'XMK', 10, 17, 0, 45, 2100);
  upsert_flight('EA1420', 'EA-A05', 'XMK', 'NAG', 10, 18, 30, 45, 2100);
  upsert_flight('EA1421', 'EA-A01', 'CCU', 'XBO', 10, 8, 0, 50, 2200);
  upsert_flight('EA1422', 'EA-A01', 'XBO', 'CCU', 10, 9, 30, 50, 2200);
  upsert_flight('EA8095', 'EA-A06', 'BOM', 'DXB', 10, 8, 30, 210, 16500);
  upsert_flight('EA8096', 'EA-A06', 'DXB', 'BOM', 10, 13, 30, 210, 16500);
  upsert_flight('EA8097', 'EA-A08', 'DEL', 'SIN', 10, 22, 30, 345, 23500);
  upsert_flight('EA8098', 'EA-A08', 'SIN', 'DEL', 10, 7, 0, 345, 23500);
  upsert_flight('EA8099', 'EA-A04', 'CCU', 'BKK', 10, 7, 30, 165, 14000);
  upsert_flight('EA8100', 'EA-A04', 'BKK', 'CCU', 10, 12, 0, 165, 14000);
  upsert_flight('EA8101', 'EA-A07', 'BOM', 'LHR', 10, 2, 30, 570, 48000);
  upsert_flight('EA8102', 'EA-A07', 'LHR', 'BOM', 10, 13, 30, 570, 48000);
  upsert_flight('EA8103', 'EA-A08', 'DEL', 'YYZ', 10, 22, 0, 960, 65000);
  upsert_flight('EA8104', 'EA-A08', 'YYZ', 'DEL', 10, 16, 0, 960, 65000);
  -- Day +11
  upsert_flight('EA1423', 'EA-A03', 'BOM', 'DEL', 11, 6, 30, 130, 4800);
  upsert_flight('EA1424', 'EA-A03', 'DEL', 'BOM', 11, 10, 0, 130, 4800);
  upsert_flight('EA1425', 'EA-A01', 'BOM', 'BLR', 11, 7, 0, 105, 3800);
  upsert_flight('EA1426', 'EA-A01', 'BLR', 'BOM', 11, 10, 0, 105, 3800);
  upsert_flight('EA1427', 'EA-A03', 'DEL', 'BLR', 11, 13, 15, 165, 5600);
  upsert_flight('EA1428', 'EA-A03', 'BLR', 'DEL', 11, 17, 0, 165, 5600);
  upsert_flight('EA1429', 'EA-A01', 'DEL', 'CCU', 11, 13, 0, 135, 4600);
  upsert_flight('EA1430', 'EA-A01', 'CCU', 'DEL', 11, 16, 15, 135, 4600);
  upsert_flight('EA1431', 'EA-A04', 'DEL', 'HYD', 11, 8, 0, 135, 4500);
  upsert_flight('EA1432', 'EA-A04', 'HYD', 'DEL', 11, 11, 15, 135, 4500);
  upsert_flight('EA1433', 'EA-A04', 'DEL', 'MAA', 11, 14, 30, 170, 5800);
  upsert_flight('EA1434', 'EA-A04', 'MAA', 'DEL', 11, 18, 30, 170, 5800);
  upsert_flight('EA1435', 'EA-A02', 'BOM', 'GOI', 11, 6, 0, 75, 3200);
  upsert_flight('EA1436', 'EA-A02', 'GOI', 'BOM', 11, 21, 0, 75, 3200);
  upsert_flight('EA1437', 'EA-A04', 'DEL', 'BHO', 11, 6, 30, 85, 3300);
  upsert_flight('EA1438', 'EA-A04', 'BHO', 'DEL', 11, 8, 30, 85, 3300);
  upsert_flight('EA1439', 'EA-A01', 'DEL', 'PAT', 11, 6, 45, 95, 3600);
  upsert_flight('EA1440', 'EA-A01', 'PAT', 'DEL', 11, 9, 0, 95, 3600);
  upsert_flight('EA1441', 'EA-A03', 'DEL', 'IXL', 11, 6, 15, 85, 6200);
  upsert_flight('EA1442', 'EA-A03', 'IXL', 'DEL', 11, 8, 30, 85, 6200);
  upsert_flight('EA1443', 'EA-A04', 'DEL', 'RPR', 11, 15, 0, 110, 4100);
  upsert_flight('EA1444', 'EA-A04', 'RPR', 'DEL', 11, 17, 30, 110, 4100);
  upsert_flight('EA1445', 'EA-A01', 'PNQ', 'BOM', 11, 6, 0, 45, 2200);
  upsert_flight('EA1446', 'EA-A01', 'BOM', 'PNQ', 11, 22, 30, 45, 2200);
  upsert_flight('EA1447', 'EA-A05', 'BOM', 'KLH', 11, 10, 0, 55, 2600);
  upsert_flight('EA1448', 'EA-A05', 'KLH', 'BOM', 11, 11, 45, 55, 2600);
  upsert_flight('EA1449', 'EA-A03', 'BOM', 'XBA', 11, 11, 30, 50, 2300);
  upsert_flight('EA1450', 'EA-A03', 'XBA', 'BOM', 11, 13, 0, 50, 2300);
  upsert_flight('EA1451', 'EA-A01', 'PNQ', 'XNI', 11, 17, 15, 35, 1900);
  upsert_flight('EA1452', 'EA-A01', 'XNI', 'PNQ', 11, 18, 30, 35, 1900);
  upsert_flight('EA1453', 'EA-A02', 'HYD', 'XBD', 11, 11, 0, 55, 2400);
  upsert_flight('EA1454', 'EA-A02', 'XBD', 'HYD', 11, 12, 45, 55, 2400);
  upsert_flight('EA1455', 'EA-A04', 'DEL', 'XMR', 11, 12, 30, 75, 2900);
  upsert_flight('EA1456', 'EA-A04', 'XMR', 'DEL', 11, 14, 30, 75, 2900);
  upsert_flight('EA8105', 'EA-A06', 'BOM', 'SIN', 11, 23, 15, 330, 22000);
  upsert_flight('EA8106', 'EA-A06', 'SIN', 'BOM', 11, 7, 45, 330, 22000);
  upsert_flight('EA8107', 'EA-A04', 'DEL', 'BKK', 11, 18, 0, 250, 16800);
  upsert_flight('EA8108', 'EA-A04', 'BKK', 'DEL', 11, 23, 30, 250, 16800);
  upsert_flight('EA8109', 'EA-A08', 'DEL', 'LHR', 11, 1, 45, 540, 49500);
  upsert_flight('EA8110', 'EA-A08', 'LHR', 'DEL', 11, 12, 0, 540, 49500);
  upsert_flight('EA8111', 'EA-A06', 'BOM', 'GIG', 11, 1, 0, 1140, 72000);
  upsert_flight('EA8112', 'EA-A06', 'GIG', 'BOM', 11, 20, 0, 1140, 72000);
  -- Day +12
  upsert_flight('EA1457', 'EA-A03', 'BOM', 'DEL', 12, 6, 30, 130, 4800);
  upsert_flight('EA1458', 'EA-A03', 'DEL', 'BOM', 12, 10, 0, 130, 4800);
  upsert_flight('EA1459', 'EA-A01', 'BOM', 'BLR', 12, 7, 0, 105, 3800);
  upsert_flight('EA1460', 'EA-A01', 'BLR', 'BOM', 12, 10, 0, 105, 3800);
  upsert_flight('EA1461', 'EA-A03', 'DEL', 'BLR', 12, 13, 15, 165, 5600);
  upsert_flight('EA1462', 'EA-A03', 'BLR', 'DEL', 12, 17, 0, 165, 5600);
  upsert_flight('EA1463', 'EA-A02', 'BOM', 'CCU', 12, 8, 15, 155, 5100);
  upsert_flight('EA1464', 'EA-A02', 'CCU', 'BOM', 12, 12, 0, 155, 5100);
  upsert_flight('EA1465', 'EA-A02', 'BOM', 'HYD', 12, 16, 0, 90, 3400);
  upsert_flight('EA1466', 'EA-A02', 'HYD', 'BOM', 12, 18, 30, 90, 3400);
  upsert_flight('EA1467', 'EA-A05', 'BOM', 'MAA', 12, 9, 30, 120, 4200);
  upsert_flight('EA1468', 'EA-A05', 'MAA', 'BOM', 12, 12, 45, 120, 4200);
  upsert_flight('EA1469', 'EA-A02', 'BOM', 'GOI', 12, 6, 0, 75, 3200);
  upsert_flight('EA1470', 'EA-A02', 'GOI', 'BOM', 12, 21, 0, 75, 3200);
  upsert_flight('EA1471', 'EA-A02', 'BOM', 'COK', 12, 13, 30, 115, 4300);
  upsert_flight('EA1472', 'EA-A02', 'COK', 'BOM', 12, 16, 15, 115, 4300);
  upsert_flight('EA1473', 'EA-A03', 'BOM', 'AMD', 12, 7, 0, 70, 2900);
  upsert_flight('EA1474', 'EA-A03', 'AMD', 'BOM', 12, 8, 45, 70, 2900);
  upsert_flight('EA1475', 'EA-A03', 'DEL', 'JAI', 12, 18, 0, 55, 2700);
  upsert_flight('EA1476', 'EA-A03', 'JAI', 'DEL', 12, 19, 30, 55, 2700);
  upsert_flight('EA1477', 'EA-A04', 'DEL', 'GAU', 12, 10, 45, 150, 5400);
  upsert_flight('EA1478', 'EA-A04', 'GAU', 'DEL', 12, 14, 0, 150, 5400);
  upsert_flight('EA1479', 'EA-A05', 'DEL', 'SLV', 12, 7, 15, 60, 3500);
  upsert_flight('EA1480', 'EA-A05', 'SLV', 'DEL', 12, 9, 0, 60, 3500);
  upsert_flight('EA1481', 'EA-A05', 'BOM', 'NAG', 12, 13, 0, 85, 3500);
  upsert_flight('EA1482', 'EA-A05', 'NAG', 'BOM', 12, 15, 15, 85, 3500);
  upsert_flight('EA1483', 'EA-A01', 'BLR', 'VTZ', 12, 16, 45, 95, 3700);
  upsert_flight('EA1484', 'EA-A01', 'VTZ', 'BLR', 12, 19, 0, 95, 3700);
  upsert_flight('EA1485', 'EA-A01', 'PNQ', 'BOM', 12, 6, 0, 45, 2200);
  upsert_flight('EA1486', 'EA-A01', 'BOM', 'PNQ', 12, 22, 30, 45, 2200);
  upsert_flight('EA1487', 'EA-A02', 'PNQ', 'DEL', 12, 7, 30, 130, 4700);
  upsert_flight('EA1488', 'EA-A02', 'DEL', 'PNQ', 12, 21, 0, 130, 4700);
  upsert_flight('EA1489', 'EA-A02', 'BOM', 'JLG', 12, 8, 30, 60, 2500);
  upsert_flight('EA1490', 'EA-A02', 'JLG', 'BOM', 12, 10, 15, 60, 2500);
  upsert_flight('EA1491', 'EA-A01', 'PNQ', 'XBA', 12, 15, 0, 35, 1800);
  upsert_flight('EA1492', 'EA-A01', 'XBA', 'PNQ', 12, 16, 15, 35, 1800);
  upsert_flight('EA1493', 'EA-A02', 'PNQ', 'XKA', 12, 17, 30, 55, 2400);
  upsert_flight('EA1494', 'EA-A02', 'XKA', 'PNQ', 12, 19, 15, 55, 2400);
  upsert_flight('EA1495', 'EA-A05', 'NAG', 'XMK', 12, 17, 0, 45, 2100);
  upsert_flight('EA1496', 'EA-A05', 'XMK', 'NAG', 12, 18, 30, 45, 2100);
  upsert_flight('EA1497', 'EA-A01', 'CCU', 'XBO', 12, 8, 0, 50, 2200);
  upsert_flight('EA1498', 'EA-A01', 'XBO', 'CCU', 12, 9, 30, 50, 2200);
  upsert_flight('EA8113', 'EA-A06', 'BOM', 'DXB', 12, 8, 30, 210, 16500);
  upsert_flight('EA8114', 'EA-A06', 'DXB', 'BOM', 12, 13, 30, 210, 16500);
  upsert_flight('EA8115', 'EA-A08', 'DEL', 'DXB', 12, 9, 0, 240, 17500);
  upsert_flight('EA8116', 'EA-A08', 'DXB', 'DEL', 12, 14, 30, 240, 17500);
  upsert_flight('EA8117', 'EA-A07', 'BLR', 'SIN', 12, 8, 0, 290, 19500);
  upsert_flight('EA8118', 'EA-A07', 'SIN', 'BLR', 12, 14, 30, 290, 19500);
  upsert_flight('EA8119', 'EA-A06', 'BOM', 'CDG', 12, 2, 0, 580, 46000);
  upsert_flight('EA8120', 'EA-A06', 'CDG', 'BOM', 12, 13, 0, 580, 46000);
  upsert_flight('EA8121', 'EA-A08', 'DEL', 'SVO', 12, 3, 30, 390, 38000);
  upsert_flight('EA8122', 'EA-A08', 'SVO', 'DEL', 12, 11, 30, 390, 38000);
  upsert_flight('EA8123', 'EA-A07', 'BOM', 'XCA', 12, 2, 15, 990, 59000);
  upsert_flight('EA8124', 'EA-A07', 'XCA', 'BOM', 12, 17, 30, 990, 59000);
  -- Day +13
  upsert_flight('EA1499', 'EA-A03', 'BOM', 'DEL', 13, 6, 30, 130, 4800);
  upsert_flight('EA1500', 'EA-A03', 'DEL', 'BOM', 13, 10, 0, 130, 4800);
  upsert_flight('EA1501', 'EA-A01', 'BOM', 'BLR', 13, 7, 0, 105, 3800);
  upsert_flight('EA1502', 'EA-A01', 'BLR', 'BOM', 13, 10, 0, 105, 3800);
  upsert_flight('EA1503', 'EA-A03', 'DEL', 'BLR', 13, 13, 15, 165, 5600);
  upsert_flight('EA1504', 'EA-A03', 'BLR', 'DEL', 13, 17, 0, 165, 5600);
  upsert_flight('EA1505', 'EA-A01', 'DEL', 'CCU', 13, 13, 0, 135, 4600);
  upsert_flight('EA1506', 'EA-A01', 'CCU', 'DEL', 13, 16, 15, 135, 4600);
  upsert_flight('EA1507', 'EA-A04', 'DEL', 'HYD', 13, 8, 0, 135, 4500);
  upsert_flight('EA1508', 'EA-A04', 'HYD', 'DEL', 13, 11, 15, 135, 4500);
  upsert_flight('EA1509', 'EA-A04', 'DEL', 'MAA', 13, 14, 30, 170, 5800);
  upsert_flight('EA1510', 'EA-A04', 'MAA', 'DEL', 13, 18, 30, 170, 5800);
  upsert_flight('EA1511', 'EA-A02', 'BOM', 'GOI', 13, 6, 0, 75, 3200);
  upsert_flight('EA1512', 'EA-A02', 'GOI', 'BOM', 13, 21, 0, 75, 3200);
  upsert_flight('EA1513', 'EA-A04', 'DEL', 'BHO', 13, 6, 30, 85, 3300);
  upsert_flight('EA1514', 'EA-A04', 'BHO', 'DEL', 13, 8, 30, 85, 3300);
  upsert_flight('EA1515', 'EA-A01', 'DEL', 'PAT', 13, 6, 45, 95, 3600);
  upsert_flight('EA1516', 'EA-A01', 'PAT', 'DEL', 13, 9, 0, 95, 3600);
  upsert_flight('EA1517', 'EA-A03', 'DEL', 'IXL', 13, 6, 15, 85, 6200);
  upsert_flight('EA1518', 'EA-A03', 'IXL', 'DEL', 13, 8, 30, 85, 6200);
  upsert_flight('EA1519', 'EA-A04', 'DEL', 'RPR', 13, 15, 0, 110, 4100);
  upsert_flight('EA1520', 'EA-A04', 'RPR', 'DEL', 13, 17, 30, 110, 4100);
  upsert_flight('EA1521', 'EA-A01', 'PNQ', 'BOM', 13, 6, 0, 45, 2200);
  upsert_flight('EA1522', 'EA-A01', 'BOM', 'PNQ', 13, 22, 30, 45, 2200);
  upsert_flight('EA1523', 'EA-A05', 'BOM', 'KLH', 13, 10, 0, 55, 2600);
  upsert_flight('EA1524', 'EA-A05', 'KLH', 'BOM', 13, 11, 45, 55, 2600);
  upsert_flight('EA1525', 'EA-A03', 'BOM', 'XBA', 13, 11, 30, 50, 2300);
  upsert_flight('EA1526', 'EA-A03', 'XBA', 'BOM', 13, 13, 0, 50, 2300);
  upsert_flight('EA1527', 'EA-A01', 'PNQ', 'XNI', 13, 17, 15, 35, 1900);
  upsert_flight('EA1528', 'EA-A01', 'XNI', 'PNQ', 13, 18, 30, 35, 1900);
  upsert_flight('EA1529', 'EA-A02', 'HYD', 'XBD', 13, 11, 0, 55, 2400);
  upsert_flight('EA1530', 'EA-A02', 'XBD', 'HYD', 13, 12, 45, 55, 2400);
  upsert_flight('EA1531', 'EA-A04', 'DEL', 'XMR', 13, 12, 30, 75, 2900);
  upsert_flight('EA1532', 'EA-A04', 'XMR', 'DEL', 13, 14, 30, 75, 2900);
  upsert_flight('EA8125', 'EA-A06', 'BOM', 'SIN', 13, 23, 15, 330, 22000);
  upsert_flight('EA8126', 'EA-A06', 'SIN', 'BOM', 13, 7, 45, 330, 22000);
  upsert_flight('EA8127', 'EA-A08', 'DEL', 'SIN', 13, 22, 30, 345, 23500);
  upsert_flight('EA8128', 'EA-A08', 'SIN', 'DEL', 13, 7, 0, 345, 23500);
  upsert_flight('EA8129', 'EA-A03', 'MAA', 'SIN', 13, 9, 15, 260, 18000);
  upsert_flight('EA8130', 'EA-A03', 'SIN', 'MAA', 13, 15, 0, 260, 18000);
  upsert_flight('EA8131', 'EA-A06', 'DEL', 'PEK', 13, 3, 0, 360, 34000);
  upsert_flight('EA8132', 'EA-A06', 'PEK', 'DEL', 13, 11, 0, 360, 34000);
  upsert_flight('EA8133', 'EA-A08', 'DEL', 'XKS', 13, 23, 15, 450, 39000);
  upsert_flight('EA8134', 'EA-A08', 'XKS', 'DEL', 13, 10, 0, 450, 39000);
  -- Day +14
  upsert_flight('EA1533', 'EA-A03', 'BOM', 'DEL', 14, 6, 30, 130, 4800);
  upsert_flight('EA1534', 'EA-A03', 'DEL', 'BOM', 14, 10, 0, 130, 4800);
  upsert_flight('EA1535', 'EA-A01', 'BOM', 'BLR', 14, 7, 0, 105, 3800);
  upsert_flight('EA1536', 'EA-A01', 'BLR', 'BOM', 14, 10, 0, 105, 3800);
  upsert_flight('EA1537', 'EA-A03', 'DEL', 'BLR', 14, 13, 15, 165, 5600);
  upsert_flight('EA1538', 'EA-A03', 'BLR', 'DEL', 14, 17, 0, 165, 5600);
  upsert_flight('EA1539', 'EA-A02', 'BOM', 'CCU', 14, 8, 15, 155, 5100);
  upsert_flight('EA1540', 'EA-A02', 'CCU', 'BOM', 14, 12, 0, 155, 5100);
  upsert_flight('EA1541', 'EA-A02', 'BOM', 'HYD', 14, 16, 0, 90, 3400);
  upsert_flight('EA1542', 'EA-A02', 'HYD', 'BOM', 14, 18, 30, 90, 3400);
  upsert_flight('EA1543', 'EA-A05', 'BOM', 'MAA', 14, 9, 30, 120, 4200);
  upsert_flight('EA1544', 'EA-A05', 'MAA', 'BOM', 14, 12, 45, 120, 4200);
  upsert_flight('EA1545', 'EA-A02', 'BOM', 'GOI', 14, 6, 0, 75, 3200);
  upsert_flight('EA1546', 'EA-A02', 'GOI', 'BOM', 14, 21, 0, 75, 3200);
  upsert_flight('EA1547', 'EA-A02', 'BOM', 'COK', 14, 13, 30, 115, 4300);
  upsert_flight('EA1548', 'EA-A02', 'COK', 'BOM', 14, 16, 15, 115, 4300);
  upsert_flight('EA1549', 'EA-A03', 'BOM', 'AMD', 14, 7, 0, 70, 2900);
  upsert_flight('EA1550', 'EA-A03', 'AMD', 'BOM', 14, 8, 45, 70, 2900);
  upsert_flight('EA1551', 'EA-A03', 'DEL', 'JAI', 14, 18, 0, 55, 2700);
  upsert_flight('EA1552', 'EA-A03', 'JAI', 'DEL', 14, 19, 30, 55, 2700);
  upsert_flight('EA1553', 'EA-A04', 'DEL', 'GAU', 14, 10, 45, 150, 5400);
  upsert_flight('EA1554', 'EA-A04', 'GAU', 'DEL', 14, 14, 0, 150, 5400);
  upsert_flight('EA1555', 'EA-A05', 'DEL', 'SLV', 14, 7, 15, 60, 3500);
  upsert_flight('EA1556', 'EA-A05', 'SLV', 'DEL', 14, 9, 0, 60, 3500);
  upsert_flight('EA1557', 'EA-A05', 'BOM', 'NAG', 14, 13, 0, 85, 3500);
  upsert_flight('EA1558', 'EA-A05', 'NAG', 'BOM', 14, 15, 15, 85, 3500);
  upsert_flight('EA1559', 'EA-A01', 'BLR', 'VTZ', 14, 16, 45, 95, 3700);
  upsert_flight('EA1560', 'EA-A01', 'VTZ', 'BLR', 14, 19, 0, 95, 3700);
  upsert_flight('EA1561', 'EA-A01', 'PNQ', 'BOM', 14, 6, 0, 45, 2200);
  upsert_flight('EA1562', 'EA-A01', 'BOM', 'PNQ', 14, 22, 30, 45, 2200);
  upsert_flight('EA1563', 'EA-A02', 'PNQ', 'DEL', 14, 7, 30, 130, 4700);
  upsert_flight('EA1564', 'EA-A02', 'DEL', 'PNQ', 14, 21, 0, 130, 4700);
  upsert_flight('EA1565', 'EA-A02', 'BOM', 'JLG', 14, 8, 30, 60, 2500);
  upsert_flight('EA1566', 'EA-A02', 'JLG', 'BOM', 14, 10, 15, 60, 2500);
  upsert_flight('EA1567', 'EA-A01', 'PNQ', 'XBA', 14, 15, 0, 35, 1800);
  upsert_flight('EA1568', 'EA-A01', 'XBA', 'PNQ', 14, 16, 15, 35, 1800);
  upsert_flight('EA1569', 'EA-A02', 'PNQ', 'XKA', 14, 17, 30, 55, 2400);
  upsert_flight('EA1570', 'EA-A02', 'XKA', 'PNQ', 14, 19, 15, 55, 2400);
  upsert_flight('EA1571', 'EA-A05', 'NAG', 'XMK', 14, 17, 0, 45, 2100);
  upsert_flight('EA1572', 'EA-A05', 'XMK', 'NAG', 14, 18, 30, 45, 2100);
  upsert_flight('EA1573', 'EA-A01', 'CCU', 'XBO', 14, 8, 0, 50, 2200);
  upsert_flight('EA1574', 'EA-A01', 'XBO', 'CCU', 14, 9, 30, 50, 2200);
  upsert_flight('EA8135', 'EA-A06', 'BOM', 'DXB', 14, 8, 30, 210, 16500);
  upsert_flight('EA8136', 'EA-A06', 'DXB', 'BOM', 14, 13, 30, 210, 16500);
  upsert_flight('EA8137', 'EA-A04', 'CCU', 'BKK', 14, 7, 30, 165, 14000);
  upsert_flight('EA8138', 'EA-A04', 'BKK', 'CCU', 14, 12, 0, 165, 14000);
  upsert_flight('EA8139', 'EA-A07', 'CCU', 'PVG', 14, 1, 30, 330, 32000);
  upsert_flight('EA8140', 'EA-A07', 'PVG', 'CCU', 14, 9, 0, 330, 32000);
  -- Day +15
  upsert_flight('EA1575', 'EA-A03', 'BOM', 'DEL', 15, 6, 30, 130, 4800);
  upsert_flight('EA1576', 'EA-A03', 'DEL', 'BOM', 15, 10, 0, 130, 4800);
  upsert_flight('EA1577', 'EA-A01', 'BOM', 'BLR', 15, 7, 0, 105, 3800);
  upsert_flight('EA1578', 'EA-A01', 'BLR', 'BOM', 15, 10, 0, 105, 3800);
  upsert_flight('EA1579', 'EA-A03', 'DEL', 'BLR', 15, 13, 15, 165, 5600);
  upsert_flight('EA1580', 'EA-A03', 'BLR', 'DEL', 15, 17, 0, 165, 5600);
  upsert_flight('EA1581', 'EA-A01', 'DEL', 'CCU', 15, 13, 0, 135, 4600);
  upsert_flight('EA1582', 'EA-A01', 'CCU', 'DEL', 15, 16, 15, 135, 4600);
  upsert_flight('EA1583', 'EA-A04', 'DEL', 'HYD', 15, 8, 0, 135, 4500);
  upsert_flight('EA1584', 'EA-A04', 'HYD', 'DEL', 15, 11, 15, 135, 4500);
  upsert_flight('EA1585', 'EA-A04', 'DEL', 'MAA', 15, 14, 30, 170, 5800);
  upsert_flight('EA1586', 'EA-A04', 'MAA', 'DEL', 15, 18, 30, 170, 5800);
  upsert_flight('EA1587', 'EA-A02', 'BOM', 'GOI', 15, 6, 0, 75, 3200);
  upsert_flight('EA1588', 'EA-A02', 'GOI', 'BOM', 15, 21, 0, 75, 3200);
  upsert_flight('EA1589', 'EA-A04', 'DEL', 'BHO', 15, 6, 30, 85, 3300);
  upsert_flight('EA1590', 'EA-A04', 'BHO', 'DEL', 15, 8, 30, 85, 3300);
  upsert_flight('EA1591', 'EA-A01', 'DEL', 'PAT', 15, 6, 45, 95, 3600);
  upsert_flight('EA1592', 'EA-A01', 'PAT', 'DEL', 15, 9, 0, 95, 3600);
  upsert_flight('EA1593', 'EA-A03', 'DEL', 'IXL', 15, 6, 15, 85, 6200);
  upsert_flight('EA1594', 'EA-A03', 'IXL', 'DEL', 15, 8, 30, 85, 6200);
  upsert_flight('EA1595', 'EA-A04', 'DEL', 'RPR', 15, 15, 0, 110, 4100);
  upsert_flight('EA1596', 'EA-A04', 'RPR', 'DEL', 15, 17, 30, 110, 4100);
  upsert_flight('EA1597', 'EA-A01', 'PNQ', 'BOM', 15, 6, 0, 45, 2200);
  upsert_flight('EA1598', 'EA-A01', 'BOM', 'PNQ', 15, 22, 30, 45, 2200);
  upsert_flight('EA1599', 'EA-A05', 'BOM', 'KLH', 15, 10, 0, 55, 2600);
  upsert_flight('EA1600', 'EA-A05', 'KLH', 'BOM', 15, 11, 45, 55, 2600);
  upsert_flight('EA1601', 'EA-A03', 'BOM', 'XBA', 15, 11, 30, 50, 2300);
  upsert_flight('EA1602', 'EA-A03', 'XBA', 'BOM', 15, 13, 0, 50, 2300);
  upsert_flight('EA1603', 'EA-A01', 'PNQ', 'XNI', 15, 17, 15, 35, 1900);
  upsert_flight('EA1604', 'EA-A01', 'XNI', 'PNQ', 15, 18, 30, 35, 1900);
  upsert_flight('EA1605', 'EA-A02', 'HYD', 'XBD', 15, 11, 0, 55, 2400);
  upsert_flight('EA1606', 'EA-A02', 'XBD', 'HYD', 15, 12, 45, 55, 2400);
  upsert_flight('EA1607', 'EA-A04', 'DEL', 'XMR', 15, 12, 30, 75, 2900);
  upsert_flight('EA1608', 'EA-A04', 'XMR', 'DEL', 15, 14, 30, 75, 2900);
  upsert_flight('EA8141', 'EA-A08', 'DEL', 'DXB', 15, 9, 0, 240, 17500);
  upsert_flight('EA8142', 'EA-A08', 'DXB', 'DEL', 15, 14, 30, 240, 17500);
  upsert_flight('EA8143', 'EA-A06', 'BOM', 'SIN', 15, 23, 15, 330, 22000);
  upsert_flight('EA8144', 'EA-A06', 'SIN', 'BOM', 15, 7, 45, 330, 22000);
  upsert_flight('EA8145', 'EA-A04', 'DEL', 'BKK', 15, 18, 0, 250, 16800);
  upsert_flight('EA8146', 'EA-A04', 'BKK', 'DEL', 15, 23, 30, 250, 16800);
  upsert_flight('EA8147', 'EA-A07', 'BOM', 'LHR', 15, 2, 30, 570, 48000);
  upsert_flight('EA8148', 'EA-A07', 'LHR', 'BOM', 15, 13, 30, 570, 48000);
  upsert_flight('EA8149', 'EA-A07', 'BLR', 'LAX', 15, 23, 0, 1020, 68000);
  upsert_flight('EA8150', 'EA-A07', 'LAX', 'BLR', 15, 18, 0, 1020, 68000);
  -- Day +16
  upsert_flight('EA1609', 'EA-A03', 'BOM', 'DEL', 16, 6, 30, 130, 4800);
  upsert_flight('EA1610', 'EA-A03', 'DEL', 'BOM', 16, 10, 0, 130, 4800);
  upsert_flight('EA1611', 'EA-A01', 'BOM', 'BLR', 16, 7, 0, 105, 3800);
  upsert_flight('EA1612', 'EA-A01', 'BLR', 'BOM', 16, 10, 0, 105, 3800);
  upsert_flight('EA1613', 'EA-A03', 'DEL', 'BLR', 16, 13, 15, 165, 5600);
  upsert_flight('EA1614', 'EA-A03', 'BLR', 'DEL', 16, 17, 0, 165, 5600);
  upsert_flight('EA1615', 'EA-A02', 'BOM', 'CCU', 16, 8, 15, 155, 5100);
  upsert_flight('EA1616', 'EA-A02', 'CCU', 'BOM', 16, 12, 0, 155, 5100);
  upsert_flight('EA1617', 'EA-A02', 'BOM', 'HYD', 16, 16, 0, 90, 3400);
  upsert_flight('EA1618', 'EA-A02', 'HYD', 'BOM', 16, 18, 30, 90, 3400);
  upsert_flight('EA1619', 'EA-A05', 'BOM', 'MAA', 16, 9, 30, 120, 4200);
  upsert_flight('EA1620', 'EA-A05', 'MAA', 'BOM', 16, 12, 45, 120, 4200);
  upsert_flight('EA1621', 'EA-A02', 'BOM', 'GOI', 16, 6, 0, 75, 3200);
  upsert_flight('EA1622', 'EA-A02', 'GOI', 'BOM', 16, 21, 0, 75, 3200);
  upsert_flight('EA1623', 'EA-A02', 'BOM', 'COK', 16, 13, 30, 115, 4300);
  upsert_flight('EA1624', 'EA-A02', 'COK', 'BOM', 16, 16, 15, 115, 4300);
  upsert_flight('EA1625', 'EA-A03', 'BOM', 'AMD', 16, 7, 0, 70, 2900);
  upsert_flight('EA1626', 'EA-A03', 'AMD', 'BOM', 16, 8, 45, 70, 2900);
  upsert_flight('EA1627', 'EA-A03', 'DEL', 'JAI', 16, 18, 0, 55, 2700);
  upsert_flight('EA1628', 'EA-A03', 'JAI', 'DEL', 16, 19, 30, 55, 2700);
  upsert_flight('EA1629', 'EA-A04', 'DEL', 'GAU', 16, 10, 45, 150, 5400);
  upsert_flight('EA1630', 'EA-A04', 'GAU', 'DEL', 16, 14, 0, 150, 5400);
  upsert_flight('EA1631', 'EA-A05', 'DEL', 'SLV', 16, 7, 15, 60, 3500);
  upsert_flight('EA1632', 'EA-A05', 'SLV', 'DEL', 16, 9, 0, 60, 3500);
  upsert_flight('EA1633', 'EA-A05', 'BOM', 'NAG', 16, 13, 0, 85, 3500);
  upsert_flight('EA1634', 'EA-A05', 'NAG', 'BOM', 16, 15, 15, 85, 3500);
  upsert_flight('EA1635', 'EA-A01', 'BLR', 'VTZ', 16, 16, 45, 95, 3700);
  upsert_flight('EA1636', 'EA-A01', 'VTZ', 'BLR', 16, 19, 0, 95, 3700);
  upsert_flight('EA1637', 'EA-A01', 'PNQ', 'BOM', 16, 6, 0, 45, 2200);
  upsert_flight('EA1638', 'EA-A01', 'BOM', 'PNQ', 16, 22, 30, 45, 2200);
  upsert_flight('EA1639', 'EA-A02', 'PNQ', 'DEL', 16, 7, 30, 130, 4700);
  upsert_flight('EA1640', 'EA-A02', 'DEL', 'PNQ', 16, 21, 0, 130, 4700);
  upsert_flight('EA1641', 'EA-A02', 'BOM', 'JLG', 16, 8, 30, 60, 2500);
  upsert_flight('EA1642', 'EA-A02', 'JLG', 'BOM', 16, 10, 15, 60, 2500);
  upsert_flight('EA1643', 'EA-A01', 'PNQ', 'XBA', 16, 15, 0, 35, 1800);
  upsert_flight('EA1644', 'EA-A01', 'XBA', 'PNQ', 16, 16, 15, 35, 1800);
  upsert_flight('EA1645', 'EA-A02', 'PNQ', 'XKA', 16, 17, 30, 55, 2400);
  upsert_flight('EA1646', 'EA-A02', 'XKA', 'PNQ', 16, 19, 15, 55, 2400);
  upsert_flight('EA1647', 'EA-A05', 'NAG', 'XMK', 16, 17, 0, 45, 2100);
  upsert_flight('EA1648', 'EA-A05', 'XMK', 'NAG', 16, 18, 30, 45, 2100);
  upsert_flight('EA1649', 'EA-A01', 'CCU', 'XBO', 16, 8, 0, 50, 2200);
  upsert_flight('EA1650', 'EA-A01', 'XBO', 'CCU', 16, 9, 30, 50, 2200);
  upsert_flight('EA8151', 'EA-A06', 'BOM', 'DXB', 16, 8, 30, 210, 16500);
  upsert_flight('EA8152', 'EA-A06', 'DXB', 'BOM', 16, 13, 30, 210, 16500);
  upsert_flight('EA8153', 'EA-A08', 'DEL', 'SIN', 16, 22, 30, 345, 23500);
  upsert_flight('EA8154', 'EA-A08', 'SIN', 'DEL', 16, 7, 0, 345, 23500);
  upsert_flight('EA8155', 'EA-A07', 'BLR', 'SIN', 16, 8, 0, 290, 19500);
  upsert_flight('EA8156', 'EA-A07', 'SIN', 'BLR', 16, 14, 30, 290, 19500);
  upsert_flight('EA8157', 'EA-A08', 'DEL', 'LHR', 16, 1, 45, 540, 49500);
  upsert_flight('EA8158', 'EA-A08', 'LHR', 'DEL', 16, 12, 0, 540, 49500);
  upsert_flight('EA8159', 'EA-A08', 'DEL', 'YYZ', 16, 22, 0, 960, 65000);
  upsert_flight('EA8160', 'EA-A08', 'YYZ', 'DEL', 16, 16, 0, 960, 65000);
  -- Day +17
  upsert_flight('EA1651', 'EA-A03', 'BOM', 'DEL', 17, 6, 30, 130, 4800);
  upsert_flight('EA1652', 'EA-A03', 'DEL', 'BOM', 17, 10, 0, 130, 4800);
  upsert_flight('EA1653', 'EA-A01', 'BOM', 'BLR', 17, 7, 0, 105, 3800);
  upsert_flight('EA1654', 'EA-A01', 'BLR', 'BOM', 17, 10, 0, 105, 3800);
  upsert_flight('EA1655', 'EA-A03', 'DEL', 'BLR', 17, 13, 15, 165, 5600);
  upsert_flight('EA1656', 'EA-A03', 'BLR', 'DEL', 17, 17, 0, 165, 5600);
  upsert_flight('EA1657', 'EA-A01', 'DEL', 'CCU', 17, 13, 0, 135, 4600);
  upsert_flight('EA1658', 'EA-A01', 'CCU', 'DEL', 17, 16, 15, 135, 4600);
  upsert_flight('EA1659', 'EA-A04', 'DEL', 'HYD', 17, 8, 0, 135, 4500);
  upsert_flight('EA1660', 'EA-A04', 'HYD', 'DEL', 17, 11, 15, 135, 4500);
  upsert_flight('EA1661', 'EA-A04', 'DEL', 'MAA', 17, 14, 30, 170, 5800);
  upsert_flight('EA1662', 'EA-A04', 'MAA', 'DEL', 17, 18, 30, 170, 5800);
  upsert_flight('EA1663', 'EA-A02', 'BOM', 'GOI', 17, 6, 0, 75, 3200);
  upsert_flight('EA1664', 'EA-A02', 'GOI', 'BOM', 17, 21, 0, 75, 3200);
  upsert_flight('EA1665', 'EA-A04', 'DEL', 'BHO', 17, 6, 30, 85, 3300);
  upsert_flight('EA1666', 'EA-A04', 'BHO', 'DEL', 17, 8, 30, 85, 3300);
  upsert_flight('EA1667', 'EA-A01', 'DEL', 'PAT', 17, 6, 45, 95, 3600);
  upsert_flight('EA1668', 'EA-A01', 'PAT', 'DEL', 17, 9, 0, 95, 3600);
  upsert_flight('EA1669', 'EA-A03', 'DEL', 'IXL', 17, 6, 15, 85, 6200);
  upsert_flight('EA1670', 'EA-A03', 'IXL', 'DEL', 17, 8, 30, 85, 6200);
  upsert_flight('EA1671', 'EA-A04', 'DEL', 'RPR', 17, 15, 0, 110, 4100);
  upsert_flight('EA1672', 'EA-A04', 'RPR', 'DEL', 17, 17, 30, 110, 4100);
  upsert_flight('EA1673', 'EA-A01', 'PNQ', 'BOM', 17, 6, 0, 45, 2200);
  upsert_flight('EA1674', 'EA-A01', 'BOM', 'PNQ', 17, 22, 30, 45, 2200);
  upsert_flight('EA1675', 'EA-A05', 'BOM', 'KLH', 17, 10, 0, 55, 2600);
  upsert_flight('EA1676', 'EA-A05', 'KLH', 'BOM', 17, 11, 45, 55, 2600);
  upsert_flight('EA1677', 'EA-A03', 'BOM', 'XBA', 17, 11, 30, 50, 2300);
  upsert_flight('EA1678', 'EA-A03', 'XBA', 'BOM', 17, 13, 0, 50, 2300);
  upsert_flight('EA1679', 'EA-A01', 'PNQ', 'XNI', 17, 17, 15, 35, 1900);
  upsert_flight('EA1680', 'EA-A01', 'XNI', 'PNQ', 17, 18, 30, 35, 1900);
  upsert_flight('EA1681', 'EA-A02', 'HYD', 'XBD', 17, 11, 0, 55, 2400);
  upsert_flight('EA1682', 'EA-A02', 'XBD', 'HYD', 17, 12, 45, 55, 2400);
  upsert_flight('EA1683', 'EA-A04', 'DEL', 'XMR', 17, 12, 30, 75, 2900);
  upsert_flight('EA1684', 'EA-A04', 'XMR', 'DEL', 17, 14, 30, 75, 2900);
  upsert_flight('EA8161', 'EA-A06', 'BOM', 'SIN', 17, 23, 15, 330, 22000);
  upsert_flight('EA8162', 'EA-A06', 'SIN', 'BOM', 17, 7, 45, 330, 22000);
  upsert_flight('EA8163', 'EA-A03', 'MAA', 'SIN', 17, 9, 15, 260, 18000);
  upsert_flight('EA8164', 'EA-A03', 'SIN', 'MAA', 17, 15, 0, 260, 18000);
  upsert_flight('EA8165', 'EA-A06', 'BOM', 'CDG', 17, 2, 0, 580, 46000);
  upsert_flight('EA8166', 'EA-A06', 'CDG', 'BOM', 17, 13, 0, 580, 46000);
  upsert_flight('EA8167', 'EA-A06', 'BOM', 'GIG', 17, 1, 0, 1140, 72000);
  upsert_flight('EA8168', 'EA-A06', 'GIG', 'BOM', 17, 20, 0, 1140, 72000);
  -- Day +18
  upsert_flight('EA1685', 'EA-A03', 'BOM', 'DEL', 18, 6, 30, 130, 4800);
  upsert_flight('EA1686', 'EA-A03', 'DEL', 'BOM', 18, 10, 0, 130, 4800);
  upsert_flight('EA1687', 'EA-A01', 'BOM', 'BLR', 18, 7, 0, 105, 3800);
  upsert_flight('EA1688', 'EA-A01', 'BLR', 'BOM', 18, 10, 0, 105, 3800);
  upsert_flight('EA1689', 'EA-A03', 'DEL', 'BLR', 18, 13, 15, 165, 5600);
  upsert_flight('EA1690', 'EA-A03', 'BLR', 'DEL', 18, 17, 0, 165, 5600);
  upsert_flight('EA1691', 'EA-A02', 'BOM', 'CCU', 18, 8, 15, 155, 5100);
  upsert_flight('EA1692', 'EA-A02', 'CCU', 'BOM', 18, 12, 0, 155, 5100);
  upsert_flight('EA1693', 'EA-A02', 'BOM', 'HYD', 18, 16, 0, 90, 3400);
  upsert_flight('EA1694', 'EA-A02', 'HYD', 'BOM', 18, 18, 30, 90, 3400);
  upsert_flight('EA1695', 'EA-A05', 'BOM', 'MAA', 18, 9, 30, 120, 4200);
  upsert_flight('EA1696', 'EA-A05', 'MAA', 'BOM', 18, 12, 45, 120, 4200);
  upsert_flight('EA1697', 'EA-A02', 'BOM', 'GOI', 18, 6, 0, 75, 3200);
  upsert_flight('EA1698', 'EA-A02', 'GOI', 'BOM', 18, 21, 0, 75, 3200);
  upsert_flight('EA1699', 'EA-A02', 'BOM', 'COK', 18, 13, 30, 115, 4300);
  upsert_flight('EA1700', 'EA-A02', 'COK', 'BOM', 18, 16, 15, 115, 4300);
  upsert_flight('EA1701', 'EA-A03', 'BOM', 'AMD', 18, 7, 0, 70, 2900);
  upsert_flight('EA1702', 'EA-A03', 'AMD', 'BOM', 18, 8, 45, 70, 2900);
  upsert_flight('EA1703', 'EA-A03', 'DEL', 'JAI', 18, 18, 0, 55, 2700);
  upsert_flight('EA1704', 'EA-A03', 'JAI', 'DEL', 18, 19, 30, 55, 2700);
  upsert_flight('EA1705', 'EA-A04', 'DEL', 'GAU', 18, 10, 45, 150, 5400);
  upsert_flight('EA1706', 'EA-A04', 'GAU', 'DEL', 18, 14, 0, 150, 5400);
  upsert_flight('EA1707', 'EA-A05', 'DEL', 'SLV', 18, 7, 15, 60, 3500);
  upsert_flight('EA1708', 'EA-A05', 'SLV', 'DEL', 18, 9, 0, 60, 3500);
  upsert_flight('EA1709', 'EA-A05', 'BOM', 'NAG', 18, 13, 0, 85, 3500);
  upsert_flight('EA1710', 'EA-A05', 'NAG', 'BOM', 18, 15, 15, 85, 3500);
  upsert_flight('EA1711', 'EA-A01', 'BLR', 'VTZ', 18, 16, 45, 95, 3700);
  upsert_flight('EA1712', 'EA-A01', 'VTZ', 'BLR', 18, 19, 0, 95, 3700);
  upsert_flight('EA1713', 'EA-A01', 'PNQ', 'BOM', 18, 6, 0, 45, 2200);
  upsert_flight('EA1714', 'EA-A01', 'BOM', 'PNQ', 18, 22, 30, 45, 2200);
  upsert_flight('EA1715', 'EA-A02', 'PNQ', 'DEL', 18, 7, 30, 130, 4700);
  upsert_flight('EA1716', 'EA-A02', 'DEL', 'PNQ', 18, 21, 0, 130, 4700);
  upsert_flight('EA1717', 'EA-A02', 'BOM', 'JLG', 18, 8, 30, 60, 2500);
  upsert_flight('EA1718', 'EA-A02', 'JLG', 'BOM', 18, 10, 15, 60, 2500);
  upsert_flight('EA1719', 'EA-A01', 'PNQ', 'XBA', 18, 15, 0, 35, 1800);
  upsert_flight('EA1720', 'EA-A01', 'XBA', 'PNQ', 18, 16, 15, 35, 1800);
  upsert_flight('EA1721', 'EA-A02', 'PNQ', 'XKA', 18, 17, 30, 55, 2400);
  upsert_flight('EA1722', 'EA-A02', 'XKA', 'PNQ', 18, 19, 15, 55, 2400);
  upsert_flight('EA1723', 'EA-A05', 'NAG', 'XMK', 18, 17, 0, 45, 2100);
  upsert_flight('EA1724', 'EA-A05', 'XMK', 'NAG', 18, 18, 30, 45, 2100);
  upsert_flight('EA1725', 'EA-A01', 'CCU', 'XBO', 18, 8, 0, 50, 2200);
  upsert_flight('EA1726', 'EA-A01', 'XBO', 'CCU', 18, 9, 30, 50, 2200);
  upsert_flight('EA8169', 'EA-A06', 'BOM', 'DXB', 18, 8, 30, 210, 16500);
  upsert_flight('EA8170', 'EA-A06', 'DXB', 'BOM', 18, 13, 30, 210, 16500);
  upsert_flight('EA8171', 'EA-A08', 'DEL', 'DXB', 18, 9, 0, 240, 17500);
  upsert_flight('EA8172', 'EA-A08', 'DXB', 'DEL', 18, 14, 30, 240, 17500);
  upsert_flight('EA8173', 'EA-A04', 'CCU', 'BKK', 18, 7, 30, 165, 14000);
  upsert_flight('EA8174', 'EA-A04', 'BKK', 'CCU', 18, 12, 0, 165, 14000);
  upsert_flight('EA8175', 'EA-A08', 'DEL', 'SVO', 18, 3, 30, 390, 38000);
  upsert_flight('EA8176', 'EA-A08', 'SVO', 'DEL', 18, 11, 30, 390, 38000);
  upsert_flight('EA8177', 'EA-A07', 'BOM', 'XCA', 18, 2, 15, 990, 59000);
  upsert_flight('EA8178', 'EA-A07', 'XCA', 'BOM', 18, 17, 30, 990, 59000);
  -- Day +19
  upsert_flight('EA1727', 'EA-A03', 'BOM', 'DEL', 19, 6, 30, 130, 4800);
  upsert_flight('EA1728', 'EA-A03', 'DEL', 'BOM', 19, 10, 0, 130, 4800);
  upsert_flight('EA1729', 'EA-A01', 'BOM', 'BLR', 19, 7, 0, 105, 3800);
  upsert_flight('EA1730', 'EA-A01', 'BLR', 'BOM', 19, 10, 0, 105, 3800);
  upsert_flight('EA1731', 'EA-A03', 'DEL', 'BLR', 19, 13, 15, 165, 5600);
  upsert_flight('EA1732', 'EA-A03', 'BLR', 'DEL', 19, 17, 0, 165, 5600);
  upsert_flight('EA1733', 'EA-A01', 'DEL', 'CCU', 19, 13, 0, 135, 4600);
  upsert_flight('EA1734', 'EA-A01', 'CCU', 'DEL', 19, 16, 15, 135, 4600);
  upsert_flight('EA1735', 'EA-A04', 'DEL', 'HYD', 19, 8, 0, 135, 4500);
  upsert_flight('EA1736', 'EA-A04', 'HYD', 'DEL', 19, 11, 15, 135, 4500);
  upsert_flight('EA1737', 'EA-A04', 'DEL', 'MAA', 19, 14, 30, 170, 5800);
  upsert_flight('EA1738', 'EA-A04', 'MAA', 'DEL', 19, 18, 30, 170, 5800);
  upsert_flight('EA1739', 'EA-A02', 'BOM', 'GOI', 19, 6, 0, 75, 3200);
  upsert_flight('EA1740', 'EA-A02', 'GOI', 'BOM', 19, 21, 0, 75, 3200);
  upsert_flight('EA1741', 'EA-A04', 'DEL', 'BHO', 19, 6, 30, 85, 3300);
  upsert_flight('EA1742', 'EA-A04', 'BHO', 'DEL', 19, 8, 30, 85, 3300);
  upsert_flight('EA1743', 'EA-A01', 'DEL', 'PAT', 19, 6, 45, 95, 3600);
  upsert_flight('EA1744', 'EA-A01', 'PAT', 'DEL', 19, 9, 0, 95, 3600);
  upsert_flight('EA1745', 'EA-A03', 'DEL', 'IXL', 19, 6, 15, 85, 6200);
  upsert_flight('EA1746', 'EA-A03', 'IXL', 'DEL', 19, 8, 30, 85, 6200);
  upsert_flight('EA1747', 'EA-A04', 'DEL', 'RPR', 19, 15, 0, 110, 4100);
  upsert_flight('EA1748', 'EA-A04', 'RPR', 'DEL', 19, 17, 30, 110, 4100);
  upsert_flight('EA1749', 'EA-A01', 'PNQ', 'BOM', 19, 6, 0, 45, 2200);
  upsert_flight('EA1750', 'EA-A01', 'BOM', 'PNQ', 19, 22, 30, 45, 2200);
  upsert_flight('EA1751', 'EA-A05', 'BOM', 'KLH', 19, 10, 0, 55, 2600);
  upsert_flight('EA1752', 'EA-A05', 'KLH', 'BOM', 19, 11, 45, 55, 2600);
  upsert_flight('EA1753', 'EA-A03', 'BOM', 'XBA', 19, 11, 30, 50, 2300);
  upsert_flight('EA1754', 'EA-A03', 'XBA', 'BOM', 19, 13, 0, 50, 2300);
  upsert_flight('EA1755', 'EA-A01', 'PNQ', 'XNI', 19, 17, 15, 35, 1900);
  upsert_flight('EA1756', 'EA-A01', 'XNI', 'PNQ', 19, 18, 30, 35, 1900);
  upsert_flight('EA1757', 'EA-A02', 'HYD', 'XBD', 19, 11, 0, 55, 2400);
  upsert_flight('EA1758', 'EA-A02', 'XBD', 'HYD', 19, 12, 45, 55, 2400);
  upsert_flight('EA1759', 'EA-A04', 'DEL', 'XMR', 19, 12, 30, 75, 2900);
  upsert_flight('EA1760', 'EA-A04', 'XMR', 'DEL', 19, 14, 30, 75, 2900);
  upsert_flight('EA8179', 'EA-A06', 'BOM', 'SIN', 19, 23, 15, 330, 22000);
  upsert_flight('EA8180', 'EA-A06', 'SIN', 'BOM', 19, 7, 45, 330, 22000);
  upsert_flight('EA8181', 'EA-A08', 'DEL', 'SIN', 19, 22, 30, 345, 23500);
  upsert_flight('EA8182', 'EA-A08', 'SIN', 'DEL', 19, 7, 0, 345, 23500);
  upsert_flight('EA8183', 'EA-A04', 'DEL', 'BKK', 19, 18, 0, 250, 16800);
  upsert_flight('EA8184', 'EA-A04', 'BKK', 'DEL', 19, 23, 30, 250, 16800);
  upsert_flight('EA8185', 'EA-A06', 'DEL', 'PEK', 19, 3, 0, 360, 34000);
  upsert_flight('EA8186', 'EA-A06', 'PEK', 'DEL', 19, 11, 0, 360, 34000);
  upsert_flight('EA8187', 'EA-A08', 'DEL', 'XKS', 19, 23, 15, 450, 39000);
  upsert_flight('EA8188', 'EA-A08', 'XKS', 'DEL', 19, 10, 0, 450, 39000);
  -- Day +20
  upsert_flight('EA1761', 'EA-A03', 'BOM', 'DEL', 20, 6, 30, 130, 4800);
  upsert_flight('EA1762', 'EA-A03', 'DEL', 'BOM', 20, 10, 0, 130, 4800);
  upsert_flight('EA1763', 'EA-A01', 'BOM', 'BLR', 20, 7, 0, 105, 3800);
  upsert_flight('EA1764', 'EA-A01', 'BLR', 'BOM', 20, 10, 0, 105, 3800);
  upsert_flight('EA1765', 'EA-A03', 'DEL', 'BLR', 20, 13, 15, 165, 5600);
  upsert_flight('EA1766', 'EA-A03', 'BLR', 'DEL', 20, 17, 0, 165, 5600);
  upsert_flight('EA1767', 'EA-A02', 'BOM', 'CCU', 20, 8, 15, 155, 5100);
  upsert_flight('EA1768', 'EA-A02', 'CCU', 'BOM', 20, 12, 0, 155, 5100);
  upsert_flight('EA1769', 'EA-A02', 'BOM', 'HYD', 20, 16, 0, 90, 3400);
  upsert_flight('EA1770', 'EA-A02', 'HYD', 'BOM', 20, 18, 30, 90, 3400);
  upsert_flight('EA1771', 'EA-A05', 'BOM', 'MAA', 20, 9, 30, 120, 4200);
  upsert_flight('EA1772', 'EA-A05', 'MAA', 'BOM', 20, 12, 45, 120, 4200);
  upsert_flight('EA1773', 'EA-A02', 'BOM', 'GOI', 20, 6, 0, 75, 3200);
  upsert_flight('EA1774', 'EA-A02', 'GOI', 'BOM', 20, 21, 0, 75, 3200);
  upsert_flight('EA1775', 'EA-A02', 'BOM', 'COK', 20, 13, 30, 115, 4300);
  upsert_flight('EA1776', 'EA-A02', 'COK', 'BOM', 20, 16, 15, 115, 4300);
  upsert_flight('EA1777', 'EA-A03', 'BOM', 'AMD', 20, 7, 0, 70, 2900);
  upsert_flight('EA1778', 'EA-A03', 'AMD', 'BOM', 20, 8, 45, 70, 2900);
  upsert_flight('EA1779', 'EA-A03', 'DEL', 'JAI', 20, 18, 0, 55, 2700);
  upsert_flight('EA1780', 'EA-A03', 'JAI', 'DEL', 20, 19, 30, 55, 2700);
  upsert_flight('EA1781', 'EA-A04', 'DEL', 'GAU', 20, 10, 45, 150, 5400);
  upsert_flight('EA1782', 'EA-A04', 'GAU', 'DEL', 20, 14, 0, 150, 5400);
  upsert_flight('EA1783', 'EA-A05', 'DEL', 'SLV', 20, 7, 15, 60, 3500);
  upsert_flight('EA1784', 'EA-A05', 'SLV', 'DEL', 20, 9, 0, 60, 3500);
  upsert_flight('EA1785', 'EA-A05', 'BOM', 'NAG', 20, 13, 0, 85, 3500);
  upsert_flight('EA1786', 'EA-A05', 'NAG', 'BOM', 20, 15, 15, 85, 3500);
  upsert_flight('EA1787', 'EA-A01', 'BLR', 'VTZ', 20, 16, 45, 95, 3700);
  upsert_flight('EA1788', 'EA-A01', 'VTZ', 'BLR', 20, 19, 0, 95, 3700);
  upsert_flight('EA1789', 'EA-A01', 'PNQ', 'BOM', 20, 6, 0, 45, 2200);
  upsert_flight('EA1790', 'EA-A01', 'BOM', 'PNQ', 20, 22, 30, 45, 2200);
  upsert_flight('EA1791', 'EA-A02', 'PNQ', 'DEL', 20, 7, 30, 130, 4700);
  upsert_flight('EA1792', 'EA-A02', 'DEL', 'PNQ', 20, 21, 0, 130, 4700);
  upsert_flight('EA1793', 'EA-A02', 'BOM', 'JLG', 20, 8, 30, 60, 2500);
  upsert_flight('EA1794', 'EA-A02', 'JLG', 'BOM', 20, 10, 15, 60, 2500);
  upsert_flight('EA1795', 'EA-A01', 'PNQ', 'XBA', 20, 15, 0, 35, 1800);
  upsert_flight('EA1796', 'EA-A01', 'XBA', 'PNQ', 20, 16, 15, 35, 1800);
  upsert_flight('EA1797', 'EA-A02', 'PNQ', 'XKA', 20, 17, 30, 55, 2400);
  upsert_flight('EA1798', 'EA-A02', 'XKA', 'PNQ', 20, 19, 15, 55, 2400);
  upsert_flight('EA1799', 'EA-A05', 'NAG', 'XMK', 20, 17, 0, 45, 2100);
  upsert_flight('EA1800', 'EA-A05', 'XMK', 'NAG', 20, 18, 30, 45, 2100);
  upsert_flight('EA1801', 'EA-A01', 'CCU', 'XBO', 20, 8, 0, 50, 2200);
  upsert_flight('EA1802', 'EA-A01', 'XBO', 'CCU', 20, 9, 30, 50, 2200);
  upsert_flight('EA8189', 'EA-A06', 'BOM', 'DXB', 20, 8, 30, 210, 16500);
  upsert_flight('EA8190', 'EA-A06', 'DXB', 'BOM', 20, 13, 30, 210, 16500);
  upsert_flight('EA8191', 'EA-A07', 'BLR', 'SIN', 20, 8, 0, 290, 19500);
  upsert_flight('EA8192', 'EA-A07', 'SIN', 'BLR', 20, 14, 30, 290, 19500);
  upsert_flight('EA8193', 'EA-A07', 'BOM', 'LHR', 20, 2, 30, 570, 48000);
  upsert_flight('EA8194', 'EA-A07', 'LHR', 'BOM', 20, 13, 30, 570, 48000);
  upsert_flight('EA8195', 'EA-A07', 'CCU', 'PVG', 20, 1, 30, 330, 32000);
  upsert_flight('EA8196', 'EA-A07', 'PVG', 'CCU', 20, 9, 0, 330, 32000);
  -- Day +21
  upsert_flight('EA1803', 'EA-A03', 'BOM', 'DEL', 21, 6, 30, 130, 4800);
  upsert_flight('EA1804', 'EA-A03', 'DEL', 'BOM', 21, 10, 0, 130, 4800);
  upsert_flight('EA1805', 'EA-A01', 'BOM', 'BLR', 21, 7, 0, 105, 3800);
  upsert_flight('EA1806', 'EA-A01', 'BLR', 'BOM', 21, 10, 0, 105, 3800);
  upsert_flight('EA1807', 'EA-A03', 'DEL', 'BLR', 21, 13, 15, 165, 5600);
  upsert_flight('EA1808', 'EA-A03', 'BLR', 'DEL', 21, 17, 0, 165, 5600);
  upsert_flight('EA1809', 'EA-A01', 'DEL', 'CCU', 21, 13, 0, 135, 4600);
  upsert_flight('EA1810', 'EA-A01', 'CCU', 'DEL', 21, 16, 15, 135, 4600);
  upsert_flight('EA1811', 'EA-A04', 'DEL', 'HYD', 21, 8, 0, 135, 4500);
  upsert_flight('EA1812', 'EA-A04', 'HYD', 'DEL', 21, 11, 15, 135, 4500);
  upsert_flight('EA1813', 'EA-A04', 'DEL', 'MAA', 21, 14, 30, 170, 5800);
  upsert_flight('EA1814', 'EA-A04', 'MAA', 'DEL', 21, 18, 30, 170, 5800);
  upsert_flight('EA1815', 'EA-A02', 'BOM', 'GOI', 21, 6, 0, 75, 3200);
  upsert_flight('EA1816', 'EA-A02', 'GOI', 'BOM', 21, 21, 0, 75, 3200);
  upsert_flight('EA1817', 'EA-A04', 'DEL', 'BHO', 21, 6, 30, 85, 3300);
  upsert_flight('EA1818', 'EA-A04', 'BHO', 'DEL', 21, 8, 30, 85, 3300);
  upsert_flight('EA1819', 'EA-A01', 'DEL', 'PAT', 21, 6, 45, 95, 3600);
  upsert_flight('EA1820', 'EA-A01', 'PAT', 'DEL', 21, 9, 0, 95, 3600);
  upsert_flight('EA1821', 'EA-A03', 'DEL', 'IXL', 21, 6, 15, 85, 6200);
  upsert_flight('EA1822', 'EA-A03', 'IXL', 'DEL', 21, 8, 30, 85, 6200);
  upsert_flight('EA1823', 'EA-A04', 'DEL', 'RPR', 21, 15, 0, 110, 4100);
  upsert_flight('EA1824', 'EA-A04', 'RPR', 'DEL', 21, 17, 30, 110, 4100);
  upsert_flight('EA1825', 'EA-A01', 'PNQ', 'BOM', 21, 6, 0, 45, 2200);
  upsert_flight('EA1826', 'EA-A01', 'BOM', 'PNQ', 21, 22, 30, 45, 2200);
  upsert_flight('EA1827', 'EA-A05', 'BOM', 'KLH', 21, 10, 0, 55, 2600);
  upsert_flight('EA1828', 'EA-A05', 'KLH', 'BOM', 21, 11, 45, 55, 2600);
  upsert_flight('EA1829', 'EA-A03', 'BOM', 'XBA', 21, 11, 30, 50, 2300);
  upsert_flight('EA1830', 'EA-A03', 'XBA', 'BOM', 21, 13, 0, 50, 2300);
  upsert_flight('EA1831', 'EA-A01', 'PNQ', 'XNI', 21, 17, 15, 35, 1900);
  upsert_flight('EA1832', 'EA-A01', 'XNI', 'PNQ', 21, 18, 30, 35, 1900);
  upsert_flight('EA1833', 'EA-A02', 'HYD', 'XBD', 21, 11, 0, 55, 2400);
  upsert_flight('EA1834', 'EA-A02', 'XBD', 'HYD', 21, 12, 45, 55, 2400);
  upsert_flight('EA1835', 'EA-A04', 'DEL', 'XMR', 21, 12, 30, 75, 2900);
  upsert_flight('EA1836', 'EA-A04', 'XMR', 'DEL', 21, 14, 30, 75, 2900);
  upsert_flight('EA8197', 'EA-A08', 'DEL', 'DXB', 21, 9, 0, 240, 17500);
  upsert_flight('EA8198', 'EA-A08', 'DXB', 'DEL', 21, 14, 30, 240, 17500);
  upsert_flight('EA8199', 'EA-A06', 'BOM', 'SIN', 21, 23, 15, 330, 22000);
  upsert_flight('EA8200', 'EA-A06', 'SIN', 'BOM', 21, 7, 45, 330, 22000);
  upsert_flight('EA8201', 'EA-A03', 'MAA', 'SIN', 21, 9, 15, 260, 18000);
  upsert_flight('EA8202', 'EA-A03', 'SIN', 'MAA', 21, 15, 0, 260, 18000);
  upsert_flight('EA8203', 'EA-A08', 'DEL', 'LHR', 21, 1, 45, 540, 49500);
  upsert_flight('EA8204', 'EA-A08', 'LHR', 'DEL', 21, 12, 0, 540, 49500);
  upsert_flight('EA8205', 'EA-A07', 'BLR', 'LAX', 21, 23, 0, 1020, 68000);
  upsert_flight('EA8206', 'EA-A07', 'LAX', 'BLR', 21, 18, 0, 1020, 68000);
  -- Day +22
  upsert_flight('EA1837', 'EA-A03', 'BOM', 'DEL', 22, 6, 30, 130, 4800);
  upsert_flight('EA1838', 'EA-A03', 'DEL', 'BOM', 22, 10, 0, 130, 4800);
  upsert_flight('EA1839', 'EA-A01', 'BOM', 'BLR', 22, 7, 0, 105, 3800);
  upsert_flight('EA1840', 'EA-A01', 'BLR', 'BOM', 22, 10, 0, 105, 3800);
  upsert_flight('EA1841', 'EA-A03', 'DEL', 'BLR', 22, 13, 15, 165, 5600);
  upsert_flight('EA1842', 'EA-A03', 'BLR', 'DEL', 22, 17, 0, 165, 5600);
  upsert_flight('EA1843', 'EA-A02', 'BOM', 'CCU', 22, 8, 15, 155, 5100);
  upsert_flight('EA1844', 'EA-A02', 'CCU', 'BOM', 22, 12, 0, 155, 5100);
  upsert_flight('EA1845', 'EA-A02', 'BOM', 'HYD', 22, 16, 0, 90, 3400);
  upsert_flight('EA1846', 'EA-A02', 'HYD', 'BOM', 22, 18, 30, 90, 3400);
  upsert_flight('EA1847', 'EA-A05', 'BOM', 'MAA', 22, 9, 30, 120, 4200);
  upsert_flight('EA1848', 'EA-A05', 'MAA', 'BOM', 22, 12, 45, 120, 4200);
  upsert_flight('EA1849', 'EA-A02', 'BOM', 'GOI', 22, 6, 0, 75, 3200);
  upsert_flight('EA1850', 'EA-A02', 'GOI', 'BOM', 22, 21, 0, 75, 3200);
  upsert_flight('EA1851', 'EA-A02', 'BOM', 'COK', 22, 13, 30, 115, 4300);
  upsert_flight('EA1852', 'EA-A02', 'COK', 'BOM', 22, 16, 15, 115, 4300);
  upsert_flight('EA1853', 'EA-A03', 'BOM', 'AMD', 22, 7, 0, 70, 2900);
  upsert_flight('EA1854', 'EA-A03', 'AMD', 'BOM', 22, 8, 45, 70, 2900);
  upsert_flight('EA1855', 'EA-A03', 'DEL', 'JAI', 22, 18, 0, 55, 2700);
  upsert_flight('EA1856', 'EA-A03', 'JAI', 'DEL', 22, 19, 30, 55, 2700);
  upsert_flight('EA1857', 'EA-A04', 'DEL', 'GAU', 22, 10, 45, 150, 5400);
  upsert_flight('EA1858', 'EA-A04', 'GAU', 'DEL', 22, 14, 0, 150, 5400);
  upsert_flight('EA1859', 'EA-A05', 'DEL', 'SLV', 22, 7, 15, 60, 3500);
  upsert_flight('EA1860', 'EA-A05', 'SLV', 'DEL', 22, 9, 0, 60, 3500);
  upsert_flight('EA1861', 'EA-A05', 'BOM', 'NAG', 22, 13, 0, 85, 3500);
  upsert_flight('EA1862', 'EA-A05', 'NAG', 'BOM', 22, 15, 15, 85, 3500);
  upsert_flight('EA1863', 'EA-A01', 'BLR', 'VTZ', 22, 16, 45, 95, 3700);
  upsert_flight('EA1864', 'EA-A01', 'VTZ', 'BLR', 22, 19, 0, 95, 3700);
  upsert_flight('EA1865', 'EA-A01', 'PNQ', 'BOM', 22, 6, 0, 45, 2200);
  upsert_flight('EA1866', 'EA-A01', 'BOM', 'PNQ', 22, 22, 30, 45, 2200);
  upsert_flight('EA1867', 'EA-A02', 'PNQ', 'DEL', 22, 7, 30, 130, 4700);
  upsert_flight('EA1868', 'EA-A02', 'DEL', 'PNQ', 22, 21, 0, 130, 4700);
  upsert_flight('EA1869', 'EA-A02', 'BOM', 'JLG', 22, 8, 30, 60, 2500);
  upsert_flight('EA1870', 'EA-A02', 'JLG', 'BOM', 22, 10, 15, 60, 2500);
  upsert_flight('EA1871', 'EA-A01', 'PNQ', 'XBA', 22, 15, 0, 35, 1800);
  upsert_flight('EA1872', 'EA-A01', 'XBA', 'PNQ', 22, 16, 15, 35, 1800);
  upsert_flight('EA1873', 'EA-A02', 'PNQ', 'XKA', 22, 17, 30, 55, 2400);
  upsert_flight('EA1874', 'EA-A02', 'XKA', 'PNQ', 22, 19, 15, 55, 2400);
  upsert_flight('EA1875', 'EA-A05', 'NAG', 'XMK', 22, 17, 0, 45, 2100);
  upsert_flight('EA1876', 'EA-A05', 'XMK', 'NAG', 22, 18, 30, 45, 2100);
  upsert_flight('EA1877', 'EA-A01', 'CCU', 'XBO', 22, 8, 0, 50, 2200);
  upsert_flight('EA1878', 'EA-A01', 'XBO', 'CCU', 22, 9, 30, 50, 2200);
  upsert_flight('EA8207', 'EA-A06', 'BOM', 'DXB', 22, 8, 30, 210, 16500);
  upsert_flight('EA8208', 'EA-A06', 'DXB', 'BOM', 22, 13, 30, 210, 16500);
  upsert_flight('EA8209', 'EA-A08', 'DEL', 'SIN', 22, 22, 30, 345, 23500);
  upsert_flight('EA8210', 'EA-A08', 'SIN', 'DEL', 22, 7, 0, 345, 23500);
  upsert_flight('EA8211', 'EA-A04', 'CCU', 'BKK', 22, 7, 30, 165, 14000);
  upsert_flight('EA8212', 'EA-A04', 'BKK', 'CCU', 22, 12, 0, 165, 14000);
  upsert_flight('EA8213', 'EA-A06', 'BOM', 'CDG', 22, 2, 0, 580, 46000);
  upsert_flight('EA8214', 'EA-A06', 'CDG', 'BOM', 22, 13, 0, 580, 46000);
  upsert_flight('EA8215', 'EA-A08', 'DEL', 'YYZ', 22, 22, 0, 960, 65000);
  upsert_flight('EA8216', 'EA-A08', 'YYZ', 'DEL', 22, 16, 0, 960, 65000);
  -- Day +23
  upsert_flight('EA1879', 'EA-A03', 'BOM', 'DEL', 23, 6, 30, 130, 4800);
  upsert_flight('EA1880', 'EA-A03', 'DEL', 'BOM', 23, 10, 0, 130, 4800);
  upsert_flight('EA1881', 'EA-A01', 'BOM', 'BLR', 23, 7, 0, 105, 3800);
  upsert_flight('EA1882', 'EA-A01', 'BLR', 'BOM', 23, 10, 0, 105, 3800);
  upsert_flight('EA1883', 'EA-A03', 'DEL', 'BLR', 23, 13, 15, 165, 5600);
  upsert_flight('EA1884', 'EA-A03', 'BLR', 'DEL', 23, 17, 0, 165, 5600);
  upsert_flight('EA1885', 'EA-A01', 'DEL', 'CCU', 23, 13, 0, 135, 4600);
  upsert_flight('EA1886', 'EA-A01', 'CCU', 'DEL', 23, 16, 15, 135, 4600);
  upsert_flight('EA1887', 'EA-A04', 'DEL', 'HYD', 23, 8, 0, 135, 4500);
  upsert_flight('EA1888', 'EA-A04', 'HYD', 'DEL', 23, 11, 15, 135, 4500);
  upsert_flight('EA1889', 'EA-A04', 'DEL', 'MAA', 23, 14, 30, 170, 5800);
  upsert_flight('EA1890', 'EA-A04', 'MAA', 'DEL', 23, 18, 30, 170, 5800);
  upsert_flight('EA1891', 'EA-A02', 'BOM', 'GOI', 23, 6, 0, 75, 3200);
  upsert_flight('EA1892', 'EA-A02', 'GOI', 'BOM', 23, 21, 0, 75, 3200);
  upsert_flight('EA1893', 'EA-A04', 'DEL', 'BHO', 23, 6, 30, 85, 3300);
  upsert_flight('EA1894', 'EA-A04', 'BHO', 'DEL', 23, 8, 30, 85, 3300);
  upsert_flight('EA1895', 'EA-A01', 'DEL', 'PAT', 23, 6, 45, 95, 3600);
  upsert_flight('EA1896', 'EA-A01', 'PAT', 'DEL', 23, 9, 0, 95, 3600);
  upsert_flight('EA1897', 'EA-A03', 'DEL', 'IXL', 23, 6, 15, 85, 6200);
  upsert_flight('EA1898', 'EA-A03', 'IXL', 'DEL', 23, 8, 30, 85, 6200);
  upsert_flight('EA1899', 'EA-A04', 'DEL', 'RPR', 23, 15, 0, 110, 4100);
  upsert_flight('EA1900', 'EA-A04', 'RPR', 'DEL', 23, 17, 30, 110, 4100);
  upsert_flight('EA1901', 'EA-A01', 'PNQ', 'BOM', 23, 6, 0, 45, 2200);
  upsert_flight('EA1902', 'EA-A01', 'BOM', 'PNQ', 23, 22, 30, 45, 2200);
  upsert_flight('EA1903', 'EA-A05', 'BOM', 'KLH', 23, 10, 0, 55, 2600);
  upsert_flight('EA1904', 'EA-A05', 'KLH', 'BOM', 23, 11, 45, 55, 2600);
  upsert_flight('EA1905', 'EA-A03', 'BOM', 'XBA', 23, 11, 30, 50, 2300);
  upsert_flight('EA1906', 'EA-A03', 'XBA', 'BOM', 23, 13, 0, 50, 2300);
  upsert_flight('EA1907', 'EA-A01', 'PNQ', 'XNI', 23, 17, 15, 35, 1900);
  upsert_flight('EA1908', 'EA-A01', 'XNI', 'PNQ', 23, 18, 30, 35, 1900);
  upsert_flight('EA1909', 'EA-A02', 'HYD', 'XBD', 23, 11, 0, 55, 2400);
  upsert_flight('EA1910', 'EA-A02', 'XBD', 'HYD', 23, 12, 45, 55, 2400);
  upsert_flight('EA1911', 'EA-A04', 'DEL', 'XMR', 23, 12, 30, 75, 2900);
  upsert_flight('EA1912', 'EA-A04', 'XMR', 'DEL', 23, 14, 30, 75, 2900);
  upsert_flight('EA8217', 'EA-A06', 'BOM', 'SIN', 23, 23, 15, 330, 22000);
  upsert_flight('EA8218', 'EA-A06', 'SIN', 'BOM', 23, 7, 45, 330, 22000);
  upsert_flight('EA8219', 'EA-A04', 'DEL', 'BKK', 23, 18, 0, 250, 16800);
  upsert_flight('EA8220', 'EA-A04', 'BKK', 'DEL', 23, 23, 30, 250, 16800);
  upsert_flight('EA8221', 'EA-A06', 'BOM', 'GIG', 23, 1, 0, 1140, 72000);
  upsert_flight('EA8222', 'EA-A06', 'GIG', 'BOM', 23, 20, 0, 1140, 72000);
  -- Day +24
  upsert_flight('EA1913', 'EA-A03', 'BOM', 'DEL', 24, 6, 30, 130, 4800);
  upsert_flight('EA1914', 'EA-A03', 'DEL', 'BOM', 24, 10, 0, 130, 4800);
  upsert_flight('EA1915', 'EA-A01', 'BOM', 'BLR', 24, 7, 0, 105, 3800);
  upsert_flight('EA1916', 'EA-A01', 'BLR', 'BOM', 24, 10, 0, 105, 3800);
  upsert_flight('EA1917', 'EA-A03', 'DEL', 'BLR', 24, 13, 15, 165, 5600);
  upsert_flight('EA1918', 'EA-A03', 'BLR', 'DEL', 24, 17, 0, 165, 5600);
  upsert_flight('EA1919', 'EA-A02', 'BOM', 'CCU', 24, 8, 15, 155, 5100);
  upsert_flight('EA1920', 'EA-A02', 'CCU', 'BOM', 24, 12, 0, 155, 5100);
  upsert_flight('EA1921', 'EA-A02', 'BOM', 'HYD', 24, 16, 0, 90, 3400);
  upsert_flight('EA1922', 'EA-A02', 'HYD', 'BOM', 24, 18, 30, 90, 3400);
  upsert_flight('EA1923', 'EA-A05', 'BOM', 'MAA', 24, 9, 30, 120, 4200);
  upsert_flight('EA1924', 'EA-A05', 'MAA', 'BOM', 24, 12, 45, 120, 4200);
  upsert_flight('EA1925', 'EA-A02', 'BOM', 'GOI', 24, 6, 0, 75, 3200);
  upsert_flight('EA1926', 'EA-A02', 'GOI', 'BOM', 24, 21, 0, 75, 3200);
  upsert_flight('EA1927', 'EA-A02', 'BOM', 'COK', 24, 13, 30, 115, 4300);
  upsert_flight('EA1928', 'EA-A02', 'COK', 'BOM', 24, 16, 15, 115, 4300);
  upsert_flight('EA1929', 'EA-A03', 'BOM', 'AMD', 24, 7, 0, 70, 2900);
  upsert_flight('EA1930', 'EA-A03', 'AMD', 'BOM', 24, 8, 45, 70, 2900);
  upsert_flight('EA1931', 'EA-A03', 'DEL', 'JAI', 24, 18, 0, 55, 2700);
  upsert_flight('EA1932', 'EA-A03', 'JAI', 'DEL', 24, 19, 30, 55, 2700);
  upsert_flight('EA1933', 'EA-A04', 'DEL', 'GAU', 24, 10, 45, 150, 5400);
  upsert_flight('EA1934', 'EA-A04', 'GAU', 'DEL', 24, 14, 0, 150, 5400);
  upsert_flight('EA1935', 'EA-A05', 'DEL', 'SLV', 24, 7, 15, 60, 3500);
  upsert_flight('EA1936', 'EA-A05', 'SLV', 'DEL', 24, 9, 0, 60, 3500);
  upsert_flight('EA1937', 'EA-A05', 'BOM', 'NAG', 24, 13, 0, 85, 3500);
  upsert_flight('EA1938', 'EA-A05', 'NAG', 'BOM', 24, 15, 15, 85, 3500);
  upsert_flight('EA1939', 'EA-A01', 'BLR', 'VTZ', 24, 16, 45, 95, 3700);
  upsert_flight('EA1940', 'EA-A01', 'VTZ', 'BLR', 24, 19, 0, 95, 3700);
  upsert_flight('EA1941', 'EA-A01', 'PNQ', 'BOM', 24, 6, 0, 45, 2200);
  upsert_flight('EA1942', 'EA-A01', 'BOM', 'PNQ', 24, 22, 30, 45, 2200);
  upsert_flight('EA1943', 'EA-A02', 'PNQ', 'DEL', 24, 7, 30, 130, 4700);
  upsert_flight('EA1944', 'EA-A02', 'DEL', 'PNQ', 24, 21, 0, 130, 4700);
  upsert_flight('EA1945', 'EA-A02', 'BOM', 'JLG', 24, 8, 30, 60, 2500);
  upsert_flight('EA1946', 'EA-A02', 'JLG', 'BOM', 24, 10, 15, 60, 2500);
  upsert_flight('EA1947', 'EA-A01', 'PNQ', 'XBA', 24, 15, 0, 35, 1800);
  upsert_flight('EA1948', 'EA-A01', 'XBA', 'PNQ', 24, 16, 15, 35, 1800);
  upsert_flight('EA1949', 'EA-A02', 'PNQ', 'XKA', 24, 17, 30, 55, 2400);
  upsert_flight('EA1950', 'EA-A02', 'XKA', 'PNQ', 24, 19, 15, 55, 2400);
  upsert_flight('EA1951', 'EA-A05', 'NAG', 'XMK', 24, 17, 0, 45, 2100);
  upsert_flight('EA1952', 'EA-A05', 'XMK', 'NAG', 24, 18, 30, 45, 2100);
  upsert_flight('EA1953', 'EA-A01', 'CCU', 'XBO', 24, 8, 0, 50, 2200);
  upsert_flight('EA1954', 'EA-A01', 'XBO', 'CCU', 24, 9, 30, 50, 2200);
  upsert_flight('EA8223', 'EA-A06', 'BOM', 'DXB', 24, 8, 30, 210, 16500);
  upsert_flight('EA8224', 'EA-A06', 'DXB', 'BOM', 24, 13, 30, 210, 16500);
  upsert_flight('EA8225', 'EA-A08', 'DEL', 'DXB', 24, 9, 0, 240, 17500);
  upsert_flight('EA8226', 'EA-A08', 'DXB', 'DEL', 24, 14, 30, 240, 17500);
  upsert_flight('EA8227', 'EA-A07', 'BLR', 'SIN', 24, 8, 0, 290, 19500);
  upsert_flight('EA8228', 'EA-A07', 'SIN', 'BLR', 24, 14, 30, 290, 19500);
  upsert_flight('EA8229', 'EA-A08', 'DEL', 'SVO', 24, 3, 30, 390, 38000);
  upsert_flight('EA8230', 'EA-A08', 'SVO', 'DEL', 24, 11, 30, 390, 38000);
  upsert_flight('EA8231', 'EA-A07', 'BOM', 'XCA', 24, 2, 15, 990, 59000);
  upsert_flight('EA8232', 'EA-A07', 'XCA', 'BOM', 24, 17, 30, 990, 59000);
  -- Day +25
  upsert_flight('EA1955', 'EA-A03', 'BOM', 'DEL', 25, 6, 30, 130, 4800);
  upsert_flight('EA1956', 'EA-A03', 'DEL', 'BOM', 25, 10, 0, 130, 4800);
  upsert_flight('EA1957', 'EA-A01', 'BOM', 'BLR', 25, 7, 0, 105, 3800);
  upsert_flight('EA1958', 'EA-A01', 'BLR', 'BOM', 25, 10, 0, 105, 3800);
  upsert_flight('EA1959', 'EA-A03', 'DEL', 'BLR', 25, 13, 15, 165, 5600);
  upsert_flight('EA1960', 'EA-A03', 'BLR', 'DEL', 25, 17, 0, 165, 5600);
  upsert_flight('EA1961', 'EA-A01', 'DEL', 'CCU', 25, 13, 0, 135, 4600);
  upsert_flight('EA1962', 'EA-A01', 'CCU', 'DEL', 25, 16, 15, 135, 4600);
  upsert_flight('EA1963', 'EA-A04', 'DEL', 'HYD', 25, 8, 0, 135, 4500);
  upsert_flight('EA1964', 'EA-A04', 'HYD', 'DEL', 25, 11, 15, 135, 4500);
  upsert_flight('EA1965', 'EA-A04', 'DEL', 'MAA', 25, 14, 30, 170, 5800);
  upsert_flight('EA1966', 'EA-A04', 'MAA', 'DEL', 25, 18, 30, 170, 5800);
  upsert_flight('EA1967', 'EA-A02', 'BOM', 'GOI', 25, 6, 0, 75, 3200);
  upsert_flight('EA1968', 'EA-A02', 'GOI', 'BOM', 25, 21, 0, 75, 3200);
  upsert_flight('EA1969', 'EA-A04', 'DEL', 'BHO', 25, 6, 30, 85, 3300);
  upsert_flight('EA1970', 'EA-A04', 'BHO', 'DEL', 25, 8, 30, 85, 3300);
  upsert_flight('EA1971', 'EA-A01', 'DEL', 'PAT', 25, 6, 45, 95, 3600);
  upsert_flight('EA1972', 'EA-A01', 'PAT', 'DEL', 25, 9, 0, 95, 3600);
  upsert_flight('EA1973', 'EA-A03', 'DEL', 'IXL', 25, 6, 15, 85, 6200);
  upsert_flight('EA1974', 'EA-A03', 'IXL', 'DEL', 25, 8, 30, 85, 6200);
  upsert_flight('EA1975', 'EA-A04', 'DEL', 'RPR', 25, 15, 0, 110, 4100);
  upsert_flight('EA1976', 'EA-A04', 'RPR', 'DEL', 25, 17, 30, 110, 4100);
  upsert_flight('EA1977', 'EA-A01', 'PNQ', 'BOM', 25, 6, 0, 45, 2200);
  upsert_flight('EA1978', 'EA-A01', 'BOM', 'PNQ', 25, 22, 30, 45, 2200);
  upsert_flight('EA1979', 'EA-A05', 'BOM', 'KLH', 25, 10, 0, 55, 2600);
  upsert_flight('EA1980', 'EA-A05', 'KLH', 'BOM', 25, 11, 45, 55, 2600);
  upsert_flight('EA1981', 'EA-A03', 'BOM', 'XBA', 25, 11, 30, 50, 2300);
  upsert_flight('EA1982', 'EA-A03', 'XBA', 'BOM', 25, 13, 0, 50, 2300);
  upsert_flight('EA1983', 'EA-A01', 'PNQ', 'XNI', 25, 17, 15, 35, 1900);
  upsert_flight('EA1984', 'EA-A01', 'XNI', 'PNQ', 25, 18, 30, 35, 1900);
  upsert_flight('EA1985', 'EA-A02', 'HYD', 'XBD', 25, 11, 0, 55, 2400);
  upsert_flight('EA1986', 'EA-A02', 'XBD', 'HYD', 25, 12, 45, 55, 2400);
  upsert_flight('EA1987', 'EA-A04', 'DEL', 'XMR', 25, 12, 30, 75, 2900);
  upsert_flight('EA1988', 'EA-A04', 'XMR', 'DEL', 25, 14, 30, 75, 2900);
  upsert_flight('EA8233', 'EA-A06', 'BOM', 'SIN', 25, 23, 15, 330, 22000);
  upsert_flight('EA8234', 'EA-A06', 'SIN', 'BOM', 25, 7, 45, 330, 22000);
  upsert_flight('EA8235', 'EA-A08', 'DEL', 'SIN', 25, 22, 30, 345, 23500);
  upsert_flight('EA8236', 'EA-A08', 'SIN', 'DEL', 25, 7, 0, 345, 23500);
  upsert_flight('EA8237', 'EA-A03', 'MAA', 'SIN', 25, 9, 15, 260, 18000);
  upsert_flight('EA8238', 'EA-A03', 'SIN', 'MAA', 25, 15, 0, 260, 18000);
  upsert_flight('EA8239', 'EA-A07', 'BOM', 'LHR', 25, 2, 30, 570, 48000);
  upsert_flight('EA8240', 'EA-A07', 'LHR', 'BOM', 25, 13, 30, 570, 48000);
  upsert_flight('EA8241', 'EA-A06', 'DEL', 'PEK', 25, 3, 0, 360, 34000);
  upsert_flight('EA8242', 'EA-A06', 'PEK', 'DEL', 25, 11, 0, 360, 34000);
  upsert_flight('EA8243', 'EA-A08', 'DEL', 'XKS', 25, 23, 15, 450, 39000);
  upsert_flight('EA8244', 'EA-A08', 'XKS', 'DEL', 25, 10, 0, 450, 39000);
  -- Day +26
  upsert_flight('EA1989', 'EA-A03', 'BOM', 'DEL', 26, 6, 30, 130, 4800);
  upsert_flight('EA1990', 'EA-A03', 'DEL', 'BOM', 26, 10, 0, 130, 4800);
  upsert_flight('EA1991', 'EA-A01', 'BOM', 'BLR', 26, 7, 0, 105, 3800);
  upsert_flight('EA1992', 'EA-A01', 'BLR', 'BOM', 26, 10, 0, 105, 3800);
  upsert_flight('EA1993', 'EA-A03', 'DEL', 'BLR', 26, 13, 15, 165, 5600);
  upsert_flight('EA1994', 'EA-A03', 'BLR', 'DEL', 26, 17, 0, 165, 5600);
  upsert_flight('EA1995', 'EA-A02', 'BOM', 'CCU', 26, 8, 15, 155, 5100);
  upsert_flight('EA1996', 'EA-A02', 'CCU', 'BOM', 26, 12, 0, 155, 5100);
  upsert_flight('EA1997', 'EA-A02', 'BOM', 'HYD', 26, 16, 0, 90, 3400);
  upsert_flight('EA1998', 'EA-A02', 'HYD', 'BOM', 26, 18, 30, 90, 3400);
  upsert_flight('EA1999', 'EA-A05', 'BOM', 'MAA', 26, 9, 30, 120, 4200);
  upsert_flight('EA2000', 'EA-A05', 'MAA', 'BOM', 26, 12, 45, 120, 4200);
  upsert_flight('EA2001', 'EA-A02', 'BOM', 'GOI', 26, 6, 0, 75, 3200);
  upsert_flight('EA2002', 'EA-A02', 'GOI', 'BOM', 26, 21, 0, 75, 3200);
  upsert_flight('EA2003', 'EA-A02', 'BOM', 'COK', 26, 13, 30, 115, 4300);
  upsert_flight('EA2004', 'EA-A02', 'COK', 'BOM', 26, 16, 15, 115, 4300);
  upsert_flight('EA2005', 'EA-A03', 'BOM', 'AMD', 26, 7, 0, 70, 2900);
  upsert_flight('EA2006', 'EA-A03', 'AMD', 'BOM', 26, 8, 45, 70, 2900);
  upsert_flight('EA2007', 'EA-A03', 'DEL', 'JAI', 26, 18, 0, 55, 2700);
  upsert_flight('EA2008', 'EA-A03', 'JAI', 'DEL', 26, 19, 30, 55, 2700);
  upsert_flight('EA2009', 'EA-A04', 'DEL', 'GAU', 26, 10, 45, 150, 5400);
  upsert_flight('EA2010', 'EA-A04', 'GAU', 'DEL', 26, 14, 0, 150, 5400);
  upsert_flight('EA2011', 'EA-A05', 'DEL', 'SLV', 26, 7, 15, 60, 3500);
  upsert_flight('EA2012', 'EA-A05', 'SLV', 'DEL', 26, 9, 0, 60, 3500);
  upsert_flight('EA2013', 'EA-A05', 'BOM', 'NAG', 26, 13, 0, 85, 3500);
  upsert_flight('EA2014', 'EA-A05', 'NAG', 'BOM', 26, 15, 15, 85, 3500);
  upsert_flight('EA2015', 'EA-A01', 'BLR', 'VTZ', 26, 16, 45, 95, 3700);
  upsert_flight('EA2016', 'EA-A01', 'VTZ', 'BLR', 26, 19, 0, 95, 3700);
  upsert_flight('EA2017', 'EA-A01', 'PNQ', 'BOM', 26, 6, 0, 45, 2200);
  upsert_flight('EA2018', 'EA-A01', 'BOM', 'PNQ', 26, 22, 30, 45, 2200);
  upsert_flight('EA2019', 'EA-A02', 'PNQ', 'DEL', 26, 7, 30, 130, 4700);
  upsert_flight('EA2020', 'EA-A02', 'DEL', 'PNQ', 26, 21, 0, 130, 4700);
  upsert_flight('EA2021', 'EA-A02', 'BOM', 'JLG', 26, 8, 30, 60, 2500);
  upsert_flight('EA2022', 'EA-A02', 'JLG', 'BOM', 26, 10, 15, 60, 2500);
  upsert_flight('EA2023', 'EA-A01', 'PNQ', 'XBA', 26, 15, 0, 35, 1800);
  upsert_flight('EA2024', 'EA-A01', 'XBA', 'PNQ', 26, 16, 15, 35, 1800);
  upsert_flight('EA2025', 'EA-A02', 'PNQ', 'XKA', 26, 17, 30, 55, 2400);
  upsert_flight('EA2026', 'EA-A02', 'XKA', 'PNQ', 26, 19, 15, 55, 2400);
  upsert_flight('EA2027', 'EA-A05', 'NAG', 'XMK', 26, 17, 0, 45, 2100);
  upsert_flight('EA2028', 'EA-A05', 'XMK', 'NAG', 26, 18, 30, 45, 2100);
  upsert_flight('EA2029', 'EA-A01', 'CCU', 'XBO', 26, 8, 0, 50, 2200);
  upsert_flight('EA2030', 'EA-A01', 'XBO', 'CCU', 26, 9, 30, 50, 2200);
  upsert_flight('EA8245', 'EA-A06', 'BOM', 'DXB', 26, 8, 30, 210, 16500);
  upsert_flight('EA8246', 'EA-A06', 'DXB', 'BOM', 26, 13, 30, 210, 16500);
  upsert_flight('EA8247', 'EA-A04', 'CCU', 'BKK', 26, 7, 30, 165, 14000);
  upsert_flight('EA8248', 'EA-A04', 'BKK', 'CCU', 26, 12, 0, 165, 14000);
  upsert_flight('EA8249', 'EA-A08', 'DEL', 'LHR', 26, 1, 45, 540, 49500);
  upsert_flight('EA8250', 'EA-A08', 'LHR', 'DEL', 26, 12, 0, 540, 49500);
  upsert_flight('EA8251', 'EA-A07', 'CCU', 'PVG', 26, 1, 30, 330, 32000);
  upsert_flight('EA8252', 'EA-A07', 'PVG', 'CCU', 26, 9, 0, 330, 32000);
  -- Day +27
  upsert_flight('EA2031', 'EA-A03', 'BOM', 'DEL', 27, 6, 30, 130, 4800);
  upsert_flight('EA2032', 'EA-A03', 'DEL', 'BOM', 27, 10, 0, 130, 4800);
  upsert_flight('EA2033', 'EA-A01', 'BOM', 'BLR', 27, 7, 0, 105, 3800);
  upsert_flight('EA2034', 'EA-A01', 'BLR', 'BOM', 27, 10, 0, 105, 3800);
  upsert_flight('EA2035', 'EA-A03', 'DEL', 'BLR', 27, 13, 15, 165, 5600);
  upsert_flight('EA2036', 'EA-A03', 'BLR', 'DEL', 27, 17, 0, 165, 5600);
  upsert_flight('EA2037', 'EA-A01', 'DEL', 'CCU', 27, 13, 0, 135, 4600);
  upsert_flight('EA2038', 'EA-A01', 'CCU', 'DEL', 27, 16, 15, 135, 4600);
  upsert_flight('EA2039', 'EA-A04', 'DEL', 'HYD', 27, 8, 0, 135, 4500);
  upsert_flight('EA2040', 'EA-A04', 'HYD', 'DEL', 27, 11, 15, 135, 4500);
  upsert_flight('EA2041', 'EA-A04', 'DEL', 'MAA', 27, 14, 30, 170, 5800);
  upsert_flight('EA2042', 'EA-A04', 'MAA', 'DEL', 27, 18, 30, 170, 5800);
  upsert_flight('EA2043', 'EA-A02', 'BOM', 'GOI', 27, 6, 0, 75, 3200);
  upsert_flight('EA2044', 'EA-A02', 'GOI', 'BOM', 27, 21, 0, 75, 3200);
  upsert_flight('EA2045', 'EA-A04', 'DEL', 'BHO', 27, 6, 30, 85, 3300);
  upsert_flight('EA2046', 'EA-A04', 'BHO', 'DEL', 27, 8, 30, 85, 3300);
  upsert_flight('EA2047', 'EA-A01', 'DEL', 'PAT', 27, 6, 45, 95, 3600);
  upsert_flight('EA2048', 'EA-A01', 'PAT', 'DEL', 27, 9, 0, 95, 3600);
  upsert_flight('EA2049', 'EA-A03', 'DEL', 'IXL', 27, 6, 15, 85, 6200);
  upsert_flight('EA2050', 'EA-A03', 'IXL', 'DEL', 27, 8, 30, 85, 6200);
  upsert_flight('EA2051', 'EA-A04', 'DEL', 'RPR', 27, 15, 0, 110, 4100);
  upsert_flight('EA2052', 'EA-A04', 'RPR', 'DEL', 27, 17, 30, 110, 4100);
  upsert_flight('EA2053', 'EA-A01', 'PNQ', 'BOM', 27, 6, 0, 45, 2200);
  upsert_flight('EA2054', 'EA-A01', 'BOM', 'PNQ', 27, 22, 30, 45, 2200);
  upsert_flight('EA2055', 'EA-A05', 'BOM', 'KLH', 27, 10, 0, 55, 2600);
  upsert_flight('EA2056', 'EA-A05', 'KLH', 'BOM', 27, 11, 45, 55, 2600);
  upsert_flight('EA2057', 'EA-A03', 'BOM', 'XBA', 27, 11, 30, 50, 2300);
  upsert_flight('EA2058', 'EA-A03', 'XBA', 'BOM', 27, 13, 0, 50, 2300);
  upsert_flight('EA2059', 'EA-A01', 'PNQ', 'XNI', 27, 17, 15, 35, 1900);
  upsert_flight('EA2060', 'EA-A01', 'XNI', 'PNQ', 27, 18, 30, 35, 1900);
  upsert_flight('EA2061', 'EA-A02', 'HYD', 'XBD', 27, 11, 0, 55, 2400);
  upsert_flight('EA2062', 'EA-A02', 'XBD', 'HYD', 27, 12, 45, 55, 2400);
  upsert_flight('EA2063', 'EA-A04', 'DEL', 'XMR', 27, 12, 30, 75, 2900);
  upsert_flight('EA2064', 'EA-A04', 'XMR', 'DEL', 27, 14, 30, 75, 2900);
  upsert_flight('EA8253', 'EA-A08', 'DEL', 'DXB', 27, 9, 0, 240, 17500);
  upsert_flight('EA8254', 'EA-A08', 'DXB', 'DEL', 27, 14, 30, 240, 17500);
  upsert_flight('EA8255', 'EA-A06', 'BOM', 'SIN', 27, 23, 15, 330, 22000);
  upsert_flight('EA8256', 'EA-A06', 'SIN', 'BOM', 27, 7, 45, 330, 22000);
  upsert_flight('EA8257', 'EA-A04', 'DEL', 'BKK', 27, 18, 0, 250, 16800);
  upsert_flight('EA8258', 'EA-A04', 'BKK', 'DEL', 27, 23, 30, 250, 16800);
  upsert_flight('EA8259', 'EA-A06', 'BOM', 'CDG', 27, 2, 0, 580, 46000);
  upsert_flight('EA8260', 'EA-A06', 'CDG', 'BOM', 27, 13, 0, 580, 46000);
  upsert_flight('EA8261', 'EA-A07', 'BLR', 'LAX', 27, 23, 0, 1020, 68000);
  upsert_flight('EA8262', 'EA-A07', 'LAX', 'BLR', 27, 18, 0, 1020, 68000);
  -- Day +28
  upsert_flight('EA2065', 'EA-A03', 'BOM', 'DEL', 28, 6, 30, 130, 4800);
  upsert_flight('EA2066', 'EA-A03', 'DEL', 'BOM', 28, 10, 0, 130, 4800);
  upsert_flight('EA2067', 'EA-A01', 'BOM', 'BLR', 28, 7, 0, 105, 3800);
  upsert_flight('EA2068', 'EA-A01', 'BLR', 'BOM', 28, 10, 0, 105, 3800);
  upsert_flight('EA2069', 'EA-A03', 'DEL', 'BLR', 28, 13, 15, 165, 5600);
  upsert_flight('EA2070', 'EA-A03', 'BLR', 'DEL', 28, 17, 0, 165, 5600);
  upsert_flight('EA2071', 'EA-A02', 'BOM', 'CCU', 28, 8, 15, 155, 5100);
  upsert_flight('EA2072', 'EA-A02', 'CCU', 'BOM', 28, 12, 0, 155, 5100);
  upsert_flight('EA2073', 'EA-A02', 'BOM', 'HYD', 28, 16, 0, 90, 3400);
  upsert_flight('EA2074', 'EA-A02', 'HYD', 'BOM', 28, 18, 30, 90, 3400);
  upsert_flight('EA2075', 'EA-A05', 'BOM', 'MAA', 28, 9, 30, 120, 4200);
  upsert_flight('EA2076', 'EA-A05', 'MAA', 'BOM', 28, 12, 45, 120, 4200);
  upsert_flight('EA2077', 'EA-A02', 'BOM', 'GOI', 28, 6, 0, 75, 3200);
  upsert_flight('EA2078', 'EA-A02', 'GOI', 'BOM', 28, 21, 0, 75, 3200);
  upsert_flight('EA2079', 'EA-A02', 'BOM', 'COK', 28, 13, 30, 115, 4300);
  upsert_flight('EA2080', 'EA-A02', 'COK', 'BOM', 28, 16, 15, 115, 4300);
  upsert_flight('EA2081', 'EA-A03', 'BOM', 'AMD', 28, 7, 0, 70, 2900);
  upsert_flight('EA2082', 'EA-A03', 'AMD', 'BOM', 28, 8, 45, 70, 2900);
  upsert_flight('EA2083', 'EA-A03', 'DEL', 'JAI', 28, 18, 0, 55, 2700);
  upsert_flight('EA2084', 'EA-A03', 'JAI', 'DEL', 28, 19, 30, 55, 2700);
  upsert_flight('EA2085', 'EA-A04', 'DEL', 'GAU', 28, 10, 45, 150, 5400);
  upsert_flight('EA2086', 'EA-A04', 'GAU', 'DEL', 28, 14, 0, 150, 5400);
  upsert_flight('EA2087', 'EA-A05', 'DEL', 'SLV', 28, 7, 15, 60, 3500);
  upsert_flight('EA2088', 'EA-A05', 'SLV', 'DEL', 28, 9, 0, 60, 3500);
  upsert_flight('EA2089', 'EA-A05', 'BOM', 'NAG', 28, 13, 0, 85, 3500);
  upsert_flight('EA2090', 'EA-A05', 'NAG', 'BOM', 28, 15, 15, 85, 3500);
  upsert_flight('EA2091', 'EA-A01', 'BLR', 'VTZ', 28, 16, 45, 95, 3700);
  upsert_flight('EA2092', 'EA-A01', 'VTZ', 'BLR', 28, 19, 0, 95, 3700);
  upsert_flight('EA2093', 'EA-A01', 'PNQ', 'BOM', 28, 6, 0, 45, 2200);
  upsert_flight('EA2094', 'EA-A01', 'BOM', 'PNQ', 28, 22, 30, 45, 2200);
  upsert_flight('EA2095', 'EA-A02', 'PNQ', 'DEL', 28, 7, 30, 130, 4700);
  upsert_flight('EA2096', 'EA-A02', 'DEL', 'PNQ', 28, 21, 0, 130, 4700);
  upsert_flight('EA2097', 'EA-A02', 'BOM', 'JLG', 28, 8, 30, 60, 2500);
  upsert_flight('EA2098', 'EA-A02', 'JLG', 'BOM', 28, 10, 15, 60, 2500);
  upsert_flight('EA2099', 'EA-A01', 'PNQ', 'XBA', 28, 15, 0, 35, 1800);
  upsert_flight('EA2100', 'EA-A01', 'XBA', 'PNQ', 28, 16, 15, 35, 1800);
  upsert_flight('EA2101', 'EA-A02', 'PNQ', 'XKA', 28, 17, 30, 55, 2400);
  upsert_flight('EA2102', 'EA-A02', 'XKA', 'PNQ', 28, 19, 15, 55, 2400);
  upsert_flight('EA2103', 'EA-A05', 'NAG', 'XMK', 28, 17, 0, 45, 2100);
  upsert_flight('EA2104', 'EA-A05', 'XMK', 'NAG', 28, 18, 30, 45, 2100);
  upsert_flight('EA2105', 'EA-A01', 'CCU', 'XBO', 28, 8, 0, 50, 2200);
  upsert_flight('EA2106', 'EA-A01', 'XBO', 'CCU', 28, 9, 30, 50, 2200);
  upsert_flight('EA8263', 'EA-A06', 'BOM', 'DXB', 28, 8, 30, 210, 16500);
  upsert_flight('EA8264', 'EA-A06', 'DXB', 'BOM', 28, 13, 30, 210, 16500);
  upsert_flight('EA8265', 'EA-A08', 'DEL', 'SIN', 28, 22, 30, 345, 23500);
  upsert_flight('EA8266', 'EA-A08', 'SIN', 'DEL', 28, 7, 0, 345, 23500);
  upsert_flight('EA8267', 'EA-A07', 'BLR', 'SIN', 28, 8, 0, 290, 19500);
  upsert_flight('EA8268', 'EA-A07', 'SIN', 'BLR', 28, 14, 30, 290, 19500);
  upsert_flight('EA8269', 'EA-A08', 'DEL', 'YYZ', 28, 22, 0, 960, 65000);
  upsert_flight('EA8270', 'EA-A08', 'YYZ', 'DEL', 28, 16, 0, 960, 65000);
  -- Day +29
  upsert_flight('EA2107', 'EA-A03', 'BOM', 'DEL', 29, 6, 30, 130, 4800);
  upsert_flight('EA2108', 'EA-A03', 'DEL', 'BOM', 29, 10, 0, 130, 4800);
  upsert_flight('EA2109', 'EA-A01', 'BOM', 'BLR', 29, 7, 0, 105, 3800);
  upsert_flight('EA2110', 'EA-A01', 'BLR', 'BOM', 29, 10, 0, 105, 3800);
  upsert_flight('EA2111', 'EA-A03', 'DEL', 'BLR', 29, 13, 15, 165, 5600);
  upsert_flight('EA2112', 'EA-A03', 'BLR', 'DEL', 29, 17, 0, 165, 5600);
  upsert_flight('EA2113', 'EA-A01', 'DEL', 'CCU', 29, 13, 0, 135, 4600);
  upsert_flight('EA2114', 'EA-A01', 'CCU', 'DEL', 29, 16, 15, 135, 4600);
  upsert_flight('EA2115', 'EA-A04', 'DEL', 'HYD', 29, 8, 0, 135, 4500);
  upsert_flight('EA2116', 'EA-A04', 'HYD', 'DEL', 29, 11, 15, 135, 4500);
  upsert_flight('EA2117', 'EA-A04', 'DEL', 'MAA', 29, 14, 30, 170, 5800);
  upsert_flight('EA2118', 'EA-A04', 'MAA', 'DEL', 29, 18, 30, 170, 5800);
  upsert_flight('EA2119', 'EA-A02', 'BOM', 'GOI', 29, 6, 0, 75, 3200);
  upsert_flight('EA2120', 'EA-A02', 'GOI', 'BOM', 29, 21, 0, 75, 3200);
  upsert_flight('EA2121', 'EA-A04', 'DEL', 'BHO', 29, 6, 30, 85, 3300);
  upsert_flight('EA2122', 'EA-A04', 'BHO', 'DEL', 29, 8, 30, 85, 3300);
  upsert_flight('EA2123', 'EA-A01', 'DEL', 'PAT', 29, 6, 45, 95, 3600);
  upsert_flight('EA2124', 'EA-A01', 'PAT', 'DEL', 29, 9, 0, 95, 3600);
  upsert_flight('EA2125', 'EA-A03', 'DEL', 'IXL', 29, 6, 15, 85, 6200);
  upsert_flight('EA2126', 'EA-A03', 'IXL', 'DEL', 29, 8, 30, 85, 6200);
  upsert_flight('EA2127', 'EA-A04', 'DEL', 'RPR', 29, 15, 0, 110, 4100);
  upsert_flight('EA2128', 'EA-A04', 'RPR', 'DEL', 29, 17, 30, 110, 4100);
  upsert_flight('EA2129', 'EA-A01', 'PNQ', 'BOM', 29, 6, 0, 45, 2200);
  upsert_flight('EA2130', 'EA-A01', 'BOM', 'PNQ', 29, 22, 30, 45, 2200);
  upsert_flight('EA2131', 'EA-A05', 'BOM', 'KLH', 29, 10, 0, 55, 2600);
  upsert_flight('EA2132', 'EA-A05', 'KLH', 'BOM', 29, 11, 45, 55, 2600);
  upsert_flight('EA2133', 'EA-A03', 'BOM', 'XBA', 29, 11, 30, 50, 2300);
  upsert_flight('EA2134', 'EA-A03', 'XBA', 'BOM', 29, 13, 0, 50, 2300);
  upsert_flight('EA2135', 'EA-A01', 'PNQ', 'XNI', 29, 17, 15, 35, 1900);
  upsert_flight('EA2136', 'EA-A01', 'XNI', 'PNQ', 29, 18, 30, 35, 1900);
  upsert_flight('EA2137', 'EA-A02', 'HYD', 'XBD', 29, 11, 0, 55, 2400);
  upsert_flight('EA2138', 'EA-A02', 'XBD', 'HYD', 29, 12, 45, 55, 2400);
  upsert_flight('EA2139', 'EA-A04', 'DEL', 'XMR', 29, 12, 30, 75, 2900);
  upsert_flight('EA2140', 'EA-A04', 'XMR', 'DEL', 29, 14, 30, 75, 2900);
  upsert_flight('EA8271', 'EA-A06', 'BOM', 'SIN', 29, 23, 15, 330, 22000);
  upsert_flight('EA8272', 'EA-A06', 'SIN', 'BOM', 29, 7, 45, 330, 22000);
  upsert_flight('EA8273', 'EA-A03', 'MAA', 'SIN', 29, 9, 15, 260, 18000);
  upsert_flight('EA8274', 'EA-A03', 'SIN', 'MAA', 29, 15, 0, 260, 18000);
  upsert_flight('EA8275', 'EA-A06', 'BOM', 'GIG', 29, 1, 0, 1140, 72000);
  upsert_flight('EA8276', 'EA-A06', 'GIG', 'BOM', 29, 20, 0, 1140, 72000);
END;
/

-- =============================================================================
-- 5. STAFF REGISTRY (Pre-assigned Staff IDs for Airline Staff Registration)
-- =============================================================================

MERGE INTO StaffRegistry sr
USING (
  SELECT 'EA-STF001' AS StaffID FROM DUAL UNION ALL
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
  SELECT 'EA-STF020' FROM DUAL
) src
ON (sr.StaffID = src.StaffID)
WHEN NOT MATCHED THEN
  INSERT (StaffID, IsAssigned) VALUES (src.StaffID, 0);

COMMIT;

-- =============================================================================
-- 6. VERIFICATION & SUMMARY QUERY
-- =============================================================================

SELECT 'Airports (Total)' AS Entity, COUNT(*) AS TotalCount FROM Airports
UNION ALL
SELECT 'Airports (Real)', COUNT(*) FROM Airports WHERE AirportCode NOT LIKE 'X%'
UNION ALL
SELECT 'Airports (Demo/Fictional)', COUNT(*) FROM Airports WHERE AirportCode LIKE 'X%'
UNION ALL
SELECT 'Aircraft Fleet', COUNT(*) FROM Aircraft WHERE TailNumber LIKE 'EA-%'
UNION ALL
SELECT 'Aircraft Seats (Total Inventory)', COUNT(*) FROM AircraftSeats WHERE AircraftID IN (SELECT AircraftID FROM Aircraft WHERE TailNumber LIKE 'EA-%')
UNION ALL
SELECT 'Scheduled Flights (Total)', COUNT(*) FROM Flights WHERE FlightNumber LIKE 'EA%'
UNION ALL
SELECT 'Scheduled Flights (Domestic)', COUNT(*) FROM Flights F JOIN Airports A1 ON F.DepartureAirport = A1.AirportCode JOIN Airports A2 ON F.ArrivalAirport = A2.AirportCode WHERE F.FlightNumber LIKE 'EA%' AND A1.Country = 'India' AND A2.Country = 'India'
UNION ALL
SELECT 'Scheduled Flights (International)', COUNT(*) FROM Flights F JOIN Airports A1 ON F.DepartureAirport = A1.AirportCode JOIN Airports A2 ON F.ArrivalAirport = A2.AirportCode WHERE F.FlightNumber LIKE 'EA%' AND (A1.Country != 'India' OR A2.Country != 'India')
UNION ALL
SELECT 'Staff Registry (Pre-assigned IDs)', COUNT(*) FROM StaffRegistry;

