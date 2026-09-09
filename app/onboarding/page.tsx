'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NavigationHeader } from '@/components/shared/NavigationHeader';
import { NotificationToast } from '@/components/shared/NotificationToast';
import { TravelStyle } from '@/types';

export default function OnboardingPage() {
  const router = useRouter();
  const [destination, setDestination] = useState('Rajasthan (Jaipur • Jodhpur • Udaipur)');
  const [startDate, setStartDate] = useState('2026-10-10');
  const [endDate, setEndDate] = useState('2026-10-16');
  const [budgetCap, setBudgetCap] = useState(65000);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>('balanced');
  const [paxCount, setPaxCount] = useState(6);

  const destinations = [
    {
      name: 'Rajasthan (Jaipur • Jodhpur • Udaipur)',
      tagline: 'Palaces, Forts & Desert Cultural Heritage',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=600&auto=format&fit=crop',
      popular: true,
    },
    {
      name: 'Kerala Backwaters & Tea Gardens',
      tagline: 'Serene Houseboats, Ayurvedic Spa & Nature',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=600&auto=format&fit=crop',
      popular: false,
    },
    {
      name: 'Swiss Alps & Scenic Express Trails',
      tagline: 'Mountain Peak Railways & Alpine Villages',
      image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=600&auto=format&fit=crop',
      popular: false,
    },
    {
      name: 'Bali Island Culture & Hidden Waterfalls',
      tagline: 'Ubud Temples, Rice Terraces & Beaches',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop',
      popular: false,
    },
  ];

  const handleContinue = () => {
    router.push('/copilot');
  };

  return (
    <div className="min-h-screen">
      <NavigationHeader />
      <NotificationToast />

      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEE440] border-3 border-slate-900 font-cartoon font-extrabold text-xs sm:text-sm mb-4 shadow-[2px_2px_0px_#0F172A]">
            <span>STEP 1 OF 3 · PERSONALIZED SETUP</span>
          </div>
          <h1 className="font-cartoon text-4xl sm:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Build Your Custom Tour with <span className="text-[#FF6584]">घुmo</span>
          </h1>
          <p className="font-heading text-base sm:text-lg font-bold text-slate-700">
            Tell us your group constraints, budget, and travel preferences. घुmo generates 3 tailored itinerary options reconciled for your family.
          </p>
        </div>

        <div className="space-y-10">
          {/* Destination Selector */}
          <div>
            <h3 className="font-cartoon text-2xl font-bold text-slate-900 mb-6">
              Choose Destination
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {destinations.map((d) => (
                <div
                  key={d.name}
                  onClick={() => setDestination(d.name)}
                  className={`neo-card cursor-pointer overflow-hidden transition-all ${
                    destination === d.name
                      ? 'border-4 border-[#FF6584] shadow-[7px_7px_0px_#FF6584] bg-pink-50'
                      : 'hover:border-slate-900'
                  }`}
                >
                  <div className="h-40 relative">
                    <img src={d.image} alt={d.name} className="w-full h-full object-cover" />
                    {d.popular && (
                      <span className="absolute top-3 right-3 bg-[#FEE440] text-slate-900 border-2 border-slate-900 text-xs font-cartoon font-extrabold px-3 py-1 rounded-full shadow-[2px_2px_0px_#0F172A]">
                        DEMO SCRIPT A
                      </span>
                    )}
                    {destination === d.name && (
                      <div className="absolute inset-0 bg-[#FF6584]/20 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#FF6584] text-white border-3 border-slate-900 flex items-center justify-center font-extrabold text-xl shadow-[3px_3px_0px_#0F172A]">
                          ✓
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-cartoon text-base font-bold text-slate-900 leading-snug">
                      {d.name}
                    </h4>
                    <p className="text-xs font-bold text-slate-600 font-heading mt-1">
                      {d.tagline}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Dates & Duration */}
            <div className="neo-card p-6 bg-white">
              <h4 className="font-cartoon text-lg font-bold text-slate-900 mb-4">Dates & Duration</h4>
              <div className="space-y-4 font-heading text-xs sm:text-sm font-bold">
                <div>
                  <label className="text-slate-600 block mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-900 font-bold bg-slate-50"
                  />
                </div>
                <div>
                  <label className="text-slate-600 block mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-slate-900 font-bold bg-slate-50"
                  />
                </div>
              </div>
            </div>

            {/* Budget Cap */}
            <div className="neo-card p-6 bg-white">
              <h4 className="font-cartoon text-lg font-bold text-slate-900 mb-4">Total Group Budget</h4>
              <div className="space-y-4 font-heading">
                <div className="flex items-center justify-between text-base font-extrabold text-slate-900">
                  <span>Target Cap:</span>
                  <span className="font-cartoon text-xl text-[#FF6584]">
                    ₹{budgetCap.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="30000"
                  max="150000"
                  step="5000"
                  value={budgetCap}
                  onChange={(e) => setBudgetCap(Number(e.target.value))}
                  className="w-full accent-[#FF6584] cursor-pointer"
                />
                <p className="text-xs font-bold text-slate-600">
                  Approx ₹{Math.round(budgetCap / 6).toLocaleString('en-IN')} per person for 7 days
                </p>
              </div>
            </div>

            {/* Travel Pace */}
            <div className="neo-card p-6 bg-white">
              <h4 className="font-cartoon text-lg font-bold text-slate-900 mb-4">Travel Pace</h4>
              <div className="space-y-3">
                {(['relaxed', 'balanced', 'packed'] as TravelStyle[]).map((style) => (
                  <button
                    key={style}
                    onClick={() => setTravelStyle(style)}
                    className={`w-full p-3 rounded-xl border-2 border-slate-900 text-left font-cartoon font-bold text-xs sm:text-sm capitalize flex items-center justify-between transition-all ${
                      travelStyle === style
                        ? 'bg-[#FEE440] text-slate-900 shadow-[2px_2px_0px_#0F172A]'
                        : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <span>
                      {style === 'relaxed' && 'Relaxed (Seniors & Leisure)'}
                      {style === 'balanced' && 'Balanced (Family Optimal)'}
                      {style === 'packed' && 'Packed (Max Highlights)'}
                    </span>
                    {travelStyle === style && <span className="font-mono text-base font-black">✓</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="neo-card p-8 bg-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-cartoon text-xl font-extrabold text-slate-900">
                Selected: Sharma Family (6 Members)
              </h4>
              <p className="text-sm font-bold text-slate-600 font-heading mt-1">
                Grandparents (Ramesh & Savitri) + Parents + Teen + Child
              </p>
            </div>

            <button
              onClick={handleContinue}
              className="neo-btn-primary text-base sm:text-lg py-3.5 px-8 shadow-[5px_5px_0px_#0F172A] w-full sm:w-auto justify-center font-cartoon font-extrabold"
            >
              <span>Launch AI Copilot</span>
              <span className="font-mono text-xl">→</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
