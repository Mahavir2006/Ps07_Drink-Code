'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NavigationHeader } from '@/components/shared/NavigationHeader';
import { NotificationToast } from '@/components/shared/NotificationToast';
import { AIThinkingState } from '@/components/shared/AIThinkingState';
import { useTraverseStore } from '@/lib/store/useTraverseStore';

export default function CopilotPage() {
  const router = useRouter();
  const { copilotMessages, addCopilotMessage } = useTraverseStore();
  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const presets = [
    {
      title: 'Family Script (Journey A)',
      prompt:
        'Build a 7-day Rajasthan family trip for 6 people (grandparents Ramesh & Savitri + parents + teen + 9yo kid). Budget ₹65,000 max. Must have 100% vegetarian food, golf carts at forts, and afternoon rest breaks.',
    },
    {
      title: 'Senior & Nature Leisure',
      prompt:
        'Plan a relaxed 5-day Kerala trip with step-free resort access, Ayurveda spa, and calm houseboat cruise for 4 adults.',
    },
    {
      title: 'Alpine Adventure',
      prompt:
        'Design a 6-day Swiss Alps itinerary with glacier express train, scenic cable cars, and fondue dining under ₹1.8L.',
    },
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    addCopilotMessage({
      sender: 'user',
      text: query,
    });
    setInputQuery('');
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      addCopilotMessage({
        sender: 'bot',
        text: 'I analyzed your constraints: senior mobility limits, vegetarian diet, 9yo rest breaks, and ₹65k budget. I generated 3 reconciled Group Harmony options for your family!',
        actionType: 'harmony',
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationHeader />
      <NotificationToast />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
              <span className="font-brand text-3xl font-black text-[#FF6584] drop-shadow-[1px_1px_0px_#0F172A]">घुmo</span>
              <span className="font-heading text-slate-900">AI Copilot</span>
              <span className="text-xs bg-[#FEE440] text-slate-900 border-2 border-slate-900 px-3 py-1 rounded-full font-heading font-extrabold">
                CONVERSATIONAL PLANNER
              </span>
            </h1>
            <p className="text-sm font-bold text-slate-600 font-heading mt-1">
              Natural-language tour planning engine with group constraint solver
            </p>
          </div>

          <button
            onClick={() => router.push('/group')}
            className="neo-btn-yellow text-xs sm:text-sm py-2.5 px-4 font-cartoon font-extrabold"
          >
            <span>Skip to Group Harmony</span>
            <span className="font-mono text-base">→</span>
          </button>
        </div>

        {/* Presets Bar */}
        <div className="mb-6">
          <p className="text-xs sm:text-sm font-cartoon font-extrabold text-slate-800 mb-2">
            Try Demo Presets:
          </p>
          <div className="flex flex-wrap gap-3">
            {presets.map((p, idx) => {
              const bgColors = ['bg-[#FFE3EB]', 'bg-[#FFF9A6]', 'bg-[#E0F7FE]'];
              return (
                <button
                  key={idx}
                  onClick={() => handleSend(p.prompt)}
                  className={`neo-card p-3 ${bgColors[idx % bgColors.length]} hover:brightness-95 text-xs sm:text-sm font-cartoon font-extrabold text-slate-900 flex items-center gap-2 transition-all text-left shadow-[3px_3px_0px_#0F172A]`}
                >
                  <span>{p.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat Stream Window */}
        <div className="flex-1 neo-card bg-[#FFFBEB] p-6 overflow-y-auto mb-6 min-h-[420px] space-y-5">
          {copilotMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-4 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-10 h-10 rounded-2xl border-2 border-slate-900 flex items-center justify-center font-cartoon font-extrabold text-sm shrink-0 shadow-[2px_2px_0px_#0F172A] ${
                  msg.sender === 'user'
                    ? 'bg-[#FF6584] text-white'
                    : 'bg-[#FEE440] text-slate-900'
                }`}
              >
                {msg.sender === 'user' ? 'YOU' : 'AI'}
              </div>

              <div
                className={`max-w-[80%] neo-card p-5 text-sm font-bold font-heading leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#FFB3C6] text-slate-900'
                    : 'bg-[#E0F7FE] text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-1 opacity-75 text-xs font-mono">
                  <span>{msg.sender === 'user' ? 'You' : 'घुmo AI Engine'}</span>
                  <span>{msg.timestamp}</span>
                </div>
                <p className="text-base font-semibold">{msg.text}</p>

                {msg.actionType === 'harmony' && (
                  <div className="mt-4 pt-3 border-t-2 border-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <span className="font-cartoon font-extrabold text-sm text-slate-900">
                      3 Group Harmony Options Ready
                    </span>
                    <button
                      onClick={() => router.push('/group')}
                      className="neo-btn-primary text-xs sm:text-sm py-2 px-4 font-cartoon font-extrabold"
                    >
                      <span>View Group Harmony Options</span>
                      <span className="font-mono text-base">→</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isThinking && (
            <AIThinkingState
              message="Evaluating Sharma Family Preferences..."
              subtext="Reconciling Ramesh's walking limit (1.5km) with Aarav's afternoon rest break..."
            />
          )}
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your travel request (e.g. 'Add a sunset boat cruise on Day 4')..."
            className="flex-1 p-4 rounded-2xl border-3 border-slate-900 font-bold text-sm bg-[#FFFBEB] text-slate-900 placeholder:text-slate-500 shadow-[4px_4px_0px_#0F172A] focus:outline-none"
          />
          <button
            onClick={() => handleSend()}
            disabled={isThinking}
            className="neo-btn-primary py-4 px-6 shadow-[4px_4px_0px_#0F172A] font-cartoon font-extrabold text-sm"
          >
            <span>Send</span>
          </button>
        </div>
      </main>
    </div>
  );
}
