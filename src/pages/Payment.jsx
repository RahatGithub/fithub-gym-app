// src/pages/Payment.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSubscription } from '../contexts/SubscriptionContext';
import { motion } from 'framer-motion';

function Payment() {
  const navigate = useNavigate();
  const { state } = useSubscription();
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const paymentMethods = [
    {
      id: 'credit',
      name: 'Credit Card',
      icon: '💳',
      fields: [
        { name: 'cardNumber', label: 'Card Number', placeholder: '1111-2222-3333-4444', type: 'text' },
        { name: 'cardName', label: 'Name on Card', placeholder: 'John Doe', type: 'text' },
        { name: 'expiry', label: 'Expiry Date', placeholder: 'MM/YY', type: 'text' },
        { name: 'cvv', label: 'CVV', placeholder: '123', type: 'password' }
      ]
    },
    {
      id: 'bkash',
      name: 'bKash',
      icon: '📱',
      fields: [
        { name: 'bkashNumber', label: 'bKash Number', placeholder: '01700000000', type: 'text' },
        { name: 'bkashPin', label: 'PIN', placeholder: '1234', type: 'password' }
      ]
    },
    {
      id: 'nagad',
      name: 'Nagad',
      icon: '📲',
      fields: [
        { name: 'nagadNumber', label: 'Nagad Number', placeholder: '01700000000', type: 'text' },
        { name: 'nagadPin', label: 'PIN', placeholder: '1234', type: 'password' }
      ]
    },
    {
      id: 'rocket',
      name: 'Rocket',
      icon: '🚀',
      fields: [
        { name: 'rocketNumber', label: 'Rocket Number', placeholder: '01700000000', type: 'text' },
        { name: 'rocketPin', label: 'PIN', placeholder: '1234', type: 'password' }
      ]
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: '🏦',
      fields: [
        { name: 'accountNumber', label: 'Account Number', placeholder: '1234567890', type: 'text' },
        { name: 'bankName', label: 'Bank Name', placeholder: 'Example Bank', type: 'text' },
        { name: 'branchName', label: 'Branch', placeholder: 'Main Branch', type: 'text' }
      ]
    }
  ];
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate payment processing
    setIsProcessing(true);
    
    setTimeout(() => {
      // In a real app, you would verify payment with a payment processor
      setIsProcessing(false);
      
      // Save payment method to localStorage for demo purposes
      localStorage.setItem('gymPaymentMethod', paymentMethod);
      
      // Create a success page or display success modal
      navigate('/');
      
      // Show success alert (using DaisyUI toast, added to body)
      const toast = document.createElement('div');
      toast.className = 'toast toast-end';
      toast.innerHTML = `
        <div class="alert alert-success">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Payment successful! Welcome to FitHub Gym!</span>
        </div>
      `;
      document.body.appendChild(toast);
      
      // Remove toast after 5 seconds
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 5000);
    }, 2000);
  };
  
  const selectedPayment = paymentMethods.find(pm => pm.id === paymentMethod);
  
  // Calculate totals
  const planBaseTotal = state.plan?.basePrice * state.plan?.duration || 0;
  const planDiscountAmount = planBaseTotal * (state.plan?.discount || 0);
  const planTotal = planBaseTotal - planDiscountAmount;
  
  // Get selected addons
  const selectedAddons = Object.entries(state.addons || {})
    .filter(([_, addon]) => addon.selected)
    .map(([id, addon]) => ({
      id,
      price: addon.price,
      total: addon.price * (state.plan?.duration || 0)
    }));
  
  const addonsTotal = selectedAddons.reduce((sum, addon) => sum + addon.total, 0);
  const grandTotal = planTotal + addonsTotal;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-3xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Complete Your Payment
      </motion.h1>
      
      <motion.div 
        className="card bg-base-100 shadow-xl max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="card-body">
          <h2 className="card-title mb-4">Select Payment Method</h2>
          
          <motion.div 
            className="flex flex-wrap gap-2 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {paymentMethods.map(pm => (
              <motion.button
                key={pm.id}
                className={`btn ${paymentMethod === pm.id ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setPaymentMethod(pm.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">{pm.icon}</span>
                {pm.name}
              </motion.button>
            ))}
          </motion.div>
          
          <div className="divider"></div>
          
          <form onSubmit={handleSubmit}>
            <motion.h3 
              className="font-bold text-lg mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {selectedPayment.icon} {selectedPayment.name} Details
            </motion.h3>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {selectedPayment.fields.map((field, idx) => (
                <div key={idx} className="form-control">
                  <label className="label">
                    <span className="label-text">{field.label}</span>
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="input input-bordered"
                    required
                  />
                  <label className="label">
                    <span className="label-text-alt text-info">
                      Use dummy data: {field.placeholder}
                    </span>
                  </label>
                </div>
              ))}
            </motion.div>
            
            <motion.div 
              className="alert alert-info mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>This is a demo payment sandbox. No real payment will be processed.</span>
            </motion.div>
            
            <motion.div 
              className="alert alert-success mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Your total payment amount: ${grandTotal.toFixed(2)}</span>
            </motion.div>
            
            <motion.div 
              className="flex justify-between mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Link to="/register" className="btn btn-outline">Back</Link>
              <button
                type="submit"
                className={`btn btn-primary ${isProcessing ? 'loading' : ''}`}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Complete Payment'}
              </button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default Payment;