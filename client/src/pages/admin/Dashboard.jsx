import { useEffect, useState } from "react";
import { CircleDollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/admin/PageHeader";
import StatCard from "../../components/admin/StatCard";
import StatusBadge from "../../components/admin/StatusBadge";
import DataTable from "../../components/admin/DataTable";
import { dashboardStats } from "../../data/adminDashboardData";
import { getAdminDonations } from "../../services/donationService";
import { getAdminProjects } from "../../services/projectService";

const donationColumns = [
  { key: "donor", label: "DONOR", className: "w-[28%]" },
  { key: "amount", label: "AMOUNT", className: "w-[18%]" },
  { key: "method", label: "METHOD", className: "w-[18%]" },
  { key: "status", label: "STATUS", className: "w-[18%]" },
  { key: "date", label: "DATE", className: "w-[18%]" },
];

const projectColumns = [
  { key: "name", label: "PROJECT", className: "w-[44%]" },
  { key: "startDate", label: "START DATE", className: "w-[22%]" },
  { key: "status", label: "STATUS", className: "w-[18%]" },
  { key: "action", label: "ACTION", className: "w-[16%]" },
];

function formatCurrency(amount) {
  return `₹${Number(amount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
}

function formatDate(value) {
  return value
    ? new Date(value).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
    : "-";
}

function formatDonationStatus(status) {
  return status === "PAID" ? "Completed" : status === "PENDING" ? "Pending" : "Failed";
}

function formatProjectStatus(status) {
  return status ? `${status.charAt(0)}${status.slice(1).toLowerCase()}` : "-";
}

export default function Dashboard() {
  const [donationData, setDonationData] = useState({ stats: null, donations: [] });
  const [isLoadingDonations, setIsLoadingDonations] = useState(true);
  const [donationError, setDonationError] = useState("");
  const [projects, setProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [projectError, setProjectError] = useState("");

  useEffect(() => {
    getAdminDonations()
      .then((data) => setDonationData({ stats: data.stats, donations: data.donations }))
      .catch((error) => setDonationError(error.message))
      .finally(() => setIsLoadingDonations(false));
    getAdminProjects()
      .then((data) => setProjects(data.projects || []))
      .catch((error) => setProjectError(error.message))
      .finally(() => setIsLoadingProjects(false));
  }, []);

  const stats = donationData.stats;
  const dynamicStats = dashboardStats.map((item) => {
    if (item.title === "Total Donations" && stats) {
      return { ...item, value: formatCurrency(stats.totalAmount), subtitle: `${stats.paidDonations} completed payments` };
    }
    if (item.title === "Donors" && stats) {
      return { ...item, value: String(stats.uniqueDonors), subtitle: "Unique paid supporters" };
    }
    if (item.title === "Pending" && stats) {
      return { ...item, value: formatCurrency(stats.pendingAmount), subtitle: `${stats.pendingDonations} awaiting payment` };
    }
    if (item.title === "Projects") {
      const ongoing = projects.filter((project) => project.status === "ONGOING").length;
      return { ...item, value: `${ongoing} / ${projects.length}`, subtitle: "Ongoing / Total" };
    }
    return item;
  });

  const recentDonations = donationData.donations.slice(0, 5).map((donation) => ({
    id: donation.id,
    donor: donation.donorName,
    amount: formatCurrency(donation.amount),
    method: "Razorpay",
    status: formatDonationStatus(donation.status),
    date: formatDate(donation.createdAt),
  }));
  const recentProjects = projects.slice(0, 5).map((project) => ({
    id: project.id,
    name: project.title,
    startDate: formatDate(project.startDate),
    status: formatProjectStatus(project.status),
  }));

  return (
    <div className="rounded-2xl border border-[#dfe8df] bg-[#f7f6f1] p-3 sm:p-4 lg:p-5">
      <PageHeader
        breadcrumb="Dashboard"
        title="Dashboard"
        action={
          <Link
            to="/admin/donations"
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-[#123552] px-4 py-2.5 text-sm font-semibold text-white! shadow-sm transition hover:bg-[#081e35] hover:text-white!"
          >
            <CircleDollarSign className="h-4 w-4 text-white" />
            View Donations
          </Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dynamicStats.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            subtitle={item.subtitle}
            icon={item.icon}
            accent={item.accent}
          />
        ))}
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-2">
        <section className="rounded-xl border border-[#dfe8df] bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold tracking-tight text-[#123524]">Recent Donations</h2>
            <Link to="/admin/donations" className="text-sm font-medium text-[#2F6B3F] transition hover:text-[#1f4a2c]">
              View all
            </Link>
          </div>

          <DataTable
            columns={donationColumns}
            rows={recentDonations}
            renderCell={(column, row) => {
              if (column.key === "status") {
                return <StatusBadge status={row.status} />;
              }

              return row[column.key];
            }}
            getRowKey={(row) => row.id}
            emptyMessage={isLoadingDonations ? "Loading donations..." : donationError || "No donations found."}
          />
        </section>

        <section className="rounded-xl border border-[#dfe8df] bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold tracking-tight text-[#123524]">Recent Projects</h2>
            <Link to="/admin/projects" className="text-sm font-medium text-[#2F6B3F] transition hover:text-[#1f4a2c]">
              View all
            </Link>
          </div>

          <DataTable
            columns={projectColumns}
            rows={recentProjects}
            renderCell={(column, row) => {
              if (column.key === "status") {
                return <StatusBadge status={row.status} />;
              }

              if (column.key === "action") {
                return (
                  <Link
                    to="/admin/projects"
                    className="inline-flex items-center justify-center rounded-md bg-[#eaf3ec] px-3 py-1.5 text-xs font-semibold text-[#1f4a2c] transition hover:bg-[#dfeedd]"
                  >
                    Manage
                  </Link>
                );
              }

              return row[column.key];
            }}
            getRowKey={(row) => row.id}
            emptyMessage={isLoadingProjects ? "Loading projects..." : projectError || "No projects found."}
          />
        </section>
      </div>
    </div>
  );
}
