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
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Map Fields to ESRS Taxonomy</h1>
          <p className="text-lg text-gray-600 mb-4">
            Connect your data columns to ESRS (European Sustainability Reporting Standards) fields for CSRD compliance.
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <strong>How it works:</strong> Green Ledger automatically suggests ESRS mappings based on your column names. 
              Review the suggestions and adjust as needed. Once mapped, you can generate compliant CSRD reports.
            </p>
          </div>
        </div>

        {!dataset ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📋</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Dataset Found</h2>
            <p className="text-gray-600 mb-6">
              Upload a dataset first to start mapping fields to ESRS taxonomy.
            </p>
            <a
              href="/upload"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
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

