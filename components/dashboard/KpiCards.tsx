"use client";

import { KpiSummary } from "@/lib/types";

interface KpiCardsProps {
  kpis: KpiSummary;
}

export function KpiCards({ kpis }: KpiCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">GHG Emissions</h3>
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 text-lg">🌱</span>
          </div>
        </div>
        <p className="text-3xl font-bold text-gray-900 mb-1">
          {kpis.totalEmissions !== undefined
            ? kpis.totalEmissions.toLocaleString()
            : "—"}
        </p>
        <p className="text-xs text-gray-500">ESRS E1-1</p>
        {kpis.totalEmissions === undefined && (
          <p className="text-xs text-amber-600 mt-2">No data mapped</p>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Employees</h3>
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 text-lg">👥</span>
          </div>
        </div>
        <p className="text-3xl font-bold text-gray-900 mb-1">
          {kpis.totalEmployees !== undefined ? kpis.totalEmployees.toLocaleString() : "—"}
        </p>
        <p className="text-xs text-gray-500">ESRS S1-1</p>
        {kpis.totalEmployees === undefined && (
          <p className="text-xs text-amber-600 mt-2">No data mapped</p>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Governance</h3>
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 text-lg">⚖️</span>
          </div>
        </div>
        <p className="text-3xl font-bold text-gray-900 mb-1">
          {kpis.governancePoints !== undefined ? kpis.governancePoints : "—"}
        </p>
        <p className="text-xs text-gray-500">Data Points</p>
        {kpis.governancePoints === undefined && (
          <p className="text-xs text-amber-600 mt-2">No data mapped</p>
        )}
      </div>
    </div>
  );
}

