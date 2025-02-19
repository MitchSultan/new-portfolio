"use client";
import React from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import About from "./components/skill";
// import Testimonial from "./components/count";
import Carousel from "./components/caro";
import Exper from "./components/exper";
import Footer from "./components/footer";

export default function page() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      {/* <Testimonial /> */}
      <Carousel />
      <Exper />
      <Footer />
    </>
  );
}
