"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase/server";
import { format } from "date-fns";
import { 
  FileText, LayoutGrid, Image as ImageIcon, Plus, 
  Search, Edit, Eye, Trash2, Star, CheckCircle, 
  XCircle, Copy, AlertCircle 
} from "lucide-react";

export default function AdminBlogDashboard() {
  const [activeTab, setActiveTab] = useState("posts"); // 'posts', 'categories', 'images'

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Blog Administration</h1>
          <div className="flex gap-4">
            <a href="/Blog" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white flex items-center gap-2">
              <Eye size={16} /> View Live Blog
            </a>
            <a href="/admin/Blogs/editor" className="bg-[#00E5A0] text-black px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-[#00c286] transition-colors">
              <Plus size={16} /> New Post
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
          <button 
            onClick={() => setActiveTab("posts")}
            className={`flex items-center gap-2 py-4 px-6 border-b-2 font-medium text-sm transition-colors ${activeTab === "posts" ? "border-[#00E5A0] text-[#00E5A0]" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
          >
            <FileText size={18} /> Posts
          </button>
          <button 
            onClick={() => setActiveTab("categories")}
            className={`flex items-center gap-2 py-4 px-6 border-b-2 font-medium text-sm transition-colors ${activeTab === "categories" ? "border-[#00E5A0] text-[#00E5A0]" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
          >
            <LayoutGrid size={18} /> Categories
          </button>
          <button 
            onClick={() => setActiveTab("images")}
            className={`flex items-center gap-2 py-4 px-6 border-b-2 font-medium text-sm transition-colors ${activeTab === "images" ? "border-[#00E5A0] text-[#00E5A0]" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
          >
            <ImageIcon size={18} /> Image Library
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "posts" && <PostsManager />}
        {activeTab === "categories" && <CategoriesManager />}
        {activeTab === "images" && <ImagesManager />}

      </main>
    </div>
  );
}

// ==========================================
// POSTS MANAGER COMPONENT
// ==========================================
function PostsManager() {
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0, views: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // 'all', 'published', 'draft', 'archived'
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const POSTS_PER_PAGE = 10;

  const fetchPosts = async () => {
    setLoading(true);
    try {
      // 1. Fetch Stats
      const { data: allPosts } = await supabase.from("posts").select("status, views_count");
      if (allPosts) {
        const published = allPosts.filter(p => p.status === "published").length;
        const drafts = allPosts.filter(p => p.status === "draft").length;
        const views = allPosts.reduce((sum, p) => sum + (p.views_count || 0), 0);
        setStats({ total: allPosts.length, published, drafts, views });
      }

      // 2. Fetch Paginated Posts
      let query = supabase
        .from("posts")
        .select("*", { count: 'exact' })
        .order("created_at", { ascending: false });

      if (filter !== "all") query = query.eq("status", filter);
      if (search) query = query.ilike("title", `%${search}%`);

      const from = page * POSTS_PER_PAGE;
      const to = from + POSTS_PER_PAGE - 1;
      query = query.range(from, to);

      const { data, count, error } = await query;
      if (error) throw error;
      
      setPosts(data || []);
      if (count !== null) setTotalCount(count);

    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [filter, search, page]);

  // Reset page when filters change
  useEffect(() => {
    setPage(0);
  }, [filter, search]);

  const toggleFeatured = async (id, currentFeatured) => {
    try {
      const { error } = await supabase.from("posts").update({ featured: !currentFeatured }).eq("id", id);
      if (error) throw error;
      setPosts(posts.map(p => p.id === id ? { ...p, featured: !currentFeatured } : p));
    } catch (error) {
      alert("Error updating featured status");
    }
  };

  const deletePost = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This will archive it.`)) {
      try {
        const { error } = await supabase.from("posts").update({ status: 'archived' }).eq("id", id);
        if (error) throw error;
        fetchPosts();
      } catch (error) {
        alert("Error deleting post");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Posts", value: stats.total },
          { label: "Published", value: stats.published },
          { label: "Drafts", value: stats.drafts },
          { label: "Total Views", value: stats.views }
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          {["all", "published", "draft", "archived"].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${filter === f ? "bg-white dark:bg-gray-700 shadow" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"}`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search posts..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00E5A0]"
          />
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 text-xs uppercase tracking-wider text-gray-500">
                <th className="p-4 font-semibold">Post</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Views</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">Loading posts...</td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">No posts found.</td>
                </tr>
              ) : (
                posts.map(post => (
                  <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                          {post.cover_image_url ? (
                            <img src={post.cover_image_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-6 h-6 m-3 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white line-clamp-1">{post.title}</p>
                          <p className="text-xs text-gray-500 mt-1">/{post.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-500">{post.category || 'None'}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        post.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        post.status === 'archived' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-500">{post.views_count || 0}</td>
                    <td className="p-4 text-sm text-gray-500">
                      {post.published_at ? format(new Date(post.published_at), 'MMM d, yyyy') : '-'}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => toggleFeatured(post.id, post.featured)}
                          title="Toggle Featured"
                          className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${post.featured ? 'text-yellow-500' : 'text-gray-400'}`}
                        >
                          <Star size={18} fill={post.featured ? "currentColor" : "none"} />
                        </button>
                        <a 
                          href={`/admin/Blogs/editor?id=${post.id}`}
                          title="Edit"
                          className="p-2 rounded text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                        >
                          <Edit size={18} />
                        </a>
                        <a 
                          href={`/Blog/${post.slug}`} 
                          target="_blank" rel="noopener noreferrer"
                          title="Preview"
                          className="p-2 rounded text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Eye size={18} />
                        </a>
                        <button 
                          onClick={() => deletePost(post.id, post.title)}
                          title="Archive"
                          className="p-2 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-sm text-gray-500">
          <div>
            Showing {Math.min(page * POSTS_PER_PAGE + 1, totalCount)} to {Math.min((page + 1) * POSTS_PER_PAGE, totalCount)} of {totalCount} entries
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-3 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
            >
              Previous
            </button>
            <button 
              onClick={() => setPage(p => p + 1)}
              disabled={(page + 1) * POSTS_PER_PAGE >= totalCount}
              className="px-3 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// CATEGORIES MANAGER COMPONENT
// ==========================================
function CategoriesManager() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCat, setNewCat] = useState({ name: "", slug: "", description: "", color: "#00E5A0" });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("categories").select("*").order("name");
      if (error) throw error;
      
      // Fetch post counts per category
      const { data: posts } = await supabase.from("posts").select("category");
      const catCounts = {};
      if (posts) {
        posts.forEach(p => {
          if (p.category) catCounts[p.category] = (catCounts[p.category] || 0) + 1;
        });
      }

      setCategories((data || []).map(c => ({ ...c, postCount: catCounts[c.name] || 0 })));
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("categories").insert([newCat]);
      if (error) throw error;
      setNewCat({ name: "", slug: "", description: "", color: "#00E5A0" });
      fetchCategories();
    } catch (error) {
      alert("Error adding category: " + error.message);
    }
  };

  const handleDelete = async (id, name, count) => {
    if (count > 0) {
      alert(`Cannot delete category "${name}" because it is used by ${count} post(s). Reassign them first.`);
      return;
    }
    if (window.confirm(`Delete category "${name}"?`)) {
      try {
        const { error } = await supabase.from("categories").delete().eq("id", id);
        if (error) throw error;
        fetchCategories();
      } catch (error) {
        alert("Error deleting category");
      }
    }
  };

  // Auto-generate slug
  useEffect(() => {
    if (newCat.name && !newCat.slug) {
      setNewCat(prev => ({ ...prev, slug: prev.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') }));
    }
  }, [newCat.name]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 text-xs uppercase tracking-wider text-gray-500">
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Slug</th>
                <th className="p-4 font-semibold">Posts</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr><td colSpan="4" className="p-8 text-center text-gray-500">Loading...</td></tr>
              ) : categories.length === 0 ? (
                <tr><td colSpan="4" className="p-8 text-center text-gray-500">No categories found.</td></tr>
              ) : (
                categories.map(cat => (
                  <tr key={cat.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: cat.color }}></div>
                        <span className="font-medium">{cat.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-500">{cat.slug}</td>
                    <td className="p-4 text-sm text-gray-500">{cat.postCount}</td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleDelete(cat.id, cat.name, cat.postCount)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Add Category</h3>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
              <input 
                required type="text" value={newCat.name} onChange={e => setNewCat({...newCat, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slug</label>
              <input 
                required type="text" value={newCat.slug} onChange={e => setNewCat({...newCat, slug: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Color</label>
              <input 
                type="color" value={newCat.color} onChange={e => setNewCat({...newCat, color: e.target.value})}
                className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description (Optional)</label>
              <textarea 
                value={newCat.description} onChange={e => setNewCat({...newCat, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent"
                rows="3"
              />
            </div>
            <button type="submit" className="w-full bg-[#00E5A0] text-black font-bold py-2 px-4 rounded-md hover:bg-[#00c286] transition-colors">
              Add Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// IMAGES MANAGER COMPONENT
// ==========================================
function ImagesManager() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.storage.from('blog-images').list();
      if (error) throw error;
      
      const imgs = data.filter(f => f.name !== '.emptyFolderPlaceholder').map(file => {
        const { data: publicUrlData } = supabase.storage.from('blog-images').getPublicUrl(file.name);
        return { name: file.name, url: publicUrlData.publicUrl, created_at: file.created_at };
      });
      
      setImages(imgs.sort((a,b) => new Date(b.created_at) - new Date(a.created_at)));
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchImages(); }, []);

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
    alert("URL Copied!");
  };

  const deleteImage = async (name) => {
    if (window.confirm(`Delete image ${name}? Make sure it's not used in any posts!`)) {
      try {
        const { error } = await supabase.storage.from('blog-images').remove([name]);
        if (error) throw error;
        fetchImages();
      } catch (error) {
        alert("Error deleting image");
      }
    }
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setLoading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const { error } = await supabase.storage.from('blog-images').upload(fileName, file);
      if (error) throw error;
      fetchImages();
    } catch (error) {
      alert("Error uploading image");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div>
          <h2 className="text-lg font-bold">Image Library</h2>
          <p className="text-sm text-gray-500">Manage images uploaded to the blog-images bucket.</p>
        </div>
        <div>
          <label className="bg-[#00E5A0] text-black px-4 py-2 rounded-lg font-bold text-sm cursor-pointer hover:bg-[#00c286] transition-colors">
            Upload Image
            <input type="file" className="hidden" accept="image/*" onChange={uploadImage} />
          </label>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading images...</div>
      ) : images.length === 0 ? (
        <div className="text-center py-12 text-gray-500 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
          No images found.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {images.map((img, i) => (
            <div key={i} className="group relative rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-square">
              <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center gap-2">
                <button onClick={() => copyUrl(img.url)} className="bg-white text-black p-2 rounded-full hover:bg-gray-200" title="Copy URL">
                  <Copy size={16} />
                </button>
                <button onClick={() => deleteImage(img.name)} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600" title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
