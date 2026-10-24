import ServiceDetail from '../../components/ServiceDetail';
import { pageMetadata } from '../../../lib/seo';

export const metadata = pageMetadata({
  title: 'Web Development in Nairobi, Kenya',
  description:
    'Custom, responsive web development for businesses in Kenya, with a focus on performance, maintainability and qualified leads.',
  path: '/Services/web-development',
});

export default function WebDevPage() {
  return (
    <ServiceDetail
      title='Web development'
      slug='web-development'
      intro='Robust, scalable, and high-performance websites built with the latest technologies. I write clean, maintainable code that powers your business growth.'
      features={[
        {
          title: 'Modern frontend',
          description:
            'Built with React, Next.js, and Tailwind CSS for lightning-fast performance.',
        },
        {
          title: 'Scalable backend',
          description:
            'Secure and robust server-side solutions using Node.js and Supabase.',
        },
        {
          title: 'Database design',
          description:
            "Efficient schema design and data management for your application's needs.",
        },
        {
          title: 'Performance',
          description:
            'Optimized for Core Web Vitals, ensuring your site loads in milliseconds.',
        },
      ]}
      toolsTitle='Tech stack'
      tools={['Next.js', 'React', 'Node.js', 'Supabase', 'Tailwind CSS', 'TypeScript']}
      cta={{
        heading: 'Need a powerful website?',
        text: "Let's build a solution that scales with your ambition.",
        label: 'Start building',
      }}
    />
  );
}