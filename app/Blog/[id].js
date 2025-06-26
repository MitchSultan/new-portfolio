import { getAllPostSlugs, getPostHtml } from '@/lib/blog';
import Head from 'next/head';

export default function Post({ post }: any) {
  return (
    <div className="p-6">
      <Head>
        <title>{post.metadata.title}</title>
      </Head>
      <article>
        <h1 className="text-3xl font-bold">{post.metadata.title}</h1>
        <p className="text-sm text-gray-500">{post.metadata.date}</p>
        <div
          className="mt-4 prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false, // or 'blocking' if you plan to add more posts later
  };
}

export async function getStaticProps({ params }: any) {
  const post = await getPostHtml(params.slug);
  return {
    props: { post },
  };
}
