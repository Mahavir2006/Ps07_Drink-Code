'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTraverseStore } from '@/lib/store/useTraverseStore';

export const NavigationHeader: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const {
    activeRole,
    setActiveRole,
    triggerDisruptionEvent,
    disruptionSimulated,
    resetToSeedData,
  } = useTraverseStore();

  const handleRoleToggle = (newRole: 'traveler' | 'operator') => {
    setActiveRole(newRole);
    if (newRole === 'operator') {
      router.push('/operator/dashboard');
    } else {
      router.push('/trip/trip-rajasthan-01');
    }
  };

  const isOperatorRoute = pathname?.startsWith('/operator');

  return (
    <header
      className={`sticky top-0 z-50 border-b-4 border-slate-900 transition-colors duration-200 ${
        isOperatorRoute
          ? 'bg-[#0F172A] text-white shadow-[0_4px_0_#000000]'
          : 'bg-[#FEE440] text-slate-900 shadow-[0_4px_0_#0F172A]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-22 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-13 h-13 rounded-2xl bg-[#FF6584] text-white border-3 border-slate-900 shadow-[3px_3px_0px_#0F172A] flex items-center justify-center font-brand text-2xl font-black group-hover:scale-105 transition-transform">
            g
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-brand text-3xl font-black tracking-tight text-[#FF6584] drop-shadow-[2px_2px_0px_#0F172A]">
                घुmo
              </span>
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-white text-slate-900 border-2 border-slate-900 font-heading tracking-wide">
                PROTOTYPE
              </span>
            </div>
            <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100 tracking-wider uppercase font-heading">
              The Travel Reality Engine
            </p>
          </div>
        </Link>

        {/* Center Nav Links - High legibility, individual white pill buttons with sharp active state */}
        <nav className="hidden lg:flex items-center gap-2">
          {isOperatorRoute ? (
            <>
              <Link
                href="/operator/dashboard"
                className={`px-4 py-2 rounded-xl font-cartoon font-extrabold text-sm border-2 border-slate-900 shadow-[2px_2px_0px_#0F172A] transition-all ${
                  pathname === '/operator/dashboard'
                    ? 'bg-[#00BBF9] text-slate-900'
                    : 'bg-slate-800 text-slate-100 hover:bg-slate-700'
                }`}
              >
                Control Tower
              </Link>
              <Link
                href="/operator/actions"
                className={`px-4 py-2 rounded-xl font-cartoon font-extrabold text-sm border-2 border-slate-900 shadow-[2px_2px_0px_#0F172A] transition-all ${
                  pathname === '/operator/actions'
                    ? 'bg-[#FF6584] text-white'
                    : 'bg-slate-800 text-slate-100 hover:bg-slate-700'
                }`}
              >
                AI Action Center
                {disruptionSimulated && (
                  <span className="ml-1.5 w-2.5 h-2.5 rounded-full bg-red-400 inline-block animate-ping" />
                )}
              </Link>
              <Link
                href="/operator/tours"
                className={`px-4 py-2 rounded-xl font-cartoon font-extrabold text-sm border-2 border-slate-900 shadow-[2px_2px_0px_#0F172A] transition-all ${
                  pathname?.startsWith('/operator/tours')
                    ? 'bg-[#FEE440] text-slate-900'
                    : 'bg-slate-800 text-slate-100 hover:bg-slate-700'
                }`}
              >
                Live Tours
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/onboarding"
                className={`px-4 py-2 rounded-xl font-cartoon font-extrabold text-sm border-2 border-slate-900 shadow-[2px_2px_0px_#0F172A] transition-all ${
                  pathname === '/onboarding'
                    ? 'bg-[#FF6584] text-white'
                    : 'bg-white text-slate-900 hover:bg-pink-50'
                }`}
              >
                Setup Trip
              </Link>
              <Link
                href="/copilot"
                className={`px-4 py-2 rounded-xl font-cartoon font-extrabold text-sm border-2 border-slate-900 shadow-[2px_2px_0px_#0F172A] transition-all ${
                  pathname === '/copilot'
                    ? 'bg-[#C77DFF] text-slate-900'
                    : 'bg-white text-slate-900 hover:bg-purple-50'
                }`}
              >
                AI Copilot
              </Link>
              <Link
                href="/group"
                className={`px-4 py-2 rounded-xl font-cartoon font-extrabold text-sm border-2 border-slate-900 shadow-[2px_2px_0px_#0F172A] transition-all ${
                  pathname === '/group'
                    ? 'bg-[#00F5D4] text-slate-900'
                    : 'bg-white text-slate-900 hover:bg-teal-50'
                }`}
              >
                Group Harmony
              </Link>
              <Link
                href="/trip/trip-rajasthan-01"
                className={`px-4 py-2 rounded-xl font-cartoon font-extrabold text-sm border-2 border-slate-900 shadow-[2px_2px_0px_#0F172A] transition-all ${
                  pathname?.startsWith('/trip')
                    ? 'bg-[#FF6584] text-white'
                    : 'bg-white text-slate-900 hover:bg-pink-50'
                }`}
              >
                Live Trip
              </Link>
            </>
          )}

          <Link
            href="/roadmap"
            className={`px-4 py-2 rounded-xl font-cartoon font-extrabold text-sm border-2 border-slate-900 shadow-[2px_2px_0px_#0F172A] transition-all ${
              pathname === '/roadmap'
                ? 'bg-[#00BBF9] text-slate-900'
                : 'bg-white text-slate-900 hover:bg-blue-50'
            }`}
          >
            Roadmap
          </Link>
        </nav>

        {/* Demo Controls & Role Switcher */}
        <div className="flex items-center gap-3">
          {/* Trigger Disruption Button */}
          <button
            onClick={triggerDisruptionEvent}
            className={`neo-btn-primary text-xs sm:text-sm py-2.5 px-4 font-black ${
              disruptionSimulated ? 'bg-red-600 text-white animate-pulse' : 'bg-[#FF6584] text-white'
            }`}
          >
            <span className="font-extrabold">
              {disruptionSimulated ? 'Disruption Active' : 'Simulate Disruption'}
            </span>
          </button>

          {/* Role Switcher */}
          <div className="bg-white p-1 rounded-2xl border-3 border-slate-900 shadow-[3px_3px_0px_#0F172A] flex items-center gap-1">
            <button
              onClick={() => handleRoleToggle('traveler')}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
                activeRole === 'traveler'
                  ? 'bg-[#FF6584] text-white border-2 border-slate-900 shadow-[2px_2px_0px_#0F172A]'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Traveler
            </button>
            <button
              onClick={() => handleRoleToggle('operator')}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
                activeRole === 'operator'
                  ? 'bg-[#00BBF9] text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_#0F172A]'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Operator
            </button>
          </div>

          {/* Reset Demo Data */}
          <button
            onClick={resetToSeedData}
            className="px-3 py-2 rounded-xl border-3 border-slate-900 bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs shadow-[3px_3px_0px_#0F172A]"
            title="Reset data"
          >
            Reset
          </button>
        </div>
      </div>
    </header>
  );
};
