"use client";

import { useState, useEffect } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { FileUploadForm } from "@/components/upload/FileUploadForm";
import { DatasetTable } from "@/components/upload/DatasetTable";

export default function UploadPage() {
  const [dataset, setDataset] = useState<any>(null);

  useEffect(() => {
    // Fetch latest dataset on mount
    fetch("/api/mappings")
      .then((res) => res.json())
      .then((data) => {
        if (data.dataset) {
          setDataset(data.dataset);
        }
      })
      .catch((err) => console.error("Failed to fetch dataset:", err));
  }, []);

  const handleUploadSuccess = (newDataset: any) => {
    setDataset(newDataset);
  };

  return (
    <PageShell breadcrumbs={[{ label: "Home", href: "/" }, { label: "Upload dataset" }]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Upload Your ESG Data</h1>
          <p className="text-base text-gray-600 mb-4">
            Upload CSV or Excel files with your ESG data—emissions, workforce, governance metrics.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <span className="text-blue-600 font-semibold">Supported formats:</span> CSV (.csv), Excel (.xlsx, .xls)
            </p>
            <p className="text-sm text-gray-600 mt-2">
              <span className="text-gray-700">Example columns:</span> isin, market_value, co2_emissions, employees
            </p>
          </div>
        </div>

        <FileUploadForm onUploadSuccess={handleUploadSuccess} />

        {dataset && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Dataset Preview</h2>
            <DatasetTable dataset={dataset} />
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-700 text-sm font-medium mb-2">✓ Dataset uploaded successfully!</p>
              <p className="text-sm text-gray-700">
                Next: Go to <a href="/mappings" className="text-blue-600 underline font-semibold">Mappings</a> to map fields to ESRS taxonomy.
              </p>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}

