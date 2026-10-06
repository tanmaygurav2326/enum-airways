import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  CheckCircle2,
  Plane,
  UserCheck,
  CreditCard,
  RotateCcw,
  Clock,
  Luggage,
  ShieldCheck,
  AlertTriangle,
  Lock,
  Info,
  Scale,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  ExternalLink
} from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#172B4D] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Page Header */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-xs font-bold bg-[#DEEBFF] text-[#0052CC]">
            <FileText className="w-3.5 h-3.5" />
            <span>Enum Airways Policies</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#091E42] tracking-tight font-display">
            Terms & Conditions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Last Updated: October 6, 2026 • Official Terms of Use and Flight Conditions
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-6 text-sm text-slate-700 leading-relaxed">

          {/* 1. Acceptance of Terms */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center space-x-3 text-[#0052CC]">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <h2 className="text-xl font-bold text-[#091E42] font-display">1. Acceptance of Terms</h2>
            </div>
            <p>
              By accessing, browsing, or using the Enum Airways website, reservation portal, or digital travel services, you acknowledge that you have read, understood, and agreed to be legally bound by these Terms & Conditions. If you do not agree with any part of these terms, you must refrain from using our online booking platform.
            </p>
          </div>

          {/* 2. Flight Booking */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center space-x-3 text-[#0052CC]">
              <Plane className="w-5 h-5 flex-shrink-0" />
              <h2 className="text-xl font-bold text-[#091E42] font-display">2. Flight Booking & Information Accuracy</h2>
            </div>
            <p>
              When creating a reservation, users must ensure all passenger information—including full legal name, contact telephone number, and email address—is accurate and matches government-issued identification.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>All displayed fares, schedules, and seat allocations remain subject to availability until payment is successfully processed.</li>
              <li>Flight bookings are non-transferable to another individual once issued.</li>
              <li>Incorrect passenger details may lead to boarding refusal at the airport terminal.</li>
            </ul>
          </div>

          {/* 3. Passenger Responsibilities */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center space-x-3 text-[#0052CC]">
              <UserCheck className="w-5 h-5 flex-shrink-0" />
              <h2 className="text-xl font-bold text-[#091E42] font-display">3. Passenger Responsibilities & Documentation</h2>
            </div>
            <p>
              Travelers are solely responsible for carrying valid government-approved photo identification (such as Aadhaar Card, Passport, Driving License, or Voter ID for domestic Indian travel) and relevant visas or travel permits for international flights.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Passengers must arrive at airport check-in counters and boarding gates well before published closure times.</li>
              <li>Passengers must comply with all security screening protocols and cabin crew safety instructions.</li>
            </ul>
          </div>

          {/* 4. Payments & Confirmation */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center space-x-3 text-[#0052CC]">
              <CreditCard className="w-5 h-5 flex-shrink-0" />
              <h2 className="text-xl font-bold text-[#091E42] font-display">4. Payments & Booking Confirmation</h2>
            </div>
            <p>
              A booking is officially confirmed only upon successful processing of payment and generation of a 6-character Booking Reference (PNR). 
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Passengers must retain their Booking Reference (PNR) to access e-tickets, select seats, or manage flight itineraries.</li>
              <li>Enum Airways reserves the right to cancel unconfirmed reservations if payment verification fails.</li>
            </ul>
          </div>

          {/* 5. Cancellation & Refunds */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center space-x-3 text-[#0052CC]">
              <RotateCcw className="w-5 h-5 flex-shrink-0" />
              <h2 className="text-xl font-bold text-[#091E42] font-display">5. Cancellation, Modifications & Refunds</h2>
            </div>
            <p>
              All ticket modifications, itinerary changes, and cancellations are subject to the specific fare rules of the selected cabin tier (Economy, Premium Economy, Business, First).
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Eligible refund amounts will be credited back to the original method of payment within standard processing timelines.</li>
              <li>Applicable processing or cancellation fees displayed during booking will be deducted prior to refund issuance.</li>
            </ul>
          </div>

          {/* 6. Flight Changes */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center space-x-3 text-[#0052CC]">
              <Clock className="w-5 h-5 flex-shrink-0" />
              <h2 className="text-xl font-bold text-[#091E42] font-display">6. Operational Adjustments & Flight Changes</h2>
            </div>
            <p>
              While Enum Airways makes every effort to operate strictly according to published schedules, flight times, aircraft models, and route operations may be altered due to adverse weather, air traffic control directives, safety requirements, or operational necessities.
            </p>
          </div>

          {/* 7. Baggage */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center space-x-3 text-[#0052CC]">
              <Luggage className="w-5 h-5 flex-shrink-0" />
              <h2 className="text-xl font-bold text-[#091E42] font-display">7. Baggage Allowance & Regulations</h2>
            </div>
            <p>
              Cabin baggage and checked luggage dimensions, weight allowances, prohibited items, and excess baggage charges are strictly governed by our dedicated{' '}
              <Link to="/baggage-rules" className="text-[#0052CC] font-bold hover:underline">
                Baggage Rules
              </Link>{' '}
              page.
            </p>
          </div>

          {/* 8. Account Security */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center space-x-3 text-[#0052CC]">
              <ShieldCheck className="w-5 h-5 flex-shrink-0" />
              <h2 className="text-xl font-bold text-[#091E42] font-display">8. Account Security & Credentials</h2>
            </div>
            <p>
              Users with registered Enum Airways accounts are responsible for maintaining the confidentiality of their login details (email and password). You agree to notify us immediately of any unauthorized access or security breach involving your account.
            </p>
          </div>

          {/* 9. Acceptable Website Use */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center space-x-3 text-amber-600">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <h2 className="text-xl font-bold text-[#091E42] font-display">9. Acceptable Website Use</h2>
            </div>
            <p>
              Users agree to utilize this website exclusively for legitimate flight inquiries and bookings. You shall not:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Make speculative, false, or fraudulent reservations.</li>
              <li>Use automated tools, bots, or scrapers to extract data or compromise system performance.</li>
              <li>Attempt unauthorized access to administrative portals, user databases, or server infrastructure.</li>
            </ul>
          </div>

          {/* 10. Privacy */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center space-x-3 text-[#0052CC]">
              <Lock className="w-5 h-5 flex-shrink-0" />
              <h2 className="text-xl font-bold text-[#091E42] font-display">10. Privacy & Data Protection</h2>
            </div>
            <p>
              Your personal information is collected, processed, and secured in strict compliance with our separate{' '}
              <Link to="/privacy" className="text-[#0052CC] font-bold hover:underline">
                Privacy Policy
              </Link>
              , which forms an integral part of these Terms & Conditions.
            </p>
          </div>

          {/* 11. Limitation of Liability */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center space-x-3 text-[#0052CC]">
              <Info className="w-5 h-5 flex-shrink-0" />
              <h2 className="text-xl font-bold text-[#091E42] font-display">11. Limitation of Liability</h2>
            </div>
            <p>
              Enum Airways makes reasonable efforts to ensure the accuracy of schedules and fare information on this website. However, we do not guarantee uninterrupted, error-free website operation and shall not be liable for indirect loss or disruption resulting from unforeseen technical outages.
            </p>
          </div>

          {/* 12. Governing Law */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center space-x-3 text-[#0052CC]">
              <Scale className="w-5 h-5 flex-shrink-0" />
              <h2 className="text-xl font-bold text-[#091E42] font-display">12. Governing Law & Jurisdiction</h2>
            </div>
            <p>
              These Terms & Conditions shall be governed by and interpreted in accordance with the applicable laws of India. Any legal claims or disputes shall be subject to the jurisdiction of competent courts in Maharashtra, India.
            </p>
          </div>

          {/* 13. Changes to Terms */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center space-x-3 text-[#0052CC]">
              <RefreshCw className="w-5 h-5 flex-shrink-0" />
              <h2 className="text-xl font-bold text-[#091E42] font-display">13. Changes to Terms</h2>
            </div>
            <p>
              Enum Airways reserves the right to amend, update, or modify these Terms & Conditions at any time. Any changes will be published on this page with the updated revision date.
            </p>
          </div>

          {/* Contact Support Section */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-[#091E42] font-display">Customer Support & Grievance Desk</h2>
            <p className="text-xs text-slate-500">
              For inquiries regarding these Terms & Conditions or assistance with your reservations, please contact our support desk:
            </p>
            <div className="bg-[#F8F9FA] p-4 rounded-xl border border-slate-200 space-y-2.5 text-xs text-slate-700">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#0052CC]" />
                <span>Support Email: </span>
                <a
                  href="mailto:tanmaygurav2326@gmail.com?subject=Enum%20Airways%20Terms%20Inquiry"
                  className="text-[#0052CC] font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>Contact Support via Mail</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#0052CC]" />
                <span>Toll-Free Helpline: <strong>8999147294</strong></span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#0052CC] mt-0.5" />
                <span>Registered Office: B-hostel, Government Polytechnic, Shivajinagar, Pune - 411016</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Terms;
