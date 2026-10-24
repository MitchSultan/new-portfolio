import BlogClient from "./BlogClient";
import {
  getBlogCategories,
  getFeaturedBlogPost,
  getPublishedBlogListing,
} from "../../lib/seo-data";

export default async function BlogPage() {
  const [initialPosts, initialFeaturedPost, initialCategories] = await Promise.all([
    getPublishedBlogListing(),
    getFeaturedBlogPost(),
    getBlogCategories(),
  ]);

  return (
    <BlogClient
      initialPosts={initialPosts}
      initialFeaturedPost={initialFeaturedPost}
      initialCategories={initialCategories}
    />
  );
}
