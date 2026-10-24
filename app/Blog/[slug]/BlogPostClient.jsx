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
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-800 border-t-[#00E5A0] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">Post not found</h1>
        <a href="/Blog" className="text-[#00E5A0] hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Blog
        </a>
      </div>
    );
  }

  const shareUrl = `${SITE_URL}/Blog/${post.slug}`;
  const encodedTitle = encodeURIComponent(post.title);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans flex flex-col selection:bg-[#00E5A0] selection:text-black">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-[#00E5A0] z-50 transition-all duration-150 ease-out" style={{ width: `${progress}%` }}></div>
      
      <Navbar />
      <Breadcrumbs
        items={[
          { name: "Blog", href: "/Blog" },
          { name: post.title, href: `/Blog/${post.slug}` },
        ]}
      />
      
      <main className="flex-grow pt-24 pb-20 w-full">
        {/* Back Link */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mb-6">
          <a href="/Blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00E5A0] transition-colors font-medium">
            <ArrowLeft size={18} /> Back to Blog
          </a>
        </div>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="px-3 py-1 bg-[#00E5A0]/10 text-[#00E5A0] text-xs font-bold rounded-full border border-[#00E5A0]/20">
              {post.category || "Uncategorized"}
            </span>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              {post.published_at ? format(new Date(post.published_at), 'MMMM d, yyyy') : 'Draft'}
            </span>
            <span className="text-sm text-gray-500">By Mitch Sultan</span>
            <span className="text-sm text-gray-500 flex items-center gap-1 before:content-['•'] before:mr-3">
              <Clock size={14} /> {post.reading_time_minutes || 5} min read
            </span>
            <span className="text-sm text-gray-500 flex items-center gap-1 before:content-['•'] before:mr-3">
              <Eye size={14} /> {post.views_count || 0} views
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-8">
            {post.title}
          </h1>

          {/* Cover Image */}
          <div className="w-full h-[40vh] md:h-[60vh] rounded-3xl overflow-hidden relative border border-gray-800 shadow-2xl mb-12">
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
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80"></div>
          </div>

          {/* Content & Sidebar Layout */}
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Main Content */}
            <article className="lg:w-3/4 prose prose-invert prose-emerald max-w-none prose-lg
              prose-headings:font-bold prose-headings:tracking-tight 
              prose-a:text-[#00E5A0] prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-2xl prose-img:border prose-img:border-gray-800"
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
            <aside className="lg:w-1/4">
              <div className="sticky top-32 space-y-8">
                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-gray-900 text-gray-300 text-xs rounded-full border border-gray-800">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Social Share */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                    <Share2 size={14} /> Share Article
                  </h3>
                  <div className="flex gap-3">
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${shareUrl}`}
                      target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#1DA1F2] transition-colors border border-gray-800 hover:border-[#1DA1F2]"
                    >
                      <Twitter size={18} />
                    </a>
                    <a 
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${encodedTitle}`}
                      target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#0A66C2] transition-colors border border-gray-800 hover:border-[#0A66C2]"
                    >
                      <Linkedin size={18} />
                    </a>
                    <a 
                      href={`https://wa.me/?text=${encodedTitle} - ${shareUrl}`}
                      target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#25D366] transition-colors border border-gray-800 hover:border-[#25D366]"
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
