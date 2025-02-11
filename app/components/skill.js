import React from 'react';
import { useRef } from 'react';
import gsap from 'gsap';


export default function Skill() {

   
  return (
    <div className='flex flex-col justify-between w-full h-full gap-3 p-4'>
         <h2 className="text-2xl font-bold">Skills</h2>
         <strong className='text-6xl'>657+</strong>
         <p></p>
         <button className=' w-40 h-12 bg-white shadow-sm rounded-sm text-black' >Press Me</button>
    </div>
  )
}
