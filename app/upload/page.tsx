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
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Upload Your ESG Data</h1>
          <p className="text-lg text-gray-600 mb-2">
            Start by uploading your ESG data in CSV or Excel format.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <p className="text-sm text-blue-800">
              <strong>Supported formats:</strong> CSV (.csv), Excel (.xlsx, .xls)
            </p>
            <p className="text-sm text-blue-700 mt-2">
              <strong>Example columns:</strong> isin, market_value, co2_emissions, employees, etc.
            </p>
          </div>
        </div>

        <FileUploadForm onUploadSuccess={handleUploadSuccess} />

        {dataset && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Dataset Preview</h2>
            <DatasetTable dataset={dataset} />
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-medium mb-2">✓ Dataset uploaded successfully!</p>
              <p className="text-sm text-green-700">
                Next step: Go to <a href="/mappings" className="underline font-semibold">Mappings</a> to map your fields to ESRS taxonomy.
              </p>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}

