import ServiceDetail from '../../components/ServiceDetail';
import { pageMetadata } from '../../../lib/seo';

export const metadata = pageMetadata({
  title: 'Website Design for Businesses in Kenya',
  description:
    'User-focused website design, responsive layouts, visual identity and prototypes for businesses that need a clear online presence.',
  path: '/Services/web-design',
});

export default function WebDesignPage() {
  return (
    <ServiceDetail
      title='Web design'
      slug='web-design'
      intro='I craft visually stunning, user-centric designs that captivate your audience. From initial concept to final polish, I ensure every pixel serves a purpose.'
      features={[
        {
          title: 'UI/UX design',
          description:
            'Intuitive and engaging user experiences that keep visitors on your site.',
        },
        {
          title: 'Responsive layouts',
          description:
            'Pixel-perfect designs that look amazing on mobile, tablet, and desktop.',
        },
        {
          title: 'Brand identity',
          description:
            'Cohesive visual systems including color palettes, typography, and logos.',
        },
        {
          title: 'Prototyping',
          description:
            'Interactive mockups to visualize the flow before development begins.',
        },
      ]}
      toolsTitle='Role and tools'
      tools={['Figma', 'Adobe XD', 'Photoshop', 'Illustrator']}
      cta={{
        heading: 'Ready to design your masterpiece?',
        text: "Let's accept the challenge and build something that stands out.",
        label: 'Start designing',
      }}
    />
  );
}