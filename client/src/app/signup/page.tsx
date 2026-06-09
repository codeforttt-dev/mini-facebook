"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailOrPhone: "",
    password: "",
    dobDay: "1",
    dobMonth: "1",
    dobYear: "2026",
    gender: "",
  });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy signup action
    window.location.href = "/";
  };

  return (
    <div className="fixed inset-0 bg-fb-bg flex items-center justify-center z-[100] px-4 py-8 overflow-y-auto">
      <div className="w-full max-w-[432px] bg-white dark:bg-fb-dark-panel rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 relative my-auto">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 relative">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Sign Up</h1>
          <p className="text-[15px] text-gray-500 mt-1">It's quick and easy.</p>
          <Link href="/login" className="absolute top-4 right-4 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded-full transition-colors">
            <X size={24} />
          </Link>
        </div>

        {/* Form */}
        <div className="p-4">
          <form onSubmit={handleSignup} className="flex flex-col gap-3">
            <div className="flex gap-3">
              <input 
                type="text" 
                placeholder="First name" 
                className="w-full p-2.5 text-[15px] border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-fb-dark-bg focus:outline-none focus:border-fb-blue text-black dark:text-white"
                required
              />
              <input 
                type="text" 
                placeholder="Last name" 
                className="w-full p-2.5 text-[15px] border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-fb-dark-bg focus:outline-none focus:border-fb-blue text-black dark:text-white"
                required
              />
            </div>
            
            <input 
              type="text" 
              placeholder="Mobile number or email address" 
              className="w-full p-2.5 text-[15px] border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-fb-dark-bg focus:outline-none focus:border-fb-blue text-black dark:text-white"
              required
            />
            
            <input 
              type="password" 
              placeholder="New password" 
              className="w-full p-2.5 text-[15px] border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-fb-dark-bg focus:outline-none focus:border-fb-blue text-black dark:text-white"
              required
            />

            <div className="mt-2">
              <span className="text-[12px] text-gray-500 flex items-center gap-1 mb-1">Date of birth <a href="#" className="w-3 h-3 bg-gray-500 text-white rounded-full flex items-center justify-center text-[8px] font-bold">?</a></span>
              <div className="flex gap-3">
                <select className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-fb-dark-bg text-black dark:text-white">
                  <option>1</option><option>2</option><option>3</option>
                </select>
                <select className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-fb-dark-bg text-black dark:text-white">
                  <option>Jan</option><option>Feb</option><option>Mar</option>
                </select>
                <select className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-fb-dark-bg text-black dark:text-white">
                  <option>2026</option><option>2025</option><option>2024</option>
                </select>
              </div>
            </div>

            <div className="mt-2">
              <span className="text-[12px] text-gray-500 flex items-center gap-1 mb-1">Gender <a href="#" className="w-3 h-3 bg-gray-500 text-white rounded-full flex items-center justify-center text-[8px] font-bold">?</a></span>
              <div className="flex gap-3">
                <label className="flex-1 flex items-center justify-between p-2 border border-gray-300 dark:border-gray-600 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-fb-dark-bg text-black dark:text-white">
                  <span className="text-[15px]">Female</span>
                  <input type="radio" name="gender" value="female" className="w-4 h-4" />
                </label>
                <label className="flex-1 flex items-center justify-between p-2 border border-gray-300 dark:border-gray-600 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-fb-dark-bg text-black dark:text-white">
                  <span className="text-[15px]">Male</span>
                  <input type="radio" name="gender" value="male" className="w-4 h-4" />
                </label>
                <label className="flex-1 flex items-center justify-between p-2 border border-gray-300 dark:border-gray-600 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-fb-dark-bg text-black dark:text-white">
                  <span className="text-[15px]">Custom</span>
                  <input type="radio" name="gender" value="custom" className="w-4 h-4" />
                </label>
              </div>
            </div>

            <p className="text-[11px] text-gray-500 mt-2 leading-tight">
              People who use our service may have uploaded your contact information to Facebook. <a href="#" className="text-fb-blue hover:underline">Learn more</a>.
            </p>
            <p className="text-[11px] text-gray-500 leading-tight">
              By clicking Sign Up, you agree to our <a href="#" className="text-fb-blue hover:underline">Terms</a>, <a href="#" className="text-fb-blue hover:underline">Privacy Policy</a> and <a href="#" className="text-fb-blue hover:underline">Cookies Policy</a>.
            </p>

            <div className="flex justify-center mt-4">
              <button 
                type="submit"
                className="bg-[#00a400] hover:bg-[#008a00] text-white font-bold text-[18px] py-1.5 px-12 rounded-lg transition-colors w-[200px]"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
