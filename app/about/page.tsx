export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <section className="text-center space-y-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
                    About Our AI Chatbot
                </h1>
                <p className="text-xl text-gray-300">
                    Discover the power of next-generation artificial intelligence
                </p>
            </section>

            <section className="space-y-6">
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                    <p className="text-gray-300">
                        We&apos;re dedicated to creating an AI chatbot that revolutionizes how people interact with artificial intelligence.
                        Our goal is to provide a seamless, natural, and intelligent conversation experience that helps users achieve their goals.
                    </p>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Technology</h2>
                    <p className="text-gray-300">
                        Built on cutting-edge AI models and advanced natural language processing techniques,
                        our chatbot understands context, maintains conversation flow, and provides relevant,
                        accurate responses to your queries.
                    </p>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Features</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                        <li>Natural language understanding and generation</li>
                        <li>Context-aware conversations</li>
                        <li>Real-time response generation</li>
                        <li>Secure and private communication</li>
                        <li>User-friendly interface</li>
                    </ul>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
                    <p className="text-gray-300 mb-4">
                        Ready to experience the future of AI conversation? Start chatting now and discover
                        the possibilities of our advanced AI chatbot.
                    </p>
                    <a
                        href="/chat"
                        className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                    >
                        Start Chatting
                    </a>
                </div>
            </section>
        </div>
    );
} 