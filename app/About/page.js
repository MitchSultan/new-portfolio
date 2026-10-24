'use client';
import React from 'react';
import Navbar from '../components/navbar';
import BentoGrid from '../components/grid';
import Toolbox from '../components/toolbox';
import Exper from '../components/exper';
import Career from '../components/career';
import Footer from '../components/footer';
import Breadcrumbs from '../components/Breadcrumbs';


export default function About() {
  return (
    <>
<Navbar/>
<Breadcrumbs items={[{ name: 'About Mitch', href: '/About' }]} />
<section id="my-story">
  <BentoGrid/>
</section>
<section id="my-toolbox">
  <Toolbox/>
</section>
<section id="career">
  <Career/>
</section>
<section id="my-work">
  <Exper/>
</section>
<Footer/>


    </>
  )
}
