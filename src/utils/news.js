import { NEWS_API_KEY, NEWS_BASE } from "../config/api";

const CATEGORY_QUERY = {
  ai: "artificial intelligence",
  technology: "technology",
  sports: "sports",
  business: "business",
};

export async function fetchNews(category = "technology") {
  const q = CATEGORY_QUERY[category] || category;
  const res = await fetch(
    `${NEWS_BASE}/news?apikey=${NEWS_API_KEY}&q=${encodeURIComponent(q)}&language=en&size=6`
  );
  if (!res.ok) throw new Error("News fetch failed");
  const data = await res.json();
  return (data.results || []).slice(0, 6);
}
