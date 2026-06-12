"use client";

import React, { useEffect, useState } from "react";
import CreatePostComponent from "@/components/feed/CreatePostComponent";
import PostComponent from "@/components/feed/PostComponent";
import StoriesSection from "@/components/feed/StoriesSection";

export default function MainFeedPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      fetchFeed();
    }
  }, []);

  const fetchFeed = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5002/api/posts/feed", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setPosts(data.posts);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[590px] mx-auto py-4 px-2 sm:px-0">
      {/* Stories Section */}
      <StoriesSection currentUser={currentUser} />

      <CreatePostComponent currentUser={currentUser} onPostCreated={fetchFeed} />
      
      {loading ? (
        <div className="text-center text-gray-500 py-10">Loading feed...</div>
      ) : posts.length === 0 ? (
        <div className="text-center text-gray-500 py-10 bg-white rounded-lg shadow-sm border border-gray-200">
          No posts to show. Add some friends to see their posts!
        </div>
      ) : (
        posts.map((post) => (
          <PostComponent key={post._id} post={post} currentUser={currentUser} />
        ))
      )}
    </div>
  );
}
