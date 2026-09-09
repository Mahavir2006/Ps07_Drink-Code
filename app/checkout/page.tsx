'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NavigationHeader } from '@/components/shared/NavigationHeader';
import { NotificationToast } from '@/components/shared/NotificationToast';
import { useTraverseStore } from '@/lib/store/useTraverseStore';
import confetti from 'canvas-confetti';

export default function CheckoutPage() {
  const router = useRouter();
  const { activeTrip } = useTraverseStore();
  const [isBooked, setIsBooked] = useState(false);

  const handleCompleteBooking = () => {
    setIsBooked(true);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      console.log('Confetti triggered');
    }
  };

  return (
    <div className="min-h-screen">
      <NavigationHeader />
      <NotificationToast />

      <main className="max-w-4xl mx-auto px-4 py-12">
        {isBooked ? (
          /* Confirmation Receipt */
          <div className="neo-card p-10 bg-white text-center max-w-2xl mx-auto border-4 border-slate-900 shadow-[10px_10px_0px_#0F172A] animate-fadeIn">
            <span className="text-xs font-cartoon font-extrabold px-4 py-1.5 rounded-full bg-[#FEE440] border-2 border-slate-900 uppercase tracking-wide">
              CONFIRMED TOUR BOOKING #TRV-101
            </span>

            <h1 className="font-cartoon text-4xl font-black text-slate-900 mt-4 mb-3">
              Tour Confirmed & Operator Connected
            </h1>
            <p className="font-heading text-sm sm:text-base font-bold text-slate-700 mb-8 max-w-lg mx-auto">
              Your 7-day Rajasthan family itinerary is live in the घुmo Control Tower. Operator Lead Priya is assigned to monitor your trip status in real-time.
            </p>

            <div className="p-6 rounded-2xl bg-pink-50 border-3 border-slate-900 text-left mb-8 space-y-3 text-sm sm:text-base font-bold font-heading">
              <div className="flex justify-between">
                <span>Trip Title:</span>
                <span className="font-cartoon text-slate-900 font-extrabold">{activeTrip.title}</span>
              </div>
              <div className="flex justify-between">
                <span>Travelers:</span>
                <span className="text-slate-900 font-extrabold">Sharma Family (6 Pax)</span>
              </div>
              <div className="flex justify-between">
                <span>Total Amount:</span>
                <span className="font-cartoon text-xl text-[#FF6584] font-black">
                  ₹{activeTrip.budgetSpent.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-green-700">
                <span>Operational Sentinel:</span>
                <span className="font-black">Active 24x7</span>
              </div>
            </div>

            <button
              onClick={() => router.push(`/trip/${activeTrip.id}`)}
              className="neo-btn-primary py-4 px-8 text-base sm:text-lg font-cartoon font-extrabold w-full justify-center shadow-[4px_4px_0px_#0F172A]"
            >
              <span>Go to Live Trip Home Dashboard</span>
              <span className="font-mono text-xl">→</span>
            </button>
          </div>
        ) : (
          /* Checkout Summary */
          <div>
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs font-cartoon font-extrabold px-3.5 py-1.5 rounded-full bg-[#FF6584] text-white border-2 border-slate-900 uppercase">
                STEP 3 OF 3 · COMPLETE BOOKING
              </span>
              <h1 className="font-cartoon text-4xl sm:text-5xl font-black text-slate-900 mt-3">
                Review & Confirm Tour Package
              </h1>
              <p className="font-heading text-sm sm:text-base font-bold text-slate-700 mt-2">
                100% Guaranteed Vendor Fulfillment with Live Operational Monitoring.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Items Breakdown (2 cols) */}
              <div className="md:col-span-2 space-y-6">
                <div className="neo-card p-8 bg-white">
                  <h3 className="font-cartoon text-2xl font-extrabold text-slate-900 mb-6">
                    Selected Tour Components
                  </h3>

                  <div className="space-y-4 font-heading text-xs sm:text-sm font-bold">
                    <div className="p-4 rounded-xl bg-slate-50 border-2 border-slate-900 flex justify-between items-center">
                      <div>
                        <span className="text-xs text-slate-500 font-extrabold block uppercase">Hotel Stay (Jaipur)</span>
                        <span className="text-slate-900 font-cartoon text-base font-bold">Samode Haveli Heritage Family Suite</span>
                      </div>
                      <span className="font-cartoon text-base font-extrabold">₹14,500</span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border-2 border-slate-900 flex justify-between items-center">
                      <div>
                        <span className="text-xs text-slate-500 font-extrabold block uppercase">Transport (7 Days)</span>
                        <span className="text-slate-900 font-cartoon text-base font-bold">Private AC Tempo Traveler + Driver</span>
                      </div>
                      <span className="font-cartoon text-base font-extrabold">₹14,300</span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border-2 border-slate-900 flex justify-between items-center">
                      <div>
                        <span className="text-xs text-slate-500 font-extrabold block uppercase">Hotel Stay (Udaipur)</span>
                        <span className="text-slate-900 font-cartoon text-base font-bold">Heritage Lakefront Palace Resort</span>
                      </div>
                      <span className="font-cartoon text-base font-extrabold">₹16,000</span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border-2 border-slate-900 flex justify-between items-center">
                      <div>
                        <span className="text-xs text-slate-500 font-extrabold block uppercase">Activities & Dining</span>
                        <span className="text-slate-900 font-cartoon text-base font-bold">Solar Boat, Amber Fort Golf Carts & Thalis</span>
                      </div>
                      <span className="font-cartoon text-base font-extrabold">₹6,400</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Box (1 col) */}
              <div className="neo-card p-8 bg-[#FFFDF7] flex flex-col justify-between">
                <div>
                  <h3 className="font-cartoon text-2xl font-extrabold text-slate-900 mb-4">Order Total</h3>
                  <div className="space-y-3 text-sm font-bold font-heading text-slate-700 mb-6 pb-6 border-b-2 border-slate-300">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹51,200</span>
                    </div>
                    <div className="flex justify-between text-green-700">
                      <span>Group Discount (6 Pax)</span>
                      <span>-₹2,700</span>
                    </div>
                    <div className="flex justify-between font-cartoon text-xl font-black text-slate-900 pt-3">
                      <span>Total Payable</span>
                      <span className="text-[#FF6584]">
                        ₹{activeTrip.budgetSpent.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-yellow-50 border-2 border-slate-900 text-xs sm:text-sm font-bold font-heading text-slate-800 mb-6">
                    <b>Demonstration Gateway:</b> Hackathon simulation mode — no actual charge.
                  </div>
                </div>

                <button
                  onClick={handleCompleteBooking}
                  className="neo-btn-primary py-4 px-6 font-cartoon font-extrabold text-base w-full justify-center shadow-[4px_4px_0px_#0F172A]"
                >
                  <span>Confirm & Book Tour</span>
                  <span className="font-mono text-xl">→</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
