"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy login action
    window.location.href = "/";
  };

  return (
    <div className="fixed inset-0 bg-fb-bg flex items-center justify-center z-[100] px-4">
      <div className="max-w-[1000px] w-full flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Left Side Branding */}
        <div className="flex-1 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-5xl md:text-6xl font-bold text-fb-blue mb-4">mini-facebook</h1>
          <p className="text-2xl md:text-3xl text-gray-800 dark:text-gray-200 leading-snug font-medium">
            Connect with friends and the world around you on Mini-Facebook.
          </p>
        </div>

        {/* Right Side Login Form */}
        <div className="w-full max-w-[400px]">
          <div className="bg-white dark:bg-fb-dark-panel p-4 md:p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800">
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input 
                type="text" 
                placeholder="Email or phone number" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3.5 text-[17px] border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-fb-blue focus:ring-1 focus:ring-fb-blue bg-white dark:bg-fb-dark-bg text-black dark:text-white placeholder-gray-500"
                required
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3.5 text-[17px] border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-fb-blue focus:ring-1 focus:ring-fb-blue bg-white dark:bg-fb-dark-bg text-black dark:text-white placeholder-gray-500"
                required
              />
              <button 
                type="submit"
                className="w-full bg-fb-blue hover:bg-fb-blue-hover text-white font-bold text-[20px] py-3 rounded-lg transition-colors mt-1"
              >
                Log In
              </button>
            </form>

            <div className="text-center mt-4 mb-5">
              <a href="#" className="text-fb-blue text-sm hover:underline">Forgot password?</a>
            </div>

            <div className="border-t border-gray-300 dark:border-gray-700 mb-6"></div>

            <div className="text-center">
              <Link href="/signup">
                <button className="bg-[#42b72a] hover:bg-[#36a420] text-white font-bold text-[17px] py-3 px-6 rounded-lg transition-colors inline-block">
                  Create new account
                </button>
              </Link>
            </div>
          </div>
          <div className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
            <a href="#" className="font-bold hover:underline">Create a Page</a> for a celebrity, brand or business.
          </div>
        </div>

      </div>
    </div>
  );
}
