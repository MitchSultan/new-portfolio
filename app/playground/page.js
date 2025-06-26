'use client';
import React from 'react';

import Navbar from "../components/navbar";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Work from '../components/work';
import Footer from '../components/footer';

export default function page() {
  return (

    <>
    <Navbar/>
    <Work />
    <Footer />

    </>
  )
}
