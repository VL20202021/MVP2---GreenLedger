import { PageShell } from "@/components/layout/PageShell";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { computeKpis } from "@/lib/kpi";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  // Get latest dataset
  let latestDataset = null;
  let kpis = {};
  let dbError = null;
  
  try {
    // Test database connection first
    await prisma.$connect();
    latestDataset = await prisma.dataset.findFirst({
      orderBy: { createdAt: "desc" },
      include: { fieldMappings: true },
    });

    if (latestDataset) {
      kpis = await computeKpis(latestDataset.id);
    }
  } catch (error) {
    console.error("Database error:", error);
    dbError = error instanceof Error ? error.message : String(error);
    // Continue with empty state if database error
  } finally {
    try {
      await prisma.$disconnect();
    } catch (e) {
      // Ignore disconnect errors
    }
  }

  return (
    <PageShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Green Ledger – CSRD / ESRS Dashboard
          </h1>
          <p className="text-gray-600">
            Upload your ESG data, map it to ESRS taxonomy, and generate compliant CSRD reports.
          </p>
        </div>

        {dbError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 font-semibold">Database Connection Error</p>
            <p className="text-red-700 text-sm mt-2">{dbError}</p>
            <p className="text-red-600 text-xs mt-2">
              Please check DATABASE_URL in Vercel environment variables.
            </p>
          </div>
        )}

        <KpiCards kpis={kpis} />

        {!latestDataset && !dbError && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800">
              No dataset found. Start by uploading your data to begin generating CSRD reports.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SectionCard
            title="Upload Data"
            description="Upload Excel or CSV files containing your portfolio, ESG KPIs, emissions, and workforce data."
            href="/upload"
          />
          <SectionCard
            title="Map to ESRS"
            description="Automatically map your data fields to ESRS taxonomy codes for CSRD compliance."
            href="/mappings"
          />
          <SectionCard
            title="Build CSRD Report"
            description="Generate, edit, and export your CSRD report in HTML, PDF, or XBRL format."
            href="/reports"
          />
        </div>
      </div>
    </PageShell>
  );
}

