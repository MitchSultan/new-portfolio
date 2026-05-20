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
    <div className='relative h-screen max-w-full mt-20 md:mt-2 flex flex-col md:flex-row items-start md:items-center justify-center gap-8 md:p-4 overflow-hidden'>
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] [background-size:20px_30px] [-webkit-mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)]'
      />
      <div className='hero relative z-10 flex flex-col md:flex-row items-start md:items-center justify-center max-w-full gap-12 p-6 md:mx-5'>
        <div className='flex flex-col items-center justify-center mt-32 gap-6 '>
          <h1 className='font-display text-center text-4xl md:text-5xl lg:text-6xl'>Agency-level quality with freelancer-level attention.</h1>
          <p className='text-center text-lg md:text-xl  '>I Build High-Converting Websites & Custom Software for Growing Brands</p>
          <div className='flex gap-4'>
            <a href='https://wa.me/254703666366' className='btn-primary'>
              Let's Talk
            </a>
            <a href='/playground' className='btn-secondary'>
              See My Work
            </a>
          </div>
          
          <div className='mt-4'>
            <p className='text-left text-sm md:text-base text-gray-500'>Nairobi Time: {time} (UTC +3 hrs)</p>
          </div>
        </div>
        
        
      </div>
    </div>
  )
}
