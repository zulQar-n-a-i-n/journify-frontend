import React from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_YourPublicKeyHere'); // Replace with your real key

const handleCheckout = async (priceId) => {
  try {
    const stripe = await stripePromise;
    const response = await axios.post('http://localhost:8000/create-checkout-session/', { priceId });
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
      
      {/* Free Plan */}
      <div className="flex flex-col flex-grow mt-8 overflow-hidden bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center p-10 bg-gray-200">
          <span className="font-semibold">Free</span>
          <div className="flex items-center">
            <span className="text-3xl">$</span>
            <span className="font-bold text-5xl">0</span>
            <span className="text-2xl text-gray-500">/mo</span>
          </div>
        </div>
        <div className="p-10">
          <ul>
            <li className="flex items-center"><span className="ml-2">★ Lightsaber</span></li>
            <li className="flex items-center"><span className="ml-2">★ Robe</span></li>
            <li className="flex items-center"><span className="ml-2">★ Insurance</span></li>
          </ul>
        </div>
      </div>

      {/* Premium Plan */}
      <div className="flex flex-col flex-grow mt-8 overflow-hidden bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center p-10 bg-gray-200">
          <span className="font-semibold">Premium Plan</span>
          <div className="flex items-center">
            <span className="text-3xl">$</span>
            <span className="font-bold text-5xl">99</span>
            <span className="text-2xl text-gray-500">/mo</span>
          </div>
        </div>
        <div className="p-10">
          <ul>
            <li className="flex items-center"><span className="ml-2">★ Jedi Knight</span></li>
            <li className="flex items-center"><span className="ml-2">★ Sit on council</span></li>
            <li className="flex items-center"><span className="ml-2">★ Stock options</span></li>
          </ul>
        </div>
        <div className="flex px-10 pb-10 justify-center">
          <button
            onClick={() => handleCheckout('price_12345')}
            className="flex items-center justify-center w-full h-12 px-6 text-white text-sm font-bold uppercase bg-teal-400 hover:bg-teal-300 rounded-lg"
          >
            Join now
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Pricing;