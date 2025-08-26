// src/pages/Plans.jsx
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '../contexts/SubscriptionContext';
import { motion } from 'framer-motion';

function Plans() {
  const navigate = useNavigate();
  const { state, dispatch } = useSubscription();
  
  const plans = [
    { duration: 1, name: "1 Month", basePrice: 50, discount: 0 },
    { duration: 3, name: "3 Months", basePrice: 50, discount: 0.05 },
    { duration: 6, name: "6 Months", basePrice: 50, discount: 0.10 },
    { duration: 12, name: "12 Months", basePrice: 50, discount: 0.15 }
  ];
  
  const handleSelectPlan = (plan) => {
    dispatch({ 
      type: 'SET_PLAN', 
      payload: { duration: plan.duration } 
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
        Choose Your Plan
      </motion.h1>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {plans.map((plan) => {
          const isSelected = state.plan.duration === plan.duration;
          const totalBeforeDiscount = plan.basePrice * plan.duration;
          const totalAfterDiscount = totalBeforeDiscount * (1 - plan.discount);
          const savings = totalBeforeDiscount - totalAfterDiscount;
          
          return (
            <motion.div 
              key={plan.duration}
              variants={item}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div 
                className={`card ${isSelected ? 'bg-primary text-primary-content' : 'bg-base-100'} shadow-xl hover:shadow-2xl transition-all cursor-pointer`}
                onClick={() => handleSelectPlan(plan)}
              >
                <div className="card-body">
                  <h2 className="card-title">{plan.name}</h2>
                  <p className="text-2xl font-bold">${plan.basePrice}/month</p>
                  
                  {plan.discount > 0 && (
                    <div className="badge badge-secondary">Save {plan.discount * 100}%</div>
                  )}
                  
                  <div className="mt-4">
                    <p>Total: ${totalAfterDiscount.toFixed(2)}</p>
                    {savings > 0 && (
                      <p className="text-sm">You save: ${savings.toFixed(2)}</p>
                    )}
                  </div>
                  
                  <div className="card-actions justify-end mt-4">
                    <button className={`btn ${isSelected ? 'btn-secondary' : 'btn-primary'}`}>
                      {isSelected ? 'Selected' : 'Select'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      
      <motion.div 
        className="flex justify-between mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <button 
          className="btn btn-outline"
          onClick={() => navigate('/')}
        >
          Back
        </button>
        
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/goals')}
          disabled={!state.plan.duration}
        >
          Continue to Goals
        </button>
      </motion.div>
    </div>
  );
}

export default Plans;