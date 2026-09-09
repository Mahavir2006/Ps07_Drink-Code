'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { NavigationHeader } from '@/components/shared/NavigationHeader';
import { NotificationToast } from '@/components/shared/NotificationToast';
import { RiskBadge } from '@/components/shared/RiskBadge';
import { useTraverseStore } from '@/lib/store/useTraverseStore';
import { MapPin, Users, Calendar, ArrowLeft, ShieldAlert, CheckCircle, Edit } from 'lucide-react';

export default function TourDetailPage() {
  const router = useRouter();
  const params = useParams();
  const tourId = (params?.tourId as string) || 'TRV-101';
  const { tours, activeTrip } = useTraverseStore();

  const tour = tours.find((t) => t.id === tourId) || tours[0];

  return (
    <div className="min-h-screen operator-dark text-slate-100 font-mono">
      <NavigationHeader />
      <NotificationToast />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={() => router.push('/operator/tours')}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Tours Grid
        </button>

        {/* Tour Header */}
        <div className="neo-card p-6 bg-[#131c2e] border-slate-700 mb-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-extrabold text-[#00BBF9] text-base">{tour.id}</span>
                <RiskBadge level={tour.riskLevel} />
              </div>
              <h1 className="font-cartoon text-3xl font-extrabold text-white">
                {tour.customerName}
              </h1>
              <p className="text-xs text-slate-400 font-mono mt-1">
                📍 {tour.destination} • {tour.startDate} to {tour.endDate} ({tour.paxCount} Pax)
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 block">Health Index</span>
              <span className="font-cartoon text-3xl font-extrabold text-emerald-400">
                {tour.tripHealth}%
              </span>
            </div>
          </div>
        </div>

        {/* Days Timeline */}
        <div className="space-y-4">
          <h3 className="font-cartoon text-xl font-bold text-white mb-2">
            Operational Itinerary Blueprint
          </h3>
          {activeTrip.days.map((day) => (
            <div key={day.dayNumber} className="neo-card p-4 bg-[#131c2e] border-slate-700">
              <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-800">
                <h4 className="font-cartoon text-base font-bold text-[#FEE440]">
                  Day {day.dayNumber}: {day.title}
                </h4>
                <span className="text-xs text-slate-400">{day.date}</span>
              </div>

              <div className="space-y-2">
                {day.items.map((item) => (
                  <div key={item.id} className="p-3 rounded bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 text-xs font-mono">
                    <div>
                      <span className="text-slate-400 block text-[10px]">{item.time} ({item.type.toUpperCase()})</span>
                      <span className="text-white font-bold">{item.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#FF6584]">₹{item.costEstimate}</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
