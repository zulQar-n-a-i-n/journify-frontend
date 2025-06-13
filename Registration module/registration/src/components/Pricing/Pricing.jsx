import React from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51RZNkdGhkYWBeh5uJtD3M6PsJRXTFeI3WLZgDF4v0oJTzLaBC8R4zzyurveMBI3zcsXVPKCTH027AQ5atqTz8ZuG00bqQvKpES'); // Replace with your real key

const handleCheckout = async (priceId) => {
  try {
    const stripe = await stripePromise;
    const token = localStorage.getItem("access");

    const response = await axios.post(
      'http://127.0.0.1:8000/payment/create-checkout-session/',
      { priceId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const sessionId = response.data.id;
    const result = await stripe.redirectToCheckout({ sessionId });

    if (result.error) {
      alert(result.error.message);
    }
  } catch (error) {
    console.error('Checkout session creation failed:', error);
    alert('Payment initialization failed. Please try again.');
  }
};



const Pricing = () => (
  <div className="flex flex-col items-center justify-center min-h-screen p-10 text-gray-700 bg-gray-100 md:p-20">
    <h2 className="text-4xl font-bold">Pricing Plan</h2>
    <div className="flex flex-wrap gap-8 items-center justify-center w-full max-w-4xl mt-8">
      
      
      

      {/* Premium Plan */}
      <div className="flex flex-col w-full max-w-md mt-8 overflow-hidden bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center p-10 bg-gray-200">
          <span className="font-semibold">Premium</span>
          <div className="flex items-center">
            <span className="text-3xl">$</span>
            <span className="font-bold text-5xl">20</span>
            <span className="text-2xl text-gray-500"></span>
          </div>
        </div>
        <div className="p-10  ">
          <ul>
            <li ><span className="ml-2">★ Go Premium to Generate Report</span></li>
            <li ><span className="ml-2">★ Pay Once</span></li>
            <li ><span className="ml-2">★ Get Lifetime Access</span></li>
          </ul>
        </div>
        <div className="flex px-10 pb-10 justify-center">
          <button
            onClick={() => handleCheckout('price_1RZOiQGhkYWBeh5uXb7nRLjK')}
            className="flex items-center justify-center w-full h-12 px-6 text-white text-sm font-bold uppercase bg-teal-400 hover:bg-teal-300 rounded-lg"
          >
            Purchase Now
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Pricing;