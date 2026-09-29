export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  accent = "slate",
}) {
  const accentStyles = {
    sky: "bg-[#eaf3ec] text-[#2F6B3F]",
    purple: "bg-[#f0efe9] text-[#123524]",
    rose: "bg-[#f9efe9] text-[#8d4b36]",
    amber: "bg-[#f7f1d8] text-[#a16a1a]",
    emerald: "bg-[#eaf7ee] text-[#2d7d4d]",
    pink: "bg-[#fceaf1] text-[#9e3f69]",
    orange: "bg-[#fff3db] text-[#b96d17]",
    indigo: "bg-[#edf3ff] text-[#3e5f9f]",
    slate: "bg-[#eef3f8] text-[#123524]",
  };

  return (
    <div className="rounded-xl border border-[#dfe8df] bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-[#51665a]">{title}</p>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-[28px] font-semibold leading-none tracking-tight text-[#123524]">
              {value}
            </span>
          </div>
          <p className="mt-3 text-sm text-[#6b7d73]">{subtitle}</p>
        </div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-lg ${accentStyles[accent] || accentStyles.slate}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
