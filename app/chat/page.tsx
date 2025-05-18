'use client';

import { useChat } from 'ai/react';
import { useRef, useEffect } from 'react';
import { Textarea } from '../components/ui/textarea';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
    const { isSignedIn, user } = useUser();
    const router = useRouter();
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: "/api",
    });

    const messageEndRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Check if user is signed in
    useEffect(() => {
        if (!isSignedIn) {
            router.push('/');
        }
    }, [isSignedIn, router]);

    if (!isSignedIn) {
        return null;
    }

    return (
        <div className="max-w-4xl mx-auto">
            {messages.length !== 0 ? (
                <div className="space-y-6 pb-32 pt-5">
                    {messages.map((message) => (
                        <div key={message.id} className="w-full">
                            {message.role === "user" ? (
                                <div className="flex gap-x-4">
                                    <div className="bg-purple-600 h-12 w-12 rounded-lg flex items-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-8 h-8 text-white"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="rounded-lg p-4 bg-gray-800 text-white shadow-lg">
                                            {message.content}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex gap-x-4">
                                    <div className="bg-blue-600 h-12 w-12 rounded-lg flex items-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-8 h-8 text-white"
                                        >
                                            <path d="M16.5 7.5h-9v9h9v-9z" />
                                            <path
                                                fillRule="evenodd"
                                                d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75zM6 6.75A.75.75 0 016.75 6h10.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V6.75z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="rounded-lg p-4 bg-gray-800 text-white shadow-lg">
                                            {message.content}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center pt-32 gap-5">
                    <div className="text-4xl mb-4">🤖</div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
                        Start a Conversation
                    </h1>
                    <p className="text-gray-400 text-center max-w-md">
                        Ask me anything! I'm here to help with your questions and provide intelligent responses.
                    </p>
                </div>
            )}

            <div ref={messageEndRef}></div>

            <form
                onSubmit={handleSubmit}
                className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900 border-t border-gray-800"
            >
                <div className="max-w-4xl mx-auto relative">
                    <Textarea
                        tabIndex={0}
                        required
                        rows={1}
                        value={input}
                        onChange={handleInputChange}
                        autoFocus
                        placeholder="Type your message..."
                        spellCheck={false}
                        className="w-full focus:outline-none shadow-lg placeholder:text-gray-400 text-sm text-white p-4 pr-16 rounded-xl bg-gray-800 border-gray-700"
                    />
                    <button
                        type="submit"
                        className="absolute right-2 bottom-2 bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5 text-white"
                        >
                            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
} 