import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SocketProvider } from "@/components/providers/SocketProvider";
import { AuthGuard } from "@/components/providers/AuthGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Nestra — Share Chirps, Reels & Connect with Birdies",
    template: "%s | Nestra"
  },
  description: "Nestra is the next-generation social platform to share instant Chirps, captivating Reels, stories, and connect with your favorite Birdies across the globe.",
  keywords: [
    "Nestra",
    "Nestra social",
    "chirps",
    "birdies",
    "social network",
    "reels",
    "stories",
    "social media platform",
    "connect with birdies"
  ],
  authors: [{ name: "Nestra Team" }],
  creator: "Nestra",
  publisher: "Nestra",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Nestra — Share Chirps, Reels & Connect with Birdies",
    description: "Connect with Birdies, share instant Chirps and Reels on Nestra.",
    url: "https://nestra.app",
    siteName: "Nestra",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nestra — Share Chirps & Connect with Birdies",
    description: "Connect with Birdies, share instant Chirps and Reels on Nestra.",
  },
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
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-fb-bg text-fb-text-dark">
        <AuthGuard>
          <SocketProvider>
            {children}
          </SocketProvider>
        </AuthGuard>
      </body>
    </html>
  );
}
