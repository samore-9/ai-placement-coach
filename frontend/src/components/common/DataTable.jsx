import { Card } from '@/components/ui/card';

export function DataTable({ columns, rows, keyField = '_id', emptyText = 'No records found.' }) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-ink-100 dark:border-ink-700/60">
              {columns.map((col) => (
                <th key={col.key} className="px-5 py-3 font-medium text-ink-400 whitespace-nowrap">{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-5 py-10 text-center text-ink-400">{emptyText}</td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row[keyField]} className="border-b border-ink-100 last:border-0 dark:border-ink-700/60">
                  {columns.map((col) => (
                    <td key={col.key} className="px-5 py-3 align-middle text-ink-700 dark:text-ink-100 whitespace-nowrap">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
