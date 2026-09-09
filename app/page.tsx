'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NavigationHeader } from '@/components/shared/NavigationHeader';
import { NotificationToast } from '@/components/shared/NotificationToast';
import { useTraverseStore } from '@/lib/store/useTraverseStore';

export default function HomePage() {
  const router = useRouter();
  const { triggerDisruptionEvent } = useTraverseStore();

  return (
    <div className="min-h-screen">
      <NavigationHeader />
      <NotificationToast />

      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEE440] text-slate-900 border-3 border-slate-900 font-cartoon font-extrabold text-xs sm:text-sm mb-6 shadow-[3px_3px_0px_#0F172A]">
            <span>HACKATHON DEMO PROTOTYPE · PS-07</span>
          </div>

          <h1 className="font-cartoon text-5xl sm:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
            Welcome to <span className="text-[#FF6584] underline decoration-wavy decoration-[#FEE440]">घुmo</span>
          </h1>

          <p className="font-heading text-lg sm:text-xl font-extrabold text-slate-800 mb-10 max-w-3xl mx-auto leading-relaxed">
            The Two-Sided Travel Reality Engine. When reality changes mid-trip, <span className="text-[#FF6584] font-cartoon">घुmo</span> re-plans it live for both traveler and operator.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              href="/onboarding"
              className="neo-btn-primary py-4 px-8 text-base sm:text-lg font-cartoon font-extrabold shadow-[5px_5px_0px_#0F172A] w-full sm:w-auto justify-center text-white"
            >
              <span>Launch Traveler Experience</span>
              <span className="font-mono text-xl">→</span>
            </Link>

            <Link
              href="/operator/dashboard"
              className="neo-btn-yellow py-4 px-8 text-base sm:text-lg font-cartoon font-extrabold shadow-[5px_5px_0px_#0F172A] w-full sm:w-auto justify-center text-slate-900"
            >
              <span>Launch Operator Control Tower</span>
            </Link>
          </div>
        </div>

        {/* Demo Script Shortcuts Grid */}
        <div className="mb-16">
          <h2 className="font-cartoon text-3xl font-extrabold text-slate-900 mb-8 text-center">
            Quick Hackathon Demo Shortcuts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Journey A */}
            <div className="neo-card p-8 bg-white flex flex-col justify-between">
              <div>
                <span className="text-xs font-cartoon font-extrabold px-3 py-1 rounded-full bg-[#00F5D4] text-slate-900 border-2 border-slate-900 mb-4 inline-block shadow-[2px_2px_0px_#0F172A]">
                  JOURNEY A
                </span>
                <h3 className="font-cartoon text-2xl font-extrabold text-slate-900 mb-3">
                  Family Tour Planning
                </h3>
                <p className="text-sm font-bold font-heading text-slate-700 mb-6 leading-relaxed">
                  7-Day Rajasthan trip for Sharma family (6 members, 3 generations). Tests Group Harmony engine with senior walking limits and child nap breaks.
                </p>
              </div>

              <Link
                href="/copilot"
                className="neo-btn-secondary text-sm py-3 px-5 font-cartoon font-extrabold justify-between w-full text-slate-900"
              >
                <span>Run Journey A Demo</span>
                <span className="font-mono">→</span>
              </Link>
            </div>

            {/* Journey B */}
            <div className="neo-card p-8 bg-pink-50 border-3 border-[#FF6584] flex flex-col justify-between">
              <div>
                <span className="text-xs font-cartoon font-extrabold px-3 py-1 rounded-full bg-[#FF6584] text-white border-2 border-slate-900 mb-4 inline-block shadow-[2px_2px_0px_#0F172A]">
                  JOURNEY B (PAYOFF)
                </span>
                <h3 className="font-cartoon text-2xl font-extrabold text-slate-900 mb-3">
                  Mid-Trip &quot;Fix My Trip&quot;
                </h3>
                <p className="text-sm font-bold font-heading text-slate-700 mb-6 leading-relaxed">
                  Simulate hotel cancellation event on Day 4. Watch AI calculate 3 ranked options and resolve live with spring motion.
                </p>
              </div>

              <button
                onClick={() => {
                  triggerDisruptionEvent();
                  router.push('/trip/trip-rajasthan-01/fix');
                }}
                className="neo-btn-primary text-sm py-3 px-5 font-cartoon font-extrabold justify-between bg-[#FF6584] text-white w-full"
              >
                <span>Trigger & Fix Disruption</span>
                <span className="font-mono">→</span>
              </button>
            </div>

            {/* Journey C */}
            <div className="neo-card p-8 bg-blue-50 border-3 border-[#00BBF9] flex flex-col justify-between">
              <div>
                <span className="text-xs font-cartoon font-extrabold px-3 py-1 rounded-full bg-[#00BBF9] text-slate-900 border-2 border-slate-900 mb-4 inline-block shadow-[2px_2px_0px_#0F172A]">
                  JOURNEY C
                </span>
                <h3 className="font-cartoon text-2xl font-extrabold text-slate-900 mb-3">
                  Operator AI Action Center
                </h3>
                <p className="text-sm font-bold font-heading text-slate-700 mb-6 leading-relaxed">
                  Approve hotel fix in Operator Control Tower and observe real-time sync to Traveler Live Trip screen.
                </p>
              </div>

              <Link
                href="/operator/actions"
                className="neo-btn-yellow text-sm py-3 px-5 font-cartoon font-extrabold justify-between w-full text-slate-900"
              >
                <span>Open AI Action Center</span>
                <span className="font-mono">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="neo-card p-8 sm:p-10 bg-white border-3 border-slate-900 shadow-[6px_6px_0px_#0F172A]">
          <h3 className="font-cartoon text-2xl font-extrabold text-slate-900 mb-6 text-center">
            Key Differentiators Proved in Prototype
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm font-bold font-heading text-slate-900">
            <div className="p-4 rounded-2xl bg-pink-50 border-2 border-slate-900">
              <span className="text-xs font-extrabold text-[#FF6584] uppercase block mb-1">Architecture</span>
              <p><b>Connected Store:</b> Shared Zustand state between Traveler & Operator.</p>
            </div>
            <div className="p-4 rounded-2xl bg-teal-50 border-2 border-slate-900">
              <span className="text-xs font-extrabold text-[#00F5D4] uppercase block mb-1">Explainability</span>
              <p><b>Explainable AI:</b> Every recommendation carries match % and rationale.</p>
            </div>
            <div className="p-4 rounded-2xl bg-yellow-50 border-2 border-slate-900">
              <span className="text-xs font-extrabold text-[#FEE440] uppercase block mb-1">Personalization</span>
              <p><b>Group Harmony:</b> Reconciles senior mobility & child nap breaks.</p>
            </div>
            <div className="p-4 rounded-2xl bg-purple-50 border-2 border-slate-900">
              <span className="text-xs font-extrabold text-[#C77DFF] uppercase block mb-1">UX Feedback</span>
              <p><b>Realistic Delays:</b> Animated 600–1200ms processing sequence.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
