import { PageShell } from "@/components/layout/PageShell";
import { MappingEditor } from "@/components/mappings/MappingEditor";
import { prisma } from "@/lib/prisma";

export default async function MappingsPage() {
  // Get latest dataset with mappings
  const dataset = await prisma.dataset.findFirst({
    orderBy: { createdAt: "desc" },
    include: { fieldMappings: true },
  });

  return (
    <PageShell breadcrumbs={[{ label: "Home", href: "/" }, { label: "ESRS Mappings" }]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">ESRS Field Mappings</h1>
          <p className="text-gray-600">
            Map your dataset columns to ESRS taxonomy fields. Green Ledger will suggest mappings
            based on field names.
          </p>
        </div>

        <MappingEditor
          dataset={dataset ? { id: dataset.id, columns: dataset.columns as any } : null}
          existingMappings={dataset?.fieldMappings || []}
        />
      </div>
    </PageShell>
  );
}

