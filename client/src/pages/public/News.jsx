import { useEffect, useState } from 'react'
import SectionHeading from '../../components/public/SectionHeading'
import NewsCard from '../../components/public/NewsCard'
import { getPublicContent } from '../../services/contentService'

export default function News() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getPublicContent('NEWS').then((response) => setItems(response.items || [])).catch(() => undefined).finally(() => setIsLoading(false))
  }, [])

  const articles = items.map((item) => ({ title: item.title, date: new Date(item.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }), image: item.image, excerpt: item.description || item.content, href: item.buttonLink || (item.slug ? `/news/${item.slug}` : ''), linkText: item.buttonText }))

  return <main className="inner-page"><section className="page-hero"><div className="section"><span className="eyebrow">From Sevoday</span><h1>Updates from our community.</h1><p>Follow the people, partnerships and everyday moments behind our work.</p></div></section><section className="section"><SectionHeading eyebrow="Latest stories" title="News and updates" /><div className="news-grid news-grid-page">{articles.length ? articles.map((article) => <NewsCard key={`${article.title}-${article.date}`} article={article} />) : <div className="col-span-full rounded-xl border border-dashed border-[#cbd8cc] bg-white px-5 py-12 text-center text-sm text-slate-500">{isLoading ? 'Loading news...' : 'No news published yet.'}</div>}</div></section></main>
}
