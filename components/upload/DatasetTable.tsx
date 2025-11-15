"use client";

interface DatasetTableProps {
  dataset: {
    id: string;
    name: string;
    fileName: string;
    rows: Record<string, string | number | null>[];
    columns: Array<{ name: string; type: string }>;
  } | null;
}

export function DatasetTable({ dataset }: DatasetTableProps) {
  if (!dataset) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <p className="text-gray-500 text-center py-8">
          No dataset uploaded yet. Upload a file to see a preview.
        </p>
      </div>
    );
  }

  const previewRows = dataset.rows.slice(0, 5);
  const hasMore = dataset.rows.length > 5;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Dataset Preview</h2>
      <div className="mb-2 text-sm text-gray-600">
        <p>
          <strong>Name:</strong> {dataset.name}
        </p>
        <p>
          <strong>File:</strong> {dataset.fileName}
        </p>
        <p>
          <strong>Rows:</strong> {dataset.rows.length} | <strong>Columns:</strong>{" "}
          {dataset.columns.length}
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {dataset.columns.map((col) => (
                <th
                  key={col.name}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {col.name}
                  <span className="ml-2 text-gray-400">({col.type})</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {previewRows.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                {dataset.columns.map((col) => (
                  <td key={col.name} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row[col.name] !== null && row[col.name] !== undefined
                      ? String(row[col.name])
                      : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hasMore && (
        <p className="mt-4 text-sm text-gray-500 text-center">
          Showing first 5 rows of {dataset.rows.length} total rows
        </p>
      )}
    </div>
  );
}

