import React from 'react'
import blogData from '../blogData.json'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return blogData.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPost({ params }) {
  const post = blogData.find(p => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-gray-50 dark:bg-gray-900 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 animate-fade-in-up">
        {/* Header Section */}
        <div className="relative h-64 sm:h-80 md:h-96 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800">
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
           <div className="absolute inset-0 bg-black/10"></div>
           <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white z-10">
             <div className="flex flex-wrap items-center gap-4 mb-4 text-sm md:text-base font-medium opacity-90">
               <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-sm">{post.date}</span>
               <span className="hidden sm:inline">•</span>
               <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 mr-2 border-2 border-white/20"></div>
                  <span>{post.author}</span>
               </div>
             </div>
             <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-2 tracking-tight">
               {post.title}
             </h1>
           </div>
        </div>
        
        {/* Content Section */}
        <div className="p-8 md:p-12 lg:p-16">
          <div 
            className="prose prose-lg dark:prose-invert max-w-none 
            prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-indigo-100 
            prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-8
            prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-500
            prose-blockquote:border-l-indigo-500 prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-800/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
            prose-li:marker:text-indigo-500"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          {/* Footer/Navigation */}
          <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <Link href="/Blog" className="group inline-flex items-center text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors px-4 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
              <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Back to all articles
            </Link>
            
            <div className="flex space-x-3">
              <button className="p-2 rounded-full text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </button>
              <button className="p-2 rounded-full text-gray-400 hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
