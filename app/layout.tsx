import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeLovers next-generation ai Chatbot",
  description: "The best  next-generation ai chatbot in the world on youtube",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="h-full text-white">{children}</main>
      </body>
    </html>
  );
}
