import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  Trip,
  Tour,
  Vendor,
  Booking,
  ItineraryItem,
  TripEvent,
  ReplanOption,
} from '@/types';
import {
  initialTrip,
  initialTours,
  initialVendors,
  initialBookings,
} from '@/lib/data/seedData';

export const sampleDisruptionEvent: TripEvent = {
  id: 'evt-hotel-cancel-01',
  tripId: 'trip-rajasthan-01',
  type: 'HOTEL_CANCELLED',
  title: '🚨 Hotel Cancellation Disruption: Heritage Lakefront Resort',
  description:
    'Heritage Lakefront Resort Udaipur unexpectedly cancelled room reservations due to plumbing maintenance. Transfers and Lake Pichola boat cruise timed with check-in are affected.',
  affectedItemIds: ['item-402', 'item-403'],
  detectedAt: '2026-10-13 11:15 AM',
  status: 'pending',
  options: [
    {
      id: 'opt-01',
      label: 'Taj Fateh Prakash Palace (Lake View Suite)',
      strategy: 'best_experience',
      costDelta: 2400,
      timeDeltaMins: 0,
      description:
        'Seamless luxury upgrade adjacent to City Palace with step-free elevators for Ramesh & Savitri. 98% vendor reliability.',
      recommendedBadge: '🌟 Top AI Match (98%)',
      replacementItem: {
        id: 'item-402-rep1',
        time: '02:00 PM',
        title: 'Taj Fateh Prakash Palace Royal Suite',
        type: 'hotel',
        location: { lat: 24.5764, lng: 73.6835, label: 'City Palace Complex, Udaipur' },
        costEstimate: 18400,
        durationMins: 60,
        suitability: ['m1', 'm2', 'm3', 'm4', 'm5', 'm6'],
        status: 'confirmed',
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop',
        vendorId: 'v-hotel-03',
        explain: {
          matchPercent: 98,
          reasons: [
            'Ground-level elevator access perfect for Ramesh',
            'Pure veg dining options verified',
            'Includes complimentary high-tea',
          ],
          confidence: 0.98,
        },
      },
    },
    {
      id: 'opt-02',
      label: 'Trident Hotel Udaipur (Garden View)',
      strategy: 'lowest_cost',
      costDelta: -1500,
      timeDeltaMins: 15,
      description:
        'Saves ₹1,500 vs budget. Peaceful lakeside gardens, 96% reliability score, excellent kids playground for Aarav.',
      recommendedBadge: '💰 Best Budget Pick',
      replacementItem: {
        id: 'item-402-rep2',
        time: '02:15 PM',
        title: 'Trident Hotel Udaipur Lakeside Resort',
        type: 'hotel',
        location: { lat: 24.57, lng: 73.67, label: 'Haridas Ji Ki Magri, Udaipur' },
        costEstimate: 14500,
        durationMins: 60,
        suitability: ['m1', 'm2', 'm3', 'm4', 'm5', 'm6'],
        status: 'confirmed',
        imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop',
        vendorId: 'v-hotel-04',
        explain: {
          matchPercent: 94,
          reasons: [
            'Saves ₹1,500 against trip budget',
            'Full wheelchair access throughout property',
            'Kids activity center available',
          ],
          confidence: 0.95,
        },
      },
    },
    {
      id: 'opt-03',
      label: 'Boutique Haveli Stay + Private Sunset Transfer',
      strategy: 'lowest_disruption',
      costDelta: 400,
      timeDeltaMins: 10,
      description:
        'Minimizes schedule changes. Maintains exact boat cruise slot at 5:30 PM with zero delay to afternoon activities.',
      recommendedBadge: '⚡ Zero Schedule Shift',
      replacementItem: {
        id: 'item-402-rep3',
        time: '02:00 PM',
        title: 'Chundavatta Historic Haveli & Spa',
        type: 'hotel',
        location: { lat: 24.578, lng: 73.681, label: 'Pichola Ghat, Udaipur' },
        costEstimate: 16400,
        durationMins: 60,
        suitability: ['m1', 'm2', 'm3', 'm4', 'm5', 'm6'],
        status: 'confirmed',
        imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=600&auto=format&fit=crop',
        vendorId: 'v-hotel-01',
        explain: {
          matchPercent: 92,
          reasons: [
            'Exact timing match with solar boat cruise',
            'Charming historic Marwari architecture',
          ],
          confidence: 0.93,
        },
      },
    },
  ],
};

export interface CopilotChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  actionType?: 'harmony' | 'itinerary' | 'disruption' | 'replan';
}

interface TraverseState {
  activeRole: 'traveler' | 'operator';
  activeTrip: Trip;
  tours: Tour[];
  vendors: Vendor[];
  bookings: Booking[];
  disruptionSimulated: boolean;
  isAIThinking: boolean;
  copilotMessages: CopilotChatMessage[];
  notificationToast: { title: string; message: string; type: 'info' | 'warning' | 'success' } | null;

  // Actions
  setActiveRole: (role: 'traveler' | 'operator') => void;
  setTrip: (trip: Trip) => void;
  triggerDisruptionEvent: () => void;
  applyReplanOption: (optionId: string) => void;
  swapItineraryItem: (dayNumber: number, itemId: string, newItem: ItineraryItem) => void;
  updateVendorReliability: (vendorId: string, newScore: number) => void;
  addCopilotMessage: (msg: Omit<CopilotChatMessage, 'id' | 'timestamp'>) => void;
  clearNotification: () => void;
  resetToSeedData: () => void;
}

