import ServiceDetail from '../../components/ServiceDetail';

export default function SeoPage() {
  return (
    <ServiceDetail
      title='SEO optimization'
      intro='Climb the search rankings and get found. I implement strategic SEO practices to increase your visibility and drive organic traffic to your site.'
      features={[
        {
          title: 'Keyword strategy',
          description:
            'Targeting the right terms to bring high-intent traffic to your doorstep.',
        },
        {
          title: 'On-page SEO',
          description:
            'Optimizing content, meta tags, and structure for maximum readability and ranking.',
        },
        {
          title: 'Technical SEO',
          description:
            'Fixing crawl errors, speed issues, and mobile usability to please search engines.',
        },
        {
          title: 'Analytics and reporting',
          description:
            'Transparent data tracking to show you exactly how your growth is happening.',
        },
      ]}
      cta={{
        heading: 'Want to rank #1?',
        text: 'Start optimizing your presence today and watch your traffic grow.',
        label: 'Boost my ranking',
      }}
    />
  );
}