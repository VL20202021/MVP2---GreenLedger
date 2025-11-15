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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Upload Dataset</h1>
          <p className="text-gray-600">
            Upload your ESG data in CSV or Excel format. Supported formats: .csv, .xlsx, .xls
          </p>
        </div>

        <FileUploadForm onUploadSuccess={handleUploadSuccess} />

        <DatasetTable dataset={dataset} />
      </div>
    </PageShell>
  );
}

