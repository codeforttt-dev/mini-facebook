import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up for Vaaknow — Secure Mini-Facebook for Students (Ages 6-16)",
  description: "Create your free Vaaknow account today. A secure Mini-Facebook alternative designed for students aged 6 to 16, protected by an Automated Moderation Engine and 3-Strike Disciplinary System.",
  keywords: ["Vaaknow sign up", "Vaaknow register", "secure mini-facebook signup", "safe student social registration", "child friendly social signup"],
  alternates: {
    canonical: "https://vaaknow.in/signup",
  },
  openGraph: {
    title: "Sign Up for Vaaknow — Secure Mini-Facebook for Students (Ages 6-16)",
    description: "Create your Vaaknow account. A secure, heavily moderated community for students aged 6-16 with clean Chirps, Reels, and Birdies.",
    url: "https://vaaknow.in/signup",
    siteName: "Vaaknow",
  },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
