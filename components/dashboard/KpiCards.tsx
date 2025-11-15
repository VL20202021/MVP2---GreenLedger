"use client";

import { KpiSummary } from "@/lib/types";

interface KpiCardsProps {
  kpis: KpiSummary;
}

export function KpiCards({ kpis }: KpiCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Total GHG Emissions (E1-1)</h3>
        <p className="text-3xl font-bold text-green-600">
          {kpis.totalEmissions !== undefined
            ? kpis.totalEmissions.toLocaleString()
            : "N/A"}
        </p>
        {kpis.totalEmissions === undefined && (
          <p className="text-xs text-gray-400 mt-1">No emissions data mapped</p>
        )}
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Total Employees (S1-1)</h3>
        <p className="text-3xl font-bold text-blue-600">
          {kpis.totalEmployees !== undefined ? kpis.totalEmployees.toLocaleString() : "N/A"}
        </p>
        {kpis.totalEmployees === undefined && (
          <p className="text-xs text-gray-400 mt-1">No employee data mapped</p>
        )}
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Governance Data Points</h3>
        <p className="text-3xl font-bold text-purple-600">
          {kpis.governancePoints !== undefined ? kpis.governancePoints : "N/A"}
        </p>
        {kpis.governancePoints === undefined && (
          <p className="text-xs text-gray-400 mt-1">No governance data mapped</p>
        )}
      </div>
    </div>
  );
}

