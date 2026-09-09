# TRAVERSE — घुmo (The Travel Reality Engine)
## Complete Technical Stack & System Architecture Specifications

This document outlines the end-to-end technical stack, architectural breakdown, data contracts, and feature specifications for **TRAVERSE / घुmo**, derived from the Product Requirements Document (PRD) and Technical Requirements Document (TRD).

---

## 1. Executive Platform Architecture

TRAVERSE is built as a single, unified **Next.js 14+ (App Router)** application written in **TypeScript**. It houses two connected user experiences (App Shells) driven by a single, shared in-memory state engine:

```
                          ┌──────────────────────────────────────────┐
                          │    Shared Zustand In-Memory Store        │
                          │   (lib/store/useTraverseStore.ts)        │
                          └────────────────────┬─────────────────────┘
                                               │
                       ┌───────────────────────┴───────────────────────┐
                       ▼                                               ▼
         ┌───────────────────────────┐                   ┌───────────────────────────┐
         │     Traveler App Shell    │                   │   Operator Control Tower  │
         │  (Mobile-First Editorial) │                   │ (Desktop Arcade Control) │
         └─────────────┬─────────────┘                   └─────────────┬─────────────┘
                       │                                               │
       ┌───────────────┴──────────────┐                 ┌──────────────┴───────────────┐
       │ - Onboarding                 │                 │ - Control Tower Overview     │
       │ - AI Copilot Planner         │                 │ - Live Tours Grid            │
       │ - Group Profile & Harmony    │                 │ - AI Action Center           │
       │ - Component Discover         │                 │ - Tour Itinerary Manager     │
       │ - Itinerary Builder          │                 │ - Booking Management Pipeline│
       │ - Budget Meter & Checkout    │                 │ - Vendor Reliability Score   │
       │ - Live Trip Home             │                 │ - Customer Management        │
       │ - "Fix My Trip" Replanning   │                 │ - Operational Analytics      │
       │ - Route Nudge & Local Pulse  │                 │ - Operator AI Copilot        │
       │ - Post-Trip Review           │                 └──────────────────────────────┘
       └──────────────────────────────┘
```

---

## 2. Comprehensive Tech Stack Breakdown

| Layer / Subsystem | Technology Choice | Architectural Purpose & Implementation Details |
| :--- | :--- | :--- |
| **Core Framework** | **Next.js 14.3+ (App Router)** | Provides file-based routing across Traveler and Operator shells, optimized production static generation (`prerendered`), and Turbopack bundler support. |
| **Language** | **TypeScript 5.0+** | Enforces strict, shared data interfaces across traveler and operator views (`types/index.ts`), preventing data contract drift. |
| **Styling & Design System** | **Tailwind CSS v4 + Vanilla CSS** | Enforces custom tokens (`globals.css`), neo-brutal offset shadow cards (`shadow-[4px_4px_0px_#0F172A]`), crisp borders (`border-2.5`), and warm golden-hour sand backgrounds (`#F8FAF9`). |
| **Typography System** | **Next.js Google Fonts** | - **Primary Body/UI**: `Plus Jakarta Sans` (weights 400, 500, 600)<br>- **Headings & UI Labels**: `Outfit` (weights 500, 600, 700)<br>- **Brand Mark Logo**: `Baloo 2` (weight 800 for **घुmo** Devanagari logo identity) |
| **State Management** | **Zustand 4.5+** | Single shared store (`lib/store/useTraverseStore.ts`) simulating a live real-time backend. Changes made by the operator (e.g., approving a replan) instantly update traveler screens without page reloads. Includes `localStorage` fallback (`ghumo-traverse-storage`). |
| **Animation Engine** | **Framer Motion 11.0+** | Physics-based spring transitions for itinerary card reordering, `AIThinkingState` pulses (600–1200ms), and smooth disruption resolution card transitions. |
| **Data Visualization** | **Recharts 2.12+** | Renders Trip Health radial gauges, budget category breakdown pie/bar charts, operator revenue trends, and vendor reliability metrics. |
| **Iconography** | **Lucide React** | Clean, consistent 2px line-weight vector icons across controls and risk badges. Zero AI emojis used. |
| **Mock Intelligence Layer** | **Local TS Engine (`lib/mock-engine`)** | Deterministic, scenario-keyed functions providing explainable AI recommendations, risk scoring, and multi-option replanning with artificial delays. |
| **Interactive UX Feedback** | **Canvas-Confetti** | Celebration feedback upon trip booking completion and review submission. |
| **Deployment & Hosting** | **Vercel Edge Platform** | Zero-backend static/dynamic serverless deployment with instant CI/CD push integration via GitHub. |

---

## 3. Data Schema & Core TypeScript Contracts (`types/index.ts`)

