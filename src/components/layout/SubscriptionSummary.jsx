// src/components/layout/SubscriptionSummary.jsx
import { useSubscription } from '../../contexts/SubscriptionContext';
import { Link, useLocation } from 'react-router-dom';

function SubscriptionSummary() {
  const { state } = useSubscription();
  const location = useLocation();
  
  // Calculate addon total
  const addonTotal = Object.entries(state.addons)
    .filter(([_, addon]) => addon.selected)
    .reduce((sum, [_, addon]) => sum + addon.price, 0);
  
  // Get list of selected addons
  const selectedAddons = Object.entries(state.addons)
    .filter(([_, addon]) => addon.selected)
    .map(([id, _]) => id);
  
  // Hide summary on certain pages
  const hiddenPaths = ['/', '/login', '/profile', '/quotation'];
  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }
  
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Your Plan Summary</h2>
        <div className="divider"></div>
        
        <div className="space-y-2">
          <p>
            <strong>Plan:</strong> {state.plan.duration ? `${state.plan.duration} Month${state.plan.duration > 1 ? 's' : ''}` : 'Not selected'}
            {state.plan.discount > 0 && ` (${state.plan.discount * 100}% off)`}
          </p>
          
          <p>
            <strong>Goal:</strong> {state.goal ? state.goal.name : 'Not selected'}
          </p>
          
          <p>
            <strong>Add-ons:</strong> {selectedAddons.length > 0 
              ? selectedAddons.join(', ')
              : 'None'
            }
          </p>
          
          <div className="divider"></div>
          
          <p className="text-xl font-bold">Total: ${state.totalPrice.toFixed(2)}</p>
        </div>
        
        {/* Show "Continue" button if on Plans, Goals, or Addons page */}
        {['/plans', '/goals', '/addons'].includes(location.pathname) && (
          <div className="card-actions justify-end mt-4">
            <Link 
              to={
                location.pathname === '/plans' ? '/goals' :
                location.pathname === '/goals' ? '/addons' :
                '/summary'
              } 
              className="btn btn-primary"
            >
              Continue
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default SubscriptionSummary;