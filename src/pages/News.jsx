import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";

export default function News() {
  const [news, setNews] = useState([]);
  const [category, setCategory] =
    useState("technology");

  const categories = [
    "technology",
    "business",
    "sports",
  ];

  async function fetchNews(cat) {
    try {
      const res = await fetch(
        `https://newsdata.io/api/1/news?apikey=${
          import.meta.env.VITE_NEWS_API_KEY
        }&language=en&category=${cat}`
      );

      const data = await res.json();

      setNews(data.results || []);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchNews(category);
  }, [category]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl text-white font-semibold">
          News Dashboard
        </h1>

        <p className="text-white/40 mt-1">
          Real-time global news updates
        </p>
      </div>

      <div className="flex gap-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              category === cat
                ? "bg-[#7c6aff] text-white"
                : "bg-white/5 text-white/50 hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.map((article, index) => (
          <NewsCard
            key={index}
            article={article}
            delay={(index % 6) + 1}
          />
        ))}
      </div>
    </div>
  );
}