import { format } from "date-fns";
import { Clock } from "@/lib/lucide";

export default function RelatedPosts({ posts, category }) {
  if (!posts?.length) return null;

  return (
    <section className="mt-20 border-t border-gray-800 bg-gray-900/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-center text-3xl font-bold text-white">
          More from {category || "the blog"}
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <a
              href={`/Blog/${post.slug}`}
              key={post.id}
              className="group block overflow-hidden rounded-2xl border border-gray-800 bg-[#0a0a0a] transition-all duration-300 hover:-translate-y-1 hover:border-[#00E5A0]/50"
            >
              <div className="relative h-40 overflow-hidden">
                {post.cover_image_url ? (
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    width="640"
                    height="360"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-gray-800 to-gray-900" />
                )}
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center gap-3 text-xs text-gray-500">
                  {post.published_at && (
                    <span>{format(new Date(post.published_at), "MMM d, yyyy")}</span>
                  )}
                  {post.reading_time_minutes && (
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {post.reading_time_minutes} min
                    </span>
                  )}
                </div>
                <h3 className="line-clamp-2 text-lg font-bold text-white transition-colors group-hover:text-[#00E5A0]">
                  {post.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
