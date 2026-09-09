'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NavigationHeader } from '@/components/shared/NavigationHeader';
import { NotificationToast } from '@/components/shared/NotificationToast';
import { ExplainCard } from '@/components/shared/ExplainCard';
import { BudgetMeter } from '@/components/shared/BudgetMeter';
import { useTraverseStore } from '@/lib/store/useTraverseStore';

export default function ItineraryBuilderPage() {
  const router = useRouter();
  const { activeTrip, disruptionSimulated } = useTraverseStore();
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const days = activeTrip.days;
  const currentDay = days[activeDayIndex] || days[0];

  const handleCheckout = () => {
    router.push('/checkout');
  };

  const handleViewLiveTrip = () => {
    router.push(`/trip/${activeTrip.id}`);
  };

  const handleFixTrip = () => {
    router.push(`/trip/${activeTrip.id}/fix`);
  };

  return (
    <div className="min-h-screen">
      <NavigationHeader />
      <NotificationToast />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Disruption Alert Banner */}
        {disruptionSimulated && (
          <div className="neo-card p-6 bg-[#FF6584] text-white mb-8 border-4 border-slate-900 shadow-[8px_8px_0px_#0F172A] flex flex-col sm:flex-row items-center justify-between gap-4 animate-pulse">
            <div>
              <span className="text-xs font-cartoon font-black uppercase bg-slate-900 text-white px-3 py-1 rounded-full">
                DISRUPTION DETECTED
              </span>
              <h3 className="font-cartoon text-2xl font-extrabold mt-2 text-white">
                Hotel Cancellation Disruption Active
              </h3>
              <p className="text-sm font-bold font-heading text-white opacity-95">
                Heritage Lakefront Resort Udaipur cancelled Day 4 booking. AI replanning options ready.
              </p>
            </div>

            <button
              onClick={handleFixTrip}
              className="neo-btn-yellow text-xs sm:text-sm py-3 px-5 shrink-0 font-cartoon font-extrabold text-slate-900"
            >
              <span>Launch &quot;Fix My Trip&quot; Flow</span>
              <span className="font-mono text-base font-black">→</span>
            </button>
          </div>
        )}

        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xs font-cartoon font-extrabold px-3 py-1 rounded-full bg-[#00F5D4] text-slate-900 border border-slate-900">
                ITINERARY BUILDER
              </span>
              <span className="text-xs font-bold text-slate-800 font-heading">
                {activeTrip.startDate} to {activeTrip.endDate} (7 Days)
              </span>
            </div>
            <h1 className="font-cartoon text-3xl sm:text-4xl font-black text-slate-900">
              {activeTrip.title}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleViewLiveTrip}
              className="neo-btn-secondary text-xs sm:text-sm py-3 px-5 font-cartoon font-extrabold text-slate-900"
            >
              <span>View Live Trip Dashboard</span>
            </button>
            <button
              onClick={handleCheckout}
              className="neo-btn-primary text-xs sm:text-sm py-3 px-5 font-cartoon font-extrabold text-white"
            >
              <span>Proceed to Checkout</span>
            </button>
          </div>
        </div>

        {/* Layout Grid: Days Timeline + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Timeline Column (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Day Selector Pills with 100% visible text */}
            <div className="flex items-center gap-3 overflow-x-auto pb-3">
              {days.map((day, idx) => {
                const isActive = activeDayIndex === idx;
                return (
                  <button
                    key={day.dayNumber}
                    onClick={() => setActiveDayIndex(idx)}
                    className={`neo-card py-2.5 px-4 text-xs sm:text-sm font-cartoon font-black whitespace-nowrap shrink-0 transition-all ${
                      isActive
                        ? 'bg-[#FF6584] text-white border-3 border-slate-900 shadow-[4px_4px_0px_#0F172A]'
                        : 'bg-white text-slate-900 hover:bg-yellow-50 border-2 border-slate-900 shadow-[2px_2px_0px_#0F172A]'
                    }`}
                  >
                    Day {day.dayNumber} ({day.date.slice(5)})
                  </button>
                );
              })}
            </div>

            {/* Current Day Header */}
            <div className="neo-card p-5 bg-[#FEE440] border-3 border-slate-900 shadow-[5px_5px_0px_#0F172A]">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                    DAY {currentDay.dayNumber} BLUEPRINT
                  </span>
                  <h3 className="font-cartoon text-2xl font-extrabold text-slate-900">
                    {currentDay.title}
                  </h3>
                </div>
                <span className="font-cartoon text-sm font-extrabold bg-white text-slate-900 px-3.5 py-1.5 rounded-xl border-2 border-slate-900">
                  {currentDay.items.length} Items
                </span>
              </div>
            </div>

            {/* Itinerary Items Stack */}
            <div className="space-y-6">
              {currentDay.items.map((item) => {
                const isDisruptedItem = item.status === 'cancelled' || item.status === 'at_risk';

                return (
                  <div
                    key={item.id}
                    className={`neo-card p-6 transition-all ${
                      isDisruptedItem
                        ? 'border-4 border-red-500 bg-red-50 shadow-[7px_7px_0px_#EF4444]'
                        : 'bg-white'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-5">
                      {/* Left: Thumbnail & Time */}
                      <div className="flex items-start gap-4 w-full sm:w-auto">
                        <div className="w-24 h-24 rounded-2xl border-2 border-slate-900 overflow-hidden shrink-0 relative">
                          <img
                            src={item.imageUrl || activeTrip.coverImage}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-1.5 left-1.5 text-[10px] font-black px-2 py-0.5 rounded bg-white text-slate-900 border border-slate-900 uppercase">
                            {item.type}
                          </span>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-1 text-xs sm:text-sm font-cartoon font-extrabold text-slate-900">
                            <span>{item.time} ({item.durationMins} mins)</span>
                          </div>

                          <h4 className="font-cartoon text-xl font-extrabold text-slate-900 leading-snug">
                            {item.title}
                          </h4>

                          <p className="text-xs sm:text-sm text-slate-700 font-heading mt-1 font-bold">
                            Location: {item.location.label}
                          </p>
                        </div>
                      </div>

                      {/* Right: Cost & Status */}
                      <div className="text-right sm:shrink-0 w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200">
                        <span className="font-cartoon text-xl font-black text-slate-900">
                          ₹{item.costEstimate.toLocaleString('en-IN')}
                        </span>

                        {isDisruptedItem ? (
                          <button
                            onClick={handleFixTrip}
                            className="px-3 py-1.5 rounded-xl bg-red-500 text-white font-cartoon font-extrabold text-xs sm:text-sm border-2 border-slate-900 animate-bounce"
                          >
                            FIX THIS DISRUPTION
                          </button>
                        ) : (
                          <span className="text-xs font-cartoon font-black px-3 py-1 rounded-full bg-[#00F5D4] text-slate-900 border border-slate-900 uppercase">
                            {item.status}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Suitability Badges */}
                    {item.suitability && item.suitability.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-extrabold text-slate-600 font-heading">
                          Suitability Match:
                        </span>
                        {item.suitability.map((memId) => {
                          const mem = activeTrip.group.find((g) => g.id === memId);
                          return (
                            <span
                              key={memId}
                              className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-900 border border-slate-400 font-heading"
                            >
                              {mem ? mem.name : memId}
                            </span>
                          );
                        })}
                      </div>
                    )}

                    {/* AI Explain Card */}
                    {item.explain && <ExplainCard explain={item.explain} />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar Column (1 col): Budget & Summary */}
          <div className="space-y-6">
            <BudgetMeter spent={activeTrip.budgetSpent} cap={activeTrip.budgetCap} />

            <div className="neo-card p-6 bg-white space-y-4">
              <h4 className="font-cartoon text-xl font-extrabold text-slate-900">
                Reconciled Group Constraints
              </h4>
              <div className="space-y-3 text-xs sm:text-sm font-bold text-slate-800 font-heading">
                <div className="p-3 rounded-xl bg-pink-50 text-slate-900 border-2 border-slate-900">
                  <b>Senior Mobility:</b> Elevator tickets & golf-carts reserved for all fort entries.
                </div>
                <div className="p-3 rounded-xl bg-yellow-50 text-slate-900 border-2 border-slate-900">
                  <b>Food Filter:</b> 100% Pure Vegetarian Rajasthani Thali restaurants verified.
                </div>
                <div className="p-3 rounded-xl bg-teal-50 text-slate-900 border-2 border-slate-900">
                  <b>Child Care:</b> 2-hour afternoon nap gap maintained on Days 1 through 7.
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
