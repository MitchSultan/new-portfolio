"use client";

import React, { useState, useEffect, Suspense, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase/server";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import imageCompression from "browser-image-compression";
import { ArrowLeft, Save, Upload, X, Check, Image as ImageIcon, Send, Trash2, Link } from '@/lib/lucide';

// TipTap Toolbar Component
const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const addImage = async () => {
    const url = window.prompt('URL of the image:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-t-lg">
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`px-2 py-1 rounded text-sm font-medium ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>H1</button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`px-2 py-1 rounded text-sm font-medium ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>H2</button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`px-2 py-1 rounded text-sm font-medium ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>H3</button>
      <span className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></span>
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={`px-2 py-1 rounded text-sm font-medium ${editor.isActive('bold') ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>B</button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`px-2 py-1 rounded text-sm font-medium ${editor.isActive('italic') ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>I</button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()} className={`px-2 py-1 rounded text-sm font-medium ${editor.isActive('strike') ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>S</button>
      <span className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></span>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`px-2 py-1 rounded text-sm font-medium ${editor.isActive('bulletList') ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>• List</button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`px-2 py-1 rounded text-sm font-medium ${editor.isActive('orderedList') ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>1. List</button>
      <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`px-2 py-1 rounded text-sm font-medium ${editor.isActive('blockquote') ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>Quote</button>
      <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={`px-2 py-1 rounded text-sm font-medium ${editor.isActive('codeBlock') ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>Code</button>
      <span className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></span>
      <button onClick={addImage} className="px-2 py-1 rounded text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-1"><ImageIcon size={14} /> Img</button>
    </div>
  );
};

function EditorForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get('id');

  const [loading, setLoading] = useState(postId ? true : false);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  
  const [postData, setPostData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover_image_url: "",
    category: "",
    tags: [],
    status: "draft",
    featured: false
  });
  
  const [tagInput, setTagInput] = useState("");
  const [saveStatus, setSaveStatus] = useState("");

  const editor = useEditor({
    extensions: [StarterKit, ImageExtension],
    content: "",
    onUpdate: ({ editor }) => {
      setPostData(prev => ({ ...prev, content: editor.getHTML() }));
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base dark:prose-invert focus:outline-none max-w-none min-h-[400px] p-4',
      },
    },
  });

  // Fetch Categories
  useEffect(() => {
    const fetchCats = async () => {
      const { data } = await supabase.from('categories').select('name').order('name');
      if (data) setCategories(data.map(c => c.name));
    };
    fetchCats();
  }, []);

  // Fetch Post if ID exists
  useEffect(() => {
    if (!postId || !editor) return;
    
    const fetchPost = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('posts').select('*').eq('id', postId).single();
      if (data) {
        setPostData({
          title: data.title || "",
          slug: data.slug || "",
          excerpt: data.excerpt || "",
          content: data.content || "",
          cover_image_url: data.cover_image_url || "",
          category: data.category || "",
          tags: data.tags || [],
          status: data.status || "draft",
          featured: data.featured || false,
          published_at: data.published_at || null
        });
        editor.commands.setContent(data.content || "");
      }
      setLoading(false);
    };
    fetchPost();
  }, [postId, editor]);

  // Auto-generate slug
  useEffect(() => {
    if (!postId && postData.title && !postData.slug) {
      setPostData(prev => ({
        ...prev,
        slug: prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      }));
    }
  }, [postData.title, postId]);

  // Auto-save
  useEffect(() => {
    const timer = setInterval(() => {
      if (postData.title || postData.content) {
        localStorage.setItem('autosave_post', JSON.stringify(postData));
        setSaveStatus("Auto-saved locally");
        setTimeout(() => setSaveStatus(""), 3000);
      }
    }, 60000);
    return () => clearInterval(timer);
  }, [postData]);

  const handleTagInput = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim().toLowerCase();
      if (newTag && !postData.tags.includes(newTag)) {
        setPostData({ ...postData, tags: [...postData.tags, newTag] });
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setPostData({ ...postData, tags: postData.tags.filter(t => t !== tagToRemove) });
  };

  const uploadCover = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setSaveStatus("Uploading cover...");
      let finalFile = file;
      if (file.size > 500 * 1024) {
        finalFile = await imageCompression(file, { maxSizeMB: 0.5, maxWidthOrHeight: 1920, useWebWorker: true });
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const { data, error } = await supabase.storage.from('blog-images').upload(`covers/${fileName}`, finalFile);
      
      if (error) throw error;
      
      const { data: urlData } = supabase.storage.from('blog-images').getPublicUrl(`covers/${fileName}`);
      setPostData({ ...postData, cover_image_url: urlData.publicUrl });
      setSaveStatus("");
    } catch (error) {
      console.error(error);
      alert("Error uploading image");
      setSaveStatus("");
    }
  };

  const savePost = async (newStatus) => {
    if (!postData.title || !postData.slug || !postData.content) {
      alert("Title, slug, and content are required.");
      return;
    }

    setSaving(true);
    setSaveStatus("Saving to database...");

    const statusToSave = newStatus || postData.status;
    
    // Auth check (basic check if session exists)
    const { data: { session } } = await supabase.auth.getSession();
    
    const payload = {
      title: postData.title,
      slug: postData.slug,
      excerpt: postData.excerpt,
      content: postData.content,
      cover_image_url: postData.cover_image_url,
      category: postData.category || null,
      tags: postData.tags,
      status: statusToSave,
      featured: postData.featured,
      author_id: session?.user?.id || null
    };

    if (statusToSave === 'published' && (!postData.published_at || postData.published_at === null)) {
      payload.published_at = new Date().toISOString();
    }

    if (postId) {
      payload.id = postId;
    }

    try {
      const { data, error } = await supabase
        .from('posts')
        .upsert(payload, { onConflict: 'id' })
        .select()
        .single();

      if (error) throw error;
      
      setSaveStatus("Saved successfully!");
      if (!postId) {
        // Redirect to edit mode for the new post
        router.replace(`/admin/Blogs/editor?id=${data.id}`);
      } else {
        setPostData(prev => ({ ...prev, status: data.status, published_at: data.published_at }));
      }
      setTimeout(() => setSaveStatus(""), 3000);
      localStorage.removeItem('autosave_post');
    } catch (error) {
      console.error(error);
      alert("Error saving post: " + error.message);
      setSaveStatus("Error saving.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-white">Loading editor...</div>;
  }

  // Reading time logic (approx)
  const wordCount = postData.content.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/admin/Blogs')} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold">{postId ? "Edit Post" : "New Post"}</h1>
            {saveStatus && <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full animate-pulse">{saveStatus}</span>}
          </div>
          <div className="flex gap-3 items-center">
            <button 
              onClick={() => savePost('draft')}
              disabled={saving}
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white px-4 py-2 font-medium"
            >
              Save Draft
            </button>
            <button 
              onClick={() => savePost('published')}
              disabled={saving}
              className="bg-[#00E5A0] text-black px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-[#00c286] transition-colors disabled:opacity-50"
            >
              <Send size={16} /> Publish
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Editor Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div>
            <input 
              type="text" 
              placeholder="Post Title..." 
              value={postData.title}
              onChange={e => setPostData({...postData, title: e.target.value})}
              className="w-full text-4xl font-bold bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-400 dark:placeholder-gray-600"
            />
          </div>

          {/* Excerpt */}
          <div className="relative">
            <textarea 
              placeholder="Write a brief excerpt (used for SEO and post cards)..."
              value={postData.excerpt}
              onChange={e => setPostData({...postData, excerpt: e.target.value})}
              maxLength={160}
              rows={2}
              className="w-full text-lg text-gray-600 dark:text-gray-400 bg-transparent border-none focus:outline-none focus:ring-0 resize-none placeholder-gray-300 dark:placeholder-gray-700"
            />
            <span className="absolute bottom-2 right-2 text-xs text-gray-400">{postData.excerpt.length}/160</span>
          </div>

          {/* TipTap Editor */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          {/* Settings Panel */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-5">
            <h3 className="font-bold text-lg border-b border-gray-100 dark:border-gray-700 pb-2">Post Settings</h3>
            
            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL Slug</label>
              <div className="flex bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                <span className="px-3 py-2 text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 text-sm">/blog/</span>
                <input 
                  type="text" 
                  value={postData.slug}
                  onChange={e => setPostData({...postData, slug: e.target.value})}
                  className="w-full px-3 py-2 bg-transparent text-sm focus:outline-none"
                />
              </div>
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cover Image</label>
              {postData.cover_image_url ? (
                <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 aspect-video">
                  <img src={postData.cover_image_url} alt="Cover" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => setPostData({...postData, cover_image_url: ""})}
                    className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500">
                    <Upload size={24} className="mb-2" />
                    <p className="text-sm font-medium">Click to upload image</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={uploadCover} />
                </label>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <select 
                value={postData.category}
                onChange={e => setPostData({...postData, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent focus:outline-none focus:ring-1 focus:ring-[#00E5A0]"
              >
                <option value="" className="text-black">Select category...</option>
                {categories.map(cat => (
                  <option key={cat} value={cat} className="text-black">{cat}</option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {postData.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="hover:text-red-500"><X size={12} /></button>
                  </span>
                ))}
              </div>
              <input 
                type="text" 
                placeholder="Type tag and press Enter" 
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={handleTagInput}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent focus:outline-none focus:ring-1 focus:ring-[#00E5A0] text-sm"
              />
            </div>

            {/* Featured */}
            <div className="flex items-center justify-between pt-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Featured Post</label>
              <button 
                onClick={() => setPostData({...postData, featured: !postData.featured})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${postData.featured ? 'bg-[#00E5A0]' : 'bg-gray-300 dark:bg-gray-600'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${postData.featured ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

          </div>

          {/* SEO Preview Panel */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
            <h3 className="font-bold text-lg border-b border-gray-100 dark:border-gray-700 pb-2">SEO Preview</h3>
            
            <div className="space-y-1">
              <div className="text-sm text-gray-800 dark:text-gray-200 font-medium truncate">
                {postData.title || "Post Title Preview"}
              </div>
              <div className="text-xs text-green-700 dark:text-green-400 truncate">
                madebymitch.com/blog/{postData.slug || "post-slug-preview"}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {postData.excerpt || "Your post excerpt will appear here. Keep it concise and engaging for search results."}
              </div>
            </div>

            <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t border-gray-100 dark:border-gray-700">
              <span>{wordCount} words</span>
              <span>~{readingTime} min read</span>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center dark:bg-gray-900 text-white">Loading...</div>}>
      <EditorForm />
    </Suspense>
  );
}
