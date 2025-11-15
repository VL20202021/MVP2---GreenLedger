import { PageShell } from "@/components/layout/PageShell";
import { MappingEditor } from "@/components/mappings/MappingEditor";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function MappingsPage() {
  // Get latest dataset with mappings
  let dataset: Awaited<ReturnType<typeof prisma.dataset.findFirst>> & { fieldMappings: any[] } | null = null;
  
  try {
    dataset = await prisma.dataset.findFirst({
      orderBy: { createdAt: "desc" },
      include: { fieldMappings: true },
    });
  } catch (error) {
    console.error("Database error:", error);
    // Continue with null dataset if database error
  }

  return (
    <PageShell breadcrumbs={[{ label: "Home", href: "/" }, { label: "ESRS Mappings" }]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Map Fields to ESRS Taxonomy</h1>
          <p className="text-base text-gray-600 mb-4">
            Connect your data columns to ESRS (European Sustainability Reporting Standards) fields for CSRD compliance.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <span className="text-blue-600 font-semibold">Auto-suggest:</span> Green Ledger suggests ESRS mappings based on column names. 
              Review and adjust as needed.
            </p>
          </div>
        </div>

        {!dataset ? (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📋</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Dataset Found</h2>
            <p className="text-sm text-gray-600 mb-6">
              Upload a dataset first to start mapping fields to ESRS taxonomy.
            </p>
            <a
              href="/upload"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              Upload Dataset
            </a>
          </div>
        ) : (
          <MappingEditor
            dataset={dataset ? { id: dataset.id, columns: dataset.columns as any } : null}
            existingMappings={dataset?.fieldMappings || []}
          />
        )}
      </div>
    </PageShell>
  );
}

