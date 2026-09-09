'use client';

import React from 'react';
import { NavigationHeader } from '@/components/shared/NavigationHeader';
import { NotificationToast } from '@/components/shared/NotificationToast';

export default function RoadmapPage() {
  const roadmapItems = [
    {
      id: 'road-1',
      title: 'Zero-Connectivity Telephony AI Voice Bot',
      status: 'Roadmap Milestone Q1 2027',
      color: 'bg-[#FF6584]',
      description:
        'Fallback offline voice engine enabling traveler updates via 2G phone calls and SMS when data connectivity drops during remote mountain passes.',
    },
    {
      id: 'road-2',
      title: 'Visual "Where Am I?" Computer Vision AI',
      status: 'Roadmap Milestone Q2 2027',
      color: 'bg-[#C77DFF]',
      description:
        'Camera snapshot recognition identifying heritage monument carvings, street food stall hygiene, and local transport markers instantly.',
    },
    {
      id: 'road-3',
      title: 'Smart-Contract Blockchain Vendor Trust Layer',
      status: 'Roadmap Milestone Q3 2027',
      color: 'bg-[#00F5D4]',
      description:
        'Immutable vendor reliability scoring & escrow payout triggers based on GPS check-in verification and automated SLA fulfillment.',
    },
  ];

  return (
    <div className="min-h-screen">
      <NavigationHeader />
      <NotificationToast />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEE440] border-3 border-slate-900 font-cartoon font-extrabold text-xs sm:text-sm mb-4 shadow-[2px_2px_0px_#0F172A]">
            <span>HONEST SCOPE & FUTURE VISION</span>
          </div>
          <h1 className="font-cartoon text-4xl sm:text-5xl font-black text-slate-900 mb-3">
            The घुmo Architecture Roadmap
          </h1>
          <p className="font-heading text-base sm:text-lg font-bold text-slate-700">
            This hackathon prototype implements the core dynamic replanning loop and connected control tower. Below are the advanced ecosystem capabilities on our product roadmap.
          </p>
        </div>

        <div className="space-y-8">
          {roadmapItems.map((item) => (
            <div key={item.id} className="neo-card p-8 bg-white flex flex-col sm:flex-row items-start gap-6">
              <div className={`w-16 h-16 rounded-2xl ${item.color} border-3 border-slate-900 shadow-[4px_4px_0px_#0F172A] flex items-center justify-center font-cartoon font-black text-2xl text-slate-900 shrink-0`}>
                M
              </div>

              <div>
                <span className="text-xs font-cartoon font-black px-3 py-1 rounded-full bg-slate-900 text-white font-heading mb-2 inline-block">
                  {item.status}
                </span>
                <h3 className="font-cartoon text-2xl font-extrabold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm sm:text-base font-bold font-heading text-slate-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Prototype Scope Note */}
        <div className="mt-10 neo-card p-8 bg-amber-50 border-3 border-slate-900 text-sm font-bold font-heading text-slate-800">
          <h4 className="font-cartoon text-lg font-extrabold text-slate-900 mb-2">
            Prototype Scope Integrity
          </h4>
          <p className="leading-relaxed">
            All features demonstrated in the Traveler App and Operator Dashboard execute live using our local deterministic mock intelligence engine (`/lib/mock-engine`) and client-side Zustand state store (`useTraverseStore`). No fake ML backend is claimed.
          </p>
        </div>
      </main>
    </div>
  );
}
