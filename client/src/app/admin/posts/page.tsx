"use client";

import React, { useEffect, useState } from 'react';
import { Search, ThumbsUp, MessageSquare, Eye, Loader2, Image as ImageIcon, X, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PostsAdminPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal state
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002';
      
      const res = await fetch(`${apiUrl}/api/admin/posts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!res.ok) throw new Error('Failed to fetch posts');
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load posts list');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) return;
    
    setIsDeleting(postId);
    try {
      const token = localStorage.getItem('token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002';
      
      const res = await fetch(`${apiUrl}/api/admin/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!res.ok) throw new Error('Failed to delete post');
      
      // Update state to remove post
      setPosts(posts.filter(p => p.id !== postId));
      toast.success("Post deleted successfully");
      
      // If the deleted post was open in the modal, close it
      if (selectedPost && selectedPost.id === postId) {
        setSelectedPost(null);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    } finally {
      setIsDeleting(null);
    }
  };

  const filteredPosts = posts.filter(post => 
    post.author.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (post.content && post.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Posts Management</h1>
          <p className="text-gray-500 mt-1">Manage platform content, view details, or remove inappropriate posts.</p>
        </div>
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search authors or content..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64 transition-shadow hover:shadow-sm"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row gap-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-blue-100 group">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{post.author}</h3>
                  <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">{new Date(post.date).toLocaleString()}</span>
                </div>
                
                {post.content ? (
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">{post.content}</p>
                ) : null}

                {post.media && post.media.length > 0 && (
                  <div className="flex items-center gap-2 mb-4 text-sm text-blue-500 bg-blue-50 px-3 py-2 rounded-lg w-fit">
                    <ImageIcon className="w-4 h-4" /> Attached Media ({post.media.length})
                  </div>
                )}
                
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5"><ThumbsUp className="w-4 h-4" /> {post.likes}</span>
                  <span className="flex items-center gap-1.5"><MessageSquare className="w-4 h-4" /> {post.comments}</span>
                </div>
              </div>
              
              <div className="flex sm:flex-col justify-end gap-2 border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-6 min-w-[120px]">
                <button 
                  onClick={() => setSelectedPost(post)}
                  className="flex-1 sm:flex-none px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                >
                  <Eye className="w-4 h-4" /> View
                </button>
                <button 
                  onClick={() => handleDelete(post.id)}
                  disabled={isDeleting === post.id}
                  className="flex-1 sm:flex-none px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-sm font-medium hover:bg-rose-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting === post.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />} 
                  {isDeleting === post.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
          {filteredPosts.length === 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center text-gray-500">
              No posts match your search.
            </div>
          )}
        </div>
      )}

      {/* View Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Post Details</h2>
              <button 
                onClick={() => setSelectedPost(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    {selectedPost.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedPost.author}</h3>
                    <p className="text-xs text-gray-500">{new Date(selectedPost.date).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-gray-50 px-3 py-1.5 rounded-lg text-sm text-gray-600">
                  <span className="flex items-center gap-1.5 font-medium"><ThumbsUp className="w-4 h-4 text-blue-500" /> {selectedPost.likes}</span>
                  <span className="flex items-center gap-1.5 font-medium"><MessageSquare className="w-4 h-4 text-emerald-500" /> {selectedPost.comments}</span>
                </div>
              </div>

              {selectedPost.content && (
                <div className="mb-6">
                  <p className="text-gray-800 whitespace-pre-wrap">{selectedPost.content}</p>
                </div>
              )}

              {selectedPost.media && selectedPost.media.length > 0 && (
                <div className="grid gap-2 mb-4">
                  {selectedPost.media.map((url: string, index: number) => {
                    // Check if URL contains video formats
                    const isVideo = url.match(/\.(mp4|webm|ogg)$/i) || url.includes('video');
                    return (
                      <div key={index} className="rounded-xl overflow-hidden bg-gray-100 border border-gray-100 max-h-96 flex items-center justify-center">
                        {isVideo ? (
                          <video src={url} controls className="max-w-full max-h-96 object-contain" />
                        ) : (
                          <img src={url} alt="Post media" className="max-w-full max-h-96 object-contain" />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button 
                onClick={() => handleDelete(selectedPost.id)}
                className="px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-medium hover:bg-rose-700 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" /> Delete Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
