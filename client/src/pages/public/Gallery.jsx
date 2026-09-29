import { useEffect, useState } from 'react'
import SectionHeading from '../../components/public/SectionHeading'
import GalleryCard from '../../components/public/GalleryCard'
import { getPublicContent } from '../../services/contentService'

export default function Gallery() {
  const [gallery, setGallery] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getPublicContent('GALLERY').then((response) => setGallery(response.items || [])).catch(() => undefined).finally(() => setIsLoading(false))
  }, [])

  const images = gallery.map((item) => ({ image: item.image, alt: item.alt || item.title }))

  return <main className="inner-page"><section className="page-hero"><div className="section"><span className="eyebrow">Our moments</span><h1>Stories of people, progress and possibility.</h1><p>Take a look at the people and places that make Sevoday Foundation's work meaningful.</p></div></section><section className="section gallery-page"><SectionHeading eyebrow="Photo journal" title="From the field" /><div className="gallery-grid gallery-grid-page">{images.length ? images.map((item, index) => <GalleryCard key={`${item.image}-${index}`} image={item.image} alt={item.alt} index={index} />) : <div className="col-span-full rounded-xl border border-dashed border-[#cbd8cc] bg-white px-5 py-12 text-center text-sm text-slate-500">{isLoading ? 'Loading gallery...' : 'No gallery photos published yet.'}</div>}</div></section></main>
}
