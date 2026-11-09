import { format } from "date-fns";
import { Clock } from "@/lib/lucide";

export default function RelatedPosts({ posts, category }) {
  if (!posts?.length) return null;

  return (
    <section className="mt-20 border-t border-neutral-900 bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <h2 className="mb-10 border-b border-neutral-300 pb-6 text-3xl font-semibold tracking-tight text-neutral-900">
          More from {category || "the blog"}
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <a
              href={`/Blog/${post.slug}`}
              key={post.id}
              className="group block overflow-hidden border-y border-neutral-300 transition-colors duration-300 hover:border-neutral-900"
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
                  <div className="h-full w-full bg-neutral-100" />
                )}
              </div>
              <div className="p-5">
                <div className="mb-2 flex items-center gap-3 text-xs text-neutral-500">
                  {post.published_at && (
                    <span>{format(new Date(post.published_at), "MMM d, yyyy")}</span>
                  )}
                  {post.reading_time_minutes && (
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {post.reading_time_minutes} min
                    </span>
                  )}
                </div>
                <h3 className="line-clamp-2 text-lg font-semibold leading-tight text-neutral-900 transition-colors group-hover:text-neutral-600">
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
