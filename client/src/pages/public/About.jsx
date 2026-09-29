import { useEffect, useState } from 'react'
import { ArrowRight, BookOpen, Heart, Leaf, Users } from 'lucide-react'
import FocusAreaCard from '../../components/public/FocusAreaCard'
import SectionHeading from '../../components/public/SectionHeading'
import { getPublicContent } from '../../services/contentService'
import { FOCUS_AREAS, HOME_IMAGES } from '../../utils/constants'

const values = [
  { icon: BookOpen, title: 'Education first', text: 'Every child deserves the tools and confidence to learn.' },
  { icon: Heart, title: 'Care with dignity', text: 'We listen to communities and design support with respect.' },
  { icon: Users, title: 'Local leadership', text: 'Lasting progress grows from people who know their communities.' },
  { icon: Leaf, title: 'Sustainable action', text: 'We care for the environment while creating opportunity.' },
]

export default function About() {
  const [about, setAbout] = useState(null)

  useEffect(() => {
    getPublicContent('ABOUT').then((response) => setAbout(response.items?.[0] || null)).catch(() => undefined)
  }, [])

  return <main className="inner-page"><section className="page-hero"><div className="section"><span className="eyebrow">{about?.eyebrow || 'Our story'}</span><h1>{about?.title || 'People-powered change, rooted in community.'}</h1><p>{about?.description || 'Sevoday Foundation works alongside communities to create practical, lasting opportunities in education, healthcare and sustainable development.'}</p></div></section><section className="section about-page-intro"><div><span className="eyebrow">Who we are</span><h2>{about?.title || 'Building a more equitable tomorrow, together.'}</h2><p>{about?.content || about?.description || 'We are a non-profit organization committed to creating positive and lasting change. Our work brings people, partners and local knowledge together to help communities become healthier, more educated and self-reliant.'}</p><a className="button button-primary" href="/projects">Explore our work <ArrowRight size={17} /></a></div><img src={about?.image || HOME_IMAGES.children} alt={about?.alt || 'Community children smiling together'} /></section><section className="section values-section"><SectionHeading eyebrow="How we work" title="Our values in action" /><div className="values-grid">{values.map(({ icon: Icon, title, text }) => <article className="value-card" key={title}><span className="focus-icon"><Icon size={23} /></span><h3>{title}</h3><p>{text}</p></article>)}</div></section><section className="section about-focus"><SectionHeading eyebrow="Our focus" title="Where change begins" /><div className="focus-grid">{FOCUS_AREAS.map((area) => <FocusAreaCard key={area.title} area={area} />)}</div></section></main>
}
