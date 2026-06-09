import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import RightPanel from "@/components/layout/RightPanel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mini-Facebook",
  description: "A premium mini-facebook clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-fb-bg dark:bg-fb-dark-bg text-fb-text-dark dark:text-fb-text-light pt-[56px]">
        <Navbar />
        <div className="flex w-full justify-center">
          <Sidebar />
          <main className="flex-1 w-full max-w-[680px] mt-4 xl:ml-[300px] lg:mr-[300px] px-4">
            {children}
          </main>
          <RightPanel />
        </div>
      </body>
    </html>
  );
}
