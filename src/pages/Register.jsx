// src/pages/Register.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSubscription } from '../contexts/SubscriptionContext';
import { motion } from 'framer-motion';

function Register() {
  const navigate = useNavigate();
  const { state, dispatch } = useSubscription();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,11}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    
    return newErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Save user info to localStorage
    localStorage.setItem('gymUserInfo', JSON.stringify(formData));
    
    // Update app state with user info
    dispatch({
      type: 'SET_USER',
      payload: formData
    });
    
    // Navigate to payment page
    navigate('/payment');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-3xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Join FitHub Gym
      </motion.h1>
      
      <motion.div 
        className="card bg-base-100 shadow-xl max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="card-body">
          <h2 className="card-title">Personal Information</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className={`input input-bordered ${errors.firstName ? 'input-error' : ''}`}
                />
                {errors.firstName && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.firstName}</span>
                  </label>
                )}
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className={`input input-bordered ${errors.lastName ? 'input-error' : ''}`}
                />
                {errors.lastName && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.lastName}</span>
                  </label>
                )}
              </div>
            </div>
            
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john.doe@example.com"
                className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
              />
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.email}</span>
                </label>
              )}
            </div>
            
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="01700000000"
                className={`input input-bordered ${errors.phone ? 'input-error' : ''}`}
              />
              {errors.phone && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.phone}</span>
                </label>
              )}
            </div>
            
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main St, City, Country"
                className={`textarea textarea-bordered h-24 ${errors.address ? 'textarea-error' : ''}`}
              ></textarea>
              {errors.address && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.address}</span>
                </label>
              )}
            </div>
            
            <motion.div 
              className="flex justify-between mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link to="/summary" className="btn btn-outline">Back</Link>
              <button 
                type="submit" 
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue to Payment
              </button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;