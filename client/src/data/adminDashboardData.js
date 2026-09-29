import {
  BadgeDollarSign,
  BriefcaseBusiness,
  CircleDollarSign,
  HandCoins,
  HeartHandshake,
  Inbox,
  Mail,
  PiggyBank,
  Users,
} from "lucide-react";

export const dashboardStats = [
  {
    title: "Total Donations",
    value: "₹1,600.00",
    subtitle: "Balance: ₹1,562.00",
    icon: CircleDollarSign,
    accent: "sky",
  },
  {
    title: "Members",
    value: "3",
    subtitle: "Total registered",
    icon: Users,
    accent: "purple",
  },
  {
    title: "Donors",
    value: "1",
    subtitle: "Active supporters",
    icon: BadgeDollarSign,
    accent: "rose",
  },
  {
    title: "Projects",
    value: "2 / 3",
    subtitle: "Ongoing / Total",
    icon: BriefcaseBusiness,
    accent: "amber",
  },
  {
    title: "Campaigns",
    value: "1",
    subtitle: "Active campaigns",
    icon: HandCoins,
    accent: "emerald",
  },
  {
    title: "Beneficiaries",
    value: "0",
    subtitle: "Total helped",
    icon: HeartHandshake,
    accent: "pink",
  },
  {
    title: "Pending",
    value: "₹1.00",
    subtitle: "Pending donations",
    icon: PiggyBank,
    accent: "orange",
  },
  {
    title: "Inquiries",
    value: "1",
    subtitle: "Unread messages",
    icon: Mail,
    accent: "indigo",
  },
];

export const recentDonations = [
  {
    id: 1,
    donor: "KANHAIYA",
    amount: "₹1.00",
    method: "Razorpay",
    status: "Pending",
    date: "20 Sep 2026",
  },
  {
    id: 2,
    donor: "REFF",
    amount: "₹500.00",
    method: "Razorpay",
    status: "Failed",
    date: "20 Sep 2026",
  },
  {
    id: 3,
    donor: "KANHAIYA LAL SINGH",
    amount: "₹100.00",
    method: "Razorpay",
    status: "Failed",
    date: "15 Sep 2026",
  },
  {
    id: 4,
    donor: "KUMAR SAURABH",
    amount: "₹10.00",
    method: "Razorpay",
    status: "Failed",
    date: "15 Sep 2026",
  },
  {
    id: 5,
    donor: "KANHAIYA LAL SINGH",
    amount: "₹1,600.00",
    method: "Cash",
    status: "Completed",
    date: "15 Sep 2026",
  },
];

export const recentProjects = [
  {
    id: 1,
    name: "Project Hariyali 🌱",
    startDate: "01 Sep 2026",
    status: "Ongoing",
  },
  {
    id: 2,
    name: "Project Sehat ❤️",
    startDate: "01 Apr 2026",
    status: "Completed",
  },
  {
    id: 3,
    name: "Project Udaan 🕊️",
    startDate: "01 Sep 2026",
    status: "Ongoing",
  },
];

export const adminQuickLinks = [
  {
    label: "Home",
    path: "/admin/dashboard",
    icon: "home",
  },
  {
    label: "Content",
    path: "/admin/content",
    icon: "content",
    children: [
      { label: "Slider", path: "/admin/content/slider" },
      { label: "About", path: "/admin/content/about" },
      { label: "Gallery", path: "/admin/content/gallery" },
      { label: "Certificates", path: "/admin/content/certificates" },
      { label: "Achievements", path: "/admin/content/achievements" },
      { label: "Policies", path: "/admin/content/policies" },
    ],
  },
  {
    label: "News",
    path: "/admin/news",
    icon: "news",
  },
  {
    label: "Notices",
    path: "/admin/notices",
    icon: "notices",
  },
  {
    label: "Projects",
    path: "/admin/projects",
    icon: "projects",
  },
  {
    label: "Campaigns",
    path: "/admin/campaigns",
    icon: "campaigns",
  },
  {
    label: "Careers",
    path: "/admin/careers",
    icon: "careers",
    children: [
      { label: "Jobs", path: "/admin/careers/jobs" },
      { label: "Interns", path: "/admin/careers/interns" },
      { label: "Employees", path: "/admin/careers/employees" },
      { label: "Applications", path: "/admin/careers/applications" },
    ],
  },
  {
    label: "Messages",
    path: "/admin/messages",
    icon: "messages",
  },
  {
    label: "Members",
    path: "/admin/members",
    icon: "members",
    children: [
      { label: "All Members", path: "/admin/members/all" },
      { label: "Member Requests", path: "/admin/members/requests" },
      { label: "Membership Fees", path: "/admin/members/fees" },
      { label: "Designations", path: "/admin/members/designations" },
    ],
  },
  {
    label: "People",
    path: "/admin/people",
    icon: "people",
    children: [
      { label: "Volunteers", path: "/admin/people/volunteers" },
      { label: "Staff", path: "/admin/people/staff" },
    ],
  },
  {
    label: "Finance",
    path: "/admin/finance",
    icon: "finance",
  },
  {
    label: "Partners",
    path: "/admin/partners",
    icon: "partners",
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: "users",
  },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: "settings",
    children: [
      { label: "Organization", path: "/admin/settings/organization" },
      { label: "SMTP Settings", path: "/admin/settings/smtp" },
      { label: "Payment Gateways", path: "/admin/settings/payments" },
    ],
  },
];
