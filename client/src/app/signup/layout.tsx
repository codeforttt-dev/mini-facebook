import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up for Nestra — Safe Social Platform for Students (Ages 6-16)",
  description: "Create your free Nestra account today. Designed specifically for students aged 6 to 16 with automated bad-word filtering, clean Chirps, educational Reels, and safe Birdie connections.",
  keywords: ["Nestra sign up", "student social network signup", "safe kids social platform ages 6-16", "create Nestra account", "register Nestra"],
  openGraph: {
    title: "Sign Up for Nestra — Safe Social Platform for Students (Ages 6-16)",
    description: "Create your Nestra account. A safe, moderated community for students aged 6-16 with clean Chirps, Reels, and Birdies.",
    url: "https://nestra.app/signup",
  },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
