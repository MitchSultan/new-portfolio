// app/projects/[slug]/page.jsx
import { supabase } from '@/lib/supabaseClient';

export default async function ProjectDetail({ params }) {
  const { slug } = params;

  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!project) return <div>Project not found</div>;

  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      {project.link && (
        <a href={project.link} target="_blank" rel="noopener noreferrer">
          Visit Site
        </a>
      )}
    </div>
  );
}
export async function generateStaticParams() {
  const { data: projects } = await supabase.from('projects').select('slug');

  return projects?.map((project) => ({
    slug: project.slug,
  })) || [];
}
