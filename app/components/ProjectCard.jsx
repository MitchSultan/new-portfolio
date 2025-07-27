import { ExternalLink, Github } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Initial card animation
    gsap.fromTo(cardRef.current,
      { y: 50, opacity: 0, rotationY: -15 },
      { y: 0, opacity: 1, rotationY: 0, duration: 0.8, ease: "power2.out" }
    );
  }, []);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, { 
      y: -10, 
      scale: 1.02,
      rotationY: 5,
      duration: 0.3,
      ease: "power2.out"
    });
    gsap.to(imageRef.current, {
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { 
      y: 0, 
      scale: 1,
      rotationY: 0,
      duration: 0.3,
      ease: "power2.out"
    });
    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Planning':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div 
      ref={cardRef}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}
    >
      {/* Project Image */}
      <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
        <div 
          ref={imageRef}
          className="absolute inset-0 bg-black/20 flex items-center justify-center transition-transform duration-300"
        >
          <h3 className="text-white text-xl font-bold">{project.title}</h3>
        </div>
      </div>

      {/* Project Content */}
      <div ref={contentRef} className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-800">{project.title}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md hover:bg-gray-200 transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 text-sm group"
              onMouseEnter={(e) => gsap.to(e.target, { scale: 1.05, duration: 0.2 })}
              onMouseLeave={(e) => gsap.to(e.target, { scale: 1, duration: 0.2 })}
            >
              <Github size={16} className="group-hover:rotate-12 transition-transform duration-200" />
              Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm group"
              onMouseEnter={(e) => gsap.to(e.target, { scale: 1.05, duration: 0.2 })}
              onMouseLeave={(e) => gsap.to(e.target, { scale: 1, duration: 0.2 })}
            >
              <ExternalLink size={16} className="group-hover:rotate-12 transition-transform duration-200" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;