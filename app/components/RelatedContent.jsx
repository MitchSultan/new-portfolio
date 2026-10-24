import Link from "next/link";

export default function RelatedContent({ title = "Related services", links }) {
  return (
    <section aria-labelledby="related-content-title" className="mt-16 border-y border-neutral-900 py-8">
      <h2 id="related-content-title" className="mb-5 font-display text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className="block border border-neutral-300 p-4 transition-colors hover:border-neutral-900 hover:bg-neutral-50"
              href={link.href}
            >
              <span className="font-semibold underline underline-offset-4">{link.title}</span>
              {link.description && (
                <span className="mt-2 block text-sm leading-relaxed text-neutral-600">
                  {link.description}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
