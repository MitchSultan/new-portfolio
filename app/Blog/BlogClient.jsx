"use client";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { supabase } from "../lib/supabase/server";
import { format } from "date-fns";
import { Search, Clock, ArrowRight } from '@/lib/lucide';
import Breadcrumbs from "../components/Breadcrumbs";

export default function BlogPage({
  initialFeaturedPost = null,
  initialPosts = [],
  initialCategories = [],
}) {
  const [featuredPost, setFeaturedPost] = useState(initialFeaturedPost);
  const [posts, setPosts] = useState(initialPosts);
  const [categories, setCategories] = useState(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(initialPosts.length === 0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const POSTS_PER_PAGE = 6;
  
  const skipFirstPostsFetch = useRef(initialPosts.length > 0);

  // Fetch initial data (Categories and Featured Post)
  useEffect(() => {
    const fetchInitialData = async () => {
      if (initialPosts.length > 0) return;

      try {
        const [catsResponse, featuredResponse] = await Promise.all([
          supabase.from("categories").select("*").order("name"),
          supabase
            .from("posts")
            .select("id, title, slug, excerpt, cover_image_url, category, tags, reading_time_minutes, published_at, views_count")
            .eq("status", "published")
            .eq("featured", true)
            .order("published_at", { ascending: false })
            .limit(1)
        ]);

        if (catsResponse.data) setCategories(catsResponse.data);
        if (featuredResponse.data && featuredResponse.data.length > 0) {
          setFeaturedPost(featuredResponse.data[0]);
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    fetchInitialData();
  }, []);

  // Fetch Posts when filters or page changes
  useEffect(() => {
    const fetchPosts = async () => {
      if (
        skipFirstPostsFetch.current &&
        page === 0 &&
        selectedCategory === "All" &&
        searchQuery === ""
      ) {
        skipFirstPostsFetch.current = false;
        return;
      }

      if (page === 0) setLoading(true);
      else setLoadingMore(true);

      try {
        let query = supabase
          .from("posts")
          .select("id, title, slug, excerpt, cover_image_url, category, tags, reading_time_minutes, published_at, views_count")
          .eq("status", "published")
          .order("published_at", { ascending: false });

        if (selectedCategory !== "All") {
          query = query.eq("category", selectedCategory);
        }

        if (searchQuery.trim() !== "") {
          query = query.ilike("title", `%${searchQuery}%`);
        }

        const from = page * POSTS_PER_PAGE;
        const to = from + POSTS_PER_PAGE - 1;
        query = query.range(from, to);

        const { data, error } = await query;

        if (error) throw error;

        if (data) {
          if (page === 0) {
            setPosts(data);
          } else {
            setPosts((prev) => [...prev, ...data]);
          }
          setHasMore(data.length === POSTS_PER_PAGE);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    // Debounce search query
    const delayDebounceFn = setTimeout(() => {
      fetchPosts();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [selectedCategory, searchQuery, page]);

  // Handle filter changes (reset pagination)
  useEffect(() => {
    setPage(0);
  }, [selectedCategory, searchQuery]);

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-neutral-900 selection:bg-orange-200 selection:text-neutral-900">
      <Navbar />
      <Breadcrumbs items={[{ name: "Blog", href: "/Blog" }]} />
      
      <main className="mx-auto w-full max-w-[1440px] flex-grow px-4 pb-24 pt-12 md:px-8 md:pt-16">
        {/* Header */}
        <div className="mb-16 grid border-t border-neutral-900 pt-8 md:grid-cols-12 md:pt-10">
          <p className="mb-4 text-sm text-neutral-500 md:col-span-3 md:mb-0">Ideas and resources</p>
          <div className="md:col-span-9 md:border-l md:border-neutral-300 md:pl-8">
            <h1 className="mb-5 text-4xl font-semibold leading-[0.98] tracking-tighter text-neutral-900 md:text-6xl lg:text-7xl">
              Insights & <span className="text-blaze-orange">Tutorials</span>
            </h1>
            <p className="max-w-2xl text-lg leading-snug text-neutral-600 md:text-xl">
              Thoughts, strategies, and code snippets for modern web development and digital growth.
            </p>
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && page === 0 && selectedCategory === "All" && searchQuery === "" && (
          <div className="mb-20">
            <h2 className="mb-6 border-b border-neutral-300 pb-4 text-sm font-medium uppercase tracking-widest text-neutral-500">Featured article</h2>
            <a href={`/Blog/${featuredPost.slug}`} className="group block overflow-hidden border-y border-neutral-900 transition-colors hover:border-neutral-500">
              <div className="flex flex-col md:flex-row h-full">
                <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                  {featuredPost.cover_image_url ? (
                    <img 
                      src={featuredPost.cover_image_url} 
                      alt={featuredPost.title} 
                      width="1200"
                      height="800"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 w-full h-full bg-neutral-100" />
                  )}
                </div>
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-blaze-orange/10 text-neutral-900 text-xs font-semibold px-3 py-1">
                      {featuredPost.category || "Uncategorized"}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-neutral-500">
                      <Clock size={14} /> {featuredPost.reading_time_minutes || 5} min read
                    </span>
                  </div>
                  <h3 className="mb-4 text-3xl font-semibold leading-tight tracking-tight text-neutral-900 transition-colors group-hover:text-neutral-600 md:text-4xl">
                    {featuredPost.title}
                  </h3>
                  <p className="mb-8 line-clamp-3 text-lg leading-relaxed text-neutral-600">
                    {featuredPost.excerpt}
                  </p>
                  <div className="mt-auto flex items-center gap-2 font-semibold text-neutral-900">
                    Read {featuredPost.title} <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </a>
          </div>
        )}

        {/* Filters and Search */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 border-y border-neutral-900 py-6 md:flex-row md:items-center">
          {/* Categories */}
          <div className="flex overflow-x-auto pb-2 md:pb-0 w-full md:w-auto hide-scrollbar gap-2">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                selectedCategory === "All"
                  ? "bg-neutral-900 text-white"
                  : "border border-neutral-300 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900"
              }`}
            >
              All Posts
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                  selectedCategory === cat.name
                    ? "bg-neutral-900 text-white"
                    : "border border-neutral-300 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-neutral-300 bg-white py-2.5 pl-10 pr-4 text-neutral-900 transition-colors placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
          </div>
        </div>

        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-neutral-900">
          {searchQuery.trim() || selectedCategory !== "All"
            ? "Matching articles"
            : "Latest articles"}
        </h2>

        {/* Posts Grid */}
        {loading && page === 0 ? (
          // Skeleton Loading
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="overflow-hidden border-y border-neutral-300">
                <div className="h-48 w-full animate-pulse bg-neutral-100"></div>
                <div className="p-6">
                  <div className="mb-4 h-4 w-1/4 animate-pulse bg-neutral-100"></div>
                  <div className="mb-4 h-8 w-3/4 animate-pulse bg-neutral-100"></div>
                  <div className="mb-2 h-4 w-full animate-pulse bg-neutral-100"></div>
                  <div className="h-4 w-2/3 animate-pulse bg-neutral-100"></div>
                </div>
              </div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <a href={`/Blog/${post.slug}`} key={post.id} className="group flex flex-col overflow-hidden border-y border-neutral-300 transition-colors duration-300 hover:border-neutral-900">
                  <div className="h-48 relative overflow-hidden">
                    {post.cover_image_url ? (
                      <img 
                        src={post.cover_image_url} 
                        alt={post.title} 
                        width="640"
                        height="400"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-neutral-100" />
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="border border-white/80 bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-900 backdrop-blur-md">
                        {post.category || "Uncategorized"}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-3 flex items-center justify-between text-xs text-neutral-500">
                      <span>{post.published_at ? format(new Date(post.published_at), 'MMM d, yyyy') : 'Draft'}</span>
                      <span className="flex items-center gap-1"><Clock size={12}/> {post.reading_time_minutes || 5} min</span>
                    </div>
                    <h3 className="mb-3 line-clamp-2 text-xl font-semibold leading-tight text-neutral-900 transition-colors group-hover:text-neutral-600">
                      {post.title}
                    </h3>
                    <p className="mb-6 line-clamp-3 flex-grow text-sm leading-relaxed text-neutral-600">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between border-t border-neutral-300 pt-4">
                      <span className="text-sm font-semibold text-neutral-900">Read article</span>
                      <span className="text-xs text-neutral-500">{post.views_count || 0} views</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            
            {/* Load More */}
            {hasMore && (
              <div className="mt-16 text-center">
                <button
                  onClick={loadMore} 
                  disabled={loadingMore}
                  className="border border-neutral-900 px-8 py-3 font-medium text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loadingMore ? "Loading..." : "Load More Posts"}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="border-y border-dashed border-neutral-300 py-24 text-center">
            <p className="text-xl text-neutral-500">No posts found matching your criteria.</p>
            <button 
              onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
              className="mt-6 underline underline-offset-4 hover:text-neutral-600"
            >
              Clear filters
            </button>
          </div>
        )}
        <section className="mt-20 grid border-t border-neutral-900 pt-8 md:grid-cols-12" aria-labelledby="blog-services-heading">
          <p className="mb-4 text-sm text-neutral-500 md:col-span-3 md:mb-0">Next steps</p>
          <div className="md:col-span-9 md:border-l md:border-neutral-300 md:pl-8">
            <h2 id="blog-services-heading" className="text-2xl font-semibold tracking-tight text-neutral-900">
              Need help with your website?
            </h2>
            <p className="mt-3 max-w-2xl text-neutral-600">
              Explore practical support for building and improving a business website.
            </p>
            <div className="mt-5 flex flex-wrap gap-5">
              <a className="underline underline-offset-4 hover:text-neutral-600" href="/Services/web-development">
                Web development services
              </a>
              <a className="underline underline-offset-4 hover:text-neutral-600" href="/Services/seo">
                SEO services
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
