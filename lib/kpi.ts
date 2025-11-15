import { prisma } from "./prisma";
import { KpiSummary } from "./types";

/**
 * Compute KPIs from dataset and mappings
 */
export async function computeKpis(
  datasetId: string
): Promise<KpiSummary> {
  const dataset = await prisma.dataset.findUnique({
    where: { id: datasetId },
    include: { fieldMappings: true },
  });

  if (!dataset) {
    return {};
  }

  const rows = dataset.rows as Record<string, string | number | null>[];
  const mappings = dataset.fieldMappings;

  const summary: KpiSummary = {};

  // Find E1-1 (GHG emissions) mapping
  const emissionsMapping = mappings.find((m) => m.esrsCode === "E1-1");
  if (emissionsMapping) {
    const values = rows
      .map((row) => {
        const val = row[emissionsMapping.fieldName];
        if (typeof val === "number") return val;
        if (typeof val === "string") {
          const parsed = parseFloat(val);
          return isNaN(parsed) ? 0 : parsed;
        }
        return 0;
      })
      .filter((v) => v > 0);
    summary.totalEmissions = values.reduce((sum, v) => sum + v, 0);
  }

  // Find S1-1 (employees) mapping
  const employeesMapping = mappings.find((m) => m.esrsCode === "S1-1");
  if (employeesMapping) {
    const values = rows
      .map((row) => {
        const val = row[employeesMapping.fieldName];
        if (typeof val === "number") return val;
        if (typeof val === "string") {
          const parsed = parseFloat(val);
          return isNaN(parsed) ? 0 : parsed;
        }
        return 0;
      })
      .filter((v) => v > 0);
    summary.totalEmployees = values.reduce((sum, v) => sum + v, 0);
  }

  // Count governance mappings
  const governanceMappings = mappings.filter((m) => m.esrsCode.startsWith("G"));
  summary.governancePoints = governanceMappings.length;

  return summary;
}

