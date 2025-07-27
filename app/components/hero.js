'use client'
import {useEffect, useRef} from 'react';
import { gsap } from "gsap";
    
import { Draggable } from "gsap/Draggable";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Draggable,Flip,ScrollTrigger);



export default function Hero() {

   const contRef= useRef(null);

   useEffect ( () => {
     const currChild = contRef.current;

     gsap.from(
      currChild,{
        x:10,
      });
   },[]);
  
  return (
    <div className='h-screen w-full flex  items-center justify-center gap-2 p-4 '>
      <div className='hero flex flex-col md:flex-row items-center justify-center float-start bg-light max-w-full min-h-96 p-2  md:mx-5'>
        <div>
        <h1 className=' text-left text-5xl text-black font-extrabold capitalize'>Agency-level quality with freelancer-level attention.</h1>
        <p>I Build High-Converting Websites & Custom Software for Growing Brands</p>
        <div className=' flex gap-2'>
        <button className='btn w-32 h-12 rounded-sm bg-lavender outline outline-1 outline-white text-black'><a href='https://wa.me/254703666366'>Lets Talk </a></button>
        <button className='btn w-32 h-12 rounded-sm bg-white outline outline-1 outline-lavender text-black'><a href='/playground'>See My Work</a></button>
        </div>
        </div>
        <div ref={contRef}  className='hero-image hidden md:flex  max-w-96'>
        <img src='/images/hero1.png' alt='Hero Image' className='  max-w-full h-auto ' />
        </div>
      </div>
      
      
    </div>
  )
}
