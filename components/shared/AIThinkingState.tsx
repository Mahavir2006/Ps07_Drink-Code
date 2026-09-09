'use client';

import React from 'react';

interface AIThinkingStateProps {
  message?: string;
  subtext?: string;
}

export const AIThinkingState: React.FC<AIThinkingStateProps> = ({
  message = 'Calculating optimal route options...',
  subtext = 'Analyzing senior walking limits, budget impact, and 15 live vendor reliability scores',
}) => {
  return (
    <div className="neo-card p-8 text-center max-w-lg mx-auto my-6 bg-white animate-pulse">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEE440] border-2 border-slate-900 font-extrabold text-xs mb-4 shadow-[2px_2px_0px_#0F172A]">
        <span>REALITY ENGINE PROCESSING</span>
      </div>

      <h4 className="font-cartoon text-2xl font-extrabold text-slate-900 mb-2">{message}</h4>
      <p className="text-sm font-bold text-slate-600 font-heading max-w-sm mx-auto leading-relaxed">
        {subtext}
      </p>

      {/* Progress bar */}
      <div className="mt-6 w-full bg-slate-200 h-4 rounded-full border-2 border-slate-900 overflow-hidden relative">
        <div className="bg-[#FF6584] h-full rounded-full w-2/3 animate-[shimmer_1.5s_infinite_linear]" />
      </div>
    </div>
  );
};
