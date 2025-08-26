// src/pages/Goals.jsx
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '../contexts/SubscriptionContext';
import { motion, AnimatePresence } from 'framer-motion';

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
  };
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-3xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Choose Your Fitness Goals
      </motion.h1>
      
      {/* Cards container with min-height to prevent jumping */}
      <div className="min-h-[450px]">
        <motion.div 
          className="flex flex-wrap -mx-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {goals.map((goal) => {
            const isSelected = state.goal?.id === goal.id;
            
            return (
              <motion.div 
                key={goal.id}
                variants={item}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full md:w-1/2 px-3 mb-6"
              >
                <div 
                  className={`card ${isSelected ? 'bg-primary text-primary-content' : 'bg-base-100'} shadow-xl hover:shadow-2xl transition-all cursor-pointer h-full`}
                  onClick={() => handleSelectGoal(goal)}
                >
                  <div className="card-body">
                    <h2 className="card-title">
                      <span className="text-2xl">{goal.icon}</span>
                      {goal.name}
                    </h2>
                    <p>{goal.description}</p>
                    
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div 
                          className="mt-4"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="font-bold">Includes:</p>
                          <ul className="list-disc list-inside">
                            {goal.subOptions.map((option, idx) => (
                              <li key={idx}>{option}</li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      
      {/* Regular button positioning */}
      <motion.div 
        className="flex justify-between mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
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
      </motion.div>
    </div>
  );
}

export default Goals;