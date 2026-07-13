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
  metadataBase: new URL("https://vaaknow.in"),
  title: {
    default: "Vaaknow — Safe Social Platform for Students (Ages 6-16)",
    template: "%s | Vaaknow"
  },
  description: "Vaaknow is a secure, child-friendly Mini-Facebook application restricted to students aged 6 to 16 years. Powered by an Automated Moderation Engine against adult content & abusive slang, featuring a strict 3-Strike Disciplinary System (24-hour suspension), safe Birdies, clean Chirps, and curated Reels.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  keywords: [
    "Vaaknow",
    "Vaaknow app",
    "Vaaknow safe social network",
    "safe mini-facebook for kids",
    "child friendly social network ages 6-16",
    "automated moderation engine",
    "3-strike disciplinary system",
    "24 hour suspension toxic behavior",
    "bad word filtered student community",
    "cyberbullying free social media",
    "student safe social app",
    "chirps",
    "birdies",
    "reels",
    "AI moderated student community"
  ],
  authors: [{ name: "Vaaknow Team", url: "https://vaaknow.in" }],
  creator: "Vaaknow",
  publisher: "Vaaknow",
  alternates: {
    canonical: "https://vaaknow.in",
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
    description: "A secure, child-friendly Mini-Facebook for students aged 6–16 featuring an Automated Moderation Engine and a 3-Strike Disciplinary System (24-hour ban).",
    url: "https://vaaknow.in",
    siteName: "Vaaknow",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaaknow — Safe Social Platform for Students (Ages 6-16)",
    description: "A secure, child-friendly Mini-Facebook for students aged 6–16 featuring an Automated Moderation Engine and a 3-Strike Disciplinary System (24-hour ban).",
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
      "alternateName": "Vaaknow Safe Mini-Facebook",
      "applicationCategory": "SocialNetworkingApplication",
      "operatingSystem": "All",
      "description": "Vaaknow is a specialized Mini-Facebook application restricted to the target demographic of 6 to 16-year-olds. It features an Automated Moderation Engine filtering adult content, abusive slangs, and spam, backed by a strict 3-Strike Disciplinary System enforcing a 24-hour account suspension.",
      "url": "https://vaaknow.in",
      "isFamilyFriendly": true,
      "audience": {
        "@type": "PeopleAudience",
        "suggestedMinAge": "6",
        "suggestedMaxAge": "16",
        "audienceType": "Students and Children aged 6 to 16 years"
      },
      "featureList": [
        "Targeted Demographic: Students Aged 6 to 16 Years",
        "Real-time Automated Moderation Engine (Adult content, Abusive slangs, Spam filtering)",
        "The 3-Strike Disciplinary System (24-Hour Account Suspension & Lockout on 3 Violations)",
        "Safe Birdie Peer Connections & Clean Chirps / Reels"
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
      "url": "https://vaaknow.in",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://vaaknow.in/?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Vaaknow",
      "url": "https://vaaknow.in",
      "logo": "https://vaaknow.in/logo.png"
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
          "url": "https://vaaknow.in/signup"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 2,
          "name": "Log In to Vaaknow",
          "description": "Access your safe student community and Birdies on Vaaknow",
          "url": "https://vaaknow.in/login"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 3,
          "name": "Watch Vaaknow Reels",
          "description": "Explore safe short vertical videos and educational reels",
          "url": "https://vaaknow.in/video"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 4,
          "name": "Birdie Friends",
          "description": "Connect with verified student peers and friends safely",
          "url": "https://vaaknow.in/friends"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 5,
          "name": "Safe Messages",
          "description": "Real-time chat with automated bad-word filtering",
          "url": "https://vaaknow.in/messages"
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
