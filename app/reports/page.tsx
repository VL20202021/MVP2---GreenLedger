import { PageShell } from "@/components/layout/PageShell";
import { ReportEditor } from "@/components/reports/ReportEditor";
import { prisma } from "@/lib/prisma";
import { buildDefaultSections } from "@/lib/reportTemplate";

export default async function ReportsPage() {
  // Get latest dataset with sections
  const dataset = await prisma.dataset.findFirst({
    orderBy: { createdAt: "desc" },
    include: { fieldMappings: true, reportSections: true },
  });

  let sections = dataset?.reportSections || [];

  // Generate default sections if none exist
  if (dataset && sections.length === 0 && dataset.fieldMappings.length > 0) {
    const defaultSections = buildDefaultSections(dataset, dataset.fieldMappings);
    const createdSections = await Promise.all(
      defaultSections.map((section) =>
        prisma.reportSection.create({
          data: {
            datasetId: dataset.id,
            sectionCode: section.sectionCode,
            title: section.title,
            content: section.content,
          },
        })
      )
    );
    sections = createdSections;
  }

  return (
    <PageShell breadcrumbs={[{ label: "Home", href: "/" }, { label: "CSRD Reports" }]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">CSRD Report Editor</h1>
          <p className="text-gray-600">
            Review and edit your CSRD report sections. Export to HTML, PDF, or XBRL format.
          </p>
        </div>

        <ReportEditor
          dataset={dataset ? { id: dataset.id } : null}
          sections={sections}
        />
      </div>
    </PageShell>
  );
}

