'use client';

import React from 'react';

interface TripHealthGaugeProps {
  score: number; // 0–100
  size?: 'sm' | 'md' | 'lg';
}

export const TripHealthGauge: React.FC<TripHealthGaugeProps> = ({ score, size = 'md' }) => {
  let badgeColor = 'bg-[#00F5D4]';
  let textLabel = 'Optimal Operational Status';

  if (score < 75 && score >= 70) {
    badgeColor = 'bg-[#FEE440]';
    textLabel = 'Minor Schedule Adjustments';
  } else if (score < 70) {
    badgeColor = 'bg-[#FF6584] text-white';
    textLabel = 'Action Needed: Disruption Detected';
  }

  const strokeDashoffset = 283 - (283 * score) / 100;

  return (
    <div className="neo-card p-5 bg-white flex items-center gap-5">
      <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
        <svg className="w-24 h-24 -rotate-90 transform" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            className="stroke-slate-200 fill-none"
            strokeWidth="10"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            className={`fill-none stroke-current transition-all duration-700 ease-out ${
              score >= 80 ? 'text-[#00F5D4]' : score >= 70 ? 'text-[#FEE440]' : 'text-[#FF6584]'
            }`}
            strokeWidth="10"
            strokeDasharray="283"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-black font-cartoon text-slate-900 leading-none">
            {score}%
          </span>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-cartoon text-base font-extrabold text-slate-900">Trip Health Index</span>
          <span className={`text-xs font-black px-2.5 py-0.5 rounded-full border border-slate-900 ${badgeColor}`}>
            LIVE
          </span>
        </div>
        <p className="text-sm font-extrabold text-slate-700 leading-snug">{textLabel}</p>
        <p className="text-xs text-slate-500 mt-1 font-heading">
          {score >= 90
            ? 'All vendors confirmed & mobility optimized.'
            : score >= 70
            ? 'Weather monitoring active.'
            : 'Hotel cancellation event active.'}
        </p>
      </div>
    </div>
  );
};
