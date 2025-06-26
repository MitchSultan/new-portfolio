
import React from 'react';
import { X, ExternalLink, Code, Calendar, Users, Target, CheckCircle } from 'lucide-react';

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-64 object-cover rounded-t-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-2xl"></div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-opacity-30 transition-all duration-200"
          >
            <X size={24} />
          </button>
          
          <div className="absolute bottom-6 left-6 text-white">
            <span className="px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-3 inline-block">
              {project.niche}
            </span>
            <h2 className="text-3xl font-bold mb-2">{project.title}</h2>
          </div>
        </div>

        <div className="p-8">
          {/* Description */}
          <div className="mb-8">
            <p className="text-gray-700 text-lg leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Calendar className="text-blue-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Timeline</p>
                <p className="font-semibold text-gray-900">{project.timeline}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Users className="text-green-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Team Size</p>
                <p className="font-semibold text-gray-900">{project.teamSize}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Target className="text-purple-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Industry</p>
                <p className="font-semibold text-gray-900">{project.niche}</p>
              </div>
            </div>
          </div>

          {/* Technologies Used */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Code className="text-blue-600" size={24} />
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="text-green-600" size={24} />
              Key Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={16} />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges & Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Challenges</h3>
              <p className="text-gray-700 leading-relaxed">{project.challenges}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Results</h3>
              <p className="text-gray-700 leading-relaxed">{project.results}</p>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
            >
              <ExternalLink size={20} />
              Visit Live Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;