'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NavigationHeader } from '@/components/shared/NavigationHeader';
import { NotificationToast } from '@/components/shared/NotificationToast';
import { AIThinkingState } from '@/components/shared/AIThinkingState';
import { RiskBadge } from '@/components/shared/RiskBadge';
import { useTraverseStore, sampleDisruptionEvent } from '@/lib/store/useTraverseStore';
import confetti from 'canvas-confetti';

export default function AIActionCenterPage() {
  const router = useRouter();
  const { tours, activeTrip, disruptionSimulated, applyReplanOption, triggerDisruptionEvent } = useTraverseStore();
  const [selectedOptionId, setSelectedOptionId] = useState<string>('opt-01');
  const [isProcessing, setIsProcessing] = useState(false);

  const activeTour = tours.find((t) => t.id === 'TRV-101') || tours[0];
  const event = activeTrip.activeEvent || sampleDisruptionEvent;

  const handleApproveFix = (optionId: string) => {
    setSelectedOptionId(optionId);
    setIsProcessing(true);

    setTimeout(() => {
      applyReplanOption(optionId);
      setIsProcessing(false);

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.5 },
        });
      } catch (e) {
        console.log('Confetti fired');
      }
    }, 900);
  };

  return (
    <div className="min-h-screen operator-dark text-slate-100 font-mono">
      <NavigationHeader />
      <NotificationToast />

      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-cartoon font-black px-3 py-1 rounded-full bg-[#FF6584] text-white font-heading">
                AI ACTION CENTER • CONTROL TOWER
              </span>
              <span className="text-xs text-slate-400 font-mono">
                REAL-TIME CROSS-APP REPLAN SYNC
              </span>
            </div>
            <h1 className="font-cartoon text-4xl font-extrabold text-white">
              AI Action Center Sentinel
            </h1>
            <p className="text-sm text-slate-400 font-mono mt-1">
              Operational risk cards with pre-calculated replan solutions. Approving here instantly updates the traveler app in real-time.
            </p>
          </div>

          {!disruptionSimulated && (
            <button
              onClick={triggerDisruptionEvent}
              className="neo-btn-primary text-xs sm:text-sm py-3 px-5 bg-[#FF6584] font-cartoon font-extrabold"
            >
              <span>Simulate Disruption Event</span>
            </button>
          )}
        </div>

        {/* Action Center Risk Cards Stack */}
        {disruptionSimulated || activeTour.riskLevel === 'critical' ? (
          <div className="space-y-8">
            {/* Risk Card Banner */}
            <div className="neo-card p-8 bg-[#1e1b4b] border-3 border-red-500 shadow-[8px_8px_0px_#000]">
              <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-extrabold text-red-400 text-xs font-mono uppercase bg-red-950 px-2.5 py-1 rounded border border-red-800">
                      CRITICAL RISK ALERT
                    </span>
                    <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded font-mono font-bold">
                      ID: {event.id}
                    </span>
                  </div>
                  <h2 className="font-cartoon text-3xl font-extrabold text-white">
                    {event.title}
                  </h2>
                  <p className="text-sm text-slate-300 font-mono mt-2 max-w-3xl leading-relaxed">
                    Affected Tour: <b className="text-[#00BBF9]">#TRV-101 (Sharma Family - 6 Pax)</b> • Heritage Lakefront Resort Udaipur cancelled booking due to plumbing emergency.
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <RiskBadge level="critical" size="lg" />
                  <span className="text-xs text-slate-400 block mt-2 font-mono font-bold">
                    Health Impact: 92% → 68%
                  </span>
                </div>
              </div>

              {/* Replan Options Grid */}
              <h3 className="font-cartoon text-2xl font-extrabold text-white mb-4">
                Recommended Operator Fix Options
              </h3>

              {isProcessing ? (
                <AIThinkingState
                  message="Applying Operator Replan Approval..."
                  subtext="Mutating shared Zustand trip store & syncing traveler Live Trip screen..."
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {event.options.map((opt) => (
                    <div
                      key={opt.id}
                      className="neo-card p-6 bg-[#0f172a] border-slate-700 hover:border-[#00BBF9] transition-all flex flex-col justify-between"
                    >
                      <div>
                        {opt.recommendedBadge && (
                          <span className="text-xs font-cartoon font-black px-3 py-1 rounded bg-[#00F5D4] text-slate-900 mb-3 inline-block">
                            {opt.recommendedBadge}
                          </span>
                        )}
                        <h4 className="font-cartoon text-xl font-bold text-white mb-2">
                          {opt.label}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-300 font-mono mb-4 leading-relaxed">
                          {opt.description}
                        </p>

                        <div className="space-y-2 text-xs font-mono text-slate-300 p-3 rounded-xl bg-slate-900 border border-slate-800 mb-6">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Cost Delta:</span>
                            <span className={opt.costDelta > 0 ? 'text-[#FF6584] font-bold' : 'text-emerald-400 font-bold'}>
                              {opt.costDelta > 0 ? `+₹${opt.costDelta}` : `-₹${Math.abs(opt.costDelta)}`}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Time Shift:</span>
                            <span className="text-white font-bold">
                              {opt.timeDeltaMins === 0 ? 'Zero Shift' : `+${opt.timeDeltaMins}m`}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleApproveFix(opt.id)}
                        className="neo-btn-primary text-xs sm:text-sm py-3.5 w-full justify-center bg-[#00BBF9] text-slate-900 border-slate-900 font-cartoon font-extrabold"
                      >
                        <span>Approve Fix (Sync Traveler App)</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* All Clear State */
          <div className="neo-card p-10 bg-[#131c2e] text-center max-w-lg mx-auto border-slate-700">
            <h3 className="font-cartoon text-3xl font-extrabold text-white mb-3">
              All 20 Tours Operational & Stable
            </h3>
            <p className="text-sm text-slate-400 font-mono mb-8">
              No active critical disruption events pending operator approval.
            </p>
            <button
              onClick={triggerDisruptionEvent}
              className="neo-btn-primary py-3.5 px-6 text-sm font-cartoon font-extrabold justify-center w-full bg-[#FF6584]"
            >
              <span>Simulate Hotel Cancellation Event</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
