// src/pages/Addons.jsx
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '../contexts/SubscriptionContext';

function Addons() {
  const navigate = useNavigate();
  const { state, dispatch } = useSubscription();
  
  const addonDetails = [
    {
      id: 'personalTrainer',
      name: 'Personal Trainer',
      description: 'One-on-one guidance from an expert trainer',
      price: 50,
      icon: '👨‍🏫'
    },
    {
      id: 'dietConsultation',
      name: 'Diet Consultation',
      description: 'Personalized nutrition plan and guidance',
      price: 30,
      icon: '🥗'
    },
    {
      id: 'yoga',
      name: 'Yoga Classes',
      description: 'Access to all yoga and meditation sessions',
      price: 25,
      icon: '🧘‍♀️'
    },
    {
      id: 'swimming',
      name: 'Swimming Pool',
      description: 'Unlimited access to swimming facilities',
      price: 35,
      icon: '🏊‍♂️'
    }
  ];
  
  const handleToggleAddon = (addon) => {
    const isCurrentlySelected = state.addons[addon.id]?.selected || false;
    
    dispatch({ 
      type: 'TOGGLE_ADDON', 
      payload: {
        id: addon.id,
        price: addon.price,
        selected: !isCurrentlySelected
      }
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Customize with Add-ons</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {addonDetails.map((addon) => {
          const isSelected = state.addons[addon.id]?.selected || false;
          
          return (
            <div 
              key={addon.id}
              className={`card ${isSelected ? 'bg-primary text-primary-content' : 'bg-base-100'} shadow-xl`}
            >
              <div className="card-body">
                <h2 className="card-title">
                  <span className="text-2xl">{addon.icon}</span>
                  {addon.name}
                </h2>
                <p>{addon.description}</p>
                <p className="font-bold">${addon.price}/month</p>
                
                <div className="card-actions justify-end mt-4">
                  <label className="cursor-pointer label">
                    <span className="label-text mr-2">
                      {isSelected ? 'Selected' : 'Add this'}
                    </span>
                    <input 
                      type="checkbox" 
                      className="toggle toggle-primary"
                      checked={isSelected}
                      onChange={() => handleToggleAddon(addon)}
                    />
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-between mt-8">
        <button 
          className="btn btn-outline"
          onClick={() => navigate('/goals')}
        >
          Back
        </button>
        
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/summary')}
        >
          Review Plan
        </button>
      </div>
    </div>
  );
}

export default Addons;