```typescript
export type TravelStyle = 'relaxed' | 'balanced' | 'packed';
export type GroupAgeGroup = 'child' | 'teen' | 'adult' | 'senior';

export interface GroupMember {
  id: string;
  name: string;
  ageGroup: GroupAgeGroup;
  constraints: string[];
}

export interface ExplainData {
  matchPercent: number;
  reasons: string[];
  confidence: number;
}

export interface ItineraryItem {
  id: string;
  time: string;
  title: string;
  type: 'hotel' | 'transport' | 'activity' | 'food';
  location: { lat: number; lng: number; label: string };
  costEstimate: number;
  durationMins: number;
  crowdLevel?: 'low' | 'medium' | 'high';
  suitability?: string[];
  status: 'planned' | 'confirmed' | 'at_risk' | 'modified' | 'cancelled';
  explain?: ExplainData;
}

export interface ItineraryDay {
  dayNumber: number;
  date: string;
  items: ItineraryItem[];
}

export interface ReplanOption {
  id: string;
  label: string;
  strategy: 'lowest_disruption' | 'lowest_cost' | 'best_experience';
  costDelta: number;
  timeDeltaMins: number;
  description: string;
  affectedItemIds: string[];
}

export interface TripEvent {
  id: string;
  type: 'HOTEL_CANCELLED' | 'WEATHER_CHANGED' | 'TRANSPORT_DELAYED' | 'BUDGET_THRESHOLD';
  affectedItemIds: string[];
  detectedAt: string;
  options: ReplanOption[];
}

export interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  budgetCap: number;
  budgetSpent: number;
  travelStyle: TravelStyle;
  group: GroupMember[];
  days: ItineraryDay[];
  status: 'planning' | 'booked' | 'active' | 'completed';
  tripHealth: number; // 0-100
  activeEvent?: TripEvent | null;
}

export interface Vendor {
  id: string;
  name: string;
  category: 'hotel' | 'transport' | 'activity';
  reliabilityScore: number; // 0-100
  cancellationRate: number; // percentage
  avgResponseMins: number;
}

export interface Booking {
  id: string;
  tripId: string;
  itemName: string;
  category: 'hotel' | 'transport' | 'activity';
  vendorName: string;
  cost: number;
  status: 'Requested' | 'Confirmed' | 'Modified' | 'Cancelled';
  date: string;
}

export interface Tour {
  id: string;
  tripId: string;
  customerName: string;
  destination: string;
  startDate: string;
  endDate: string;
  riskLevel: 'stable' | 'attention' | 'critical';
  riskBreakdown: { hotel: number; transport: number; weather: number };
  coordinatorId?: string;
  groupSize: number;
}
```

---

## 4. End-to-End Route Architecture & Feature Mapping

### 4.1 Traveler App Shell (`/app`)
- `/onboarding`: Step-by-step traveler trip setup (destination, dates, budget cap, travel style, group members).
- `/copilot`: Conversational AI planner with natural-language travel prompts and preset demo buttons.
- `/group`: Group Profile & Group Harmony engine rendering 3 reconciled tradeoff itineraries (Max Comfort, Balanced Harmony, Max Adventure).
- `/discover`: Swappable modular components (hotels, activities, transport) with real-time budget meter impact.
- `/itinerary/[tripId]`: Day-by-day drag-reorder itinerary builder with explainable recommendation cards.
- `/checkout`: Summary invoice with simulated instant confirmation.
- `/trip/[tripId]`: Live Trip Home dashboard showing current activity, weather, local pulse, and Trip Health gauge.
- `/trip/[tripId]/fix`: "Fix My Trip" dynamic replanning screen triggered by simulated disruptions (`HOTEL_CANCELLED`).
- `/trip/[tripId]/review`: Post-trip planned vs. actual comparison analysis and review submission.

### 4.2 Operator Control Tower (`/app/operator`)
- `/operator/dashboard`: Mission-control overview of active tours, risk categories (Stable/Attention/Critical), and system stats.
- `/operator/tours`: Live tours grid with real-time health indicators and risk filtering.
- `/operator/tours/[tourId]`: Tour detail itinerary manager with manual operator override capabilities.
- `/operator/actions`: AI Action Center presenting prioritized operational risk cards and 1-click Approve/Resolve controls.
- `/operator/bookings`: Full vendor booking pipeline management (Requested → Confirmed → Modified → Cancelled).
- `/operator/vendors`: Vendor reliability tracking matrix (reliability score, response latency, cancellation rate).
- `/operator/customers`: Group profile and passenger constraint visibility panel.
- `/operator/analytics`: Financial performance, margin breakdown, and customer satisfaction charts.
- `/operator/copilot`: Natural-language operator assistant for ops filtering and automated risk resolution.

### 4.3 Shared Infrastructure (`/app/roadmap`)
- `/roadmap`: Vision & Roadmap disclosure detailing production backend architecture (blockchain verification, telephony AI voice bots, computer vision).

---

## 5. Non-Functional & Operational Standards

1. **Performance Feel**: Simulated processing delays (600ms–1200ms) paired with `AIThinkingState` loaders give AI operations realistic cognitive cadence.
2. **High-Contrast Legibility**: Standardized font weights (`font-semibold` / `font-medium`), high contrast contrast text (`#0F172A` dark slate), and clear risk indicators (paired text + colored badge).
3. **Build & Production Readiness**: Zero build warnings or errors across 18 static/dynamic routes using Next.js Turbopack compiler.
