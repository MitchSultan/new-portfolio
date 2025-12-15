
import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { ExternalLink, Eye } from 'lucide-react';
import ProjectModal from './projectmodal';

const Work = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample project data - you can replace this with your actual projects
  const projects = [
    {
      id: 1,
      title: "Luxury By Tina",
      niche: "E-Commerce",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
      liveUrl: "https://www.luxurybytina.com",
      description: "A fully responsive e-commerce platform built with modern web technologies. Features include user authentication, product catalog, shopping cart, payment integration, and admin dashboard for inventory management.",
      technologies: ["Wordpress", "Woocommerce", "Ngix", "Stripe API", "Hostinger"],
      features: [
        "User Authentication & Authorization",
        "Product Catalog with Search & Filters",
        "Shopping Cart & Wishlist",
        "Secure Payment Processing",
        "Order Management System",
        "Admin Dashboard",
        "Responsive Design",
        "Real-time Inventory Updates"
      ],
      timeline: "1 month",
      teamSize: "Solo Developer",
      challenges: "The main challenge was implementing a scalable payment system that could handle multiple currencies and payment methods while ensuring security and compliance with PCI standards.",
      results: "Successfully launched with 500+ registered users in the first month, achieving a 4.8/5 user satisfaction rating and 25% conversion rate from visitors to customers."
    },
    {
      id: 2,
      title: "Evolve Sphere Consulting",
      niche: "Consulting",
      image: "/evol.png",
      liveUrl: "https://evolvesphereconsulting.com",
      description: "A collaborative task management application designed to help teams organize, track, and complete projects efficiently. Built with real-time collaboration features and intuitive user interface.",
      technologies: ["Wordpress", "SQL", "Socket.io", "CSS3", "PWA"],
      features: [
        "Real-time Collaboration",
        "Project & Task Organization",
        "Team Member Management",
        "Progress Tracking",
        "File Attachments",
        "Deadline Notifications",
        "Mobile-first Design",
        "Offline Functionality"
      ],
      timeline: "2 months",
      teamSize: "solo Developer",
      challenges: "Implementing real-time synchronization across multiple users while maintaining data consistency and handling offline scenarios was the primary technical challenge.",
      results: "Adopted by 15+ small businesses with an average of 40% improvement in team productivity and 90% user retention rate after 3 months."
    },
   , {
      id: 3,
      title: "The OtherguysKE Organization",
      niche: "NGO/Non-Profit",
      image: "/etog.png",
      liveUrl: "https://theotherguyske.org",
      description: "An elegant restaurant website featuring online menu, reservation system, and contact information. Designed to provide an immersive dining experience preview for potential customers.",
      technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
      features: [
        "Responsive Design",
        "donation Integration",
        "online shopping",
      ],
      timeline: "1 month",
      teamSize: "Solo Developer",
      challenges: "Creating an appealing visual design that captures the restaurant's ambiance while ensuring fast loading times and mobile optimization for food imagery.",
      results: "Increased online reservations by 60% and improved customer engagement with 3x more social media followers within 2 months of launch."
    },
     {
      id: 4,
      title: "Ziatech Limited",
      niche: "Sourcing & Procurement",
      image: "/zia.png",
      liveUrl: "https://ziatechltd.com",
      description: "An elegant restaurant website featuring online menu, reservation system, and contact information. Designed to provide an immersive dining experience preview for potential customers.",
      technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
      features: [
        "Responsive Design",
        "donation Integration",
        "online shopping",
      ],
      timeline: "1 month",
      teamSize: "Solo Developer",
      challenges: "Creating an appealing visual design that captures the sourcing journeys.",
      results: "Increased online reservations by 60% and improved customer engagement with 3x more social media followers within 2 months of launch."
     },
      {
      id: 5,
      title: "Mad Graphix",
      niche: "Design Company",
      image: "/just.png",
      liveUrl: "https://madgraphix.co.ke",
      description: "An elegant restaurant website featuring online menu, reservation system, and contact information. Designed to provide an immersive dining experience preview for potential customers.",
      technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
      features: [
        "Responsive Design",
        "donation Integration",
        "online shopping",
      ],
      timeline: "1 month",
      teamSize: "Solo Developer",
      challenges: "Creating an appealing visual design that captures the restaurant's ambiance while ensuring fast loading times and mobile optimization for food imagery.",
      results: "Increased online reservations by 60% and improved customer engagement with 3x more social media followers within 2 months of launch."
    },
     {
      id: 6,
      title: "Canvas Pile",
      niche: "curated Arts",
      image: "/f1r.png",
      liveUrl: "https://canvaspile.com",
      description: "An elegant restaurant website featuring online menu, reservation system, and contact information. Designed to provide an immersive dining experience preview for potential customers.",
      technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
      features: [
        "Responsive Design",
        "donation Integration",
        "online shopping",
      ],
      timeline: "1 month",
      teamSize: "Solo Developer",
      challenges: "Creating an appealing visual design that captures the restaurant's ambiance while ensuring fast loading times and mobile optimization for food imagery.",
      results: "Increased online reservations by 60% and improved customer engagement with 3x more social media followers within 2 months of launch."
    },
    
     {
      id: 7,
      title: "Nesh Collections",
      niche: "Fashion ",
      image: "/f1r.png",
      liveUrl: "https://neshcollections.com",
      description: "An elegant restaurant website featuring online menu, reservation system, and contact information. Designed to provide an immersive dining experience preview for potential customers.",
      technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
      features: [
        "Responsive Design",
        "donation Integration",
        "online shopping",
      ],
      timeline: "1 month",
      teamSize: "Solo Developer",
      challenges: "Creating an appealing visual design that captures the restaurant's ambiance while ensuring fast loading times and mobile optimization for food imagery.",
      results: "Increased online reservations by 60% and improved customer engagement with 3x more social media followers within 2 months of launch."
    },
    
     {
      id: 8,
      title: "Inner Harbor Resort",
      niche: "Resort",
      image: "/f1r.png",
      liveUrl: "https://innerharborresort.co.ke",
      description: "An elegant restaurant website featuring online menu, reservation system, and contact information. Designed to provide an immersive dining experience preview for potential customers.",
      technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
      features: [
        "Responsive Design",
        "donation Integration",
        "online shopping",
      ],
      timeline: "1 month",
      teamSize: "Solo Developer",
      challenges: "Creating an appealing visual design that captures the restaurant's ambiance while ensuring fast loading times and mobile optimization for food imagery.",
      results: "Increased online reservations by 60% and improved customer engagement with 3x more social media followers within 2 months of launch."
    },
    
     {
      id: 9,
      title: "Reuben Chumba",
      niche: "Portfolio",
      image: "/f1r.png",
      liveUrl: "https://reubenchumba.co.ke",
      description: "An elegant restaurant website featuring online menu, reservation system, and contact information. Designed to provide an immersive dining experience preview for potential customers.",
      technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
      features: [
        "Responsive Design",
        "donation Integration",
        "online shopping",
      ],
      timeline: "1 month",
      teamSize: "Solo Developer",
      challenges: "Creating an appealing visual design that captures the restaurant's ambiance while ensuring fast loading times and mobile optimization for food imagery.",
      results: "Increased online reservations by 60% and improved customer engagement with 3x more social media followers within 2 months of launch."
    },
     
  ];

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
                  <span className="px-3 py-1 bg-white bg-opacity-90 text-gray-800 text-sm font-medium rounded-full">
                    {project.niche}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
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