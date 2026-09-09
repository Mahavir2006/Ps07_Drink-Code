'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NavigationHeader } from '@/components/shared/NavigationHeader';
import { NotificationToast } from '@/components/shared/NotificationToast';
import { AIThinkingState } from '@/components/shared/AIThinkingState';
import { RiskBadge } from '@/components/shared/RiskBadge';
import { useTraverseStore } from '@/lib/store/useTraverseStore';
import { queryOperatorCopilot } from '@/lib/mock-engine';
import { Bot, Send, Sparkles, MapPin, Search } from 'lucide-react';
import { Tour } from '@/types';

export default function OperatorCopilotPage() {
  const router = useRouter();
  const { tours } = useTraverseStore();
  const [query, setQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [response, setResponse] = useState<{ reply: string; matchingTours: Tour[] } | null>(null);

  const sampleQueries = [
    'Show me tours with high transport or hotel risk',
    'Which active tours are running in Rajasthan?',
    'List critical risk tours requiring Action Center approval',
  ];

  const handleQuery = async (queryText?: string) => {
    const q = queryText || query;
    if (!q.trim()) return;

    setIsThinking(true);
    setResponse(null);

    const res = await queryOperatorCopilot(q, tours);
    setIsThinking(false);
    setResponse(res);
  };

  return (
    <div className="min-h-screen operator-dark text-slate-100 font-mono">
      <NavigationHeader />
      <NotificationToast />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#00BBF9] text-slate-900 border-2 border-slate-900 flex items-center justify-center font-bold text-2xl">
            🎛️
          </div>
          <div>
            <h1 className="font-cartoon text-3xl font-extrabold text-white">
              Operator AI Command Bar
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              Query live tour operations data using natural language queries
            </p>
          </div>
        </div>

        {/* Sample Queries */}
        <div className="mb-6">
          <span className="text-xs text-slate-400 font-mono block mb-2">Preset Operator Queries:</span>
          <div className="flex flex-wrap gap-2">
            {sampleQueries.map((sq, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(sq);
                  handleQuery(sq);
                }}
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs text-[#00BBF9] border border-slate-700 font-mono"
              >
                🔍 &quot;{sq}&quot;
              </button>
            ))}
          </div>
        </div>

        {/* Query Input */}
        <div className="flex items-center gap-2 mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleQuery()}
            placeholder="Type query over live tours data..."
            className="flex-1 p-3.5 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-[#00BBF9]"
          />
          <button
            onClick={() => handleQuery()}
            disabled={isThinking}
            className="neo-btn-primary py-3.5 px-6 bg-[#00BBF9] text-slate-900 border-slate-900 text-xs font-extrabold"
          >
            <Send className="w-4 h-4" />
            <span>Execute Query</span>
          </button>
        </div>

        {/* Results Stream */}
        {isThinking && (
          <AIThinkingState
            message="Querying Live Tours Database..."
            subtext="Searching risk vectors, vendor reliability, and active disruption events across 20 tours..."
          />
        )}

        {response && (
          <div className="neo-card p-6 bg-[#131c2e] border-slate-700 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <Bot className="w-4 h-4" />
              <span>{response.reply}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
              {response.matchingTours.map((t) => (
                <div key={t.id} className="p-4 rounded bg-slate-900 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[#00BBF9] font-extrabold text-xs">{t.id}</span>
                      <RiskBadge level={t.riskLevel} size="sm" />
                    </div>
                    <h4 className="font-cartoon text-sm font-bold text-white mb-1">{t.customerName}</h4>
                    <span className="text-xs text-slate-400">📍 {t.destination}</span>
                  </div>

                  <button
                    onClick={() => router.push(`/operator/tours/${t.id}`)}
                    className="mt-3 py-1.5 px-3 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700"
                  >
                    Inspect Tour →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
