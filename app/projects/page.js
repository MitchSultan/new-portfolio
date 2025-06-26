// app/projects/page.jsx
'use server';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';

export default async function ProjectsPage() {
  const { data: projects } = await supabase.from('projects').select('*');

  return (
    <div>
      <h1>My Projects</h1>
      {projects?.map((project) => (
        <div key={project.id}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <Link href={`/projects/${project.slug}`}>
            View Project
          </Link>
        </div>
      ))}
    </div>
  );
}
