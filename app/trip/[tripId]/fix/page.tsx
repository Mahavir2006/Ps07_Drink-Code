'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NavigationHeader } from '@/components/shared/NavigationHeader';
import { NotificationToast } from '@/components/shared/NotificationToast';
import { AIThinkingState } from '@/components/shared/AIThinkingState';
import { useTraverseStore, sampleDisruptionEvent } from '@/lib/store/useTraverseStore';
import confetti from 'canvas-confetti';

export default function FixMyTripPage() {
  const router = useRouter();
  const { activeTrip, applyReplanOption } = useTraverseStore();
  const [selectedOptionId, setSelectedOptionId] = useState<string>('opt-01');
  const [isResolving, setIsResolving] = useState(false);

  const event = activeTrip.activeEvent || sampleDisruptionEvent;

  const handleResolveFix = (optionId: string) => {
    setSelectedOptionId(optionId);
    setIsResolving(true);

    setTimeout(() => {
      applyReplanOption(optionId);
      setIsResolving(false);

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
        });
      } catch (e) {
        console.log('Confetti fired');
      }

      router.push(`/trip/${activeTrip.id}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      <NavigationHeader />
      <NotificationToast />

      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* Disruption Alert Header */}
        <div className="neo-card p-8 bg-[#FF6584] text-white mb-10 border-4 border-slate-900 shadow-[8px_8px_0px_#0F172A]">
          <div className="flex items-start gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-cartoon font-black px-3 py-1 rounded-full bg-slate-900 text-white uppercase">
                  LIVE DISRUPTION DETECTED
                </span>
                <span className="text-xs font-bold bg-[#FEE440] text-slate-900 px-3 py-1 rounded-full font-heading">
                  11:15 AM
                </span>
              </div>
              <h1 className="font-cartoon text-3xl sm:text-4xl font-extrabold">{event.title}</h1>
              <p className="text-sm font-bold font-heading opacity-95 max-w-3xl mt-2 leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        </div>

        {/* Impact Analysis Grid */}
        <div className="mb-10">
          <h3 className="font-cartoon text-2xl font-extrabold text-slate-900 mb-4">
            Impact Analysis & Affected Items
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="neo-card p-6 bg-red-50 border-3 border-red-500">
              <span className="text-xs font-cartoon font-black px-3 py-1 rounded bg-red-500 text-white uppercase">
                CANCELLED ITEM
              </span>
              <h4 className="font-cartoon text-xl font-extrabold text-slate-900 mt-2">
                Day 4 Hotel: Heritage Lakefront Resort Udaipur
              </h4>
              <p className="text-sm font-bold text-slate-700 font-heading mt-2">
                Reservations voided by vendor. 6 guests affected (2 rooms).
              </p>
            </div>

            <div className="neo-card p-6 bg-amber-50 border-3 border-amber-500">
              <span className="text-xs font-cartoon font-black px-3 py-1 rounded bg-amber-500 text-slate-900 uppercase">
                DOWNSTREAM TIMING AT RISK
              </span>
              <h4 className="font-cartoon text-xl font-extrabold text-slate-900 mt-2">
                Day 4 Activity: Solar Boat Cruise Lake Pichola (5:30 PM)
              </h4>
              <p className="text-sm font-bold text-slate-700 font-heading mt-2">
                May miss departure window if hotel check-in is delayed past 4:30 PM.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Ranked AI Replan Options */}
        <div className="mb-10">
          <h3 className="font-cartoon text-2xl font-extrabold text-slate-900 mb-6">
            Ranked AI Replan Options (1-Click Resolve)
          </h3>

          {isResolving ? (
            <AIThinkingState
              message="Applying Replan Solution Live..."
              subtext="Updating traveler itinerary, re-confirming vendor bookings, and syncing Operator Control Tower..."
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {event.options.map((option) => (
                <div
                  key={option.id}
                  className={`neo-card p-8 flex flex-col justify-between transition-all ${
                    selectedOptionId === option.id
                      ? 'border-4 border-[#FF6584] shadow-[8px_8px_0px_#FF6584] bg-pink-50'
                      : 'bg-white hover:border-slate-900'
                  }`}
                >
                  <div>
                    {option.recommendedBadge && (
                      <span className="inline-block text-xs font-cartoon font-black px-3 py-1 rounded-full bg-[#00F5D4] text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_#0F172A] mb-4">
                        {option.recommendedBadge}
                      </span>
                    )}

                    <h4 className="font-cartoon text-2xl font-extrabold text-slate-900 mb-2">
                      {option.label}
                    </h4>
                    <p className="text-sm font-bold font-heading text-slate-700 mb-6 leading-relaxed">
                      {option.description}
                    </p>

                    <div className="space-y-2 mb-6 p-4 rounded-xl bg-slate-50 border-2 border-slate-900 text-sm font-bold font-heading">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Cost Delta:</span>
                        <span className={`font-cartoon text-base font-extrabold ${option.costDelta > 0 ? 'text-[#FF6584]' : 'text-green-700'}`}>
                          {option.costDelta > 0 ? `+₹${option.costDelta.toLocaleString('en-IN')}` : `-₹${Math.abs(option.costDelta).toLocaleString('en-IN')}`}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Time Shift:</span>
                        <span className="font-cartoon text-slate-900 font-bold">
                          {option.timeDeltaMins === 0 ? 'Zero Shift (Exact Slot)' : `+${option.timeDeltaMins} mins`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleResolveFix(option.id)}
                    className="w-full neo-btn-primary text-sm font-cartoon font-extrabold py-3.5 justify-center shadow-[4px_4px_0px_#0F172A]"
                  >
                    <span>Approve & Resolve Live</span>
                    <span className="font-mono text-lg font-black">→</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
