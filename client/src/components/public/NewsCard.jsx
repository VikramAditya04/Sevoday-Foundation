import { ArrowRight, CalendarDays } from "lucide-react";

export default function NewsCard({ article }) {
  return (
    <article className="news-card">
      {article.image ? <img src={article.image} alt={article.title} /> : null}
      <div className="news-body flex h-full flex-col">
        <span className="news-date">
          <CalendarDays size={14} aria-hidden="true" /> {article.date}
        </span>
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
        <a className="text-link mt-5 inline-flex" href={article.href || "/news"}>
          {article.linkText || "Read full story"} <ArrowRight size={15} />
        </a>
      </div>
    </article>
  );
}
