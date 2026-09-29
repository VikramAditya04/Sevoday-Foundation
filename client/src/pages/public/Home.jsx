import { useEffect, useState } from "react";
import { BookOpen, Heart, Leaf, Users } from "lucide-react";
import CampaignCard from "../../components/public/CampaignCard";
import DonationCTA from "../../components/public/DonationCTA";
import FocusAreaCard from "../../components/public/FocusAreaCard";
import GalleryCard from "../../components/public/GalleryCard";
import Hero from "../../components/public/Hero";
import NewsCard from "../../components/public/NewsCard";
import ProjectCard from "../../components/public/ProjectCard";
import SectionHeading from "../../components/public/SectionHeading";
import { getPublicContent } from "../../services/contentService";
import { getPublicProjects } from "../../services/projectService";
import {
  CAMPAIGNS,
  FOCUS_AREAS,
  HOME_IMAGES,
  HOME_STATS,
  IMPACT_STATS,
} from "../../utils/constants";

const ICONS = {
  education: BookOpen,
  healthcare: Heart,
  environment: Leaf,
  community: Users,
};

function Stats({ items, className = "" }) {
  return (
    <div className={className}>
      {items.map((item) => {
        const Icon = ICONS[item.icon];
        return (
          <div className="stat" key={item.label}>
            <Icon size={28} strokeWidth={2.2} aria-hidden="true" />
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function AboutPreview({ about }) {
  return (
    <section className="section about">
      <div className="about-copy">
        <span className="eyebrow">About Us</span>
        <h2>{about?.title || "About Sevoday Foundation"}</h2>
        <p>
          {about?.description || "Sevoday Foundation is a non-profit organization committed to creating positive and lasting change in society. We focus on education, healthcare, community development and environmental sustainability to build a stronger, more equitable future."}
        </p>
        <a className="button button-primary" href="/about">
          Learn More <span aria-hidden="true">→</span>
        </a>
      </div>
      <div className="about-visual">
        <img src={about?.image || HOME_IMAGES.planting} alt={about?.alt || "Hands caring for a young plant"} />
        <div className="values-card">
          <div>
            <BookOpen size={19} aria-hidden="true" />
            <span>Education for All</span>
          </div>
          <div>
            <Heart size={19} aria-hidden="true" />
            <span>Better Healthcare</span>
          </div>
          <div>
            <Users size={19} aria-hidden="true" />
            <span>Stronger Communities</span>
          </div>
          <div>
            <Leaf size={19} aria-hidden="true" />
            <span>Sustainable Environment</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [managedContent, setManagedContent] = useState({ sliders: [], about: null, gallery: [], news: [], projects: [] });
  const [sliderIndex, setSliderIndex] = useState(0);
  const [isManagedContentLoading, setIsManagedContentLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getPublicContent("SLIDER"),
      getPublicContent("ABOUT"),
      getPublicContent("GALLERY"),
      getPublicContent("NEWS"),
      getPublicProjects(),
    ])
      .then(([sliders, about, gallery, news, projects]) => setManagedContent({
        sliders: sliders.items || [],
        about: about.items?.[0] || null,
        gallery: gallery.items || [],
        news: news.items || [],
        projects: projects.projects || [],
      }))
      .catch(() => undefined)
      .finally(() => setIsManagedContentLoading(false));
  }, []);

  useEffect(() => {
    if (managedContent.sliders.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setSliderIndex((current) => (current + 1) % managedContent.sliders.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [managedContent.sliders.length]);

  const slider = managedContent.sliders[sliderIndex] || managedContent.sliders[0];
  const galleryImages = managedContent.gallery.map((item) => ({ image: item.image, alt: item.alt || item.title }));
  const newsItems = managedContent.news.slice(0, 3).map((item) => ({
      title: item.title,
      date: new Date(item.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      image: item.image,
      excerpt: item.description || item.content,
      href: item.buttonLink || (item.slug ? `/news/${item.slug}` : ""),
      linkText: item.buttonText,
    }));
  const projectItems = managedContent.projects.map((project) => ({
    ...project,
    href: project.slug ? `/projects/${project.slug}` : "/projects",
  }));

  return (
    <main>
      <Hero image={slider?.image || HOME_IMAGES.children} imageAlt={slider?.alt || "Children smiling together"} eyebrow={slider?.eyebrow || "Sevoday Foundation"} title={slider?.title} description={slider?.description} primaryText={slider?.buttonText || "Donate Now"} primaryLink={slider?.buttonLink || "#campaigns"} />
      <section className="stats-band">
        <Stats items={HOME_STATS} className="stats-grid" />
      </section>
      <AboutPreview about={managedContent.about} />
      <section className="section focus-section">
        <SectionHeading eyebrow="What We Do" title="Our Focus Areas" />
        <div className="focus-grid">
          {FOCUS_AREAS.map((area) => (
            <FocusAreaCard key={area.title} area={area} />
          ))}
        </div>
      </section>
      <section className="section" id="projects">
        <SectionHeading
          eyebrow="Our Work"
          title="Our Projects"
          action={{ label: "View All Projects", href: "/projects" }}
        />
        <div className="project-grid">
          {projectItems.length ? projectItems.slice(0, 3).map((project) => (
            <ProjectCard key={project.title} project={project} />
          )) : <div className="col-span-full rounded-xl border border-dashed border-[#cbd8cc] bg-white px-5 py-10 text-center text-sm text-slate-500">{isManagedContentLoading ? "Loading projects..." : "No projects published yet."}</div>}
        </div>
      </section>
      <section className="section campaigns" id="campaigns">
        <SectionHeading
          eyebrow="Campaigns"
          title="Ongoing Campaigns"
          action={{ label: "View All Campaigns", href: "/campaigns" }}
        />
        <div className="campaign-grid">
          {CAMPAIGNS.map((campaign) => (
            <CampaignCard key={campaign.title} campaign={campaign} />
          ))}
        </div>
      </section>
      <section className="impact">
        <div className="section">
          <div className="impact-heading">
            <span className="eyebrow">Our Impact</span>
            <h2>Creating Real Change</h2>
          </div>
          <Stats items={IMPACT_STATS} className="impact-grid" />
        </div>
      </section>
      <section className="section gallery">
        <SectionHeading
          eyebrow="Our Moments"
          title="Gallery"
          action={{ label: "View All Photos", href: "/gallery" }}
        />
        <div className="gallery-grid">
          {galleryImages.length ? galleryImages.slice(0, 5).map((item, index) => (
            <GalleryCard key={`${item.image}-${index}`} image={item.image} alt={item.alt} index={index} />
          )) : <div className="col-span-full rounded-xl border border-dashed border-[#cbd8cc] bg-white px-5 py-10 text-center text-sm text-slate-500">{isManagedContentLoading ? "Loading gallery..." : "No gallery photos published yet."}</div>}
        </div>
      </section>
      <section className="section news-section">
        <SectionHeading
          eyebrow="From Sevoday"
          title="Latest News"
          action={{ label: "View All News", href: "/news" }}
        />
        <div className="news-grid">
          {newsItems.length ? newsItems.map((article) => (
            <NewsCard key={article.title} article={article} />
          )) : <div className="col-span-full rounded-xl border border-dashed border-[#cbd8cc] bg-white px-5 py-10 text-center text-sm text-slate-500">{isManagedContentLoading ? "Loading news..." : "No news published yet."}</div>}
        </div>
      </section>
      <DonationCTA />
    </main>
  );
}
