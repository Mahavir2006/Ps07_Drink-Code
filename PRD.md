# PRD — TRAVERSE (Travel Reality Engine)
### PS-07 · Personalized Dynamic Tour Planning & Tour Operations Platform
**Doc type:** Product Requirements Document — Frontend Prototype Scope
**Prepared for:** Hackathon build (frontend-only, mocked intelligence layer)

---

## 1. Product Summary

**Product name:** TRAVERSE — *The Travel Reality Engine*
**One-line pitch:** A two-sided platform where travelers build a tour instead of picking one, and operators run every custom tour from a single live control tower — and when reality changes mid-trip, the system re-plans it, not the human.

**Core differentiator we are proving in the demo:**
> Static itinerary generators stop at booking. TRAVERSE treats the trip as a live system — when a hotel cancels, weather turns, or a traveler gets tired, the platform detects the impact, proposes ranked fixes, and lets one click (traveler or operator) resolve it.

This PRD scopes **only what the frontend prototype needs to demonstrate that loop convincingly** — not the full backend vision in the team doc. Everything here is judged on: does it look and feel like a real, fundable product, and does the "break the trip → system fixes it" story land in under 5 minutes.

---

## 2. Why This Scope (Design Philosophy)

The team vision document (2,164 lines) describes a mature platform: blockchain trust layers, telephony AI bots, computer-vision "where am I," reinforcement-learning optimizers. All of that is real and good roadmap thinking — none of it is what wins a hackathon demo.

Rule applied to every feature below: **include it only if it is either (a) required to complete the traveler-to-operator lifecycle, or (b) a screen that makes a judge say "oh, that's smart" in under 10 seconds.** Nothing is included because it's technically impressive to build and invisible to a viewer.

Two categories:
- **Real interaction** — fully clickable, state actually changes, data actually flows between Traveler App and Operator Dashboard (via shared mock state).
- **Simulated intelligence** — AI outputs (recommendations, risk scores, explanations) are pre-scripted/mocked per scenario, not live ML. This is standard and expected for a hackathon frontend prototype — judges care that the *interaction model* is right, not that a real model is running behind it.

---

## 3. Goals & Success Criteria

| Goal | How the prototype proves it |
|---|---|
| Personalization beats fixed packages | Traveler configures a trip via guided flow + conversational input, sees itinerary assemble live |
| Group needs are a first-class constraint | Group Harmony screen shows conflicting preferences resolved into 3 tradeoff options |
| The system operates, not just plans | "Break the trip" demo: cancel a hotel mid-trip → impact analysis → 3 ranked fixes → 1-click resolve |
| Operator has real operational control, not just a booking list | Control Tower shows live risk across all tours + AI Action Center with approve/reject actions |
| AI decisions are explainable, not a black box | Every recommendation card has a "Why?" expansion with match %, cost delta, confidence |
| Visually, this looks like a premium consumer travel product, not a hackathon CRUD app | Distinctive design system (Section 8 of TRD), motion, editorial photography treatment |

---

## 4. Personas

**Traveler App**
- **Aditi** — planning a solo culture/food trip, budget-conscious, wants control over every component.
- **The Sharma Family** — trip creator (parent) planning for 6 people spanning grandparents to a 9-year-old; needs the system to reconcile very different needs.

**Operator Dashboard**
- **Coordinator (Ops)** — manages 100+ live tours, needs to know *which 5 need attention right now*, not scroll through all of them.
- **Vendor Manager** — needs to know which vendors are reliable before assigning them to a premium tour.

---

## 5. Scope

### 5.1 In Scope — Traveler App

| # | Feature | Why it's justified |
|---|---|---|
| T1 | **Onboarding & Trip Setup** — destination, dates, duration, budget, travel style, group composition | This *is* the "personalize instead of pick a package" thesis — must be first thing a judge sees |
| T2 | **AI Copilot (conversational planner)** — natural-language trip request, follow-up refinement chat | Primary USP #1/#2 from vision doc; also doubles as the in-trip assistant later |
| T3 | **Group Profile & Group Harmony Engine** — add members with ages/constraints, see 3 tradeoff itinerary options (max comfort / max adventure / max group satisfaction) | Directly answers the PS's "different interests, budgets, preferences" requirement; visually distinctive and rarely done well by competitors |
| T4 | **Discover / Explore** — browse destinations, activities, hotels, transport as swappable modular components with live cost updates | Required by PS: "select and modify different components," "compare alternatives," "view estimated costs" |
| T5 | **Itinerary Builder** — day-by-day drag-reorder view, per-item cost/time/crowd/suitability tags, swap-alternative action | This is the "optimized itinerary" deliverable of the PS lifecycle |
| T6 | **Explainable Recommendation Cards** — every suggested item shows a "Why this?" panel (match %, distance, rating-by-traveler-type) | Turns black-box AI into trust; cheap to build, high visual payoff |
| T7 | **Budget Meter** — live running total vs. budget cap, category breakdown | Required by PS ("view estimated costs"); also feeds the "Fix My Trip" cost-tradeoff story |
| T8 | **Booking & Checkout flow** | Completes the PS lifecycle step "complete bookings" |
| T9 | **Live Trip / Home Dashboard** — "Day 4 of 7," current + next activity, weather, Trip Health score, quick actions | This is where the "operate the trip" thesis becomes visible post-booking |
| T10 | **"Fix My Trip" — Dynamic Replanning flow** | **This is the single most important screen in the whole demo.** It's the concrete proof of the "operate, not just plan" differentiator. Triggered by a simulated disruption event (hotel cancelled); shows impact analysis → 3 ranked options (lowest disruption / lowest cost / best experience) → resolve |
| T11 | **Experience-Aware Route Nudge** — "You're passing 700m from a hidden gem that matches you" toast/card during a simulated "in transit" state | Cheap to build (one contextual card), demonstrates USP #7, very demo-friendly |
| T12 | **Local Pulse strip** — 2–3 sourced/timestamped local advisories on the live trip screen | Demonstrates the "information trust" design principle (source + timestamp + confidence) cheaply |
| T13 | **Post-Trip Review** — planned vs. actual comparison, feedback capture | Closes the full lifecycle loop (Discover → ... → Review) explicitly required by the PS |

