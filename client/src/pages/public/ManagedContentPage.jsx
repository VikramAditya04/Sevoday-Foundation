import { useEffect, useState } from "react";
import { getPublicContent } from "../../services/contentService";

export default function ManagedContentPage({ type, title, eyebrow, description }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPublicContent(type)
      .then((response) => setItems(response.items || []))
      .catch(() => setItems([]))
      .finally(() => setIsLoading(false));
  }, [type]);

  return (
    <main className="min-h-[60vh] bg-[#fdfcf7] text-[#123524]">
      <section className="border-b border-[#e4e2d8] bg-[#eaf3ec]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#2f6b3f]">{eyebrow}</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">{description}</p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
        {isLoading ? <p className="text-sm text-slate-500">Loading {title.toLowerCase()}...</p> : null}
        {!isLoading && items.length === 0 ? <p className="rounded-xl border border-dashed border-[#cbd8cc] bg-white px-5 py-12 text-center text-slate-500">No {title.toLowerCase()} published yet.</p> : null}
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <article key={item._id} className="overflow-hidden rounded-xl border border-[#e4e2d8] bg-white shadow-sm">
              {item.image ? <img src={item.image} alt={item.alt || item.title} className="h-56 w-full object-cover" /> : null}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-[#123524]">{item.title}</h2>
                {item.description ? <p className="mt-3 leading-7 text-slate-600">{item.description}</p> : null}
                {item.content ? <div className="mt-4 whitespace-pre-line leading-7 text-slate-600">{item.content}</div> : null}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
