import { PageShell } from "@/components/layout/PageShell";
import { ReportEditor } from "@/components/reports/ReportEditor";
import { prisma } from "@/lib/prisma";
import { buildDefaultSections } from "@/lib/reportTemplate";

export const dynamic = 'force-dynamic';

export default async function ReportsPage() {
  // Get latest dataset with sections
  let dataset: Awaited<ReturnType<typeof prisma.dataset.findFirst>> & { fieldMappings: any[]; reportSections: any[] } | null = null;
  let sections: any[] = [];
  
  try {
    dataset = await prisma.dataset.findFirst({
      orderBy: { createdAt: "desc" },
      include: { fieldMappings: true, reportSections: true },
    });

    sections = dataset?.reportSections || [];

    // Generate default sections if none exist
    if (dataset && sections.length === 0 && dataset.fieldMappings.length > 0) {
      const defaultSections = buildDefaultSections(dataset, dataset.fieldMappings);
      const datasetId = dataset.id; // Extract to satisfy TypeScript
      const createdSections = await Promise.all(
        defaultSections.map((section) =>
          prisma.reportSection.create({
            data: {
              datasetId: datasetId,
              sectionCode: section.sectionCode,
              title: section.title,
              content: section.content,
            },
          })
        )
      );
      sections = createdSections;
    }
  } catch (error) {
    console.error("Database error:", error);
    // Continue with empty state if database error
  }

  return (
    <PageShell breadcrumbs={[{ label: "Home", href: "/" }, { label: "CSRD Reports" }]}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">CSRD Report Editor</h1>
          <p className="text-lg text-gray-600 mb-4">
            Review, edit, and export your CSRD compliance report with E1 (Climate), S1 (Workforce), and G1 (Governance) sections.
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <strong>Tip:</strong> Use Preview mode to see how your report will look. Switch to Edit mode to make changes. 
              Export to PDF, HTML, or XBRL when ready.
            </p>
          </div>
        </div>

        {!dataset ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📄</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Data Available</h2>
            <p className="text-gray-600 mb-6">
              Upload data and map fields to ESRS first, then generate your CSRD report.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="/upload"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                Upload Data
              </a>
              <a
                href="/mappings"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Map Fields
              </a>
            </div>
          </div>
        ) : (
          <ReportEditor
            dataset={dataset ? { id: dataset.id } : null}
            sections={sections}
          />
        )}
      </div>
    </PageShell>
  );
}

