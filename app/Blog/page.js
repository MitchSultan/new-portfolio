"use client";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { supabase } from "../lib/supabase/server";
import { format } from "date-fns";
import { Search, Clock, ArrowRight } from '@/lib/lucide';
import { gsap } from "gsap";

export default function BlogPage() {
  const [featuredPost, setFeaturedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const POSTS_PER_PAGE = 6;
  
  const gridRef = useRef(null);

  // Fetch initial data (Categories and Featured Post)
  useEffect(() => {
    const fetchInitialData = async () => {
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

  // GSAP Animation for Post Cards
  useEffect(() => {
    if (!loading && posts.length > 0 && gridRef.current) {
      const cards = gridRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          clearProps: "all"
        }
      );
    }
  }, [posts, loading]);

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans flex flex-col selection:bg-[#00E5A0] selection:text-black">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-white">
            Insights & <span className="text-[#00E5A0]">Tutorials</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Thoughts, strategies, and code snippets for modern web development and digital growth.
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && page === 0 && selectedCategory === "All" && searchQuery === "" && (
          <div className="mb-20">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">Featured Article</h2>
            <a href={`/Blog/${featuredPost.slug}`} className="group block relative rounded-3xl overflow-hidden border border-gray-800 bg-gray-900/50 hover:border-[#00E5A0]/50 transition-all duration-500">
              <div className="flex flex-col md:flex-row h-full">
                <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                  {featuredPost.cover_image_url ? (
                    <img 
                      src={featuredPost.cover_image_url} 
                      alt={featuredPost.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />
                  )}
                </div>
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-[#00E5A0]/10 text-[#00E5A0] text-xs font-bold rounded-full">
                      {featuredPost.category || "Uncategorized"}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock size={14} /> {featuredPost.reading_time_minutes || 5} min read
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-[#00E5A0] transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-400 text-lg mb-8 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center text-[#00E5A0] font-semibold gap-2 mt-auto">
                    Read Article <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </a>
          </div>
        )}

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          {/* Categories */}
          <div className="flex overflow-x-auto pb-2 md:pb-0 w-full md:w-auto hide-scrollbar gap-2">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                selectedCategory === "All" 
                  ? "bg-[#00E5A0] text-black" 
                  : "bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white border border-gray-800"
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
                    ? "bg-[#00E5A0] text-black" 
                    : "bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white border border-gray-800"
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
              className="w-full bg-gray-900 border border-gray-800 text-white rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:border-[#00E5A0] transition-colors"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          </div>
        </div>

        {/* Posts Grid */}
        {loading && page === 0 ? (
          // Skeleton Loading
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-2xl border border-gray-800 bg-gray-900/30 overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-800/50 w-full"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-800/50 rounded w-1/4 mb-4"></div>
                  <div className="h-8 bg-gray-800/50 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-800/50 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-800/50 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <>
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <a href={`/Blog/${post.slug}`} key={post.id} className="group flex flex-col rounded-2xl border border-gray-800 bg-gray-900/30 overflow-hidden hover:border-[#00E5A0]/50 transition-all duration-300 hover:-translate-y-1">
                  <div className="h-48 relative overflow-hidden">
                    {post.cover_image_url ? (
                      <img 
                        src={post.cover_image_url} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/10">
                        {post.category || "Uncategorized"}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span>{post.published_at ? format(new Date(post.published_at), 'MMM d, yyyy') : 'Draft'}</span>
                      <span className="flex items-center gap-1"><Clock size={12}/> {post.reading_time_minutes || 5} min</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00E5A0] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-grow">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between border-t border-gray-800 pt-4">
                      <span className="text-sm font-semibold text-[#00E5A0]">Read More</span>
                      <span className="text-xs text-gray-600">{post.views_count || 0} views</span>
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
                  className="px-8 py-3 rounded-full border border-gray-700 bg-gray-900 text-white font-medium hover:border-[#00E5A0] hover:text-[#00E5A0] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingMore ? "Loading..." : "Load More Posts"}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24 border border-dashed border-gray-800 rounded-3xl bg-gray-900/20">
            <p className="text-xl text-gray-500">No posts found matching your criteria.</p>
            <button 
              onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
              className="mt-6 text-[#00E5A0] hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
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
