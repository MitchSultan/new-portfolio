"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase/server';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, FolderKanban, LogOut } from 'lucide-react';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      }
      setLoading(false);
    };

    checkUser();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
            router.push('/login');
        }
    });

    return () => {
        subscription.unsubscribe();
    }
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Admin</h1>
        </div>
        <nav className="mt-6">
          <Link
            href="/admin"
            className={`flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${pathname === '/admin' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link
            href="/admin/projects"
            className={`flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${pathname.startsWith('/admin/projects') ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
          >
            <FolderKanban className="w-5 h-5 mr-3" />
            Projects
          </Link>
          <Link
            href="/admin/affiliates"
            className={`flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${pathname.startsWith('/admin/affiliates') ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
          >
            <FolderKanban className="w-5 h-5 mr-3" />
            Affiliates
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-6 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 mt-auto"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
