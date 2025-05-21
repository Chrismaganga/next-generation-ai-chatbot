'use client';

import Link from 'next/link';
import { useState } from 'react';
import { UserButton, SignInButton, useUser } from '@clerk/nextjs';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isSignedIn, user } = useUser();

    return (
        <nav className="bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0">
                            <span className="text-white text-xl font-bold">AI ChatBot</span>
                        </Link>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link href="/" className="text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Home
                            </Link>
                            <Link href="/chat" className="text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Chat
                            </Link>
                            <Link href="/resume-ai" className="text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Resume Builder
                            </Link>
                            <Link href="/about" className="text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                About
                            </Link>
                            {isSignedIn ? (
                                <>
                                    <Link href="/pricing" className="text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                        Upgrade to Pro
                                    </Link>
                                    <UserButton afterSignOutUrl="/" />
                                </>
                            ) : (
                                <SignInButton mode="modal">
                                    <button className="text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                        Sign In
                                    </button>
                                </SignInButton>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-purple-700 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/" className="text-white hover:bg-purple-700 block px-3 py-2 rounded-md text-base font-medium">
                            Home
                        </Link>
                        <Link href="/chat" className="text-white hover:bg-purple-700 block px-3 py-2 rounded-md text-base font-medium">
                            Chat
                        </Link>
                        <Link href="/resume-ai" className="text-white hover:bg-purple-700 block px-3 py-2 rounded-md text-base font-medium">
                            Resume Builder
                        </Link>
                        <Link href="/about" className="text-white hover:bg-purple-700 block px-3 py-2 rounded-md text-base font-medium">
                            About
                        </Link>
                        {isSignedIn ? (
                            <>
                                <Link href="/pricing" className="text-white hover:bg-purple-700 block px-3 py-2 rounded-md text-base font-medium">
                                    Upgrade to Pro
                                </Link>
                                <div className="px-3 py-2">
                                    <UserButton afterSignOutUrl="/" />
                                </div>
                            </>
                        ) : (
                            <SignInButton mode="modal">
                                <button className="text-white hover:bg-purple-700 block w-full text-left px-3 py-2 rounded-md text-base font-medium">
                                    Sign In
                                </button>
                            </SignInButton>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar; 