### 5.2 In Scope — Operator Dashboard

| # | Feature | Why it's justified |
|---|---|---|
| O1 | **Control Tower Overview** — active tours count, stable/attention/critical breakdown, predicted risk categories | This is the PS's explicit ask: "operational visibility," "manage multiple customized tours" |
| O2 | **Live Tours List/Grid** — every active tour with destination, current activity, risk badge, trip health | Required operator visibility into the customer-facing journey |
| O3 | **AI Action Center** — risk cards with a recommended fix, cost delta, disruption level, Approve / Review Options buttons | This is the operator half of the "Fix My Trip" story — when the operator approves here, the traveler's app updates live. This is the demo's payoff moment |
| O4 | **Tour Detail / Itinerary Manager** — full itinerary view per tour with manual override capability | Required for "coordinate ... update several parts of the itinerary" |
| O5 | **Booking Management** — hotels/transport/activities with status pipeline (Requested→Confirmed→Modified→Cancelled) | Directly named in the PS ("coordinate ... hotels, transportation, activity vendors ... payments") |
| O6 | **Vendor Management + Reliability Score** | PS explicitly asks for vendor coordination; the reliability score is a cheap, visually strong differentiator vs. plain vendor lists |
| O7 | **Customer / Group Management** | Required — operator needs visibility into who they're serving and their preferences |
| O8 | **Analytics** — revenue, margin, popular destinations, satisfaction trend | PS explicitly asks for operational visibility; standard but expected in any ops dashboard |
| O9 | **Operator AI Copilot** — natural-language query bar ("show me tours with high transport risk") | Mirrors the traveler copilot; cheap to build as a filtered-search UI wrapped in chat framing, strong "wow" for judges |

### 5.3 Explicitly Out of Scope (documented, not built)

These are real ideas from the team vision but excluded from the **frontend prototype** because they either require infrastructure a hackathon can't fake convincingly, or don't add to the core story:

- Zero-connectivity / telephony AI voice bot (needs real telephony infra)
- Visual "Where Am I?" computer vision (needs a real CV model to not look fake; a mocked version would undercut credibility rather than build it)
- Blockchain / smart-contract trust layer (real backend infra; mention as roadmap only, e.g., a "Verified" badge with a tooltip explaining the intended blockchain backing)
- Real payment processing (checkout ends at a styled confirmation, no live payment gateway)
- Real live GPS tracking (trip "location" is simulated/scripted per demo step, not device GPS)

> Recommendation: keep a single **"Vision / Roadmap" screen** (one page, reachable from a footer link in both apps) that visually references these advanced capabilities so judges see the team understands the full opportunity without the team pretending to have built it.

---

## 6. Core User Journeys (for demo scripting)

**Journey A — Traveler builds a family trip**
Onboarding → AI Copilot prompt ("7-day Rajasthan trip, ₹50k, senior parents + kids 9 & 17, culture & food") → Group Harmony shows 3 tradeoff itineraries → select one → Itinerary Builder (swap one activity) → Budget Meter updates → Book → Live Trip Home.

**Journey B — Reality breaks the trip**
On Live Trip Home (Day 4) → simulated event fires: "Hotel Cancelled" push → Fix My Trip screen → impact analysis (affected: transfer, 2 activities) → 3 ranked options → traveler picks one → itinerary silently updates.

**Journey C — Operator resolves it first (alternate demo path)**
Operator Control Tower → Critical tour badge → AI Action Center card for same tour → Approve → cut back to Traveler app → itinerary already updated (proves the "operator in control" principle).

**Journey D — Post-trip loop**
Live Trip Home Day 7 → Complete Trip → Post-Trip Review (planned vs actual) → feedback → "this improves your next trip" callout.

---

## 7. Non-Functional Requirements

- **Responsive:** full parity on mobile (traveler app primary surface) and desktop (operator dashboard primary surface, traveler app must still work well on desktop for demo screen-share).
- **Performance feel:** every AI/system action shows a deliberate short "thinking" state (600–1200ms), never instant — instant reads as fake, a beat of "processing" reads as intelligent.
- **Accessibility:** color is never the only signal for risk/status (icon + label always paired); minimum AA contrast.
- **Visual quality bar:** must not look like a generic admin template or a generic purple-gradient AI SaaS product. See TRD Section 8 for design system.

---

## 8. Out-of-Scope Disclaimer for Judges

A short, honest "How this prototype works" note (footer or About modal) stating: this is a frontend prototype with a simulated intelligence and data layer; production would connect this UI to the constraint/optimization engine, live vendor APIs, and real-time event feeds described in the architecture. This protects credibility — judges respect teams that are precise about what's real vs. simulated.
