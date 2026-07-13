import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In to Vaaknow — Secure Mini-Facebook for Students (Ages 6-16)",
  description: "Log in to your Vaaknow account — the secure Mini-Facebook alternative for students aged 6–16 featuring an Automated Moderation Engine and strict 3-Strike Disciplinary System.",
  keywords: ["Vaaknow login", "Vaaknow sign in", "secure mini-facebook login", "safe student social network", "automated moderation social login"],
  alternates: {
    canonical: "https://vaaknow.in/login",
  },
  openGraph: {
    title: "Log In to Vaaknow — Secure Mini-Facebook for Students (Ages 6-16)",
    description: "Access your Vaaknow account. A secure, heavily moderated community for students aged 6-16 with clean Chirps, Reels, and Birdies.",
    url: "https://vaaknow.in/login",
    siteName: "Vaaknow",
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
