import ServiceDetail from '../../components/ServiceDetail';

export default function ContentCreationPage() {
  return (
    <ServiceDetail
      title='Content creation'
      intro="Compelling narratives that tell your brand's story. From website copy to social media posts, I create content that engages, inspires, and converts."
      features={[
        {
          title: 'Copywriting',
          description:
            'Persuasive website copy, landing pages, and email sequences that drive action.',
        },
        {
          title: 'Social media content',
          description:
            'Engagement-focused posts, threads, and captions for Twitter, LinkedIn, and Instagram.',
        },
        {
          title: 'Blog writing',
          description:
            'SEO-rich articles that establish your authority and educate your customer base.',
        },
        {
          title: 'Creative strategy',
          description:
            'Developing a consistent voice and content calendar for your brand.',
        },
      ]}
      cta={{
        heading: 'Need words that work?',
        text: "Your story deserves to be heard. Let's write it together.",
        label: 'Start creating',
      }}
    />
  );
}