'use client';

import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PricingPage() {
    const { isSignedIn } = useUser();
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async () => {
        if (!isSignedIn) {
            // Redirect to sign in
            return;
        }

        try {
            setLoading(true);
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    priceId: process.env.PRO_MONTHLY_PRICE_ID,
                }),
            });

            const { sessionId } = await response.json();
            const stripe = await stripePromise;
            await stripe?.redirectToCheckout({ sessionId });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
                    Choose Your Plan
                </h1>
                <p className="mt-4 text-xl text-gray-300">
                    Get unlimited access to our AI chatbot
                </p>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-2">
                {/* Free Plan */}
                <div className="bg-gray-800 rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Free</h2>
                    <p className="text-4xl font-bold text-white mb-6">$0<span className="text-lg text-gray-400">/month</span></p>
                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center text-gray-300">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            10 messages per day
                        </li>
                        <li className="flex items-center text-gray-300">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Basic AI responses
                        </li>
                        <li className="flex items-center text-gray-300">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Standard support
                        </li>
                    </ul>
                    <button
                        className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                        disabled
                    >
                        Current Plan
                    </button>
                </div>

                {/* Pro Plan */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Pro</h2>
                    <p className="text-4xl font-bold text-white mb-6">$9.99<span className="text-lg text-gray-200">/month</span></p>
                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center text-white">
                            <svg className="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Unlimited messages
                        </li>
                        <li className="flex items-center text-white">
                            <svg className="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Advanced AI responses
                        </li>
                        <li className="flex items-center text-white">
                            <svg className="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Priority support
                        </li>
                        <li className="flex items-center text-white">
                            <svg className="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Custom AI models
                        </li>
                    </ul>
                    <button
                        onClick={handleSubscribe}
                        disabled={loading}
                        className="w-full bg-white text-purple-600 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Upgrade to Pro'}
                    </button>
                </div>
            </div>
        </div>
    );
} 