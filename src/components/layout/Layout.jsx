// src/components/layout/Layout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import SubscriptionSummary from './SubscriptionSummary';
import { AnimatePresence } from 'framer-motion';
import PageTransition from '../ui/PageTransition';

function Layout() {
  const location = useLocation();
  
  // Hide summary on certain pages
  const hideSummaryPaths = ['/', '/quotation', '/register', '/payment'];
  const showSummary = !hideSummaryPaths.includes(location.pathname);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex flex-col md:flex-row flex-grow">
        <main className="flex-grow p-4">
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        </main>
        
        {showSummary && (
          <aside className="w-full md:w-80 bg-base-200 p-4 sticky bottom-0 md:static">
            <SubscriptionSummary />
          </aside>
        )}
      </div>
      
      <footer className="bg-neutral text-neutral-content p-4 text-center">
        © 2025 FitHub Gym. All rights reserved.
      </footer>
    </div>
  );
}

export default Layout;