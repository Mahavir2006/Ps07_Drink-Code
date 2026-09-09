'use client';

import React from 'react';
import { NavigationHeader } from '@/components/shared/NavigationHeader';
import { NotificationToast } from '@/components/shared/NotificationToast';
import { useTraverseStore } from '@/lib/store/useTraverseStore';
import { Users, HeartHandshake, ShieldCheck } from 'lucide-react';

export default function CustomerManagementPage() {
  const { activeTrip } = useTraverseStore();

  return (
    <div className="min-h-screen operator-dark text-slate-100 font-mono">
      <NavigationHeader />
      <NotificationToast />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#00BBF9] text-slate-900 font-heading">
              CUSTOMER & GROUP INTELLIGENCE
            </span>
            <h1 className="font-cartoon text-3xl font-extrabold text-white mt-1">
              Active Group Profiles & Constraints
            </h1>
          </div>
        </div>

        {/* Sharma Family Deep Dive */}
        <div className="neo-card p-6 bg-[#131c2e] border-slate-700 mb-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-4">
            <div>
              <span className="text-xs text-[#00BBF9] font-bold">ACTIVE TOUR #TRV-101</span>
              <h2 className="font-cartoon text-2xl font-bold text-white">Sharma Family (6 Pax)</h2>
              <p className="text-xs text-slate-400">Pace Strategy: Reconciled Max Comfort & Senior Accessibility</p>
            </div>
            <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-500 text-xs font-bold">
              VIP FAMILY ACCOUNT
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeTrip.group.map((m) => (
              <div key={m.id} className="p-4 rounded bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{m.avatar}</span>
                    <span className="font-cartoon font-bold text-white text-sm">{m.name}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-[#FEE440]">
                    {m.ageGroup}
                  </span>
                </div>
                <div className="space-y-1">
                  {m.constraints.map((c, idx) => (
                    <span key={idx} className="block text-[11px] text-slate-400 font-mono">
                      • {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
