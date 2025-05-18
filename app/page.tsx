"use client";
import { AiFillAndroid } from "react-icons/ai";

import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import Textarea from "react-textarea-autosize";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
          Next-Generation AI Chatbot
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Experience the future of conversation with our advanced AI chatbot.
          Powered by cutting-edge technology to provide intelligent and natural interactions.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/chat"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start Chatting
          </a>
          <a
            href="/about"
            className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-all duration-200"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 py-12">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
          <div className="text-purple-400 text-2xl mb-4">🚀</div>
          <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
          <p className="text-gray-400">Experience instant responses with our optimized AI model.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
          <div className="text-blue-400 text-2xl mb-4">💡</div>
          <h3 className="text-xl font-semibold mb-2">Smart Conversations</h3>
          <p className="text-gray-400">Engage in natural, context-aware discussions.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
          <div className="text-purple-400 text-2xl mb-4">🔒</div>
          <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
          <p className="text-gray-400">Your conversations are protected with enterprise-grade security.</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold mb-4">Ready to Experience the Future?</h2>
        <p className="text-gray-300 mb-8">Join thousands of users already enjoying our AI chatbot.</p>
        <a
          href="/chat"
          className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Get Started Now
        </a>
      </section>
    </div>
  );
}