import { ArrowRight, Play } from "lucide-react";

export default function Hero({ image, imageAlt = "Children smiling together", storyHref = "/about", eyebrow = "Sevoday Foundation", title, description, primaryText = "Donate Now", primaryLink = "#campaigns", secondaryText = "Our Work" }) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title || <>Serving Today.<br /><em>Empowering<br />Tomorrow.</em></>}</h1>
        <p>{description || "We work towards a healthier, educated and self-reliant society by supporting communities and creating sustainable opportunities."}</p>
        <div className="hero-actions">
          <a className="button button-primary" href={primaryLink}>
            {primaryText} <ArrowRight size={17} />
          </a>
          <a className="button button-outline" href="#projects">
            {secondaryText}
          </a>
        </div>
      </div>
      <div className="hero-media">
        <img src={image} alt={imageAlt} />
        <a className="story-card" href={storyHref} aria-label="Watch Sevoday Foundation story">
          <span className="play">
            <Play size={15} fill="currentColor" aria-hidden="true" />
          </span>
          <span>
            <strong>Watch Our Story</strong>
            <small>2 min video</small>
          </span>
        </a>
      </div>
    </section>
  );
}
