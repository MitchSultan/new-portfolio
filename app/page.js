"use client";
import React from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Skill from "./components/skill";
import Count from "./components/count";
import Carousel from "./components/caro";
import Exper from "./components/exper";
import Footer from "./components/footer";

export default function page() {
  return (
    <div className=" bg-dark text-light relative">
      <div className="absolute top-0 left-0  -z-20">
        <div className=" w-40 h-40 blur-lg bg-orange-700"> </div>
        <div className=" w-40 h-40 blur-lg bg-orange-700"> </div>
        <div className=" w-40 h-40 blur-lg bg-orange-700"> </div>
       
      </div>
      <Navbar />

      <div className="grid p-4 sm:grid-cols-2 lg:grid-cols-3 grid-rows-4 gap-3">
        <div className="flex items-center relative justify-center min-w-52 min-h-96   lg:col-span-2 rounded-md">
          {/* <div className="absolute top-0  h-full w-full  transform bg-dark bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
            
          </div> */}
          <Hero />
        </div>
        <div className=" min-w-52 min-h-96 bg-blue  lg:row-span-2 rounded-md hover:border-2 hover:border-solid hover:border-white">
          <Exper/>
        </div>
        <div className=" min-w-52 min-h-96 bg-white  sm:col-span-1 rounded-md">
          <Count />
        </div>
        <div className=" min-w-52 min-h-96 bg-white  sm:col-span-1 rounded-md">
          <Carousel />
        </div>
        <div className=" min-w-52 min-h-96 bg-green relative  rounded-md">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]" />
          </div>
        </div>
        <div className=" min-w-52 min-h-96  relative  lg:col-span-2 rounded-md">
          <Skill />
        </div>
      </div>
      <Footer />
    </div>
  );
}
