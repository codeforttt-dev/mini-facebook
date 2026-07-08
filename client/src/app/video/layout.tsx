import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nestra Reels — Watch Trending & Viral Short Videos",
  description: "Explore immersive 9:16 vertical Reels and viral short videos on Nestra. Watch, like, comment, and share captivating moments from creators and Birdies worldwide.",
  keywords: ["Nestra Reels", "Nestra videos", "viral short videos", "short form video feed", "watch Reels online"],
  openGraph: {
    title: "Nestra Reels — Watch Trending & Viral Short Videos",
    description: "Explore immersive short Reels and videos shared by Birdies on Nestra.",
    url: "https://nestra.app/video",
  },
};

export default function VideoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
