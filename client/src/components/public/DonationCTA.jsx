import { ArrowRight, Heart } from "lucide-react";

export default function DonationCTA({ donateHref = "/donate" }) {
  return (
    <section className="donation-cta">
      <div>
        <span className="eyebrow">Be part of the change</span>
        <h2>Together, we can create a better tomorrow.</h2>
        <p>
          Your support helps communities access education, healthcare and
          opportunities to build a self-reliant future.
        </p>
      </div>
      <a className="button button-gold" href={donateHref}>
        <Heart size={17} fill="currentColor" aria-hidden="true" /> Donate Now{" "}
        <ArrowRight size={17} />
      </a>
    </section>
  );
}
