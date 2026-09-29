import { Outlet } from "react-router-dom";
import Footer from "../components/public/Footer";
import Navbar from "../components/public/Navbar";

export default function PublicLayout() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Navbar />
      <div id="main-content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
