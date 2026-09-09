'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { NavigationHeader } from '@/components/shared/NavigationHeader';
import { NotificationToast } from '@/components/shared/NotificationToast';
import { RiskBadge } from '@/components/shared/RiskBadge';
import { useTraverseStore } from '@/lib/store/useTraverseStore';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';

export default function OperatorDashboardPage() {
  const router = useRouter();
  const { tours, disruptionSimulated } = useTraverseStore();

  const totalTours = tours.length;
  const criticalTours = tours.filter((t) => t.riskLevel === 'critical').length;
  const attentionTours = tours.filter((t) => t.riskLevel === 'attention').length;
  const stableTours = tours.filter((t) => t.riskLevel === 'stable').length;

  const riskData = [
    { name: 'Stable', count: stableTours, color: '#00F5D4' },
    { name: 'Attention', count: attentionTours, color: '#FEE440' },
    { name: 'Critical', count: criticalTours, color: '#FF6584' },
  ];

  const categoryRiskData = [
    { category: 'Hotel Availability', riskCount: criticalTours > 0 ? 3 : 1 },
    { category: 'Transport Delays', riskCount: 4 },
    { category: 'Weather Warnings', riskCount: 2 },
    { category: 'Budget Overruns', riskCount: 1 },
  ];

  return (
    <div className="min-h-screen operator-dark text-slate-100 font-mono">
      <NavigationHeader />
      <NotificationToast />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Control Tower Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-black px-3 py-1 rounded-full bg-[#00BBF9] text-slate-900 font-heading tracking-wide">
                OPERATIONAL CONTROL TOWER
              </span>
              <span className="text-xs text-slate-400 font-mono">
                LIVE METRICS • 20 ACTIVE TOURS
              </span>
            </div>
            <h1 className="font-cartoon text-4xl sm:text-5xl font-black text-white tracking-tight">
              Control Tower Sentinel
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/operator/actions')}
              className={`neo-btn-primary text-xs sm:text-sm py-3.5 px-6 font-extrabold flex items-center gap-2 ${
                disruptionSimulated ? 'bg-[#FF6584] animate-pulse' : 'bg-[#00BBF9] text-slate-900'
              }`}
            >
              <span>AI Action Center ({criticalTours + attentionTours} Alerts)</span>
              <span className="font-mono text-base font-black">→</span>
            </button>
          </div>
        </div>

        {/* Critical Alert Bar if Disruption Active */}
        {disruptionSimulated && (
          <div className="neo-card p-6 bg-[#FF6584] text-white mb-10 border-3 border-slate-900 shadow-[8px_8px_0px_#000] flex flex-col md:flex-row items-center justify-between gap-6 animate-pulse">
            <div>
              <span className="text-xs font-cartoon font-black uppercase bg-slate-900 text-white px-3 py-1 rounded-full">
                CRITICAL DISRUPTION ACTIVE
              </span>
              <h3 className="font-cartoon text-2xl sm:text-3xl font-black mt-2">
                Tour #TRV-101 (Sharma Family)
              </h3>
              <p className="text-sm font-mono opacity-95 mt-1">
                Heritage Lakefront Resort Udaipur cancelled booking. Action Center fix available.
              </p>
            </div>
            <button
              onClick={() => router.push('/operator/actions')}
              className="neo-btn-yellow text-xs sm:text-sm py-3 px-6 shrink-0 font-cartoon font-black text-slate-900"
            >
              <span>Approve Fix in AI Action Center</span>
              <span className="font-mono text-lg font-black">→</span>
            </button>
          </div>
        )}

        {/* Top 4 KPI Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="neo-card p-6 bg-[#131c2e] border-slate-700">
            <span className="text-xs text-slate-400 font-mono block mb-2">ACTIVE LIVE TOURS</span>
            <div className="font-cartoon text-4xl font-black text-white">{totalTours}</div>
            <span className="text-xs text-emerald-400 font-mono mt-2 block font-bold">
              100% Monitored by Sentinel
            </span>
          </div>

          <div className="neo-card p-6 bg-[#131c2e] border-slate-700">
            <span className="text-xs text-slate-400 font-mono block mb-2">STABLE TOURS</span>
            <div className="font-cartoon text-4xl font-black text-[#00F5D4]">{stableTours}</div>
            <span className="text-xs text-slate-400 font-mono mt-2 block font-bold">
              Zero active risks detected
            </span>
          </div>

          <div className="neo-card p-6 bg-[#131c2e] border-slate-700">
            <span className="text-xs text-slate-400 font-mono block mb-2">ATTENTION NEEDED</span>
            <div className="font-cartoon text-4xl font-black text-[#FEE440]">{attentionTours}</div>
            <span className="text-xs text-amber-400 font-mono mt-2 block font-bold">
              Pre-emptive weather/transport delays
            </span>
          </div>

          <div className="neo-card p-6 bg-[#131c2e] border-slate-700">
            <span className="text-xs text-slate-400 font-mono block mb-2">CRITICAL RISKS</span>
            <div className="font-cartoon text-4xl font-black text-[#FF6584]">{criticalTours}</div>
            <span className="text-xs text-red-400 font-mono mt-2 block font-bold">
              Action Center approval required
            </span>
          </div>
        </div>

        {/* Charts & Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Risk Breakdown Pie Chart */}
          <div className="neo-card p-8 bg-[#131c2e] border-slate-700">
            <h3 className="font-cartoon text-2xl font-extrabold text-white mb-6">
              Tour Risk Distribution
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskData}>
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={14} />
                  <YAxis stroke="#94a3b8" fontSize={14} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Predicted Risk Categories Bar Chart */}
          <div className="neo-card p-8 bg-[#131c2e] border-slate-700">
            <h3 className="font-cartoon text-2xl font-extrabold text-white mb-6">
              Predicted Operational Risk Categories
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryRiskData} layout="vertical">
                  <XAxis type="number" stroke="#94a3b8" fontSize={14} />
                  <YAxis dataKey="category" type="category" stroke="#94a3b8" width={150} fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                  <Bar dataKey="riskCount" fill="#FF6584" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Live Tours Quick Table Preview */}
        <div className="neo-card p-8 bg-[#131c2e] border-slate-700">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h3 className="font-cartoon text-2xl font-extrabold text-white">Live Tours Sentinel Status</h3>
            <button
              onClick={() => router.push('/operator/tours')}
              className="text-xs sm:text-sm font-cartoon font-extrabold text-[#00BBF9] hover:underline"
            >
              View All {totalTours} Tours →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm font-mono border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-700 text-slate-400">
                  <th className="p-4">Tour ID</th>
                  <th className="p-4">Customer / Group</th>
                  <th className="p-4">Destination</th>
                  <th className="p-4">Risk Badge</th>
                  <th className="p-4">Health Score</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {tours.slice(0, 5).map((t) => (
                  <tr key={t.id} className="hover:bg-slate-800/50">
                    <td className="p-4 font-black text-[#00BBF9] text-base">{t.id}</td>
                    <td className="p-4 text-slate-200 font-bold">{t.customerName}</td>
                    <td className="p-4 text-slate-300 font-bold">{t.destination}</td>
                    <td className="p-4">
                      <RiskBadge level={t.riskLevel} size="sm" />
                    </td>
                    <td className="p-4 font-black text-base text-emerald-400">{t.tripHealth}%</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => router.push(`/operator/tours/${t.id}`)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-600 hover:bg-slate-700 text-white font-bold text-xs"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
