'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { NavigationHeader } from '@/components/shared/NavigationHeader';
import { NotificationToast } from '@/components/shared/NotificationToast';
import { TripHealthGauge } from '@/components/shared/TripHealthGauge';
import { useTraverseStore } from '@/lib/store/useTraverseStore';
import { getRouteNudge, getLocalPulseAdvisories } from '@/lib/mock-engine';

export default function LiveTripHomePage() {
  const router = useRouter();
  const { activeTrip, disruptionSimulated, triggerDisruptionEvent } = useTraverseStore();

  const routeNudge = getRouteNudge();
  const pulseAdvisories = getLocalPulseAdvisories();

  const day4 = activeTrip.days.find((d) => d.dayNumber === 4) || activeTrip.days[0];
  const currentActivity = day4.items[0];
  const nextActivity = day4.items[1];

  const handleFixTrip = () => {
    router.push(`/trip/${activeTrip.id}/fix`);
  };

  const handlePostTrip = () => {
    router.push(`/trip/${activeTrip.id}/review`);
  };

  return (
    <div className="min-h-screen">
      <NavigationHeader />
      <NotificationToast />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* DISRUPTION HERO BANNER (If Disruption Active) */}
        {disruptionSimulated ? (
          <div className="neo-card p-8 bg-[#FF6584] text-white mb-8 border-4 border-slate-900 shadow-[8px_8px_0px_#0F172A] animate-pulse">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-cartoon font-black px-3 py-1 rounded-full bg-slate-900 text-white uppercase">
                    MID-TRIP DISRUPTION DETECTED
                  </span>
                  <span className="text-xs font-extrabold bg-[#FEE440] text-slate-900 px-3 py-1 rounded-full font-heading">
                    11:15 AM
                  </span>
                </div>
                <h2 className="font-cartoon text-3xl font-black">
                  Heritage Lakefront Resort Cancelled Booking!
                </h2>
                <p className="text-sm font-bold font-heading opacity-95 max-w-2xl mt-2 leading-relaxed">
                  Emergency plumbing maintenance detected at Udaipur stay. 2 downstream activities affected. AI system prepared 3 ranked fix options.
                </p>
              </div>

              <button
                onClick={handleFixTrip}
                className="neo-btn-yellow text-base py-4 px-8 font-cartoon font-black shrink-0 shadow-[4px_4px_0px_#0F172A]"
              >
                <span>Fix My Trip (1-Click Replan)</span>
                <span className="font-mono text-xl">→</span>
              </button>
            </div>
          </div>
        ) : (
          /* Normal Live Status Banner */
          <div className="neo-card p-6 bg-[#00F5D4] border-3 border-slate-900 shadow-[5px_5px_0px_#0F172A] mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-black uppercase text-slate-800 tracking-wider">LIVE TRIP SENTINEL</span>
              <h3 className="font-cartoon text-2xl font-black text-slate-900 mt-1">
                Day 4 of 7 · Jodhpur to Udaipur Passage
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={triggerDisruptionEvent}
                className="neo-btn-primary text-xs sm:text-sm py-2.5 px-4 bg-[#FF6584] font-cartoon font-extrabold"
              >
                <span>Test Hotel Cancellation Event</span>
              </button>
              <button
                onClick={handlePostTrip}
                className="neo-btn-secondary text-xs sm:text-sm py-2.5 px-4 font-cartoon font-extrabold"
              >
                <span>Complete Trip & Review</span>
              </button>
            </div>
          </div>
        )}

        {/* Local Pulse Advisory Strip [T12] */}
        <div className="neo-card p-6 bg-white mb-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h4 className="font-cartoon text-xl font-extrabold text-slate-900">Local Pulse Advisory Strip</h4>
            <span className="text-xs font-black px-3 py-1 rounded-full bg-[#00F5D4] border border-slate-900">
              SOURCED REAL-TIME FEEDS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pulseAdvisories.map((adv) => (
              <div key={adv.id} className="p-4 rounded-xl bg-slate-50 border-2 border-slate-900 text-xs sm:text-sm font-bold font-heading">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-extrabold text-slate-900">Location: {adv.location}</span>
                  <span>{adv.timestamp}</span>
                </div>
                <p className="text-slate-800 text-xs sm:text-sm leading-snug font-semibold">{adv.message}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200">
                  <span>Source: {adv.source}</span>
                  <span className="text-green-700 font-black">{Math.round(adv.confidence * 100)}% confidence</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grid: Live Activity Cards + Health & Route Nudge */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Activities Column (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Activity Card */}
            <div className="neo-card p-6 bg-white border-3 border-slate-900 shadow-[5px_5px_0px_#0F172A]">
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-cartoon font-black px-3.5 py-1 rounded-full bg-[#FEE440] border border-slate-900 uppercase">
                  NOW IN PROGRESS · 11:30 AM
                </span>
                <span className="text-xs font-bold text-slate-600 font-heading">26°C Sunny</span>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="w-full sm:w-40 h-32 rounded-xl border-2 border-slate-900 overflow-hidden shrink-0">
                  <img
                    src={currentActivity?.imageUrl || activeTrip.coverImage}
                    alt={currentActivity?.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-cartoon text-2xl font-extrabold text-slate-900 mb-2">
                    {currentActivity?.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-extrabold text-slate-600 font-heading mb-3">
                    Location: {currentActivity?.location.label}
                  </p>

                  <p className="text-xs sm:text-sm font-bold text-slate-700 font-heading bg-slate-50 p-3 rounded-xl border-2 border-slate-900">
                    Ramesh & Savitri are comfortably seated in the AC Tempo Traveler while crossing the Aravali mountain pass. Next stop: Ranakpur Jain Temple.
                  </p>
                </div>
              </div>
            </div>

            {/* Next Activity Card */}
            <div className="neo-card p-6 bg-white">
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-cartoon font-black px-3.5 py-1 rounded-full bg-slate-100 border border-slate-900 uppercase">
                  NEXT UP · 02:00 PM
                </span>
                <span className="text-xs font-bold text-slate-600 font-heading">Day 4 Hotel Check-In</span>
              </div>

              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div>
                  <h3 className="font-cartoon text-xl font-extrabold text-slate-900 mb-2">
                    {nextActivity?.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-slate-600 font-heading">
                    Location: {nextActivity?.location.label}
                  </p>
                </div>

                <div className="shrink-0">
                  {nextActivity?.status === 'cancelled' || disruptionSimulated ? (
                    <button
                      onClick={handleFixTrip}
                      className="neo-btn-primary text-xs sm:text-sm py-2.5 px-4 bg-red-500 border-2 border-slate-900 font-cartoon font-black animate-bounce"
                    >
                      CANCELLED · FIX NOW
                    </button>
                  ) : (
                    <span className="text-xs font-cartoon font-black px-3.5 py-1.5 rounded-full bg-[#00F5D4] border border-slate-900">
                      CONFIRMED
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Experience-Aware Route Nudge [T11] */}
            <div className="neo-card p-6 bg-[#FFFDF7] border-3 border-slate-900 shadow-[5px_5px_0px_#0F172A]">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-cartoon font-black px-3 py-1 rounded-full bg-[#C77DFF] text-slate-900 border border-slate-900">
                  IN-TRANSIT ROUTE NUDGE
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="w-full sm:w-36 h-28 rounded-xl border-2 border-slate-900 overflow-hidden shrink-0">
                  <img src={routeNudge.imageUrl} alt={routeNudge.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-cartoon text-xl font-extrabold text-slate-900">
                      {routeNudge.title}
                    </h4>
                    <span className="text-xs font-cartoon font-extrabold px-2.5 py-0.5 rounded bg-[#00F5D4] border border-slate-900">
                      {routeNudge.matchPercent}% Match
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold font-heading text-slate-700 mb-3">
                    {routeNudge.description}
                  </p>

                  <div className="flex items-center gap-5 text-xs sm:text-sm font-extrabold font-heading text-slate-800">
                    <span>Detour: {routeNudge.distanceMeter}m</span>
                    <span>Time: +{routeNudge.extraMins} mins</span>
                    <span>Cost: +₹{routeNudge.extraCost}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Column (1 col): Trip Health & Actions */}
          <div className="space-y-6">
            <TripHealthGauge score={activeTrip.tripHealth} />

            <div className="neo-card p-6 bg-white space-y-4">
              <h4 className="font-cartoon text-xl font-extrabold text-slate-900">Live Trip Quick Actions</h4>
              <button
                onClick={() => router.push('/copilot')}
                className="w-full neo-btn-secondary text-xs sm:text-sm py-3 font-cartoon font-extrabold justify-between"
              >
                <span>Ask घुmo Copilot a Question</span>
                <span className="font-mono text-base font-black">→</span>
              </button>
              <button
                onClick={() => router.push(`/itinerary/${activeTrip.id}`)}
                className="w-full neo-btn-secondary text-xs sm:text-sm py-3 font-cartoon font-extrabold justify-between"
              >
                <span>View Full 7-Day Itinerary</span>
                <span className="font-mono text-base font-black">→</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
