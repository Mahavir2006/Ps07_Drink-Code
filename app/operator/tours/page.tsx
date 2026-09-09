'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NavigationHeader } from '@/components/shared/NavigationHeader';
import { NotificationToast } from '@/components/shared/NotificationToast';
import { RiskBadge } from '@/components/shared/RiskBadge';
import { useTraverseStore } from '@/lib/store/useTraverseStore';
import { Search, Filter, MapPin, Users, Calendar, ArrowRight } from 'lucide-react';

export default function LiveToursPage() {
  const router = useRouter();
  const { tours } = useTraverseStore();
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState<'all' | 'stable' | 'attention' | 'critical'>('all');

  const filteredTours = tours.filter((t) => {
    if (riskFilter !== 'all' && t.riskLevel !== riskFilter) return false;
    if (search && !t.customerName.toLowerCase().includes(search.toLowerCase()) && !t.destination.toLowerCase().includes(search.toLowerCase()) && !t.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen operator-dark text-slate-100 font-mono">
      <NavigationHeader />
      <NotificationToast />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#00BBF9] text-slate-900 font-heading">
              TOUR DIRECTORY
            </span>
            <h1 className="font-cartoon text-3xl font-extrabold text-white mt-1">
              Live Tours Grid ({tours.length})
            </h1>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="neo-card p-4 bg-[#131c2e] border-slate-700 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {(['all', 'stable', 'attention', 'critical'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setRiskFilter(lvl)}
                className={`px-3 py-1.5 rounded text-xs font-mono capitalize transition-all ${
                  riskFilter === lvl
                    ? 'bg-[#00BBF9] text-slate-900 font-extrabold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tour ID, customer, destination..."
              className="w-full pl-9 pr-3 py-2 rounded bg-slate-900 border border-slate-700 text-xs text-white"
            />
          </div>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTours.map((tour) => (
            <div key={tour.id} className="neo-card p-5 bg-[#131c2e] border-slate-700 hover:border-[#00BBF9] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-extrabold text-[#00BBF9] text-sm">{tour.id}</span>
                  <RiskBadge level={tour.riskLevel} size="sm" />
                </div>

                <h3 className="font-cartoon text-lg font-bold text-white mb-1">
                  {tour.customerName}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mb-3">
                  <MapPin className="w-3.5 h-3.5 text-[#FF6584]" />
                  <span>{tour.destination}</span>
                </div>

                <div className="space-y-1.5 text-xs font-mono text-slate-300 p-3 rounded bg-slate-900 border border-slate-800 mb-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Pax Count:</span>
                    <span>{tour.paxCount} Travelers</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Health Index:</span>
                    <span className="font-bold text-emerald-400">{tour.tripHealth}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Revenue:</span>
                    <span className="text-[#FEE440]">₹{tour.totalCost.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => router.push(`/operator/tours/${tour.id}`)}
                className="neo-btn-secondary text-xs py-2 w-full justify-center bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
              >
                <span>Inspect Tour Itinerary</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
