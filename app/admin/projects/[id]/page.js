"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase/server';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import ProjectForm from '../ProjectForm';
import { useParams } from 'next/navigation';

export default function EditProjectPage() {
  const params = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', params.id)
        .single();

      if (!error) {
        setProject(data);
      } else {
        console.error("Error fetching project:", error);
      }
      setLoading(false);
    };

    if (params.id) {
        fetchProject();
    }
  }, [params.id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!project) return <div className="p-8">Project not found</div>;

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/projects" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mb-2">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Projects
        </Link>
        <h2 className="text-3xl font-bold">Edit Project: {project.title}</h2>
      </div>
      
      <ProjectForm initialData={project} isEditing={true} />
    </div>
  );
}
