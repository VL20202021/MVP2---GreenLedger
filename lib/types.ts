export interface ColumnMetadata {
  name: string;
  type: "string" | "number" | "date" | "boolean";
}

export interface EsrsField {
  code: string;
  label: string;
  category: "E" | "S" | "G";
}

export interface KpiSummary {
  totalEmissions?: number;
  totalEmployees?: number;
  governancePoints?: number;
}

export interface ReportSectionInput {
  sectionCode: string;
  title: string;
  content: string;
}

export type DataSourceType = "upload" | "api" | "s3" | "sharepoint" | "esgProvider";

