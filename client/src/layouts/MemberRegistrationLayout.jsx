import { ArrowLeft, Link as LinkIcon } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import Logo from "../assets/images/logo.png";

export default function MemberRegistrationLayout() {
  return (
    <main className="registration-shell">
      <header className="registration-topbar">
        <Link to="/" aria-label="Sevoday Foundation home">
          <img src={Logo} alt="Sevoday Foundation" />
        </Link>
        <Link className="registration-back-link" to="/">
          <ArrowLeft size={16} aria-hidden="true" /> Back to Home
        </Link>
      </header>
      <section className="registration-content">
        <Outlet />
      </section>
      <p className="registration-note">
        <LinkIcon size={14} aria-hidden="true" /> Membership applications are
        reviewed before account access is approved.
      </p>
    </main>
  );
}
