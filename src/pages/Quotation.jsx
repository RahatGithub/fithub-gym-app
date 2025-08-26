// src/pages/Quotation.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSubscription } from '../contexts/SubscriptionContext';
import { getRandomQuote } from '../services/quotesService';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function Quotation() {
  const { state } = useSubscription();
  const [quote, setQuote] = useState({ text: '', author: 'Loading...' });
  const [loading, setLoading] = useState(true);
  
  // Fetch quote when component mounts
  useEffect(() => {
    async function fetchQuote() {
      setLoading(true);
      const newQuote = await getRandomQuote();
      setQuote(newQuote);
      setLoading(false);
    }
    
    fetchQuote();
  }, []);
  
  // Generate a quotation number
  const quotationNumber = `QT-${Math.floor(100000 + Math.random() * 900000)}`;
  const currentDate = new Date().toLocaleDateString();
  
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
  
  // Function to download as PDF
  const handleDownloadPDF = () => {
    const element = document.getElementById('quotation-content');
    
    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`FitHub_Quotation_${quotationNumber}.pdf`);
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Plan Quotation</h1>
      
      <div className="alert alert-success mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Your quotation has been generated successfully!</span>
      </div>
      
      <div className="card bg-primary text-primary-content mb-6">
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
      </div>
      
      <div className="card bg-base-100 shadow-xl mb-8" id="quotation-content">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">FitHub Gym</h2>
            <div className="text-right">
              <p>Quotation #{quotationNumber}</p>
              <p>Date: {currentDate}</p>
            </div>
          </div>
          
          <div className="divider"></div>
          
          <h3 className="font-bold text-lg">Plan Details</h3>
          <p><strong>Plan:</strong> {state.plan?.duration || 0} Month{state.plan?.duration > 1 ? 's' : ''}</p>
          <p><strong>Goal:</strong> {state.goal?.name || 'Not selected'}</p>
          <p><strong>Add-ons:</strong> {selectedAddons.length > 0 
            ? selectedAddons.map(addon => addon.id).join(', ')
            : 'None'}</p>
          
          <div className="divider"></div>
          
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price/Month</th>
                  <th>Duration</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Base Plan</td>
                  <td>${state.plan?.basePrice || 0}</td>
                  <td>{state.plan?.duration || 0} months</td>
                  <td>${planTotal.toFixed(2)} {state.plan?.discount > 0 && `(${state.plan.discount * 100}% discount)`}</td>
                </tr>
                {selectedAddons.map(addon => (
                  <tr key={addon.id}>
                    <td>{addon.id}</td>
                    <td>${addon.price}</td>
                    <td>{state.plan?.duration || 0} months</td>
                    <td>${addon.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan="3">Total</th>
                  <th>${grandTotal.toFixed(2)}</th>
                </tr>
              </tfoot>
            </table>
          </div>
          
          <div className="divider"></div>
          
          <p className="text-sm">Valid for 30 days from: {currentDate}</p>
          <p className="text-sm">For any questions, contact us at: info@fithub-gym.com</p>
        </div>
      </div>
      
      <div className="flex justify-center gap-4">
        <button className="btn btn-primary" onClick={handleDownloadPDF}>
          Download as PDF
        </button>
        
        <Link to="/register" className="btn btn-secondary">
          Join Now
        </Link>
      </div>
      
      <div className="flex justify-between mt-8">
        <Link to="/summary" className="btn btn-outline">Back to Summary</Link>
        <Link to="/" className="btn btn-outline">Home</Link>
      </div>
    </div>
  );
}

export default Quotation;