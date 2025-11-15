"use client";

import { useState, useEffect } from "react";
import { ESRS_FIELDS, suggestEsrsCode } from "@/lib/esrsMap";

interface MappingEditorProps {
  dataset: {
    id: string;
    columns: Array<{ name: string; type: string }>;
  } | null;
  existingMappings: Array<{
    id: string;
    fieldName: string;
    esrsCode: string;
    esrsLabel: string;
  }>;
}

export function MappingEditor({ dataset, existingMappings }: MappingEditorProps) {
  const [mappings, setMappings] = useState<
    Array<{ fieldName: string; esrsCode: string }>
  >([]);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  useEffect(() => {
    if (dataset) {
      // Initialize mappings with existing or suggestions
      const initialMappings = dataset.columns.map((col) => {
        const existing = existingMappings.find((m) => m.fieldName === col.name);
        if (existing) {
          return { fieldName: col.name, esrsCode: existing.esrsCode };
        }
        const suggestion = suggestEsrsCode(col.name);
        return { fieldName: col.name, esrsCode: suggestion?.code || "" };
      });
      setMappings(initialMappings);
    }
  }, [dataset, existingMappings]);

  const handleMappingChange = (fieldName: string, esrsCode: string) => {
    setMappings((prev) =>
      prev.map((m) => (m.fieldName === fieldName ? { ...m, esrsCode } : m))
    );
  };

  const handleSave = async () => {
    if (!dataset) return;

    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch("/api/mappings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          datasetId: dataset.id,
          mappings,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save mappings");
      }

      setMessage({ type: "success", text: "Mappings saved successfully" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to save mappings",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleGenerateXbrl = async () => {
    if (!dataset) return;

    setGenerating(true);
    setMessage(null);

    try {
      // First save mappings
      await handleSave();

      const response = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generateXbrl",
          datasetId: dataset.id,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to generate XBRL");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "green-ledger-csrd-report.xbrl";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setMessage({ type: "success", text: "XBRL file generated and downloaded" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to generate XBRL",
      });
    } finally {
      setGenerating(false);
    }
  };

  if (!dataset) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <p className="text-gray-500 text-center py-8">
          No dataset found. Please upload a dataset first.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Map Fields to ESRS Taxonomy</h2>
      <p className="text-sm text-gray-600 mb-6">
        Map your dataset columns to ESRS taxonomy fields. This mapping will be used to generate
        CSRD reports.
      </p>

      {message && (
        <div
          className={`mb-4 px-4 py-3 rounded ${
            message.type === "success"
              ? "bg-blue-50 border border-blue-200 text-blue-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Column Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ESRS Mapping
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dataset.columns.map((col) => {
              const currentMapping = mappings.find((m) => m.fieldName === col.name);
              return (
                <tr key={col.name}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {col.name}
                    <span className="ml-2 text-gray-400">({col.type})</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <select
                      value={currentMapping?.esrsCode || ""}
                      onChange={(e) => handleMappingChange(col.name, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">-- No mapping --</option>
                      {ESRS_FIELDS.map((field) => (
                        <option key={field.code} value={field.code}>
                          {field.code} - {field.label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex space-x-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium shadow-sm"
        >
          {saving ? "Saving..." : "Save Mappings"}
        </button>
        <button
          onClick={handleGenerateXbrl}
          disabled={generating || saving}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium shadow-sm"
        >
          {generating ? "Generating..." : "Generate XBRL"}
        </button>
      </div>
    </div>
  );
}

