# TRD — TRAVERSE (Travel Reality Engine)
### PS-07 · Frontend Prototype — Technical Requirements Document
**Scope:** Frontend-only prototype. No real backend, no real ML. A mock data/service layer simulates the intelligence and operational systems described in the PRD.

---

## 1. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14+ (App Router) + React 18 + TypeScript** | File-based routing gives us two app shells (`/app/(traveler)` and `/app/(operator)`) cleanly; TS enforces the shared data contracts between both apps |
| Styling | **Tailwind CSS** + CSS variables for the design token system | Fast iteration, easy to enforce a strict token system so the UI doesn't drift into "default Tailwind look" |
| Component primitives | **shadcn/ui** (Radix-based) as a base, heavily re-skinned | Accessible primitives (dialogs, dropdowns, tabs) without fighting a heavy component library's opinions |
| Animation | **Framer Motion** | Page transitions, the "AI thinking" states, itinerary card reflow, risk-card resolve animation |
| Charts | **Recharts** | Trip Health radial, budget breakdown, operator analytics |
| Maps | **Mapbox GL JS** (or **Leaflet + OpenStreetMap** if no API key available) | Route visualization, "since you're already going there" nudge, live trip location |
| State | **Zustand** | Single shared store simulating the "backend" — both Traveler App and Operator Dashboard read/write the same in-memory trip objects, which is what makes Journey C (operator approves → traveler screen updates) work without a real backend |
| Mock intelligence layer | Local TS module (`/lib/mock-engine`) — deterministic, scenario-keyed functions | Returns scripted "AI" outputs (recommendations, risk scores, explanations) with an artificial delay to simulate processing. Optional stretch: wire the AI Copilot chat to a real LLM call (see Section 6) |
| Icons | **Lucide** | Consistent line weight matching the design system |
| Fonts | See Section 8 | |

**Explicitly avoid:** any real backend framework, database, auth system, or payment SDK. Persist state in-memory (Zustand) with optional `localStorage` fallback for demo continuity across refresh — do not build real user accounts.

---

## 2. Architecture

```
/app
  /(traveler)
    /onboarding
    /copilot
    /group
    /discover
    /itinerary/[tripId]
    /budget
    /checkout
    /trip/[tripId]           ← Live Trip Home
    /trip/[tripId]/fix        ← Fix My Trip flow
    /trip/[tripId]/review     ← Post-trip
  /(operator)
    /dashboard                ← Control Tower Overview
    /tours
    /tours/[tourId]           ← Tour Detail / Itinerary Manager
    /actions                  ← AI Action Center
    /bookings
    /vendors
    /customers
    /analytics
    /copilot
  /roadmap                    ← shared "Vision" page (out-of-scope features, honestly labeled)

/lib
  /mock-engine                ← scenario-keyed fake intelligence functions
  /store                      ← Zustand store(s): trips, tours, vendors, bookings, events
  /data                       ← seed JSON: destinations, hotels, activities, vendors, personas

/components
  /traveler/*
  /operator/*
  /shared/*                   ← RiskBadge, ExplainCard, TripHealthGauge, AIThinkingState, etc.
```

**Key architectural decision — the shared store is the "backend."**
Both app shells import from the same `useTripStore`. When the mock engine fires a `HOTEL_CANCELLED` event and the operator clicks Approve in the Action Center, it mutates the same trip object the Traveler App is subscribed to. This is what makes the two-sided demo feel like a real connected system rather than two disconnected prototypes — and it's cheap (no websockets/backend needed) because it's one JS process.

---

## 3. Core Data Models (TypeScript)

Mirrors the "Core Data Objects" section of the team vision doc, trimmed to what the UI actually renders.

```ts
type TravelStyle = 'relaxed' | 'balanced' | 'packed';

interface TravelerProfile {
  id: string;
  name: string;
  preferences: { culture: number; food: number; adventure: number; luxury: number;
                 crowdTolerance: number; walkingTolerance: number; budgetSensitivity: number };
}

interface GroupMember {
  id: string; name: string; ageGroup: 'child' | 'teen' | 'adult' | 'senior';
  constraints: string[]; // e.g. "low walking tolerance", "vegetarian"
}

interface Trip {
  id: string; destination: string; startDate: string; endDate: string;
  budgetCap: number; budgetSpent: number; travelStyle: TravelStyle;
  group: GroupMember[]; days: ItineraryDay[];
  status: 'planning' | 'booked' | 'active' | 'completed';
  tripHealth: number; // 0–100
  activeEvent?: TripEvent | null;
}

interface ItineraryDay {
  dayNumber: number; date: string; items: ItineraryItem[];
}

interface ItineraryItem {
  id: string; time: string; title: string; type: 'hotel'|'transport'|'activity'|'food';
  location: { lat: number; lng: number; label: string };
  costEstimate: number; durationMins: number;
  crowdLevel?: 'low'|'medium'|'high'; suitability?: string[]; // group member ids it suits
  status: 'planned'|'confirmed'|'at_risk'|'modified'|'cancelled';
  explain?: { matchPercent: number; reasons: string[]; confidence: number };
}

interface TripEvent { // drives dynamic replanning
  id: string; type: 'HOTEL_CANCELLED'|'WEATHER_CHANGED'|'TRANSPORT_DELAYED'|'BUDGET_THRESHOLD';
  affectedItemIds: string[]; detectedAt: string;
  options: ReplanOption[];
}

interface ReplanOption {
  id: string; label: string; strategy: 'lowest_disruption'|'lowest_cost'|'best_experience';
  costDelta: number; timeDeltaMins: number; description: string;
}

interface Vendor {
  id: string; name: string; category: 'hotel'|'transport'|'activity';
  reliabilityScore: number; cancellationRate: number; avgResponseMins: number;
}

interface Tour { // operator-side wrapper around a Trip
  id: string; tripId: string; customerName: string; destination: string;
  riskLevel: 'stable'|'attention'|'critical'; riskBreakdown: Record<string, number>;
  coordinatorId?: string;
}
```

