// src/pages/Summary.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useSubscription } from '../contexts/SubscriptionContext';

function Summary() {
  const navigate = useNavigate();
  const { state } = useSubscription();
  
  // Redirect if no plan selected
  if (!state.plan.duration) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-8">Review Your Plan</h1>
        <div className="alert alert-warning max-w-md mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Please select a plan first.</span>
        </div>
        <Link to="/plans" className="btn btn-primary mt-4">Choose a Plan</Link>
      </div>
    );
  }
  
  // Calculate totals
  const planBaseTotal = state.plan.basePrice * state.plan.duration;
  const planDiscountAmount = planBaseTotal * state.plan.discount;
  const planTotal = planBaseTotal - planDiscountAmount;
  
  // Get selected addons
  const selectedAddons = Object.entries(state.addons)
    .filter(([_, addon]) => addon.selected)
    .map(([id, addon]) => ({
      id,
      price: addon.price,
      total: addon.price * state.plan.duration
    }));
  
  const addonsTotal = selectedAddons.reduce((sum, addon) => sum + addon.total, 0);
  const grandTotal = planTotal + addonsTotal;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Review Your Plan</h1>
      
      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">Plan Summary</h2>
          <div className="divider"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg">Your Subscription</h3>
              <p><strong>Plan:</strong> {state.plan.duration} Month{state.plan.duration > 1 ? 's' : ''}</p>
              <p><strong>Base Price:</strong> ${state.plan.basePrice}/month</p>
              <p><strong>Duration:</strong> {state.plan.duration} months</p>
              <p><strong>Discount:</strong> {state.plan.discount * 100}%</p>
              <p><strong>Plan Total:</strong> ${planTotal.toFixed(2)}</p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg">Your Goal</h3>
              {state.goal ? (
                <>
                  <p>{state.goal.name}</p>
                  <ul className="list-disc list-inside">
                    {state.goal.subOptions.map((option, idx) => (
                      <li key={idx}>{option}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="text-warning">No goal selected</p>
              )}
            </div>
          </div>
          
          <div className="divider"></div>
          
          <h3 className="font-bold text-lg">Selected Add-ons</h3>
          {selectedAddons.length > 0 ? (
            <ul>
              {selectedAddons.map((addon) => (
                <li key={addon.id} className="flex justify-between mb-2">
                  <span>{addon.id}</span>
                  <span>${addon.total.toFixed(2)} (${addon.price}/month)</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No add-ons selected</p>
          )}
          
          <div className="divider"></div>
          
          <div className="flex justify-between text-xl font-bold">
            <span>Grand Total:</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center gap-4 mt-8">
        <Link to="/quotation" className="btn btn-secondary">
          Get Quotation
        </Link>
        
        <Link to="/register" className="btn btn-primary">
          Join The Gym
        </Link>
      </div>
      
      <div className="flex justify-between mt-8">
        <Link to="/addons" className="btn btn-outline">Back</Link>
      </div>
    </div>
  );
}

export default Summary;