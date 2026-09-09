'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NavigationHeader } from '@/components/shared/NavigationHeader';
import { NotificationToast } from '@/components/shared/NotificationToast';
import { useTraverseStore } from '@/lib/store/useTraverseStore';

export default function PostTripReviewPage() {
  const router = useRouter();
  const { activeTrip, resetToSeedData } = useTraverseStore();
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <NavigationHeader />
      <NotificationToast />

      <main className="max-w-4xl mx-auto px-4 py-12">
        {submitted ? (
          <div className="neo-card p-10 bg-white text-center max-w-xl mx-auto border-4 border-slate-900 shadow-[10px_10px_0px_#0F172A] animate-fadeIn">
            <h1 className="font-cartoon text-4xl font-extrabold text-slate-900 mb-3">
              Thank You Sharma Family!
            </h1>
            <p className="font-heading text-sm sm:text-base font-bold text-slate-700 mb-8">
              Your feedback is fed back into the घुmo Group Harmony Engine to improve your next family adventure.
            </p>
            <button
              onClick={() => {
                resetToSeedData();
                router.push('/onboarding');
              }}
              className="neo-btn-primary py-4 px-8 text-base font-cartoon font-extrabold justify-center w-full shadow-[4px_4px_0px_#0F172A]"
            >
              <span>Start New Demo Trip</span>
            </button>
          </div>
        ) : (
          <div>
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs font-cartoon font-extrabold px-4 py-1.5 rounded-full bg-[#00F5D4] text-slate-900 border-2 border-slate-900 uppercase">
                POST-TRIP REVIEW LOOP
              </span>
              <h1 className="font-cartoon text-4xl sm:text-5xl font-black text-slate-900 mt-3">
                Planned vs. Actual Summary
              </h1>
              <p className="font-heading text-sm sm:text-base font-bold text-slate-700 mt-2">
                Royal Rajasthan Heritage Tour Completed on Schedule!
              </p>
            </div>

            {/* Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="neo-card p-6 bg-white text-center">
                <span className="text-xs font-extrabold uppercase text-slate-500 block mb-2 font-heading">
                  Budget Fidelity
                </span>
                <div className="font-cartoon text-3xl font-black text-slate-900">
                  ₹53,600 <span className="text-xs text-slate-500 font-bold">/ ₹65,000</span>
                </div>
                <span className="inline-block mt-3 text-xs font-black px-3 py-1 rounded-full bg-[#00F5D4] border border-slate-900">
                  ₹11,400 UNDER BUDGET
                </span>
              </div>

              <div className="neo-card p-6 bg-white text-center">
                <span className="text-xs font-extrabold uppercase text-slate-500 block mb-2 font-heading">
                  Dynamic Replans Resolved
                </span>
                <div className="font-cartoon text-3xl font-black text-[#FF6584]">
                  1 Event
                </div>
                <span className="inline-block mt-3 text-xs font-black px-3 py-1 rounded-full bg-pink-100 border border-slate-900">
                  Taj Fateh Prakash Upgrade
                </span>
              </div>

              <div className="neo-card p-6 bg-white text-center">
                <span className="text-xs font-extrabold uppercase text-slate-500 block mb-2 font-heading">
                  Trip Health Score
                </span>
                <div className="font-cartoon text-3xl font-black text-slate-900">
                  96%
                </div>
                <span className="inline-block mt-3 text-xs font-black px-3 py-1 rounded-full bg-[#FEE440] border border-slate-900">
                  HIGH SATISFACTION
                </span>
              </div>
            </div>

            {/* Feedback Form */}
            <div className="neo-card p-8 bg-white max-w-2xl mx-auto">
              <h3 className="font-cartoon text-2xl font-extrabold text-slate-900 mb-4">
                Rate Your Trip Experience
              </h3>

              <div className="flex items-center gap-3 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-2 text-3xl transition-transform hover:scale-125 font-cartoon font-bold"
                  >
                    {star <= rating ? '★' : '☆'}
                  </button>
                ))}
              </div>

              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="How well did घुmo balance Ramesh's mobility limits and Aarav's nap breaks?"
                className="w-full p-4 rounded-xl border-2 border-slate-900 text-sm font-bold bg-slate-50 mb-6 h-32"
              />

              <button
                onClick={handleSubmit}
                className="neo-btn-primary py-4 px-8 font-cartoon font-extrabold text-base w-full justify-center shadow-[4px_4px_0px_#0F172A]"
              >
                <span>Submit Feedback & Close Loop</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
