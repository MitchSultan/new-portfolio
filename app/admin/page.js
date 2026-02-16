"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase/server';
import { Users } from 'lucide-react';

export default function AdminDashboard() {
  const [totalVisitors, setTotalVisitors] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      // Basic count of all rows in visitors table
      // In a real app you might want to group by unique session IDs or timeframes
      const { count, error } = await supabase
        .from('visitors')
        .select('*', { count: 'exact', head: true });

      if (!error) {
        setTotalVisitors(count || 0);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 dark:text-gray-400 font-medium">Total Page Views</h3>
            <Users className="w-8 h-8 text-primary-500" />
          </div>
          <p className="text-4xl font-bold text-gray-900 dark:text-white">{totalVisitors}</p>
          <p className="text-sm text-green-500 mt-2">All time stats</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 dark:text-gray-400 font-medium">Total Page Views</h3>
            <Users className="w-8 h-8 text-primary-500" />
          </div>
          <p className="text-4xl font-bold text-gray-900 dark:text-white">{totalVisitors}</p>
          <p className="text-sm text-green-500 mt-2">All time stats</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 dark:text-gray-400 font-medium">Total Page Views</h3>
            <Users className="w-8 h-8 text-primary-500" />
          </div>
          <p className="text-4xl font-bold text-gray-900 dark:text-white">{totalVisitors}</p>
          <p className="text-sm text-green-500 mt-2">All time stats</p>
        </div>
      </div>
    </div>
  );
}
