import { MapPin } from "lucide-react";
import Logo from "../../assets/images/logo.png";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-logo">
            <a
          href="/"
          aria-label="Sevoday Foundation home"
          className="flex shrink-0 items-center gap-2.5"
        >
          <img src={Logo} alt="Sevoday Foundation Logo" className="h-12 w-auto lg:h-14" /> 
        </a>
          </div>
          <p>
            Working towards a better, brighter and more inclusive tomorrow for
            every individual and community.
          </p>
          <div className="socials">
            <a href="#facebook" aria-label="Sevoday Foundation on Facebook">f</a>
            <a href="#x" aria-label="Sevoday Foundation on X">𝕏</a>
            <a href="#instagram" aria-label="Sevoday Foundation on Instagram">◎</a>
            <a href="#linkedin" aria-label="Sevoday Foundation on LinkedIn">in</a>
            <a href="#youtube" aria-label="Sevoday Foundation on YouTube">▶</a>
          </div>
        </div>
        <div>
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/projects">Projects</a>
          <a href="/campaigns">Campaigns</a>
          <a href="/news">News</a>
          <a href="/gallery">Gallery</a>
        </div>
        <div>
          <h4>Our Work</h4>
          <a href="/projects">Education</a>
          <a href="/projects">Healthcare</a>
          <a href="/projects">Community Development</a>
          <a href="/projects">Environment</a>
          <a href="/members">Volunteer</a>
          <a href="/donate">Donate</a>
        </div>
        <div>
          <h4>Contact Us</h4>
          <p className="contact-line">
            <MapPin size={16} aria-hidden="true" /> Nawada, Bihar, India
          </p>
          <p className="contact-line">
            <span aria-hidden="true">✉</span> <a href="mailto:info@sevodayfoundation.org">info@sevodayfoundation.org</a>
          </p>
          <p className="contact-line"><span aria-hidden="true">⌕</span> <a href="tel:+91 1234567890">+91 12345 67890</a></p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Sevoday Foundation. All rights reserved.</span>
        <span className="footer-legal"><a href="/policies">Privacy Policy</a><a href="/policies">Terms</a></span>
      </div>
    </footer>
  );
}
