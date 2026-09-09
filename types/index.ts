export type TravelStyle = 'relaxed' | 'balanced' | 'packed';

export interface TravelerProfile {
  id: string;
  name: string;
  avatar: string;
  preferences: {
    culture: number; // 0-100
    food: number; // 0-100
    adventure: number; // 0-100
    luxury: number; // 0-100
    crowdTolerance: number; // 0-100
    walkingTolerance: number; // 0-100
    budgetSensitivity: number; // 0-100
  };
}

export interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  ageGroup: 'child' | 'teen' | 'adult' | 'senior';
  constraints: string[]; // e.g. "Low walking tolerance", "Vegetarian food only", "Needs afternoon rest"
}

export interface ExplainData {
  matchPercent: number; // e.g. 94
  reasons: string[]; // e.g. ["Low walking requirement for seniors", "Highly rated vegetarian dining", "98% vendor reliability score"]
  confidence: number; // e.g. 0.95
}

export interface ItineraryItem {
  id: string;
  time: string; // e.g. "09:00 AM"
  title: string;
  type: 'hotel' | 'transport' | 'activity' | 'food';
  location: {
    lat: number;
    lng: number;
    label: string;
  };
  costEstimate: number; // in INR e.g. 4500
  durationMins: number; // e.g. 120
  crowdLevel?: 'low' | 'medium' | 'high';
  suitability?: string[]; // group member IDs or descriptors
  status: 'planned' | 'confirmed' | 'at_risk' | 'modified' | 'cancelled';
  explain?: ExplainData;
  imageUrl?: string;
  vendorId?: string;
  notes?: string;
}

export interface ItineraryDay {
  dayNumber: number;
  date: string; // e.g. "2026-10-14"
  title: string; // e.g. "Arrival & Royal Fort Exploration"
  items: ItineraryItem[];
}

export interface ReplanOption {
  id: string;
  label: string;
  strategy: 'lowest_disruption' | 'lowest_cost' | 'best_experience';
  costDelta: number; // e.g. +1200 or -800
  timeDeltaMins: number; // e.g. 0 or +30
  description: string;
  replacementItem?: ItineraryItem;
  affectedItemIds?: string[];
  recommendedBadge?: string;
}

export interface TripEvent {
  id: string;
  tripId: string;
  type: 'HOTEL_CANCELLED' | 'WEATHER_CHANGED' | 'TRANSPORT_DELAYED' | 'BUDGET_THRESHOLD';
  title: string;
  description: string;
  affectedItemIds: string[];
  detectedAt: string;
  options: ReplanOption[];
  status: 'pending' | 'resolved' | 'rejected';
}

export interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  budgetCap: number; // e.g. 60000
  budgetSpent: number; // e.g. 48500
  travelStyle: TravelStyle;
  group: GroupMember[];
  days: ItineraryDay[];
  status: 'planning' | 'booked' | 'active' | 'completed';
  tripHealth: number; // 0–100
  activeEvent?: TripEvent | null;
  coverImage?: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: 'hotel' | 'transport' | 'activity' | 'food';
  reliabilityScore: number; // 0–100
  cancellationRate: number; // e.g. 0.02 (2%)
  avgResponseMins: number; // e.g. 15
  location: string;
  phone: string;
  rating: number; // 1-5
  status: 'active' | 'under_review' | 'preferred';
}

export interface Tour {
  id: string;
  tripId: string;
  customerName: string;
  destination: string;
  startDate: string;
  endDate: string;
  paxCount: number;
  riskLevel: 'stable' | 'attention' | 'critical';
  riskBreakdown: {
    hotel: number; // 0-100 risk score
    transport: number;
    weather: number;
    budget: number;
  };
  coordinatorId?: string;
  tripHealth: number;
  activeEvent?: TripEvent | null;
  totalCost: number;
}

export interface Booking {
  id: string;
  tourId: string;
  customerName: string;
  itemTitle: string;
  type: 'hotel' | 'transport' | 'activity' | 'food';
  vendorName: string;
  amount: number;
  status: 'Requested' | 'Confirmed' | 'Modified' | 'Cancelled';
  date: string;
}

export interface GroupHarmonyOption {
  id: string;
  name: string; // e.g. "Max Comfort & Senior Friendly"
  tagline: string;
  strategy: 'comfort' | 'adventure' | 'balanced';
  matchPercentage: number;
  highlights: string[];
  tradeoffs: string[];
  days: ItineraryDay[];
}

export interface RouteNudge {
  id: string;
  title: string;
  description: string;
  distanceMeter: number; // e.g. 700
  extraCost: number; // e.g. 350
  extraMins: number; // e.g. 25
  matchPercent: number; // e.g. 96
  imageUrl: string;
  category: string;
}

export interface LocalPulseAdvisory {
  id: string;
  timestamp: string;
  location: string;
  message: string;
  type: 'info' | 'warning' | 'tip';
  source: string;
  confidence: number;
}
