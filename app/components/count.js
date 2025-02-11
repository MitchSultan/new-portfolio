'use client'

import React from 'react'
import { useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
 

export default function Count() {

   
    const [count,setCount] =useState(0);
const handleClick = () => {
    setCount(count + 1);
};

const handleClicke = () => {
    setCount(count - 1);
};

      
  return (
    <div onMouseEnter={() => {
        
        handleTextHover();
      }}>
        <h2>Better work</h2>
        <button
        onClick={handleClick}
        className=' w-10 h-10 bg-white text-black  rounded-sm shadow-sm'>
            +

        </button>
        <p>My number is : {count}</p>
        <button
        onClick={handleClicke}
        className=' w-10 h-10 bg-white text-black  rounded-sm shadow-sm'>
            -

        </button>
    </div>
  )
}
