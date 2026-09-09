'use client';

import React from 'react';
import { NavigationHeader } from '@/components/shared/NavigationHeader';
import { NotificationToast } from '@/components/shared/NotificationToast';
import { BarChart2, TrendingUp, IndianRupee, PieChart as PieIcon } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from 'recharts';

export default function AnalyticsPage() {
  const revenueData = [
    { month: 'May', revenue: 145000, margin: 24000 },
    { month: 'Jun', revenue: 198000, margin: 32000 },
    { month: 'Jul', revenue: 240000, margin: 41000 },
    { month: 'Aug', revenue: 310000, margin: 55000 },
    { month: 'Sep', revenue: 420000, margin: 76000 },
    { month: 'Oct', revenue: 580000, margin: 105000 },
  ];

  return (
    <div className="min-h-screen operator-dark text-slate-100 font-mono">
      <NavigationHeader />
      <NotificationToast />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#00BBF9] text-slate-900 font-heading">
              OPERATIONAL ANALYTICS
            </span>
            <h1 className="font-cartoon text-3xl font-extrabold text-white mt-1">
              Tour Operations Revenue & Margin Performance
            </h1>
          </div>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="neo-card p-5 bg-[#131c2e] border-slate-700">
            <span className="text-xs text-slate-400 block mb-1">TOTAL GMV (OCTOBER)</span>
            <div className="font-cartoon text-3xl font-extrabold text-white">₹5.8L</div>
            <span className="text-xs text-emerald-400 font-mono mt-1 block">↑ +38% MoM Growth</span>
          </div>

          <div className="neo-card p-5 bg-[#131c2e] border-slate-700">
            <span className="text-xs text-slate-400 block mb-1">GROSS MARGIN</span>
            <div className="font-cartoon text-3xl font-extrabold text-[#00F5D4]">18.1%</div>
            <span className="text-xs text-slate-400 font-mono mt-1 block">₹1.05L net operator margin</span>
          </div>

          <div className="neo-card p-5 bg-[#131c2e] border-slate-700">
            <span className="text-xs text-slate-400 block mb-1">VENDOR FULFILLMENT RATE</span>
            <div className="font-cartoon text-3xl font-extrabold text-[#FEE440]">97.4%</div>
            <span className="text-xs text-emerald-400 font-mono mt-1 block">AI replan auto-resolved 12 alerts</span>
          </div>

          <div className="neo-card p-5 bg-[#131c2e] border-slate-700">
            <span className="text-xs text-slate-400 block mb-1">NPS SATISFACTION</span>
            <div className="font-cartoon text-3xl font-extrabold text-[#FF6584]">4.9 / 5</div>
            <span className="text-xs text-slate-400 font-mono mt-1 block">Based on 140 completed tours</span>
          </div>
        </div>

        {/* Revenue Growth Line Chart */}
        <div className="neo-card p-6 bg-[#131c2e] border-slate-700 mb-6">
          <h3 className="font-cartoon text-lg font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#00BBF9]" />
            <span>Monthly GMV & Margin Growth Trajectory (INR)</span>
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                <Line type="monotone" dataKey="revenue" stroke="#00BBF9" strokeWidth={3} />
                <Line type="monotone" dataKey="margin" stroke="#00F5D4" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
