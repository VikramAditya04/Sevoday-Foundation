import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MemberRegistrationLayout from "../layouts/MemberRegistrationLayout";
import PublicLayout from "../layouts/PublicLayout";
import About from "../pages/public/About";
import Campaigns from "../pages/public/Campaigns";
import Contact from "../pages/public/Contact";
import Donate from "../pages/public/Donate";
import Gallery from "../pages/public/Gallery";
import Home from "../pages/public/Home";
import News from "../pages/public/News";
import NewsDetail from "../pages/public/NewsDetail";
import PlaceholderPage from "../pages/public/PlaceholderPage";
import Projects from "../pages/public/Projects";
import BecomeMember from "../pages/auth/BecomeMember";
import Login from "../pages/auth/Login";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "../pages/admin/Dashboard";
import MemberRequests from "../pages/admin/members/MemberRequests";
import MemberDetails from "../pages/admin/members/MemberDetails";
import AllMembers from "../pages/admin/members/AllMembers";
import DonationList from "../pages/admin/donations/DonationList";
import SliderContent from "../pages/admin/content/Slider";
import AboutContent from "../pages/admin/content/About";
import GalleryContent from "../pages/admin/content/Gallery";
import CertificateContent from "../pages/admin/content/CertificateList";
import AchievementContent from "../pages/admin/content/Achievements";
import PolicyContent from "../pages/admin/content/Policy";
import NewsContent from "../pages/admin/news/NewsList";
import NoticeContent from "../pages/admin/notices/NoticeList";
import ProjectContent from "../pages/admin/projects/ProjectList";
import ManagedContentPage from "../pages/public/ManagedContentPage";
import Members from "../pages/public/Members";

const placeholderPages = [
  ["certificates", "Certificates"],
  ["achievements", "Achievements"],
  ["beneficiaries", "Beneficiaries"],
  ["careers", "Careers"],
];

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<MemberRegistrationLayout />}>
          <Route path="/become-a-member" element={<BecomeMember />} />
          <Route path="/member-register" element={<BecomeMember />} />
        </Route>
        <Route element={<ProtectedRoute roles={["ADMIN", "SUPER_ADMIN"]} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/donations" element={<DonationList />} />
            <Route path="/admin/content/slider" element={<SliderContent />} />
            <Route path="/admin/content/about" element={<AboutContent />} />
            <Route path="/admin/content/gallery" element={<GalleryContent />} />
            <Route path="/admin/content/certificates" element={<CertificateContent />} />
            <Route path="/admin/content/achievements" element={<AchievementContent />} />
            <Route path="/admin/content/policies" element={<PolicyContent />} />
            <Route path="/admin/news" element={<NewsContent />} />
            <Route path="/admin/notices" element={<NoticeContent />} />
            <Route path="/admin/projects" element={<ProjectContent />} />
            <Route
                path="/admin/members/all"
                element={<AllMembers />}
              />

              <Route
                path="/admin/members/requests"
                element={<MemberRequests />}
              />

              <Route
                path="/admin/members/:id"
                element={<MemberDetails />}
              />
          </Route>
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<NewsDetail />} />
          <Route path="/members" element={<Members />} />
          <Route path="/notices" element={<ManagedContentPage type="NOTICE" title="Notices" eyebrow="Stay informed" description="Important announcements and updates from Sevoday Foundation." />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/certificates" element={<ManagedContentPage type="CERTIFICATE" title="Certificates" eyebrow="Our credentials" description="Recognitions and certifications that reflect our commitment to responsible community work." />} />
          <Route path="/achievements" element={<ManagedContentPage type="ACHIEVEMENT" title="Achievements" eyebrow="Our milestones" description="A record of the progress created together with communities and partners." />} />
          <Route path="/policies" element={<ManagedContentPage type="POLICY" title="Policies" eyebrow="Transparency" description="Our policies and commitments guide how Sevoday Foundation works." />} />
          {placeholderPages.map(([path, title]) => (
            <Route
              key={path}
              path={`/${path}`}
              element={
                <PlaceholderPage
                  title={title}
                  description={`${title} content is being prepared for the Sevoday Foundation website.`}
                />
              }
            />
          ))}
        </Route>
        <Route
          path="*"
          element={
            <PlaceholderPage
              title="Page not found"
              description="The page you are looking for does not exist."
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
