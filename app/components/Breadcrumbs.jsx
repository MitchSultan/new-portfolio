"use client";

import Link from "next/link";
import JsonLd from "./JsonLd";
import { SITE_URL } from "../../lib/seo";

export default function Breadcrumbs({ items }) {
  const listItems = [
    { name: "Home", href: "/" },
    ...items,
  ];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: listItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.href, SITE_URL).toString(),
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <nav aria-label="Breadcrumb" className="mx-auto w-full max-w-[1440px] px-4 pt-5 text-sm text-neutral-600 md:px-8">
        <ol className="flex flex-wrap items-center gap-2">
          {listItems.map((item, index) => {
            const current = index === listItems.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-2">
                {index > 0 && <span aria-hidden="true">/</span>}
                {current ? (
                  <span aria-current="page">{item.name}</span>
                ) : (
                  <Link className="underline underline-offset-4 hover:text-neutral-900" href={item.href}>
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
