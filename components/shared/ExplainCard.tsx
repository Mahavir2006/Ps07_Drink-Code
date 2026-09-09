'use client';

import React, { useState } from 'react';
import { ExplainData } from '@/types';

interface ExplainCardProps {
  explain: ExplainData;
  compact?: boolean;
}

export const ExplainCard: React.FC<ExplainCardProps> = ({ explain, compact = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-3 border-2 border-slate-900 rounded-xl bg-[#FFFDF7] p-3.5 shadow-[2px_2px_0px_#0F172A]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 text-left font-bold text-xs sm:text-sm text-slate-900 hover:text-slate-950"
      >
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-md bg-[#00F5D4] border border-slate-900 font-extrabold text-xs">
            {explain.matchPercent}% Match
          </span>
          <span className="font-cartoon font-extrabold">Recommendation Rationale</span>
        </div>
        <span className="text-xs font-mono font-bold text-slate-500">{isOpen ? '▲ Hide' : '▼ View Why'}</span>
      </button>

      {isOpen && (
        <div className="mt-3 pt-3 border-t-2 border-slate-200 text-xs sm:text-sm space-y-2">
          <div className="flex items-center justify-between font-bold text-slate-600">
            <span>Confidence Score</span>
            <span className="text-slate-900 font-extrabold">{Math.round(explain.confidence * 100)}%</span>
          </div>

          <div className="space-y-1.5 pt-1">
            {explain.reasons.map((reason, idx) => (
              <div key={idx} className="flex items-start gap-2 text-slate-800 font-semibold">
                <span className="text-[#FF6584] font-black">•</span>
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
