'use client';

import React from 'react';

interface RiskBadgeProps {
  level: 'stable' | 'attention' | 'critical';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  level,
  size = 'md',
  showLabel = true,
}) => {
  const config = {
    stable: {
      bg: 'bg-[#00F5D4]',
      text: 'text-slate-900',
      border: 'border-slate-900',
      label: 'STABLE',
      dot: 'bg-slate-900',
      shadow: 'shadow-[2px_2px_0px_#0F172A]',
    },
    attention: {
      bg: 'bg-[#FEE440]',
      text: 'text-slate-900',
      border: 'border-slate-900',
      label: 'ATTENTION NEEDED',
      dot: 'bg-slate-900',
      shadow: 'shadow-[2px_2px_0px_#0F172A]',
    },
    critical: {
      bg: 'bg-[#FF6584]',
      text: 'text-white',
      border: 'border-slate-900',
      label: 'CRITICAL RISK',
      dot: 'bg-white',
      shadow: 'shadow-[2px_2px_0px_#0F172A]',
    },
  }[level];

  const sizeClasses = {
    sm: 'px-2.5 py-0.5 text-xs gap-1.5',
    md: 'px-3.5 py-1 text-xs sm:text-sm gap-2',
    lg: 'px-4 py-1.5 text-sm sm:text-base gap-2.5',
  }[size];

  return (
    <span
      className={`inline-flex items-center font-black rounded-full border-2 ${config.bg} ${config.text} ${config.border} ${config.shadow} ${sizeClasses}`}
    >
      <span className={`w-2.5 h-2.5 rounded-full ${config.dot}`} />
      {showLabel && <span>{config.label}</span>}
    </span>
  );
};
