'use client'
import {useEffect,useState, useRef} from 'react';
import { gsap } from "gsap";
    
import { Draggable } from "gsap/Draggable";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Draggable,Flip,ScrollTrigger);



export default function Hero() {

  

  const [time,setTime] = useState(" ");
  useEffect(() => {
    // update time
    const updateTime = () =>{
      setTime(new Date().toLocaleTimeString());
    }
    const interval = setInterval(updateTime,1000);
    return () => clearInterval(interval);
  },[])
   const contRef= useRef(null);

   useEffect ( () => {
     const currChild = contRef.current;

     gsap.from(
      currChild,{
        x:10,
      });
   },[]);
  
  return (
    <div className='h-screen w-full mt-20 md:mt-2 flex flex-col md:flex-row items-start md:items-center justify-center gap-8 md:p-4 '>
      <div className='hero flex flex-col md:flex-row items-center justify-center max-w-7xl gap-12 p-6 md:mx-5'>
        <div className='flex flex-col items-start justify-center gap-6 flex-1'>
          <h1 className='font-display text-left'>Agency-level quality with freelancer-level attention.</h1>
          <p className='text-left text-lg md:text-xl text-gray-600 dark:text-gray-400'>I Build High-Converting Websites & Custom Software for Growing Brands</p>
          <div className='flex gap-4'>
            <a href='https://wa.me/254703666366' className='btn-primary'>
              Let's Talk
            </a>
            <a href='/playground' className='btn-secondary'>
              See My Work
            </a>
          </div>
          
          <div className='mt-4'>
            <p className='text-left text-sm md:text-base text-gray-500 dark:text-gray-400'>Current Time: {time} (UTC +3 hrs)</p>
          </div>
        </div>
        
        <div ref={contRef} className='hero-image flex items-center justify-center max-w-full flex-1'>
          <img src='/images/hor.png' alt='Hero Image' className='max-w-96 h-auto drop-shadow-2xl' />
        </div>
      </div>
    </div>
  )
}
