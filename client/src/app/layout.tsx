import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SocketProvider } from "@/components/providers/SocketProvider";
import { AuthGuard } from "@/components/providers/AuthGuard";
import { GlobalDailyTimeLimit } from "@/components/common/GlobalDailyTimeLimit";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vaaknow.com"),
  title: {
    default: "Vaaknow — Safe Social Platform for Students (Ages 6-16)",
    template: "%s | Vaaknow"
  },
  description: "Vaaknow is a safe, AI-moderated social learning & connection platform exclusively for students aged 6 to 16 years. Featuring automated bad-word filtering, clean Chirps, curated Reels, and safe Birdie connections.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  keywords: [
    "Vaaknow",
    "Vaaknow app",
    "Vaaknow safe social network",
    "Vaaknow social platform",
    "kids social platform ages 6 to 16",
    "student safe social app",
    "bad word filtered social network",
    "chirps",
    "birdies",
    "reels",
    "safe social media for students",
    "AI moderated student community"
  ],
  authors: [{ name: "Vaaknow Team", url: "https://vaaknow.com" }],
  creator: "Vaaknow",
  publisher: "Vaaknow",
  alternates: {
    canonical: "https://vaaknow.com",
  },
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
    title: "Vaaknow — Safe Social Platform for Students (Ages 6-16)",
    description: "A safe, AI-moderated social platform for students aged 6–16 with automated bad-word filtering. Share clean Chirps, watch Reels, and connect with Birdies.",
    url: "https://vaaknow.com",
    siteName: "Vaaknow",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaaknow — Safe Social Platform for Students (Ages 6-16)",
    description: "A safe, AI-moderated social platform for students aged 6–16 with automated bad-word filtering. Share clean Chirps, watch Reels, and connect with Birdies.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SocialNetworkingApp",
      "name": "Vaaknow",
      "alternateName": "Vaaknow Social App",
      "applicationCategory": "SocialNetworkingApplication",
      "operatingSystem": "All",
      "description": "Vaaknow is a safe, AI-moderated social platform exclusively designed for students and young people aged 6 to 16 years. It features automated bad-word filtering, safe connections with Birdies, and clean short-form Chirps and Reels.",
      "url": "https://vaaknow.com",
      "isFamilyFriendly": true,
      "audience": {
        "@type": "PeopleAudience",
        "suggestedMinAge": "6",
        "suggestedMaxAge": "16",
        "audienceType": "Students and Children aged 6 to 16 years"
      },
      "featureList": [
        "Age 6-16 Safe & Moderated Community",
        "Automated Bad Word & Abusive Language Filtering",
        "Safe Chirps & Educational Reels",
        "Connect safely with Birdies"
      ],
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Vaaknow",
      "url": "https://vaaknow.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://vaaknow.com/?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Vaaknow",
      "url": "https://vaaknow.com",
      "logo": "https://vaaknow.com/logo.png"
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "SiteNavigationElement",
          "position": 1,
          "name": "Sign Up for Vaaknow",
          "description": "Create a free student-safe social account on Vaaknow",
          "url": "https://vaaknow.com/signup"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 2,
          "name": "Log In to Vaaknow",
          "description": "Access your safe student community and Birdies on Vaaknow",
          "url": "https://vaaknow.com/login"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 3,
          "name": "Watch Vaaknow Reels",
          "description": "Explore safe short vertical videos and educational reels",
          "url": "https://vaaknow.com/video"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 4,
          "name": "Birdie Friends",
          "description": "Connect with verified student peers and friends safely",
          "url": "https://vaaknow.com/friends"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 5,
          "name": "Safe Messages",
          "description": "Real-time chat with automated bad-word filtering",
          "url": "https://vaaknow.com/messages"
        }
      ]
    }
  ];

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-fb-bg text-fb-text-dark">
        <AuthGuard>
          <SocketProvider>
            {children}
            <GlobalDailyTimeLimit />
          </SocketProvider>
        </AuthGuard>
      </body>
    </html>
  );
}
