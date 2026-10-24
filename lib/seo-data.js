const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function fetchPublicPosts(
  select,
  filters = {},
  { limit = 100, allRows = false } = {}
) {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      "SEO content lookup skipped: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required."
    );
    return [];
  }

  const endpoint = new URL("/rest/v1/posts", supabaseUrl);
  endpoint.searchParams.set("select", select);
  endpoint.searchParams.set("status", "eq.published");
  endpoint.searchParams.set("order", "published_at.desc,slug.asc");
  for (const [column, value] of Object.entries(filters)) {
    endpoint.searchParams.set(column, value);
  }

  const rows = [];
  const pageSize = 1000;
  const requestedLimit = allRows ? pageSize : limit;
  endpoint.searchParams.set("limit", String(requestedLimit));

  while (true) {
    const start = rows.length;
    const headers = {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
    };
    if (allRows) {
      headers["Range-Unit"] = "items";
      headers.Range = `${start}-${start + pageSize - 1}`;
    }

    const response = await fetch(endpoint, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Published blog lookup failed: ${response.status}`);
    }

    const batch = await response.json();
    rows.push(...batch);
    if (!allRows || batch.length < pageSize) break;
  }

  return rows;
}

export function getPublishedPostsForSitemap() {
  return fetchPublicPosts("slug,updated_at", {}, { allRows: true });
}

export async function getPublishedPostBySlug(slug) {
  const [post] = await fetchPublicPosts("*", { slug: `eq.${slug}` }, { limit: 1 });
  return post ?? null;
}

export function getPublishedBlogListing() {
  return fetchPublicPosts(
    "id,title,slug,excerpt,cover_image_url,category,tags,reading_time_minutes,published_at,views_count,featured",
    {},
    { limit: 6 }
  );
}

export async function getFeaturedBlogPost() {
  const [post] = await fetchPublicPosts(
    "id,title,slug,excerpt,cover_image_url,category,tags,reading_time_minutes,published_at,views_count,featured",
    { featured: "eq.true" },
    { limit: 1 }
  );
  return post ?? null;
}

export async function getBlogCategories() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      "Blog category lookup skipped: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required."
    );
    return [];
  }

  const endpoint = new URL("/rest/v1/categories", supabaseUrl);
  endpoint.searchParams.set("select", "id,name");
  endpoint.searchParams.set("order", "name.asc");
  const response = await fetch(endpoint, {
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Blog category lookup failed: ${response.status}`);
  }

  return response.json();
}

export async function getPortfolioProjects() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      "Portfolio lookup skipped: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required."
    );
    return null;
  }

  const endpoint = new URL("/rest/v1/projects", supabaseUrl);
  endpoint.searchParams.set(
    "select",
    "id,title,niche,image,liveUrl:live_url,description,technologies,features,timeline,teamSize:team_size,challenges,results"
  );
  endpoint.searchParams.set("order", "id.asc");
  endpoint.searchParams.set("limit", "1000");
  const response = await fetch(endpoint, {
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Portfolio project lookup failed: ${response.status}`);
  }

  return response.json();
}

export function getRelatedPublishedPosts(category, postId) {
  if (!category) return Promise.resolve([]);
  return fetchPublicPosts(
    "id,title,slug,cover_image_url,reading_time_minutes,published_at",
    { category: `eq.${category}`, id: `neq.${postId}` },
    { limit: 3 }
  );
}
