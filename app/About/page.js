'use client';
import React from 'react';
import Navbar from '../components/navbar';
import BentoGrid from '../components/grid';
import Footer from '../components/footer';

const words = 'About Me';
const letters = words.charAt(3).toUpperCase();
const Array = [1,2,3,4,5,6,7,8,9,10];
const newArray = Array.splice(0,5,);

console.log(newArray);


export default function About() {
  return (
    <>
<Navbar/>
<BentoGrid/>
<Footer/>


    </>
  )
}
