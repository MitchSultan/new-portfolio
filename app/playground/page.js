import React from 'react';
import Navbar from "../components/navbar";
import Work from '../components/work';
import Footer from '../components/footer';
import Breadcrumbs from '../components/Breadcrumbs';
import { getPortfolioProjects } from '../../lib/seo-data';
import JsonLd from '../components/JsonLd';
import { SITE_URL } from '../../lib/seo';

export default async function PlaygroundPage() {
  const initialProjects = await getPortfolioProjects();
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${SITE_URL}/playground#webpage`,
          url: `${SITE_URL}/playground`,
          name: 'Selected Website Projects',
          isPartOf: { '@id': `${SITE_URL}/#website` },
          inLanguage: 'en',
        }}
      />
      <Navbar />
      <Breadcrumbs items={[{ name: 'Projects', href: '/playground' }]} />
      <Work initialProjects={initialProjects} />
      <Footer />
    </>
  );
}
