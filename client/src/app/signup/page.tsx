"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function Signup() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 120 }, (_, i) => currentYear - i);
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

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5002/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12 font-sans relative">
      
      {/* Close Button */}
      <Link href="/login" className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors">
        <X size={24} strokeWidth={2} />
      </Link>

      <div className="w-full max-w-[400px]">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#1877f2] mb-2 tracking-tight">mini-facebook</h1>
          <h2 className="text-[24px] font-semibold text-[#1c1e21] mb-1">Create an account</h2>
          <p className="text-[15px] text-[#606770]">Quick, easy, and safe for students.</p>
        </div>

        {/* Form */}
        <div className="w-full">
          {error && <div className="mb-4 p-2 bg-red-100 text-red-600 text-sm rounded border border-red-200">{error}</div>}
          <form onSubmit={handleSignup} className="flex flex-col gap-3">
            <div className="flex gap-3">
              <input 
                type="text" 
                placeholder="First name" 
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="w-full p-[11px] text-[15px] border border-[#ccd0d5] rounded-[5px] bg-[#f5f6f7] focus:outline-none focus:border-[#1877f2] focus:bg-white text-[#1c1e21]"
                required
              />
              <input 
                type="text" 
                placeholder="Surname" 
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="w-full p-[11px] text-[15px] border border-[#ccd0d5] rounded-[5px] bg-[#f5f6f7] focus:outline-none focus:border-[#1877f2] focus:bg-white text-[#1c1e21]"
                required
              />
            </div>
            
            <input 
              type="text" 
              placeholder="Mobile number or email address" 
              value={formData.emailOrPhone}
              onChange={(e) => setFormData({...formData, emailOrPhone: e.target.value})}
              className="w-full p-[11px] text-[15px] border border-[#ccd0d5] rounded-[5px] bg-[#f5f6f7] focus:outline-none focus:border-[#1877f2] focus:bg-white text-[#1c1e21]"
              required
            />
            
            <input 
              type="password" 
              placeholder="New password" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full p-[11px] text-[15px] border border-[#ccd0d5] rounded-[5px] bg-[#f5f6f7] focus:outline-none focus:border-[#1877f2] focus:bg-white text-[#1c1e21]"
              required
            />

            <div className="mt-1">
              <span className="text-[12px] text-[#606770] flex items-center gap-1 mb-1">Date of birth <div className="w-[14px] h-[14px] bg-[#606770] text-white rounded-full flex items-center justify-center text-[10px] font-bold cursor-pointer">?</div></span>
              <div className="flex gap-3">
                <select value={formData.dobDay} onChange={(e) => setFormData({...formData, dobDay: e.target.value})} className="flex-1 h-[36px] px-2 border border-[#ccd0d5] rounded-[4px] bg-white text-[#1c1e21] text-[15px] focus:outline-none focus:border-[#1877f2]">
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
                <select value={formData.dobMonth} onChange={(e) => setFormData({...formData, dobMonth: e.target.value})} className="flex-1 h-[36px] px-2 border border-[#ccd0d5] rounded-[4px] bg-white text-[#1c1e21] text-[15px] focus:outline-none focus:border-[#1877f2]">
                  {months.map((month, index) => (
                    <option key={month} value={index + 1}>{month}</option>
                  ))}
                </select>
                <select value={formData.dobYear} onChange={(e) => setFormData({...formData, dobYear: e.target.value})} className="flex-1 h-[36px] px-2 border border-[#ccd0d5] rounded-[4px] bg-white text-[#1c1e21] text-[15px] focus:outline-none focus:border-[#1877f2]">
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-1">
              <span className="text-[12px] text-[#606770] flex items-center gap-1 mb-1">Gender <div className="w-[14px] h-[14px] bg-[#606770] text-white rounded-full flex items-center justify-center text-[10px] font-bold cursor-pointer">?</div></span>
              <div className="flex gap-3">
                <label className="flex-1 flex items-center justify-between px-2.5 h-[36px] border border-[#ccd0d5] rounded-[4px] cursor-pointer bg-white text-[#1c1e21]">
                  <span className="text-[15px]">Female</span>
                  <input type="radio" name="gender" value="female" onChange={(e) => setFormData({...formData, gender: e.target.value})} className="w-[13px] h-[13px] m-0" />
                </label>
                <label className="flex-1 flex items-center justify-between px-2.5 h-[36px] border border-[#ccd0d5] rounded-[4px] cursor-pointer bg-white text-[#1c1e21]">
                  <span className="text-[15px]">Male</span>
                  <input type="radio" name="gender" value="male" onChange={(e) => setFormData({...formData, gender: e.target.value})} className="w-[13px] h-[13px] m-0" />
                </label>
                <label className="flex-1 flex items-center justify-between px-2.5 h-[36px] border border-[#ccd0d5] rounded-[4px] cursor-pointer bg-white text-[#1c1e21]">
                  <span className="text-[15px]">Custom</span>
                  <input type="radio" name="gender" value="custom" onChange={(e) => setFormData({...formData, gender: e.target.value})} className="w-[13px] h-[13px] m-0" />
                </label>
              </div>
            </div>

            <p className="text-[12px] text-center text-[#777] mt-4 mb-4 leading-relaxed">
              By clicking Sign Up, you agree to our <a href="#" className="text-[#1877f2] hover:underline">Terms</a> and <a href="#" className="text-[#1877f2] hover:underline">Privacy Policy</a>.
            </p>

            <div className="flex justify-center mt-2">
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#1877f2] hover:bg-[#166fe5] disabled:opacity-50 text-white font-bold text-[18px] py-3 rounded-[8px] transition-colors"
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
