"use client";
import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import ProjectForm from '../ProjectForm';

export default function CreateProjectPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/projects" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mb-2">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Projects
        </Link>
        <h2 className="text-3xl font-bold">Add New Project</h2>
      </div>
      
      <ProjectForm />
    </div>
  );
}
