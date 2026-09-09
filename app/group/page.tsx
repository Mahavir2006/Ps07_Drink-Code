'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NavigationHeader } from '@/components/shared/NavigationHeader';
import { NotificationToast } from '@/components/shared/NotificationToast';
import { AIThinkingState } from '@/components/shared/AIThinkingState';
import { useTraverseStore } from '@/lib/store/useTraverseStore';
import { GroupMember } from '@/types';

export default function GroupPage() {
  const router = useRouter();
  const { activeTrip } = useTraverseStore();
  const [selectedHarmony, setSelectedHarmony] = useState<'comfort' | 'adventure' | 'balanced'>('comfort');
  const [isGenerating, setIsGenerating] = useState(false);

  const groupMembers = activeTrip.group;

  const harmonyOptions = [
    {
      id: 'opt-comfort',
      strategy: 'comfort' as const,
      badge: 'TOP RECOMMENDED FOR SENIORS & KIDS (96% MATCH)',
      title: 'Option A: Max Comfort & Accessibility',
      tagline: 'Step-free monuments, golf carts, pure veg meals & 2-hour afternoon rest',
      badgeBg: 'bg-[#FF6584] text-white',
      highlights: [
        'Ramesh & Savitri: 100% golf-cart / elevator access (max 300m walking/day)',
        'Aarav (9yo): Dedicated 2:00-4:00 PM hotel rest window',
        'Ananya (17yo): Sunset rooftop photo slots included',
        '100% Pure Vegetarian Rajasthani Thali dining',
      ],
      tradeoffs: ['₹2,400 higher transport cost due to private luxury AC Tempo Traveler'],
      score: 96,
    },
    {
      id: 'opt-balanced',
      strategy: 'balanced' as const,
      badge: 'BALANCED FAMILY EXPLORATION (91% MATCH)',
      title: 'Option B: Balanced Culture & Heritage',
      tagline: 'Covers main forts with moderate walking and flexible lunch windows',
      badgeBg: 'bg-[#00F5D4] text-slate-900',
      highlights: [
        'Includes Jaipur, Jodhpur & Udaipur main attractions',
        'Elevator tickets booked at Mehrangarh & City Palace',
        'Mix of fine-dining & historic haveli meals',
      ],
      tradeoffs: ['Slightly longer walking distances (1.2 km/day) at Amber fort grounds'],
      score: 91,
    },
    {
      id: 'opt-adventure',
      strategy: 'adventure' as const,
      badge: 'HIGH ENERGY & ADVENTURE (84% MATCH)',
      title: 'Option C: Max Highlights & Sand Dunes',
      tagline: 'Packs Jaisalmer Desert Safari, ziplining & street food walks',
      badgeBg: 'bg-[#FEE440] text-slate-900',
      highlights: [
        'Exhilarating Jaisalmer Dune Bashing & Thar Desert Camp',
        'Night market street food tour for parents & teens',
      ],
      tradeoffs: ['High walking requirement (3.8 km/day) — strenuous for seniors'],
      score: 84,
    },
  ];

  const handleApplyHarmony = (strategy: 'comfort' | 'adventure' | 'balanced') => {
    setSelectedHarmony(strategy);
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      router.push(`/itinerary/${activeTrip.id}`);
    }, 800);
  };

  return (
    <div className="min-h-screen">
      <NavigationHeader />
      <NotificationToast />

      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00F5D4] border-3 border-slate-900 font-cartoon font-extrabold text-xs sm:text-sm mb-4 shadow-[2px_2px_0px_#0F172A]">
            <span>STEP 2 OF 3 · GROUP HARMONY ENGINE</span>
          </div>
          <h1 className="font-cartoon text-4xl sm:text-5xl font-extrabold text-slate-900 mb-3">
            Reconcile Conflicting Group Needs
          </h1>
          <p className="font-heading text-base sm:text-lg font-bold text-slate-700">
            Sharma Family has 6 members spanning ages 9 to 74. घुmo AI balances Ramesh & Savitri&apos;s mobility limits with Aarav&apos;s energy and Ananya&apos;s photo spots.
          </p>
        </div>

        {/* Group Profile Cards */}
        <div className="mb-12">
          <h3 className="font-cartoon text-2xl font-extrabold text-slate-900 mb-6">
            Active Traveler Profiles & Constraints ({groupMembers.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupMembers.map((m) => (
              <div key={m.id} className="neo-card p-5 bg-white flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-pink-100 border-2 border-slate-900 flex items-center justify-center font-cartoon font-black text-xl shrink-0 shadow-[2px_2px_0px_#0F172A]">
                  {m.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-cartoon text-base font-extrabold text-slate-900">{m.name}</h4>
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-[#FEE440] border border-slate-900 uppercase">
                      {m.ageGroup}
                    </span>
                  </div>
                  <div className="mt-2 space-y-1">
                    {m.constraints.map((c, idx) => (
                      <span
                        key={idx}
                        className="block text-xs font-bold text-slate-700 font-heading bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-300"
                      >
                        • {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Tradeoff Options Grid */}
        <div className="mb-10">
          <h3 className="font-cartoon text-2xl font-extrabold text-slate-900 mb-6">
            Choose Your Reconciled Group Harmony Itinerary
          </h3>

          {isGenerating ? (
            <AIThinkingState
              message="Assembling Custom Itinerary Blueprint..."
              subtext="Applying golf-cart reservations and pure-veg restaurant tags..."
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {harmonyOptions.map((opt) => (
                <div
                  key={opt.id}
                  className={`neo-card p-8 flex flex-col justify-between transition-all ${
                    selectedHarmony === opt.strategy
                      ? 'border-4 border-[#FF6584] shadow-[8px_8px_0px_#FF6584] bg-pink-50/50'
                      : 'hover:border-slate-900'
                  }`}
                >
                  <div>
                    {/* Badge */}
                    <span
                      className={`inline-block text-xs font-cartoon font-extrabold px-3 py-1.5 rounded-full border-2 border-slate-900 shadow-[2px_2px_0px_#0F172A] mb-4 ${opt.badgeBg}`}
                    >
                      {opt.badge}
                    </span>

                    <h4 className="font-cartoon text-2xl font-extrabold text-slate-900 mb-2">
                      {opt.title}
                    </h4>
                    <p className="text-sm font-bold font-heading text-slate-700 mb-6 leading-relaxed">
                      {opt.tagline}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2.5 mb-6">
                      <h5 className="text-xs font-black uppercase text-slate-500 font-heading tracking-wider">
                        Key Group Fits
                      </h5>
                      {opt.highlights.map((h, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-bold font-heading text-slate-800">
                          <span className="text-[#00F5D4] font-black text-lg leading-none">✓</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tradeoffs */}
                    <div className="space-y-2 mb-8">
                      <h5 className="text-xs font-black uppercase text-slate-500 font-heading tracking-wider">
                        Tradeoffs
                      </h5>
                      {opt.tradeoffs.map((t, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm font-bold font-heading text-slate-600">
                          <span className="text-amber-500 font-black">•</span>
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleApplyHarmony(opt.strategy)}
                    className={`w-full py-4 px-6 rounded-xl font-cartoon font-extrabold text-sm sm:text-base border-3 border-slate-900 shadow-[4px_4px_0px_#0F172A] transition-all flex items-center justify-center gap-2 ${
                      selectedHarmony === opt.strategy
                        ? 'bg-[#FF6584] text-white hover:bg-[#ff476e]'
                        : 'bg-[#FEE440] text-slate-900 hover:bg-yellow-400'
                    }`}
                  >
                    <span>Select Harmony Itinerary</span>
                    <span className="font-mono text-lg font-black">→</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
