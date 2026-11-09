"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { supabase } from "../../lib/supabase/server";
import { format } from "date-fns";
import DOMPurify from "dompurify";
import { ArrowLeft, Clock, Eye, Share2, Twitter, Linkedin, MessageCircle } from '@/lib/lucide';
import Breadcrumbs from "../../components/Breadcrumbs";
import RelatedPosts from "../../components/RelatedPosts";
import { SITE_URL } from "../../../lib/seo";

function plainTextParagraphs(html) {
  return String(html || "")
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|h[1-6]|blockquote|pre)>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function BlogPostPage({ initialPost, initialRelatedPosts = [] }) {
  const params = useParams();
  const slug = params?.slug || initialPost?.slug;

  const [post, setPost] = useState(initialPost || null);
  const [relatedPosts, setRelatedPosts] = useState(initialRelatedPosts);
  const [loading, setLoading] = useState(!initialPost);
  const [progress, setProgress] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Scroll Progress
  useEffect(() => {
    const updateProgress = () => {
      const scrollPosition = window.scrollY;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress((scrollPosition / height) * 100);
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  // Fetch Post
  useEffect(() => {
    if (!slug) return;
    if (initialPost) {
      setPost(initialPost);
      setRelatedPosts(initialRelatedPosts);
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        const { data: postData, error: postError } = await supabase
          .from("posts")
          .select("*")
          .eq("slug", slug)
          .eq("status", "published")
          .single();

        if (postError) throw postError;

        setPost(postData);

        // Fetch Related Posts
        if (postData.category) {
          const { data: relatedData } = await supabase
            .from("posts")
            .select("id, title, slug, cover_image_url, reading_time_minutes, published_at")
            .eq("category", postData.category)
            .eq("status", "published")
            .neq("id", postData.id)
            .order("published_at", { ascending: false })
            .limit(3);
          
          if (relatedData) setRelatedPosts(relatedData);
        }

      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, initialPost, initialRelatedPosts]);

  useEffect(() => {
    if (!post?.id) return;
    const viewedKey = `viewed_${post.id}`;
    if (localStorage.getItem(viewedKey)) return;

    const recordView = async () => {
      try {
        const { error } = await supabase.from("post_views").insert([
          { post_id: post.id, user_agent: navigator.userAgent },
        ]);
        if (error) {
          console.error("Error recording blog view:", error);
          return;
        }
        localStorage.setItem(viewedKey, "true");
      } catch (error) {
        console.error("Error recording blog view:", error);
      }
    };
    recordView();
  }, [post?.id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-900"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white text-neutral-900">
        <h1 className="text-4xl font-bold mb-4">Post not found</h1>
        <a href="/Blog" className="flex items-center gap-2 underline underline-offset-4 hover:text-neutral-600">
          <ArrowLeft size={16} /> Back to Blog
        </a>
      </div>
    );
  }

  const shareUrl = `${SITE_URL}/Blog/${post.slug}`;
  const encodedTitle = encodeURIComponent(post.title);

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-neutral-900 selection:bg-orange-200 selection:text-neutral-900">
      {/* Reading Progress Bar */}
      <div className="fixed left-0 top-0 z-50 h-1 bg-blaze-orange transition-all duration-150 ease-out" style={{ width: `${progress}%` }}></div>
      
      <Navbar />
      <Breadcrumbs
        items={[
          { name: "Blog", href: "/Blog" },
          { name: post.title, href: `/Blog/${post.slug}` },
        ]}
      />
      
      <main className="w-full flex-grow pb-20 pt-10">
        {/* Back Link */}
        <div className="mx-auto mb-8 w-full max-w-[1440px] px-4 md:px-8">
          <a href="/Blog" className="inline-flex items-center gap-2 font-medium text-neutral-600 transition-colors hover:text-neutral-900">
            <ArrowLeft size={18} /> Back to Blog
          </a>
        </div>

        {/* Hero Section */}
        <div className="mx-auto mb-12 w-full max-w-[1440px] px-4 md:px-8">
          <div className="mb-6 flex flex-wrap items-center gap-3 border-t border-neutral-900 pt-6">
            <span className="bg-blaze-orange/10 px-3 py-1 text-xs font-semibold text-neutral-900">
              {post.category || "Uncategorized"}
            </span>
            <span className="flex items-center gap-1 text-sm text-neutral-500">
              {post.published_at ? format(new Date(post.published_at), 'MMMM d, yyyy') : 'Draft'}
            </span>
            <span className="text-sm text-neutral-500">By Mitch Sultan</span>
            <span className="flex items-center gap-1 text-sm text-neutral-500 before:mr-3 before:content-['•']">
              <Clock size={14} /> {post.reading_time_minutes || 5} min read
            </span>
            <span className="flex items-center gap-1 text-sm text-neutral-500 before:mr-3 before:content-['•']">
              <Eye size={14} /> {post.views_count || 0} views
            </span>
          </div>

          <h1 className="mb-8 max-w-5xl text-4xl font-semibold leading-[1.02] tracking-tighter text-neutral-900 md:text-6xl lg:text-7xl">
            {post.title}
          </h1>

          {/* Cover Image */}
          <div className="relative mb-12 h-[35vh] w-full overflow-hidden border-y border-neutral-300 md:h-[58vh]">
            {post.cover_image_url ? (
              <img 
                src={post.cover_image_url} 
                alt={post.title} 
                width="1200"
                height="800"
                fetchPriority="high"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 h-full w-full bg-neutral-100" />
            )}
          </div>

          {/* Content & Sidebar Layout */}
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            
            {/* Main Content */}
            <article className="max-w-[72ch] flex-1 text-neutral-800 prose prose-neutral prose-lg
              prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-neutral-900
              prose-a:text-neutral-900 prose-a:underline prose-a:decoration-blaze-orange prose-a:underline-offset-4 hover:prose-a:text-neutral-600
              prose-strong:text-neutral-900 prose-blockquote:border-neutral-900 prose-blockquote:text-neutral-600
              prose-img:border prose-img:border-neutral-200"
            >
              {hydrated ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.content || ""),
                  }}
                />
              ) : (
                plainTextParagraphs(post.content).map((paragraph, index) => (
                  <p key={`${post.id}-paragraph-${index}`}>{paragraph}</p>
                ))
              )}
            </article>

            {/* Sticky Sidebar */}
            <aside className="lg:w-64 lg:shrink-0">
              <div className="sticky top-32 space-y-8">
                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div>
                    <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-neutral-500">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="border border-neutral-300 px-3 py-1 text-xs text-neutral-600">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Social Share */}
                <div>
                  <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500">
                    <Share2 size={14} /> Share Article
                  </h3>
                  <div className="flex gap-3">
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${shareUrl}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center border border-neutral-300 text-neutral-600 transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
                    >
                      <Twitter size={18} />
                    </a>
                    <a 
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${encodedTitle}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center border border-neutral-300 text-neutral-600 transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
                    >
                      <Linkedin size={18} />
                    </a>
                    <a 
                      href={`https://wa.me/?text=${encodedTitle} - ${shareUrl}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center border border-neutral-300 text-neutral-600 transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
                    >
                      <MessageCircle size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

      </main>

      <RelatedPosts posts={relatedPosts} category={post.category} />
      <Footer />
    </div>
  );
}

export default BlogPostPage;
