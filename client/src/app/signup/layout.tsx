import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up for Vaaknow — Safe Social Platform for Students (Ages 6-16)",
  description: "Create your free Vaaknow account today. Designed specifically for students aged 6 to 16 with automated bad-word filtering, clean Chirps, educational Reels, and safe Birdie connections.",
  keywords: ["Vaaknow sign up", "Vaaknow register", "student social network signup", "safe kids social platform ages 6-16", "create Vaaknow account", "register Vaaknow"],
  alternates: {
    canonical: "https://vaaknow.com/signup",
  },
  openGraph: {
    title: "Sign Up for Vaaknow — Safe Social Platform for Students (Ages 6-16)",
    description: "Create your Vaaknow account. A safe, moderated community for students aged 6-16 with clean Chirps, Reels, and Birdies.",
    url: "https://vaaknow.com/signup",
    siteName: "Vaaknow",
  },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
