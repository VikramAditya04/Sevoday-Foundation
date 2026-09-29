import { ArrowLeft, HeartHandshake } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import Logo from "../assets/images/logo.png";

export default function AuthLayout() {
  return (
    <main className="auth-shell">
      <section className="auth-brand-panel">
        <Link
          className="auth-brand-logo"
          to="/"
          aria-label="Sevoday Foundation home"
        >
          <img src={Logo} alt="Sevoday Foundation" />
        </Link>
        <div className="auth-brand-copy">
          <span className="auth-brand-icon">
            <HeartHandshake size={27} aria-hidden="true" />
          </span>
          <span className="eyebrow">Sevoday Foundation</span>
          <h1>People-powered change starts with belonging.</h1>
          <p>
            Join a growing community of people working together for education,
            healthcare and sustainable opportunity.
          </p>
        </div>
        <p className="auth-brand-footer">Serving today. Empowering tomorrow.</p>
      </section>
      <section className="auth-form-panel">
        <Link className="auth-back-link" to="/">
          <ArrowLeft size={16} aria-hidden="true" /> Back to Home
        </Link>
        <Outlet />
      </section>
    </main>
  );
}