export const useTraverseStore = create<TraverseState>()(
  persist(
    (set, get) => ({
      activeRole: 'traveler',
      activeTrip: initialTrip,
      tours: initialTours,
      vendors: initialVendors,
      bookings: initialBookings,
      disruptionSimulated: false,
      isAIThinking: false,
      copilotMessages: [
        {
          id: 'm-init-1',
          sender: 'bot',
          text: 'Namaste! I am घुmo AI Copilot. I can tailor your family trip to Rajasthan, balance senior comfort with kid activities, or adjust your budget live!',
          timestamp: 'Just now',
        },
      ],
      notificationToast: null,

      setActiveRole: (role) => set({ activeRole: role }),

      setTrip: (trip) => set({ activeTrip: trip }),

      triggerDisruptionEvent: () => {
        const state = get();
        const updatedDays = state.activeTrip.days.map((day) => {
          if (day.dayNumber === 4) {
            return {
              ...day,
              items: day.items.map((item) =>
                item.id === 'item-402'
                  ? { ...item, status: 'cancelled' as const }
                  : item.id === 'item-403'
                  ? { ...item, status: 'at_risk' as const }
                  : item
              ),
            };
          }
          return day;
        });

        const updatedTrip: Trip = {
          ...state.activeTrip,
          days: updatedDays,
          tripHealth: 68,
          activeEvent: sampleDisruptionEvent,
        };

        const updatedTours = state.tours.map((t) =>
          t.id === 'TRV-101'
            ? {
                ...t,
                riskLevel: 'critical' as const,
                tripHealth: 68,
                riskBreakdown: { hotel: 95, transport: 35, weather: 5, budget: 15 },
                activeEvent: sampleDisruptionEvent,
              }
            : t
        );

        set({
          activeTrip: updatedTrip,
          tours: updatedTours,
          disruptionSimulated: true,
          notificationToast: {
            title: '🚨 Disruption Detected!',
            message: 'Heritage Lakefront Resort Udaipur cancelled booking. AI dynamic replanning ready.',
            type: 'warning',
          },
        });
      },

      applyReplanOption: (optionId: string) => {
        const state = get();
        const event = state.activeTrip.activeEvent || sampleDisruptionEvent;
        const chosenOption = event.options.find((opt) => opt.id === optionId) || event.options[0];

        if (!chosenOption || !chosenOption.replacementItem) return;

        const updatedDays = state.activeTrip.days.map((day) => {
          if (day.dayNumber === 4) {
            return {
              ...day,
              items: day.items.map((item) => {
                if (item.id === 'item-402') {
                  return chosenOption.replacementItem!;
                }
                if (item.id === 'item-403') {
                  return { ...item, status: 'confirmed' as const };
                }
                return item;
              }),
            };
          }
          return day;
        });

        const newSpent = state.activeTrip.budgetSpent + chosenOption.costDelta;

        const updatedTrip: Trip = {
          ...state.activeTrip,
          days: updatedDays,
          budgetSpent: newSpent,
          tripHealth: 96,
          activeEvent: null,
          status: 'active',
        };

        const updatedTours = state.tours.map((t) =>
          t.id === 'TRV-101'
            ? {
                ...t,
                riskLevel: 'stable' as const,
                tripHealth: 96,
                totalCost: newSpent,
                riskBreakdown: { hotel: 5, transport: 8, weather: 2, budget: 5 },
                activeEvent: null,
              }
            : t
        );

        const newBooking: Booking = {
          id: `BOK-${Date.now().toString().slice(-4)}`,
          tourId: 'TRV-101',
          customerName: 'Sharma Family',
          itemTitle: chosenOption.replacementItem.title,
          type: 'hotel',
          vendorName: chosenOption.label,
          amount: chosenOption.replacementItem.costEstimate,
          status: 'Confirmed',
          date: '2026-10-13',
        };

        set({
          activeTrip: updatedTrip,
          tours: updatedTours,
          bookings: [newBooking, ...state.bookings],
          disruptionSimulated: false,
          notificationToast: {
            title: '✨ Trip Re-Planned & Resolved!',
            message: `Replaced with ${chosenOption.label}. Cost delta: ₹${chosenOption.costDelta > 0 ? '+' : ''}${chosenOption.costDelta}`,
            type: 'success',
          },
        });
      },

      swapItineraryItem: (dayNumber: number, itemId: string, newItem: ItineraryItem) => {
        const state = get();
        const updatedDays = state.activeTrip.days.map((day) => {
          if (day.dayNumber === dayNumber) {
            return {
              ...day,
              items: day.items.map((item) => (item.id === itemId ? newItem : item)),
            };
          }
          return day;
        });

        set({
          activeTrip: {
            ...state.activeTrip,
            days: updatedDays,
          },
        });
      },

      updateVendorReliability: (vendorId: string, newScore: number) => {
        const state = get();
        set({
          vendors: state.vendors.map((v) =>
            v.id === vendorId ? { ...v, reliabilityScore: newScore } : v
          ),
        });
      },

      addCopilotMessage: (msg) => {
        const state = get();
        const newMsg: CopilotChatMessage = {
          ...msg,
          id: `msg-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        set({ copilotMessages: [...state.copilotMessages, newMsg] });
      },

      clearNotification: () => set({ notificationToast: null }),

      resetToSeedData: () => {
        set({
          activeTrip: initialTrip,
          tours: initialTours,
          vendors: initialVendors,
          bookings: initialBookings,
          disruptionSimulated: false,
          isAIThinking: false,
          notificationToast: null,
        });
      },
    }),
    {
      name: 'ghumo-traverse-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
