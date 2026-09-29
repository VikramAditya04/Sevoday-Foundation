export default function DataTable({ columns, rows, renderCell, emptyMessage, getRowKey }) {
  if (!rows || rows.length === 0) {
    return (
      <div className="flex min-h-[180px] items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-10 text-base text-slate-500">
        {emptyMessage || "No records found."}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-left">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 ${column.className || ""}`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={getRowKey ? getRowKey(row, rowIndex) : row.id || rowIndex} className="border-t border-slate-200 align-middle">
                {columns.map((column) => (
                  <td key={`${column.key}-${rowIndex}`} className={`border-t border-slate-200 px-4 py-3 text-sm text-slate-700 ${column.cellClassName || ""}`}>
                    {renderCell ? renderCell(column, row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
