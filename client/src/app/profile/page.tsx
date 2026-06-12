"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Camera, Plus, PenSquare, ChevronDown, MoreHorizontal, Image as ImageIcon, MapPin, Briefcase, GraduationCap, Heart, Clock } from "lucide-react";
import EditProfileModal from "@/components/profile/EditProfileModal";
import CreatePostComponent from "@/components/feed/CreatePostComponent";
import PostComponent from "@/components/feed/PostComponent";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [friends, setFriends] = useState<any[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const u = JSON.parse(storedUser);
      setUser(u);
      fetchUserPosts(u.id || u._id);
      fetchFriends(u.id || u._id);
    }
  }, []);

  const fetchFriends = async (userId: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5002/api/friends/list/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setFriends(data.friends || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserPosts = async (userId: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5002/api/posts/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setPosts(data.posts);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPosts(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5002/api/auth/profile-picture`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ avatar: base64String })
        });
        
        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
          localStorage.setItem('user', JSON.stringify(data.user));
          window.dispatchEvent(new Event("storage")); // Trigger Navbar update if listening
        }
      } catch (error) {
        console.error(error);
      }
    };
    reader.readAsDataURL(file);
  };

  const fullName = user ? `${user.firstName} ${user.lastName}` : "Loading...";
  const avatar = user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=default";

  return (
    <div suppressHydrationWarning className="min-h-screen bg-[#f0f2f5] text-fb-text-dark pt-[104px] md:pt-[56px] pb-10">
      <Navbar />

      {/* Header Section (Cover + Avatar + Info) */}
      <div className="bg-white  shadow-sm w-full">
        <div className="max-w-[1095px] mx-auto w-full">
          
          {/* Cover Photo */}
          <div className="w-full h-[250px] md:h-[348px] bg-gradient-to-b from-gray-300 to-gray-400   rounded-b-lg relative group">
            <button className="absolute bottom-4 right-4 bg-white  hover:bg-gray-100 text-black  px-3 py-1.5 rounded-md font-semibold text-[15px] flex items-center gap-2 transition-colors">
              <Camera size={16} />
              <span className="hidden sm:inline">Edit cover photo</span>
            </button>
          </div>

          {/* Profile Info & Avatar */}
          <div className="px-4 md:px-8 pb-4 relative">
            <div className="flex flex-col md:flex-row items-center md:items-end justify-between md:mb-4 -mt-[85px] md:-mt-[30px] relative z-10 gap-4 md:gap-0">
              
              {/* Avatar and Name */}
              <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6">
                <div className="relative">
                  <div className="w-[168px] h-[168px] rounded-full border-4 border-white  bg-white  overflow-hidden">
                    <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <label htmlFor="avatar-upload" className="cursor-pointer absolute bottom-2 right-2 w-9 h-9 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center border border-gray-300  transition-colors">
                    <Camera size={20} className="text-black " />
                  </label>
                  <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                </div>
                
                <div className="text-center md:text-left mb-2 md:mb-4">
                  <h1 className="text-[32px] font-bold text-black  leading-tight">{fullName}</h1>
                  <p className="text-[#65676B]  font-semibold text-[15px] hover:underline cursor-pointer">
                    {friends.length} {friends.length === 1 ? 'friend' : 'friends'}
                  </p>
                  
                  {/* Real friends avatars */}
                  {friends.length > 0 && (
                    <div className="flex justify-center md:justify-start mt-2">
                      {friends.slice(0, 6).map((friend) => (
                        <img 
                          key={friend.id} 
                          src={friend.avatar} 
                          className="w-8 h-8 rounded-full border-2 border-white  -ml-2 first:ml-0 object-cover" 
                          alt="friend" 
                          title={friend.name}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mb-2 md:mb-4">
                <button className="bg-[#1877f2] hover:bg-[#166fe5] text-white px-3 py-1.5 rounded-md font-semibold text-[15px] flex items-center gap-1.5 transition-colors">
                  <Plus size={18} />
                  Add to story
                </button>
                <button onClick={() => setIsEditModalOpen(true)} className="bg-[#e4e6eb] hover:bg-[#d8dadf] text-black px-3 py-1.5 rounded-md font-semibold text-[15px] flex items-center gap-1.5 transition-colors">
                  <PenSquare size={18} />
                  Edit profile
                </button>
                <button className="bg-[#e4e6eb] hover:bg-[#d8dadf] text-black px-3 py-1.5 rounded-md flex items-center transition-colors">
                  <ChevronDown size={18} />
                </button>
              </div>
            </div>

            <div className="border-t border-[#ced0d4]  mt-4 mb-1 w-full"></div>

            {/* Profile Navigation Tabs */}
            <div className="flex items-center justify-between">
              <div className="flex overflow-x-auto hide-scrollbar">
                {["Posts", "About", "Friends", "Photos", "Videos", "Check-ins"].map((tab, idx) => (
                  <button 
                    key={tab} 
                    className={`px-4 py-4 font-semibold text-[15px] whitespace-nowrap ${idx === 0 ? 'text-[#1877f2] border-b-[3px] border-[#1877f2]' : 'text-[#65676B]  hover:bg-gray-100 rounded-md my-1'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <button className="hidden sm:flex bg-[#e4e6eb] hover:bg-[#d8dadf] text-black  p-2 rounded-md transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Body Section (2-Column Content) */}
      <div className="max-w-[1095px] mx-auto w-full px-4 mt-4 flex flex-col lg:flex-row gap-4 items-start">
        
        {/* Left Column (Sticky on large screens) */}
        <div className="w-full lg:w-[40%] flex flex-col gap-4 lg:sticky lg:top-[72px]">
          
          {/* Intro Card */}
          <div className="bg-white rounded-lg shadow-sm p-4 w-full border border-gray-200">
            <h2 className="text-[20px] font-bold mb-4 text-black">Intro</h2>
            <div className="text-center mb-4">
              {user?.bio ? (
                <p className="text-[15px] text-black">{user.bio}</p>
              ) : (
                <p className="text-[15px] text-gray-500 italic">No bio yet</p>
              )}
              <button onClick={() => setIsEditModalOpen(true)} className="bg-[#e4e6eb] hover:bg-[#d8dadf] w-full mt-3 py-1.5 rounded-md font-semibold text-[15px] text-black transition-colors">
                Edit bio
              </button>
            </div>
            
            <div className="flex flex-col gap-3 text-[15px] text-black mb-4">
              {user?.workplace && <div className="flex items-center gap-2"><Briefcase size={20} className="text-gray-500" /> Works at {user.workplace}</div>}
              {user?.education && <div className="flex items-center gap-2"><GraduationCap size={20} className="text-gray-500" /> Studied at {user.education}</div>}
              {user?.location && <div className="flex items-center gap-2"><MapPin size={20} className="text-gray-500" /> Lives in {user.location}</div>}
              {user?.hometown && <div className="flex items-center gap-2"><MapPin size={20} className="text-gray-500" /> From {user.hometown}</div>}
              {user?.relationshipStatus && <div className="flex items-center gap-2"><Heart size={20} className="text-gray-500" /> {user.relationshipStatus}</div>}
              <div className="flex items-center gap-2"><Clock size={20} className="text-gray-500" /> Joined June 2026</div>
            </div>

            <button onClick={() => setIsEditModalOpen(true)} className="bg-[#e4e6eb] hover:bg-[#d8dadf] w-full py-1.5 rounded-md font-semibold text-[15px] text-black transition-colors">
              Edit details
            </button>
            <button className="bg-[#e4e6eb] hover:bg-[#d8dadf] w-full mt-3 py-1.5 rounded-md font-semibold text-[15px] text-black  transition-colors">
              Add hobbies
            </button>
            <button className="bg-[#e4e6eb] hover:bg-[#d8dadf] w-full mt-3 py-1.5 rounded-md font-semibold text-[15px] text-black  transition-colors">
              Add features
            </button>
          </div>

          {/* Photos Card */}
          <div className="bg-white  rounded-lg shadow-sm p-4 w-full border border-gray-200 ">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[20px] font-bold text-black ">Photos</h2>
              <button className="text-[#1877f2] hover:bg-blue-50 px-2 py-1 rounded-md text-[15px] transition-colors">See all photos</button>
            </div>
            <div className="grid grid-cols-3 gap-1 rounded-lg overflow-hidden">
              {[1,2,3,4,5,6,7,8,9].map((i) => (
                <div key={i} className="aspect-square bg-gray-200  hover:opacity-90 cursor-pointer">
                  <img src={`https://source.unsplash.com/random/200x200?sig=${i}`} alt="photo" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
          
        </div>

        {/* Right Column (Scrollable Feed) */}
        <div className="w-full lg:w-[60%] flex flex-col gap-4">
          
          <CreatePostComponent currentUser={user} onPostCreated={() => fetchUserPosts(user.id || user._id)} />

          {/* Posts Filter / Manager */}
          <div className="bg-white rounded-lg shadow-sm p-4 w-full border border-gray-200 flex justify-between items-center">
            <h2 className="text-[20px] font-bold text-black">Posts</h2>
            <div className="flex gap-2">
              <button className="bg-[#e4e6eb] hover:bg-[#d8dadf] text-black px-3 py-1.5 rounded-md font-semibold text-[15px] flex items-center gap-1.5 transition-colors">
                Filters
              </button>
              <button className="bg-[#e4e6eb] hover:bg-[#d8dadf] text-black px-3 py-1.5 rounded-md font-semibold text-[15px] flex items-center gap-1.5 transition-colors">
                Manage posts
              </button>
            </div>
          </div>

          {loadingPosts ? (
            <div className="text-center text-gray-500 py-10">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="text-center text-gray-500 py-10 bg-white rounded-lg shadow-sm border border-gray-200">
              No posts yet.
            </div>
          ) : (
            posts.map((post) => (
              <PostComponent key={post._id} post={post} currentUser={user} />
            ))
          )}

        </div>
      </div>

      {isEditModalOpen && user && (
        <EditProfileModal
          user={user}
          onClose={() => setIsEditModalOpen(false)}
          onSave={(updatedUser) => {
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
          }}
        />
      )}
    </div>
  );
}
