// src/pages/Landing.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRandomQuote } from '../services/quotesService';
import { motion } from 'framer-motion';

function Landing() {
  const [quote, setQuote] = useState({ text: '', author: 'Loading...' });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchQuote() {
      setLoading(true);
      const newQuote = await getRandomQuote();
      setQuote(newQuote);
      setLoading(false);
    }
    
    fetchQuote();
  }, []);
  
  return (
    <div className="hero min-h-[80vh] bg-base-200">
      <div className="hero-content text-center">
        <motion.div 
          className="max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-5xl font-bold"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            FitHub Gym
          </motion.h1>
          
          <motion.p 
            className="py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Transform your body, transform your life. Join our community and reach your fitness goals with personalized plans.
          </motion.p>
          
          <motion.div 
            className="card bg-primary text-primary-content mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="card-body">
              {loading ? (
                <div className="flex justify-center">
                  <span className="loading loading-dots loading-md"></span>
                </div>
              ) : (
                <>
                  <p className="text-lg italic">"{quote.text}"</p>
                  <p className="text-right">— {quote.author || 'Unknown'}</p>
                </>
              )}
            </div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Link to="/plans" className="btn btn-primary">Build Your Fitness Plan</Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Landing;