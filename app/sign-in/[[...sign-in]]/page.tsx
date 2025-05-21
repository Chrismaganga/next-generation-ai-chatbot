import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-xl shadow-2xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-gray-400">
                        Sign in to continue to your AI chat experience
                    </p>
                </div>
                <SignIn
                    appearance={{
                        elements: {
                            formButtonPrimary:
                                "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700",
                            footerActionLink: "text-purple-400 hover:text-purple-300",
                        },
                    }}
                    redirectUrl="/chat"
                />
            </div>
        </div>
    );
} 