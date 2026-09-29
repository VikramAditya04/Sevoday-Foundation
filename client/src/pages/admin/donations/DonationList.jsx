import { useEffect, useState } from "react";
import PageHeader from "../../../components/admin/PageHeader";
import DataTable from "../../../components/admin/DataTable";
import StatCard from "../../../components/admin/StatCard";
import StatusBadge from "../../../components/admin/StatusBadge";
import { CircleDollarSign, Clock3, Users, WalletCards } from "lucide-react";
import { getAdminDonations } from "../../../services/donationService";

const columns = [
  { key: "donor", label: "DONOR", className: "min-w-[190px]" },
  { key: "contact", label: "CONTACT", className: "min-w-[220px]" },
  { key: "amount", label: "AMOUNT", className: "min-w-[120px]" },
  { key: "status", label: "STATUS", className: "min-w-[120px]" },
  { key: "payment", label: "PAYMENT REFERENCE", className: "min-w-[220px]" },
  { key: "date", label: "DATE", className: "min-w-[130px]" },
];

function formatCurrency(amount) {
  return `₹${Number(amount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
}

function formatDate(value) {
  return value
    ? new Date(value).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";
}

function formatStatus(status) {
  return status === "PAID"
    ? "Completed"
    : status === "PENDING"
      ? "Pending"
      : "Failed";
}

export default function DonationList() {
  const [data, setData] = useState({ stats: null, donations: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAdminDonations()
      .then((response) =>
        setData({ stats: response.stats, donations: response.donations }),
      )
      .catch((requestError) => setError(requestError.message))
      .finally(() => setIsLoading(false));
  }, []);

  const rows = data.donations.map((donation) => ({
    id: donation.id,
    donor: (
      <div>
        <p className="font-semibold text-[#123524]">{donation.donorName}</p>
        <p className="mt-1 text-xs text-slate-500">
          {donation.address}, {donation.city}, {donation.state}
        </p>
      </div>
    ),
    contact: (
      <div>
        <p>{donation.email}</p>
        <p className="mt-1 text-xs text-slate-500">{donation.phone}</p>
      </div>
    ),
    amount: formatCurrency(donation.amount),
    status: formatStatus(donation.status),
    payment: donation.razorpayPaymentId || donation.razorpayOrderId || "-",
    date: formatDate(donation.createdAt),
  }));

  return (
    <div className="rounded-2xl border border-[#dfe8df] bg-[#f7f6f1] p-3 sm:p-4 lg:p-5">
      <PageHeader breadcrumb="Finance / Donations" title="Donations" />

      {error ? (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Received"
          value={formatCurrency(data.stats?.totalAmount)}
          subtitle={`${data.stats?.paidDonations || 0} completed payments`}
          icon={CircleDollarSign}
          accent="sky"
        />
        <StatCard
          title="Unique Donors"
          value={String(data.stats?.uniqueDonors || 0)}
          subtitle="Paid supporters"
          icon={Users}
          accent="rose"
        />
        <StatCard
          title="Pending Amount"
          value={formatCurrency(data.stats?.pendingAmount)}
          subtitle={`${data.stats?.pendingDonations || 0} pending payments`}
          icon={Clock3}
          accent="amber"
        />
        <StatCard
          title="All Donations"
          value={String(data.stats?.totalDonations || 0)}
          subtitle={`${data.stats?.failedDonations || 0} failed payments`}
          icon={WalletCards}
          accent="emerald"
        />
      </div>

      <section className="rounded-xl border border-[#dfe8df] bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-[#123524]">
              All Donations
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Every donation order recorded by the payment system.
            </p>
          </div>
          {isLoading ? (
            <span className="text-sm text-slate-500">Loading...</span>
          ) : null}
        </div>
        <DataTable
          columns={columns}
          rows={rows}
          renderCell={(column, row) =>
            column.key === "status" ? (
              <StatusBadge status={row.status} />
            ) : (
              row[column.key]
            )
          }
          getRowKey={(row) => row.id}
          emptyMessage={
            isLoading ? "Loading donations..." : "No donations found."
          }
        />
      </section>
    </div>
  );
}
