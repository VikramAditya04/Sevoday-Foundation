const statusStyles = {
  pending: "border border-amber-200 bg-amber-100 text-amber-700",
  failed: "border border-red-200 bg-red-100 text-red-700",
  completed: "border border-emerald-200 bg-emerald-100 text-emerald-700",
  ongoing: "border border-sky-200 bg-sky-100 text-sky-700",
  active: "border border-emerald-200 bg-emerald-100 text-emerald-700",
  default: "border border-slate-200 bg-slate-100 text-slate-700",
};

export default function StatusBadge({ status = "default" }) {
  const normalized = String(status).trim().toLowerCase();
  const styleKey = normalized.includes("pending")
    ? "pending"
    : normalized.includes("failed")
      ? "failed"
      : normalized.includes("completed") || normalized.includes("active")
        ? "completed"
        : normalized.includes("ongoing")
          ? "ongoing"
          : "default";

  return (
    <span className={`inline-flex items-center justify-center rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${statusStyles[styleKey]}`}>
      {status}
    </span>
  );
}
