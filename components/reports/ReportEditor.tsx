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
  const [viewMode, setViewMode] = useState<"edit" | "preview">("preview");

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
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <p className="text-gray-500 text-center py-8">
          No dataset found. Please upload and map data first.
        </p>
      </div>
    );
  }

  if (sections.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <p className="text-gray-500 text-center py-8">
          No report sections found. Please map your data fields first.
        </p>
      </div>
    );
  }

  const renderContent = (content: string) => {
    // Convert markdown-like formatting to HTML
    return content
      .split('\n')
      .map((line, i) => {
        if (line.startsWith('## ')) {
          return <h2 key={i} className="text-2xl font-bold mt-8 mb-4 text-gray-900">{line.substring(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={i} className="text-xl font-semibold mt-6 mb-3 text-gray-800">{line.substring(4)}</h3>;
        }
        if (line.startsWith('- ') || line.startsWith('* ')) {
          return <li key={i} className="ml-6 mb-2 text-gray-700">{line.substring(2)}</li>;
        }
        if (line.trim() === '') {
          return <br key={i} />;
        }
        return <p key={i} className="mb-4 text-gray-700 leading-relaxed">{line}</p>;
      });
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-gray-900">CSRD Report</h2>
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("preview")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "preview"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => setViewMode("edit")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "edit"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Edit
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm font-medium transition-colors shadow-sm"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <div className="relative group">
              <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm font-medium transition-colors">
                Export
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                <button
                  onClick={() => handleExport("pdf")}
                  disabled={!!exporting}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-md"
                >
                  {exporting === "pdf" ? "Exporting PDF..." : "📄 Export PDF"}
                </button>
                <button
                  onClick={() => handleExport("html")}
                  disabled={!!exporting}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  {exporting === "html" ? "Exporting HTML..." : "🌐 Export HTML"}
                </button>
                <button
                  onClick={() => handleExport("xbrl")}
                  disabled={!!exporting}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-b-md"
                >
                  {exporting === "xbrl" ? "Exporting XBRL..." : "📊 Export XBRL"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {message && (
          <div
            className={`mt-4 px-4 py-3 rounded-md ${
              message.type === "success"
                ? "bg-blue-50 border border-blue-200 text-blue-700"
                : "bg-red-50 border border-red-200 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>

      {/* Report Pages View */}
      {viewMode === "preview" ? (
        <div className="bg-gray-100 p-8 min-h-screen">
          <div className="max-w-4xl mx-auto space-y-8">
            {sections.map((section, index) => (
              <div key={section.id} className="report-page">
                <div className="mb-8 pb-4 border-b-2 border-gray-300">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      {section.sectionCode}
                    </span>
                    <span className="text-xs text-gray-400">Page {index + 1}</span>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mt-2">{section.title}</h1>
                </div>
                <div className="prose prose-lg max-w-none">
                  {renderContent(section.content)}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Edit Mode */
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.id} className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      {section.sectionCode}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mt-1">{section.title}</h3>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <textarea
                  value={section.content}
                  onChange={(e) => handleContentChange(section.id, e.target.value)}
                  rows={20}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm leading-relaxed font-sans resize-y"
                  placeholder="Enter report content here. Use ## for headings, - for lists..."
                />
                <div className="mt-3 text-xs text-gray-500">
                  <p>💡 Tip: Use <code className="bg-gray-100 px-1 rounded">## Heading</code> for headings, <code className="bg-gray-100 px-1 rounded">- Item</code> for lists</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

