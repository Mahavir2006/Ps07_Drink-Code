'use client';

import React from 'react';
import { NavigationHeader } from '@/components/shared/NavigationHeader';
import { NotificationToast } from '@/components/shared/NotificationToast';
import { useTraverseStore } from '@/lib/store/useTraverseStore';
import { Building2, Star, ShieldCheck, Phone, MapPin, AlertCircle } from 'lucide-react';

export default function VendorsPage() {
  const { vendors, updateVendorReliability } = useTraverseStore();

  return (
    <div className="min-h-screen operator-dark text-slate-100 font-mono">
      <NavigationHeader />
      <NotificationToast />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#00BBF9] text-slate-900 font-heading">
              VENDOR RELIABILITY DIRECTORY
            </span>
            <h1 className="font-cartoon text-3xl font-extrabold text-white mt-1">
              Partner Vendors & Reliability Index ({vendors.length})
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((v) => (
            <div key={v.id} className="neo-card p-5 bg-[#131c2e] border-slate-700 hover:border-[#00BBF9]">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-slate-800 text-[#00BBF9] uppercase">
                    {v.category}
                  </span>
                  <h3 className="font-cartoon text-lg font-bold text-white mt-1">{v.name}</h3>
                </div>

                <div className="text-right">
                  <span
                    className={`text-xs font-cartoon font-extrabold px-2.5 py-1 rounded-full border border-slate-700 ${
                      v.reliabilityScore >= 95
                        ? 'bg-emerald-950 text-emerald-400 border-emerald-500'
                        : v.reliabilityScore >= 80
                        ? 'bg-yellow-950 text-amber-400 border-amber-500'
                        : 'bg-red-950 text-red-400 border-red-500'
                    }`}
                  >
                    {v.reliabilityScore}% Score
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300 font-mono p-3 rounded bg-slate-900 border border-slate-800 mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Cancellation Rate:</span>
                  <span className={v.cancellationRate > 0.05 ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                    {Math.round(v.cancellationRate * 100)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Avg Response Time:</span>
                  <span>{v.avgResponseMins} mins</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Location:</span>
                  <span className="text-slate-200">{v.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Contact:</span>
                  <span>{v.phone}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Status: <b className="text-white capitalize">{v.status}</b></span>
                <button
                  onClick={() => updateVendorReliability(v.id, Math.min(v.reliabilityScore + 2, 100))}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 text-[11px]"
                >
                  + Increase Trust Score
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
