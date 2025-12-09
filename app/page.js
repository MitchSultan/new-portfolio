"use client";
import React from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import About from "./components/skill";
// import Testimonial from "./components/count";
import Projects from "./components/projects";
import TextCursor from './components/textcursor';

// import Blog from "./components/blog";
import Banner from "./components/banner";

import Carousel from "./components/caro";
import Exper from "./components/exper";
import Cool from "./components/cool";
import Footer from "./components/footer";

export default function page() {
  return (
    <div className="p-4 overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <TextCursor />
      

      {/* <Testimonial /> */}
      {/* <Projects/> */}
      
      <Exper />
      {/* <Carousel /> */}
      {/* <Blog /> */}
      
      
      
      <Footer />
    </div>
  );
}
