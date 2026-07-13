import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In to Vaaknow — Safe Social Platform for Students (Ages 6-16)",
  description: "Log in to your Vaaknow account — the safe, AI-moderated social learning community for students aged 6 to 16 with automated bad-word filtering. Connect with Birdies & share Chirps.",
  keywords: ["Vaaknow login", "Vaaknow sign in", "student social login", "safe kids social network", "Chirps login", "Birdies network", "Vaaknow student portal"],
  alternates: {
    canonical: "https://vaaknow.com/login",
  },
  openGraph: {
    title: "Log In to Vaaknow — Safe Social Platform for Students (Ages 6-16)",
    description: "Access your Vaaknow account. A safe, moderated community for students aged 6-16 with clean Chirps, Reels, and Birdies.",
    url: "https://vaaknow.com/login",
    siteName: "Vaaknow",
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
