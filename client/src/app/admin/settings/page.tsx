"use client";

import React from 'react';
import { Save, Bell, Shield, Globe } from 'lucide-react';

export default function SettingsAdminPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Settings</h1>
        <p className="text-gray-500 mt-1">Configure your platform preferences and security.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-2">
          <button className="w-full text-left px-4 py-3 bg-blue-50 text-blue-700 rounded-lg font-medium flex items-center gap-3 transition-transform hover:translate-x-1 duration-200">
            <Globe className="w-5 h-5" /> General Settings
          </button>
          <button className="w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg font-medium flex items-center gap-3 transition-all hover:translate-x-1 duration-200">
            <Shield className="w-5 h-5" /> Security & Privacy
          </button>
          <button className="w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg font-medium flex items-center gap-3 transition-all hover:translate-x-1 duration-200">
            <Bell className="w-5 h-5" /> Notifications
          </button>
        </div>

        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6 transition-all hover:shadow-md duration-300">
          <h2 className="text-xl font-bold text-gray-900">General Configuration</h2>
          
          <div className="space-y-4">
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-blue-600 transition-colors">Site Name</label>
              <input type="text" defaultValue="Mini Facebook" className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow hover:shadow-sm" />
            </div>
            
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-blue-600 transition-colors">Support Email</label>
              <input type="email" defaultValue="support@minifacebook.com" className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow hover:shadow-sm" />
            </div>

            <div className="flex items-center justify-between py-2 border border-transparent hover:border-gray-100 p-2 rounded-lg transition-colors group">
              <div>
                <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">Maintenance Mode</h4>
                <p className="text-xs text-gray-500">Temporarily disable access to the platform for all non-admin users.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer hover:scale-105 transition-transform">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 shadow-inner"></div>
              </label>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
