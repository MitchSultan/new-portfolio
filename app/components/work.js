'use client';
import React, { useState,useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { ExternalLink, Eye } from 'lucide-react';
import { supabase } from '../lib/supabase/server';
import ProjectModal from './projectmodal';

const Work = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('id, title, niche, image, liveUrl:live_url, description, technologies, features, timeline, teamSize:team_size, challenges, results')
          .order('id');
        
        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleLearnMore = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen ">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold  mb-4">
            My Work
          </h1>
          <p className="text-xl  max-w-2xl mx-auto">
            A showcase of my recent projects and the impact they've made
          </p>
        </div>

        {/* Projects Grid */}
        {loading ? (
           <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
           </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white bg-opacity-90  text-sm font-medium rounded-full">
                    {project.niche}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold  mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {project.description.substring(0, 120)}...
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleLearnMore(project)}
                    className="flex items-center gap-2 px-4 py-2   rounded-lg  transition-colors duration-200 font-medium flex-1 justify-center"
                  >
                    <Eye size={18} />
                    Learn More
                  </button>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200 font-medium"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Work;