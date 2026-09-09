'use client';

import React from 'react';

interface BudgetMeterProps {
  spent: number;
  cap: number;
  compact?: boolean;
}

export const BudgetMeter: React.FC<BudgetMeterProps> = ({ spent, cap, compact = false }) => {
  const percentage = Math.min(Math.round((spent / cap) * 100), 100);
  const remaining = cap - spent;
  const isOver = spent > cap;

  return (
    <div className="neo-card p-5 bg-white">
      <div className="flex items-center justify-between gap-4 mb-3">
        <div>
          <h4 className="font-cartoon text-lg font-extrabold text-slate-900">Live Budget Tracker</h4>
          <p className="text-xs font-bold text-slate-500 font-heading">Group Spending vs Threshold</p>
        </div>

        <div className="text-right">
          <div className="font-cartoon text-xl font-black text-slate-900">
            ₹{spent.toLocaleString('en-IN')}{' '}
            <span className="text-xs font-bold text-slate-500">/ ₹{cap.toLocaleString('en-IN')}</span>
          </div>
          <span
            className={`text-xs font-black px-2.5 py-0.5 rounded-full border border-slate-900 inline-block mt-1 ${
              isOver ? 'bg-red-300 text-slate-900' : 'bg-[#00F5D4] text-slate-900'
            }`}
          >
            {isOver ? 'Exceeds Budget' : `₹${remaining.toLocaleString('en-IN')} Remaining`}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-5 rounded-full border-2 border-slate-900 overflow-hidden p-0.5 relative">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isOver ? 'bg-[#FF6584]' : percentage > 85 ? 'bg-[#FEE440]' : 'bg-[#00F5D4]'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {!compact && (
        <div className="mt-4 pt-3 border-t-2 border-slate-200 grid grid-cols-4 gap-2 text-center text-xs font-bold text-slate-700">
          <div className="bg-slate-50 p-2 rounded-xl border-2 border-slate-900">
            <span className="text-[11px] block text-slate-500 font-extrabold uppercase">Hotels</span>
            <span className="font-cartoon text-sm text-slate-900">₹30.5k</span>
          </div>
          <div className="bg-slate-50 p-2 rounded-xl border-2 border-slate-900">
            <span className="text-[11px] block text-slate-500 font-extrabold uppercase">Transport</span>
            <span className="font-cartoon text-sm text-slate-900">₹12.5k</span>
          </div>
          <div className="bg-slate-50 p-2 rounded-xl border-2 border-slate-900">
            <span className="text-[11px] block text-slate-500 font-extrabold uppercase">Activities</span>
            <span className="font-cartoon text-sm text-slate-900">₹8.2k</span>
          </div>
          <div className="bg-slate-50 p-2 rounded-xl border-2 border-slate-900">
            <span className="text-[11px] block text-slate-500 font-extrabold uppercase">Food</span>
            <span className="font-cartoon text-sm text-slate-900">₹5.0k</span>
          </div>
        </div>
      )}
    </div>
  );
};
