import ServiceDetail from '../../components/ServiceDetail';
import { pageMetadata } from '../../../lib/seo';

export const metadata = pageMetadata({
  title: 'Digital Ads Management for Kenyan Businesses',
  description:
    'Plan and manage targeted Google and social media campaigns with conversion goals and transparent performance tracking.',
  path: '/Services/ads',
});

export default function AdsPage() {
  return (
    <ServiceDetail
      title='Ads management'
      slug='ads'
      intro='Targeted campaigns that convert. I manage your ad spend efficiently to ensure you get the best return on investment for your marketing budget.'
      features={[
        {
          title: 'Google Ads',
          description:
            'Capture intent at the exact moment customers are searching for you.',
        },
        {
          title: 'Social media ads',
          description:
            'Engaging campaigns on Facebook, Instagram, and LinkedIn to build brand awareness.',
        },
        {
          title: 'ROI focused',
          description:
            'Continuous optimization to lower CPC and increase conversion rates.',
        },
        {
          title: 'Ad creative',
          description:
            'Designing scroll-stopping visuals and copy that compels users to click.',
        },
      ]}
      cta={{
        heading: 'Ready to scale your leads?',
        text: "Stop wasting budget on broad targeting. Let's laser focus your ads.",
        label: 'Start advertising',
      }}
    />
  );
}