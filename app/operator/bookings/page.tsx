'use client';

import React from 'react';
import { NavigationHeader } from '@/components/shared/NavigationHeader';
import { NotificationToast } from '@/components/shared/NotificationToast';
import { useTraverseStore } from '@/lib/store/useTraverseStore';
import { Ticket, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

export default function BookingsManagementPage() {
  const { bookings } = useTraverseStore();

  const confirmed = bookings.filter((b) => b.status === 'Confirmed');
  const cancelled = bookings.filter((b) => b.status === 'Cancelled');
  const requested = bookings.filter((b) => b.status === 'Requested');

  return (
    <div className="min-h-screen operator-dark text-slate-100 font-mono">
      <NavigationHeader />
      <NotificationToast />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#00BBF9] text-slate-900 font-heading">
              OPERATIONAL BOOKING PIPELINE
            </span>
            <h1 className="font-cartoon text-3xl font-extrabold text-white mt-1">
              Booking Management Pipeline ({bookings.length})
            </h1>
          </div>
        </div>

        {/* 3 Status Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Confirmed Column */}
          <div className="space-y-3">
            <div className="p-3 rounded bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-between">
              <span className="font-cartoon font-bold text-emerald-400">🟢 Confirmed ({confirmed.length})</span>
              <span className="text-xs text-slate-400">Fulfilling</span>
            </div>
            {confirmed.map((b) => (
              <div key={b.id} className="neo-card p-4 bg-[#131c2e] border-slate-700 space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{b.id}</span>
                  <span>{b.date}</span>
                </div>
                <h4 className="font-cartoon text-sm font-bold text-white">{b.itemTitle}</h4>
                <p className="text-xs text-slate-300">Vendor: {b.vendorName}</p>
                <div className="flex justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <span>Group: {b.customerName}</span>
                  <span className="text-[#FEE440]">₹{b.amount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Requested Column */}
          <div className="space-y-3">
            <div className="p-3 rounded bg-amber-950/60 border border-amber-500/40 flex items-center justify-between">
              <span className="font-cartoon font-bold text-amber-400">🟡 Requested / Pending ({requested.length})</span>
              <span className="text-xs text-slate-400 font-mono">Processing</span>
            </div>
            {requested.length === 0 ? (
              <div className="p-4 rounded bg-slate-900 border border-slate-800 text-xs text-slate-500 text-center">
                No pending booking requests.
              </div>
            ) : (
              requested.map((b) => (
                <div key={b.id} className="neo-card p-4 bg-[#131c2e] border-slate-700">
                  <h4 className="font-cartoon text-sm font-bold text-white">{b.itemTitle}</h4>
                </div>
              ))
            )}
          </div>

          {/* Cancelled Column */}
          <div className="space-y-3">
            <div className="p-3 rounded bg-red-950/60 border border-red-500/40 flex items-center justify-between">
              <span className="font-cartoon font-bold text-red-400">🔴 Disrupted / Cancelled ({cancelled.length})</span>
              <span className="text-xs text-slate-400 font-mono">Needs Action</span>
            </div>
            {cancelled.map((b) => (
              <div key={b.id} className="neo-card p-4 bg-[#1e1b4b] border-red-500 space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{b.id}</span>
                  <span className="text-red-400 font-bold">CANCELLED</span>
                </div>
                <h4 className="font-cartoon text-sm font-bold text-white">{b.itemTitle}</h4>
                <p className="text-xs text-slate-300">Vendor: {b.vendorName}</p>
                <div className="flex justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <span>Group: {b.customerName}</span>
                  <span className="text-[#FF6584]">₹{b.amount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
