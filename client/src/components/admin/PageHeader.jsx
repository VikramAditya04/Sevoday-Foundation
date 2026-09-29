export default function PageHeader({ breadcrumb, title, action }) {
  return (
    <div className="mb-6 flex flex-col gap-4 border-b border-[#dfe8df] pb-5 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-medium text-[#2F6B3F]">{breadcrumb}</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#123524]">{title}</h1>
      </div>

      {action ? <div>{action}</div> : null}
    </div>
  );
}
