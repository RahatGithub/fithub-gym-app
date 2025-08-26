// src/pages/Goals.jsx
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '../contexts/SubscriptionContext';

function Goals() {
  const navigate = useNavigate();
  const { state, dispatch } = useSubscription();
  
  const goals = [
    {
      id: 'weight-loss',
      name: 'Weight Loss',
      description: 'Burn fat and reduce weight with cardio and nutrition plans',
      icon: '🔥',
      subOptions: ['HIIT Training', 'Cardio Focus', 'Nutrition Plan']
    },
    {
      id: 'muscle-gain',
      name: 'Muscle Gain',
      description: 'Build muscle mass and strength with resistance training',
      icon: '💪',
      subOptions: ['Strength Training', 'Hypertrophy Focus', 'Protein Planning']
    },
    {
      id: 'endurance',
      name: 'Endurance',
      description: 'Improve stamina and cardiovascular health',
      icon: '🏃',
      subOptions: ['Long Distance Training', 'Interval Workouts', 'Recovery Focus']
    },
    {
      id: 'general-fitness',
      name: 'General Fitness',
      description: 'Balanced approach to overall health and wellness',
      icon: '⚖️',
      subOptions: ['Balanced Workouts', 'Flexibility', 'Wellness Coaching']
    }
  ];
  
  const handleSelectGoal = (goal) => {
    dispatch({ 
      type: 'SET_GOAL', 
      payload: goal 
    });
    
    // Optional: Navigate to next page
    // navigate('/addons');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Choose Your Fitness Goals</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {goals.map((goal) => {
          const isSelected = state.goal?.id === goal.id;
          
          return (
            <div 
              key={goal.id}
              className={`card cursor-pointer transition-all ${
                isSelected ? 'bg-primary text-primary-content' : 'bg-base-100'
              } ${state.goal && !isSelected ? 'opacity-50' : ''} shadow-xl`}
              onClick={() => handleSelectGoal(goal)}
            >
              <div className="card-body">
                <h2 className="card-title">
                  <span className="text-2xl">{goal.icon}</span>
                  {goal.name}
                </h2>
                <p>{goal.description}</p>
                
                {isSelected && (
                  <div className="mt-4">
                    <p className="font-bold">Includes:</p>
                    <ul className="list-disc list-inside">
                      {goal.subOptions.map((option, idx) => (
                        <li key={idx}>{option}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="card-actions justify-end mt-4">
                  <button 
                    className={`btn ${isSelected ? 'btn-secondary' : 'btn-primary'}`}
                  >
                    {isSelected ? 'Selected' : 'Select'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-between mt-8">
        <button 
          className="btn btn-outline"
          onClick={() => navigate('/plans')}
        >
          Back
        </button>
        
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/addons')}
          disabled={!state.goal}
        >
          Continue to Add-ons
        </button>
      </div>
    </div>
  );
}

export default Goals;