---

## 4. Mock Intelligence Layer — Behavior Spec

This is the piece that makes "AI features" feel real without a real model. Rules:

1. **Every AI action has three phases in the UI:** `idle → thinking (600–1200ms, animated) → result`. Never resolve instantly.
2. **All "AI" functions live in `/lib/mock-engine` and are pure, deterministic, scenario-keyed** — e.g. `getReplanOptions(event: TripEvent): ReplanOption[]` returns pre-authored, plausible, internally-consistent numbers (cost deltas that actually sum correctly against the trip budget).
3. **Every recommendation object carries an `explain` payload** (match %, reasons array, confidence) — the UI never invents explanation copy on the fly; it's part of the mock data contract, enforced by the TS types above.
4. **Demo determinism:** the disruption event (hotel cancellation) is trigger-able via a visible "Simulate Disruption" control (dev-only button, clearly styled as a demo control, not hidden) so the presenter can fire Journey B/C reliably live rather than hoping a random timer fires correctly on stage.

---

## 5. Design System — "Phenomenal UI/UX" Spec

Full detail lives in the frontend-design skill/read-me the build agent should consult, but the intentional direction for this product specifically:

**Concept:** *Flight-deck meets travel journal.* Traveler App reads like a warm, editorial travel publication (this is what earns trust and delight while planning). Operator Dashboard reads like a mission-control instrument panel (this is what earns trust while operating). Same underlying token system, different density/mode — this contrast should itself feel intentional, not like two different apps.

**Color:**
- Base neutrals: warm off-white / sand for traveler light mode; near-black slate for operator (dark-first).
- Primary: deep indigo/midnight blue (`#1B2340`-ish) — evokes night navigation, trust, premium travel.
- Accent: warm terracotta/sunset (`#E8683C`-ish) — used sparingly for primary actions and "this needs attention" moments, never as decoration.
- Risk system: three-tier (stable/attention/critical) — never rely on hue alone; pair with icon + label.

**Typography:**
- Display/headline: a distinctive serif or high-contrast display face (e.g., Fraunces, Canela-alike, or similar editorial serif) for trip names, destination headers — this single choice does more to avoid the "generic AI SaaS" look than anything else.
- UI/body: a clean grotesk (Inter, General Sans, or similar) for all interface text, data, forms.
- Operator dashboard numerals: tabular/monospace for IDs, timestamps, currency — reinforces the "control tower" feel.

**Motion principles:**
- Itinerary items reflow with physical, spring-based motion (Framer Motion `spring`, not linear ease) when swapped/reordered.
- The "Fix My Trip" resolve moment deserves a deliberate, satisfying transition (item card visibly updates status, brief highlight pulse) — this is the demo's payoff beat, it should feel good.
- Avoid decorative animation everywhere else; motion is reserved for state changes that matter.

**Imagery:** Real destination photography (curated stock, consistent warm-toned grade) for Discover/itinerary cards — never generic icon-only cards for a travel product; the emotional pull of a destination is part of the UX.

**Responsiveness:**
- Traveler App: mobile-first (390px baseline), scales to desktop as a centered, generously-margined layout (not just a stretched mobile view).
- Operator Dashboard: desktop-first (1440px baseline, data-dense grid/table layouts), with a defined tablet breakpoint (iPad-class, for a coordinator walking a venue) — mobile phone support for Operator is secondary (a simplified "on-call" view), explicitly scoped as such.

---

## 6. Optional Stretch — Making the AI Copilot Genuinely Functional

If time allows, the Traveler and Operator AI Copilot chat surfaces can call a real LLM (e.g., via a serverless API route calling an LLM API) instead of canned responses, with the itinerary/trip JSON passed as context and the response constrained to structured actions (e.g., "propose swap for item X" → validated against the mock data schema before rendering). This is the single highest-leverage "wow" upgrade if the team has bandwidth, because it's the one surface judges will actually try to break by typing something unexpected. Keep the fallback to scripted responses for demo safety (network/API failure during a live demo is the top prototype risk).

---

## 7. Non-Functional / Build Constraints

- Ship as a single deployable Next.js app (Vercel-friendly) — no multi-service deployment for a hackathon.
- No real auth: a simple role switcher (Traveler / Operator) in a corner, no login flow, to save build time without pretending otherwise.
- Seed data: 3–4 fully fleshed destinations (at least one Rajasthan-style itinerary matching the vision doc's own demo script), 10–15 vendors, 15–20 active mock "Tours" for the operator dashboard to feel populated/real rather than showing 2 empty rows.
- Lighthouse targets (nice-to-have, not blocking): performance/accessibility ≥ 85 on the primary Traveler Home and Operator Overview screens.
