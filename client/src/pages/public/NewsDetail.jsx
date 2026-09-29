import { useEffect, useState } from "react";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getPublicContentBySlug } from "../../services/contentService";

export default function NewsDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getPublicContentBySlug("NEWS", slug)
      .then((response) => setArticle(response.item))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setIsLoading(false));
  }, [slug]);

  if (isLoading) {
    return <main className="grid min-h-[60vh] place-items-center bg-[#fdfcf7] px-5 text-sm text-slate-500">Loading news...</main>;
  }

  if (error || !article) {
    return (
      <main className="grid min-h-[60vh] place-items-center bg-[#fdfcf7] px-5 text-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#2f6b3f]">News</p>
          <h1 className="mt-3 text-3xl font-bold text-[#123524]">News article not found</h1>
          <p className="mt-3 text-slate-600">This article may have been unpublished or removed.</p>
          <Link to="/news" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#1f4a2c] px-4 py-2.5 text-sm font-semibold text-white">
            <ArrowLeft className="h-4 w-4" /> Back to News
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[60vh] bg-[#fdfcf7] text-[#123524]">
      <article className="mx-auto max-w-4xl px-5 py-12 sm:px-8 lg:py-16">
        <Link to="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-[#2f6b3f] hover:text-[#1f4a2c]">
          <ArrowLeft className="h-4 w-4" /> Back to News
        </Link>
        <p className="mt-10 flex items-center gap-2 text-sm font-semibold text-[#2f6b3f]"><CalendarDays className="h-4 w-4" />{new Date(article.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{article.title}</h1>
        {article.image ? <img src={article.image} alt={article.alt || article.title} className="mt-8 max-h-120 w-full rounded-xl object-cover" /> : null}
        {article.description ? <p className="mt-8 text-lg leading-8 text-slate-600">{article.description}</p> : null}
        {article.content ? <div className="mt-6 whitespace-pre-line text-base leading-8 text-slate-700">{article.content}</div> : null}
      </article>
    </main>
  );
}
