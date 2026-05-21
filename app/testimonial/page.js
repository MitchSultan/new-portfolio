import React from 'react';
import Navbar from '../components/navbar';
import Testimonials from '../components/Testimonials';
import Exper from '../components/exper';
import Footer from '../components/footer';

export default function page() {
  return (
    <>
      <Navbar />
      <Testimonials />
        <Exper />
        <Footer />

    </>
  )
}
