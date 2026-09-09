import {
  TripEvent,
  ReplanOption,
  GroupMember,
  GroupHarmonyOption,
  ExplainData,
  ItineraryItem,
  RouteNudge,
  LocalPulseAdvisory,
  Tour,
} from '@/types';

export const simulateAIThinking = <T>(result: T, delayMs: number = 800): Promise<T> => {
  return new Promise((resolve) => setTimeout(() => resolve(result), delayMs));
};

export const getExplainCard = (item: ItineraryItem): ExplainData => {
  if (item.explain) return item.explain;
  return {
    matchPercent: 94,
    reasons: [
      'Matches traveler group mobility constraints',
      'Verified 98% vendor reliability rating',
      'Optimized transport duration (under 45 mins)',
    ],
    confidence: 0.95,
  };
};

export const getGroupHarmonyOptions = async (
  group: GroupMember[]
): Promise<GroupHarmonyOption[]> => {
  const options: GroupHarmonyOption[] = [
    {
      id: 'harmony-opt-1',
      name: '🌟 Max Group Harmony & Comfort (Recommended)',
      tagline: 'Balanced pace with golf-carts for seniors & interactive workshops for kids',
      strategy: 'comfort',
      matchPercentage: 96,
      highlights: [
        'Zero stairs / step-free accessibility at all major monuments for Ramesh & Savitri',
        'Guaranteed afternoon rest window (2:00 PM - 4:00 PM) for Aarav',
        '100% Pure Vegetarian dining with Jain options',
        'Sunset rooftop photography slot for Ananya',
      ],
      tradeoffs: [
        'Slightly higher transport cost due to dedicated private AC tempo traveler',
        'Excludes high-strenuous cliff hikes',
      ],
      days: [], // populates with balanced itinerary
    },
    {
      id: 'harmony-opt-2',
      name: '🏎️ Max Adventure & Heritage Express',
      tagline: 'Faster-paced exploration covering 4 extra heritage forts & desert safari',
      strategy: 'adventure',
      matchPercentage: 84,
      highlights: [
        'Includes Jaisalmer Sand Dunes Jeep Safari & Camel Sunset Camp',
        'Early morning fort walks before heat builds up',
        'Street food walking tour included',
      ],
      tradeoffs: [
        'High walking requirement (4.5 km/day) — may strain Ramesh & Savitri',
        'No dedicated afternoon nap window for Aarav',
      ],
      days: [],
    },
    {
      id: 'harmony-opt-3',
      name: '🧘 Leisure & Cultural Wellness',
      tagline: 'Ultra-relaxed pace with 2-night minimum per hotel & spa wellness breaks',
      strategy: 'balanced',
      matchPercentage: 91,
      highlights: [
        '2 nights each in Jaipur & Udaipur with zero daily hotel packing',
        'Private Haveli courtyard tea ceremonies',
        'Gentle boat cruises & garden walks',
      ],
      tradeoffs: [
        'Omits Jodhpur fort to keep travel distances under 3 hours per leg',
        'Slightly higher total hotel budget',
      ],
      days: [],
    },
  ];

  return simulateAIThinking(options, 900);
};

export const getRouteNudge = (): RouteNudge => {
  return {
    id: 'nudge-artisan-01',
    title: '🎨 Experience Nudge: Hidden Block-Printing Colony',
    description:
      'You are driving just 700m away from Bagru Artisan Village! Master craftsman Ramdev is currently demonstrating natural indigo dyeing.',
    distanceMeter: 700,
    extraCost: 400,
    extraMins: 30,
    matchPercent: 97,
    imageUrl: 'https://images.unsplash.com/photo-1603201667141-5a2d4c673378?q=80&w=600&auto=format&fit=crop',
    category: 'Local Hidden Gem',
  };
};

export const getLocalPulseAdvisories = (): LocalPulseAdvisory[] => {
  return [
    {
      id: 'pulse-1',
      timestamp: '15 mins ago',
      location: 'City Palace, Udaipur',
      message: 'VIP Royal Convoy Movement from 3:00-3:30 PM — Expect 10 min gate delay.',
      type: 'warning',
      source: 'Udaipur Traffic Ops Feed',
      confidence: 0.98,
    },
    {
      id: 'pulse-2',
      timestamp: '1 hour ago',
      location: 'Lake Pichola',
      message: 'Clear sky & pleasant 24°C breeze — Ideal sunset boat cruise conditions.',
      type: 'tip',
      source: 'Rajasthan Meteorological Bureau',
      confidence: 0.99,
    },
    {
      id: 'pulse-3',
      timestamp: '2 hours ago',
      location: 'Gangaur Ghat',
      message: 'Evening Bagore Ki Haveli folk dance tickets selling out fast — pre-booked seats confirmed.',
      type: 'info',
      source: 'घुmo AI Ops Sentinel',
      confidence: 0.96,
    },
  ];
};

export const queryOperatorCopilot = async (
  query: string,
  tours: Tour[]
): Promise<{ reply: string; matchingTours: Tour[] }> => {
  const q = query.toLowerCase();

  let matchingTours = tours;
  let reply = '';

  if (q.includes('risk') || q.includes('critical') || q.includes('attention')) {
    matchingTours = tours.filter(
      (t) => t.riskLevel === 'critical' || t.riskLevel === 'attention'
    );
    reply = `Found ${matchingTours.length} active tours currently requiring operational attention or dynamic replanning.`;
  } else if (q.includes('rajasthan') || q.includes('jaipur') || q.includes('udaipur')) {
    matchingTours = tours.filter((t) => t.destination.toLowerCase().includes('rajasthan'));
    reply = `Found ${matchingTours.length} active tours running across the Rajasthan corridor.`;
  } else if (q.includes('hotel') || q.includes('cancel')) {
    matchingTours = tours.filter((t) => (t.riskBreakdown.hotel || 0) > 30 || t.activeEvent);
    reply = `Identified ${matchingTours.length} tours with hotel availability issues or cancellation alerts.`;
  } else if (q.includes('kerala') || q.includes('swiss') || q.includes('bali')) {
    matchingTours = tours.filter((t) =>
      t.destination.toLowerCase().includes(q.match(/kerala|swiss|bali/)?.[0] || '')
    );
    reply = `Showing ${matchingTours.length} tours matching destination "${query}".`;
  } else {
    reply = `Analyzed ${tours.length} live tours. Here are the active operational records matching your request.`;
  }

  return simulateAIThinking({ reply, matchingTours }, 700);
};
