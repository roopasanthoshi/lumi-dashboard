import { ExternalLink } from "lucide-react";

export default function NewsCard({
  article,
  delay = 1,
}) {
  return (
    <div
      className={`glass glass-hover rounded-xl p-4 flex flex-col gap-3 fade-up fade-up-${delay}`}
    >
      {article.image_url && (
        <img
          src={article.image_url}
          alt={article.title}
          className="w-full h-36 object-cover rounded-lg opacity-80"
          onError={(e) =>
            (e.target.style.display = "none")
          }
        />
      )}

      <div className="flex-1">
        <p className="text-[10px] uppercase tracking-widest text-white/25 mb-1.5">
          {article.source_id || "News"}
        </p>

        <p className="text-sm font-medium text-white/85 leading-snug line-clamp-2">
          {article.title}
        </p>

        {article.description && (
          <p className="text-xs text-white/40 mt-2 leading-relaxed line-clamp-2">
            {article.description}
          </p>
        )}
      </div>

      {article.link && (
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center gap-1 text-[11px] text-white/25 hover:text-white/60 transition-colors"
        >
          Read more
          <ExternalLink size={10} />
        </a>
      )}
    </div>
  );
}