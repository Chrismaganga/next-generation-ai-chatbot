"use client";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FaTwitter, FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";

export default function Home() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push('/chat');
    } else {
      router.push('/sign-in');
    }
  };

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
          <button
            onClick={handleGetStarted}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start Chatting
          </button>
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
        <button
          onClick={handleGetStarted}
          className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Get Started Now
        </button>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                AI Chatbot
              </h3>
              <p className="text-gray-400">
                Experience the future of conversation with our advanced AI chatbot.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <FaGithub size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <FaLinkedin size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <FaDiscord size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="text-gray-400 hover:text-purple-400 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/chat" className="text-gray-400 hover:text-purple-400 transition-colors">
                    Chat
                  </a>
                </li>
                <li>
                  <a href="/pricing" className="text-gray-400 hover:text-purple-400 transition-colors">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/docs" className="text-gray-400 hover:text-purple-400 transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-gray-400 hover:text-purple-400 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/support" className="text-gray-400 hover:text-purple-400 transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/privacy" className="text-gray-400 hover:text-purple-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-gray-400 hover:text-purple-400 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/cookies" className="text-gray-400 hover:text-purple-400 transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} AI Chatbot. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="/privacy" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                  Privacy
                </a>
                <a href="/terms" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                  Terms
                </a>
                <a href="/cookies" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}