"use client";

import { useState, useEffect } from "react";

interface ReportEditorProps {
  dataset: { id: string } | null;
  sections: Array<{
    id: string;
    sectionCode: string;
    title: string;
    content: string;
  }>;
}

export function ReportEditor({ dataset, sections: initialSections }: ReportEditorProps) {
  const [sections, setSections] = useState(initialSections);
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  useEffect(() => {
    setSections(initialSections);
  }, [initialSections]);

  const handleContentChange = (id: string, content: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, content } : s))
    );
  };

  const handleSave = async () => {
    if (!dataset) return;

    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save",
          datasetId: dataset.id,
          sections,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save report");
      }

      setMessage({ type: "success", text: "Report saved successfully" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to save report",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleExport = async (format: "html" | "pdf" | "xbrl") => {
    if (!dataset) return;

    setExporting(format);
    setMessage(null);

    try {
      const actionMap = {
        html: "exportHtml",
        pdf: "exportPdf",
        xbrl: "generateXbrl",
      };

      const response = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: actionMap[format],
          datasetId: dataset.id,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || `Failed to export ${format.toUpperCase()}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `green-ledger-csrd-report.${format === "xbrl" ? "xbrl" : format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setMessage({ type: "success", text: `${format.toUpperCase()} exported successfully` });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : `Failed to export ${format.toUpperCase()}`,
      });
    } finally {
      setExporting(null);
    }
  };

  if (!dataset) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-500 text-center py-8">
          No dataset found. Please upload and map data first.
        </p>
      </div>
    );
  }

  if (sections.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-500 text-center py-8">
          No report sections found. Please map your data fields first.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">CSRD sections (E1 / S1 / G1)</h2>
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => handleExport("html")}
              disabled={!!exporting}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {exporting === "html" ? "Exporting..." : "Export HTML"}
            </button>
            <button
              onClick={() => handleExport("pdf")}
              disabled={!!exporting}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {exporting === "pdf" ? "Exporting..." : "Export PDF"}
            </button>
            <button
              onClick={() => handleExport("xbrl")}
              disabled={!!exporting}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {exporting === "xbrl" ? "Exporting..." : "Export XBRL"}
            </button>
          </div>
        </div>

        {message && (
          <div
            className={`mb-4 px-4 py-3 rounded ${
              message.type === "success"
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-red-50 border border-red-200 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>

      {sections.map((section) => (
        <div key={section.id} className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
          <textarea
            value={section.content}
            onChange={(e) => handleContentChange(section.id, e.target.value)}
            rows={12}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 font-mono text-sm"
          />
        </div>
      ))}
    </div>
  );
}

