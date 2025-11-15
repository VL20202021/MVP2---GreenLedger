import { PageShell } from "@/components/layout/PageShell";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { computeKpis } from "@/lib/kpi";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  // Get latest dataset - don't show errors on homepage
  let latestDataset: Awaited<ReturnType<typeof prisma.dataset.findFirst>> & { fieldMappings: any[] } | null = null;
  let kpis: { totalEmissions?: number; totalEmployees?: number; governancePoints?: number } = {};
  
  try {
    latestDataset = await prisma.dataset.findFirst({
      orderBy: { createdAt: "desc" },
      include: { fieldMappings: true },
    });

    if (latestDataset) {
      kpis = await computeKpis(latestDataset.id);
    }
  } catch (error) {
    // Silently fail on homepage - don't show errors until user tries to use features
    console.error("Database error:", error);
  }

  const hasData = latestDataset !== null;

  return (
    <PageShell>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-green-50 via-blue-50 to-green-50 rounded-2xl p-8 md:p-12 border border-green-100">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Green Ledger
            </h1>
            <p className="text-xl text-gray-700 mb-2 font-medium">
              CSRD / ESRS Reporting Made Simple
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Transform your ESG data into compliant CSRD reports. Upload your data, map to ESRS taxonomy, 
              and generate professional reports in minutes—not weeks.
            </p>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📤</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">1. Upload Your Data</h3>
                <p className="text-sm text-gray-600">
                  Upload CSV or Excel files with your ESG data—emissions, workforce, governance metrics.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🔗</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">2. Map to ESRS</h3>
                <p className="text-sm text-gray-600">
                  Green Ledger automatically suggests ESRS field mappings. Review and adjust as needed.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">3. Generate Report</h3>
                <p className="text-sm text-gray-600">
                  Get a professional CSRD report with E1, S1, G1 sections. Export to PDF, HTML, or XBRL.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Start */}
        {!hasData ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚀</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Get Started in 3 Steps</h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Start by uploading your ESG data. Green Ledger will guide you through mapping and report generation.
              </p>
              <a
                href="/upload"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-sm"
              >
                Upload Your First Dataset
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        ) : (
          <>
            {/* KPIs - Only show if data exists */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Metrics</h2>
              <KpiCards kpis={kpis} />
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SectionCard
                  title="Upload Data"
                  description="Add new datasets or update existing ones with your latest ESG metrics."
                  href="/upload"
                />
                <SectionCard
                  title="Map to ESRS"
                  description="Review and update field mappings to ESRS taxonomy for accurate reporting."
                  href="/mappings"
                />
                <SectionCard
                  title="View Reports"
                  description="Review, edit, and export your CSRD reports in multiple formats."
                  href="/reports"
                />
              </div>
            </div>
          </>
        )}

        {/* Features */}
        <div className="bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What You Get</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <span className="text-green-600 mt-1">✓</span>
              <div>
                <p className="font-medium text-gray-900">Automatic ESRS Mapping</p>
                <p className="text-sm text-gray-600">Smart suggestions based on field names</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-green-600 mt-1">✓</span>
              <div>
                <p className="font-medium text-gray-900">Multiple Export Formats</p>
                <p className="text-sm text-gray-600">PDF, HTML, and XBRL for compliance</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-green-600 mt-1">✓</span>
              <div>
                <p className="font-medium text-gray-900">CSRD Report Templates</p>
                <p className="text-sm text-gray-600">Pre-built E1, S1, G1 sections</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-green-600 mt-1">✓</span>
              <div>
                <p className="font-medium text-gray-900">KPI Dashboard</p>
                <p className="text-sm text-gray-600">Track emissions, workforce, and governance metrics</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

