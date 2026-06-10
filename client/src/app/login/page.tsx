"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5002/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrPhone: email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Save token and redirect
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
            {error && <div className="mb-4 p-3 bg-red-100 text-red-600 text-sm rounded border border-red-200 text-center">{error}</div>}
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
                disabled={loading}
                className="w-full bg-fb-blue hover:bg-fb-blue-hover disabled:bg-fb-blue/50 text-white font-bold text-[20px] py-3 rounded-lg transition-colors mt-1"
              >
                {loading ? "Logging In..." : "Log In"}
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
