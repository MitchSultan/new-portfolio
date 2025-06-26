// pages/blog/index.js
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';

export default function Blog({ posts }) {
  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, slug')
    .order('published_at', { ascending: false });

  return { props: { posts } };
}
