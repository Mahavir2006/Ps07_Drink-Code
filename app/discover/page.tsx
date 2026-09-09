'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NavigationHeader } from '@/components/shared/NavigationHeader';
import { NotificationToast } from '@/components/shared/NotificationToast';
import { ExplainCard } from '@/components/shared/ExplainCard';
import { useTraverseStore } from '@/lib/store/useTraverseStore';

export default function DiscoverPage() {
  const router = useRouter();
  const { activeTrip, swapItineraryItem } = useTraverseStore();
  const [activeCategory, setActiveCategory] = useState<'all' | 'hotel' | 'activity' | 'food' | 'transport'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDay, setSelectedDay] = useState(4);

  const mockDiscoverItems = [
    {
      id: 'disc-h1',
      title: 'Taj Fateh Prakash Palace Royal Lake Suite',
      category: 'hotel',
      rating: 4.9,
      cost: 18400,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop',
      vendor: 'Taj Fateh Prakash Palace',
      explain: {
        matchPercent: 98,
        reasons: ['Elevator access to all lake suites', 'Verified 98% reliability score', 'Complimentary royal high tea'],
        confidence: 0.98,
      },
    },
    {
      id: 'disc-h2',
      title: 'Trident Hotel Udaipur Lakeside Resort',
      category: 'hotel',
      rating: 4.8,
      cost: 14500,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop',
      vendor: 'Trident Udaipur',
      explain: {
        matchPercent: 94,
        reasons: ['Saves ₹1,500 vs current budget', 'Kids play park for Aarav', 'Full step-free garden ramps'],
        confidence: 0.95,
      },
    },
    {
      id: 'disc-a1',
      title: 'Private Solar-Powered Pichola Sunset Boat',
      category: 'activity',
      rating: 4.9,
      cost: 4500,
      image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=600&auto=format&fit=crop',
      vendor: 'Udaipur Solar Cruises',
      explain: {
        matchPercent: 97,
        reasons: ['Zero engine vibration for senior comfort', 'Complimentary spiced tea on board'],
        confidence: 0.96,
      },
    },
    {
      id: 'disc-f1',
      title: 'Ambrai Waterfront Royal Rajasthani Thali',
      category: 'food',
      rating: 4.8,
      cost: 3800,
      image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=600&auto=format&fit=crop',
      vendor: 'Ambrai Restaurant',
      explain: {
        matchPercent: 99,
        reasons: ['100% Pure Vegetarian menu', 'Panoramic Lake Pichola view'],
        confidence: 0.99,
      },
    },
  ];

  const filteredItems = mockDiscoverItems.filter((item) => {
    if (activeCategory !== 'all' && item.category !== activeCategory) return false;
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleSwapItem = (item: (typeof mockDiscoverItems)[0]) => {
    swapItineraryItem(selectedDay, 'item-402', {
      id: `swapped-${Date.now()}`,
      time: '02:00 PM',
      title: item.title,
      type: item.category as any,
      location: { lat: 24.5764, lng: 73.6835, label: item.title },
      costEstimate: item.cost,
      durationMins: 60,
      suitability: ['m1', 'm2', 'm3', 'm4', 'm5', 'm6'],
      status: 'confirmed',
      imageUrl: item.image,
      explain: item.explain,
    });
    router.push(`/itinerary/${activeTrip.id}`);
  };

  return (
    <div className="min-h-screen">
      <NavigationHeader />
      <NotificationToast />

      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-cartoon text-3xl sm:text-4xl font-extrabold text-slate-900 flex items-center gap-3">
              <span>Component Explorer & Swapper</span>
              <span className="text-xs bg-[#FEE440] text-slate-900 border-2 border-slate-900 px-3 py-1 rounded-full font-heading">
                SWAPPABLE MODULES
              </span>
            </h1>
            <p className="text-sm font-bold text-slate-600 font-heading mt-1">
              Browse verified hotels, activities, and dining options with live cost and suitability scores.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white p-2.5 rounded-2xl border-3 border-slate-900 shadow-[3px_3px_0px_#0F172A]">
            <span className="text-xs font-cartoon font-extrabold text-slate-600 pl-2">Target Day:</span>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(Number(e.target.value))}
              className="bg-slate-100 p-2 rounded-xl font-cartoon font-extrabold text-xs sm:text-sm border-2 border-slate-900"
            >
              {activeTrip.days.map((d) => (
                <option key={d.dayNumber} value={d.dayNumber}>
                  Day {d.dayNumber}: {d.title.slice(0, 20)}...
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="neo-card p-5 bg-white mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {(['all', 'hotel', 'activity', 'food', 'transport'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-cartoon font-extrabold capitalize transition-all ${
                  activeCategory === cat
                    ? 'bg-[#FF6584] text-white border-2 border-slate-900 shadow-[2px_2px_0px_#0F172A]'
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search components..."
              className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-900 text-xs sm:text-sm font-bold bg-slate-50"
            />
          </div>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="neo-card bg-white p-6 flex flex-col justify-between">
              <div>
                <div className="h-52 rounded-xl overflow-hidden relative border-3 border-slate-900 mb-4">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 right-3 bg-[#FEE440] text-slate-900 border-2 border-slate-900 text-xs font-cartoon font-extrabold px-3 py-1 rounded-full shadow-[2px_2px_0px_#0F172A]">
                    Rating {item.rating} / 5.0
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-xs font-cartoon font-extrabold px-2.5 py-0.5 rounded-md bg-purple-100 border border-slate-900 uppercase">
                      {item.category}
                    </span>
                    <h3 className="font-cartoon text-xl font-extrabold text-slate-900 mt-2">
                      {item.title}
                    </h3>
                  </div>
                  <span className="font-cartoon text-xl font-extrabold text-[#FF6584]">
                    ₹{item.cost.toLocaleString('en-IN')}
                  </span>
                </div>

                <ExplainCard explain={item.explain} />
              </div>

              <button
                onClick={() => handleSwapItem(item)}
                className="mt-6 neo-btn-yellow text-xs sm:text-sm py-3.5 w-full justify-center font-cartoon font-extrabold"
              >
                <span>Swap into Day {selectedDay} Itinerary</span>
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
