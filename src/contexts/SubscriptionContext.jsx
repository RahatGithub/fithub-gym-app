// src/contexts/SubscriptionContext.jsx
import { createContext, useContext, useReducer, useEffect } from 'react';

// Create the context
const SubscriptionContext = createContext();

// Initial state
const initialState = {
  plan: {
    duration: null,
    basePrice: 50, // Default base price
    discount: 0
  },
  goal: null,
  addons: {},
  user: null,
  totalPrice: 0
};

// Reducer function to handle state updates
function subscriptionReducer(state, action) {
  switch (action.type) {
    case 'SET_PLAN':
      const { duration } = action.payload;
      let discount = 0;
      
      // Apply discounts based on duration
      if (duration === 3) discount = 0.05;
      if (duration === 6) discount = 0.10;
      if (duration === 12) discount = 0.15;
      
      const newPlan = {
        ...state.plan,
        duration,
        discount
      };
      
      return {
        ...state,
        plan: newPlan,
        totalPrice: calculateTotal({ ...state, plan: newPlan })
      };
    
    case 'SET_GOAL':
      return {
        ...state,
        goal: action.payload
      };
      
    case 'TOGGLE_ADDON':
      const { id, price, selected } = action.payload;
      const newAddons = { 
        ...state.addons, 
        [id]: { price, selected } 
      };
      
      return {
        ...state,
        addons: newAddons,
        totalPrice: calculateTotal({ ...state, addons: newAddons })
      };
    
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      };
      
    case 'RESET':
      return initialState;
      
    default:
      return state;
  }
}

// Helper function to calculate total price
function calculateTotal(state) {
  if (!state.plan.duration) return 0;
  
  // Calculate plan price with discount
  const planPrice = state.plan.basePrice * state.plan.duration * (1 - state.plan.discount);
  
  // Calculate addons price
  const addonsPrice = Object.entries(state.addons)
    .filter(([_, addon]) => addon.selected)
    .reduce((sum, [_, addon]) => sum + (addon.price * state.plan.duration), 0);
    
  return planPrice + addonsPrice;
}

// Provider component
export function SubscriptionProvider({ children }) {
  const [state, dispatch] = useReducer(subscriptionReducer, initialState);
  
  // Load from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('gymSubscription');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        // Here we could dispatch multiple actions to restore the state
        // For simplicity, we'll just replace the entire state
        Object.keys(parsedState).forEach(key => {
          if (key === 'plan' && parsedState[key]?.duration) {
            dispatch({ type: 'SET_PLAN', payload: { duration: parsedState[key].duration } });
          }
          if (key === 'goal' && parsedState[key]) {
            dispatch({ type: 'SET_GOAL', payload: parsedState[key] });
          }
          if (key === 'user' && parsedState[key]) {
            dispatch({ type: 'SET_USER', payload: parsedState[key] });
          }
          if (key === 'addons' && parsedState[key]) {
            Object.entries(parsedState[key]).forEach(([id, addon]) => {
              dispatch({ 
                type: 'TOGGLE_ADDON', 
                payload: { id, price: addon.price, selected: addon.selected } 
              });
            });
          }
        });
      } catch (e) {
        console.error('Error loading saved subscription', e);
      }
    }
  }, []);
  
  // Save to localStorage on state change
  useEffect(() => {
    localStorage.setItem('gymSubscription', JSON.stringify(state));
  }, [state]);
  
  return (
    <SubscriptionContext.Provider value={{ state, dispatch }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

// Custom hook to use the subscription context
export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}