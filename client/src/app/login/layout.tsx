import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In to Nestra — Safe Social Platform for Students (Ages 6-16)",
  description: "Log in to your Nestra account — the safe, moderated social learning community for students aged 6 to 16 with automated bad-word filtering. Connect with Birdies & share Chirps.",
  keywords: ["Nestra login", "student social login", "safe kids social network", "Nestra sign in", "Chirps login", "Birdies network"],
  openGraph: {
    title: "Log In to Nestra — Safe Social Platform for Students (Ages 6-16)",
    description: "Access your Nestra account. A safe, moderated community for students aged 6-16 with clean Chirps, Reels, and Birdies.",
    url: "https://nestra.app/login",
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
