import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";
import {
  getPublishedPostBySlug,
  getRelatedPublishedPosts,
} from "../../../lib/seo-data";

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = await getRelatedPublishedPosts(post.category, post.id);
  return <BlogPostClient initialPost={post} initialRelatedPosts={relatedPosts} />;
}
