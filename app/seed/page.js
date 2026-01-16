"use client";
import { useState } from 'react';
import { supabase } from '../lib/supabase/server'; // Using the existing client

const seedProjects = [
    {
      title: "Luxury By Tina",
      niche: "E-Commerce",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
      live_url: "https://www.luxurybytina.com",
      description: "A fully responsive e-commerce platform built with modern web technologies. Features include user authentication, product catalog, shopping cart, payment integration, and admin dashboard for inventory management.",
      technologies: ["Wordpress", "Woocommerce", "Sql", "Stripe API", "Hostinger"],
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
      timeline: "2 month",
      team_size: "Solo Developer",
      challenges: "The main challenge was implementing a scalable payment system that could handle multiple currencies and payment methods while ensuring security and compliance with PCI standards.",
      results: "Successfully launched with 500+ registered users in the first month, achieving a 4.8/5 user satisfaction rating and 25% conversion rate from visitors to customers."
    },
    {
      title: "Evolve Sphere Consulting",
      niche: "Consulting",
      image: "/evol.png",
      live_url: "https://evolvesphereconsulting.com",
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
      team_size: "solo Developer",
      challenges: "Implementing real-time synchronization across multiple users while maintaining data consistency and handling offline scenarios was the primary technical challenge.",
      results: "Adopted by 15+ small businesses with an average of 40% improvement in team productivity and 90% user retention rate after 3 months."
    },
    {
      title: "The OtherguysKE Organization",
      niche: "NGO/Non-Profit",
      image: "/etog.png",
      live_url: "https://theotherguyske.org",
      description: "An elegant restaurant website featuring online menu, reservation system, and contact information. Designed to provide an immersive dining experience preview for potential customers.",
      technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
      features: [
        "Responsive Design",
        "donation Integration",
        "online shopping",
      ],
      timeline: "1 month",
      team_size: "Solo Developer",
      challenges: "Creating an appealing visual design that captures the restaurant's ambiance while ensuring fast loading times and mobile optimization for food imagery.",
      results: "Increased online reservations by 60% and improved customer engagement with 3x more social media followers within 2 months of launch."
    },
    {
      title: "Ziatech Limited",
      niche: "Sourcing & Procurement",
      image: "/zia.png",
      live_url: "https://ziatechltd.com",
      description: "An elegant restaurant website featuring online menu, reservation system, and contact information. Designed to provide an immersive dining experience preview for potential customers.",
      technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
      features: [
        "Responsive Design",
        "donation Integration",
        "online shopping",
      ],
      timeline: "1 month",
      team_size: "Solo Developer",
      challenges: "Creating an appealing visual design that captures the sourcing journeys.",
      results: "Increased online reservations by 60% and improved customer engagement with 3x more social media followers within 2 months of launch."
     },
      {
      title: "Mad Graphix",
      niche: "Design Company",
      image: "/just.png",
      live_url: "https://madgraphix.co.ke",
      description: "An elegant restaurant website featuring online menu, reservation system, and contact information. Designed to provide an immersive dining experience preview for potential customers.",
      technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
      features: [
        "Responsive Design",
        "donation Integration",
        "online shopping",
      ],
      timeline: "1 month",
      team_size: "Solo Developer",
      challenges: "Creating an appealing visual design that captures the restaurant's ambiance while ensuring fast loading times and mobile optimization for food imagery.",
      results: "Increased online reservations by 60% and improved customer engagement with 3x more social media followers within 2 months of launch."
    },
     {
      title: "Canvas Pile",
      niche: "curated Arts",
      image: "/f1r.png",
      live_url: "https://canvaspile.com",
      description: "An elegant restaurant website featuring online menu, reservation system, and contact information. Designed to provide an immersive dining experience preview for potential customers.",
      technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
      features: [
        "Responsive Design",
        "donation Integration",
        "online shopping",
      ],
      timeline: "1 month",
      team_size: "Solo Developer",
      challenges: "Creating an appealing visual design that captures the restaurant's ambiance while ensuring fast loading times and mobile optimization for food imagery.",
      results: "Increased online reservations by 60% and improved customer engagement with 3x more social media followers within 2 months of launch."
    },
     {
      title: "Nesh Collections",
      niche: "Fashion ",
      image: "/f1r.png",
      live_url: "https://neshcollections.com",
      description: "An elegant restaurant website featuring online menu, reservation system, and contact information. Designed to provide an immersive dining experience preview for potential customers.",
      technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
      features: [
        "Responsive Design",
        "donation Integration",
        "online shopping",
      ],
      timeline: "1 month",
      team_size: "Solo Developer",
      challenges: "Creating an appealing visual design that captures the restaurant's ambiance while ensuring fast loading times and mobile optimization for food imagery.",
      results: "Increased online reservations by 60% and improved customer engagement with 3x more social media followers within 2 months of launch."
    },
     {
      title: "Inner Harbor Resort",
      niche: "Resort",
      image: "/f1r.png",
      live_url: "https://innerharborresort.co.ke",
      description: "An elegant restaurant website featuring online menu, reservation system, and contact information. Designed to provide an immersive dining experience preview for potential customers.",
      technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
      features: [
        "Responsive Design",
        "donation Integration",
        "online shopping",
      ],
      timeline: "1 month",
      team_size: "Solo Developer",
      challenges: "Creating an appealing visual design that captures the restaurant's ambiance while ensuring fast loading times and mobile optimization for food imagery.",
      results: "Increased online reservations by 60% and improved customer engagement with 3x more social media followers within 2 months of launch."
    },
     {
      title: "Reuben Chumba",
      niche: "Portfolio",
      image: "/f1r.png",
      live_url: "https://reubenchumba.co.ke",
      description: "An elegant restaurant website featuring online menu, reservation system, and contact information. Designed to provide an immersive dining experience preview for potential customers.",
      technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
      features: [
        "Responsive Design",
        "donation Integration",
        "online shopping",
      ],
      timeline: "1 month",
      team_size: "Solo Developer",
      challenges: "Creating an appealing visual design that captures the restaurant's ambiance while ensuring fast loading times and mobile optimization for food imagery.",
      results: "Increased online reservations by 60% and improved customer engagement with 3x more social media followers within 2 months of launch."
    },
];

export default function SeedPage() {
  const [status, setStatus] = useState('Idle');

  const runSeed = async () => {
    setStatus('Seeding...');
    try {
      const { error } = await supabase.from('projects').insert(seedProjects);
      if (error) throw error;
      setStatus('Success! Data seeded.');
    } catch (error) {
      console.error('Error seeding:', error);
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div className="p-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-5">Seed Database</h1>
      <p className="mb-5">This will insert sample project data into the 'projects' table.</p>
      <button 
        onClick={runSeed}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Seed Data
      </button>
      <p className="mt-5 text-lg font-semibold">{status}</p>
    </div>
  );
}
