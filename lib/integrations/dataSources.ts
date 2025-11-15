import { DataSourceType } from "../types";

/**
 * Abstraction layer for data sources
 * Currently implements only "upload" source
 * Future: add implementations for "api", "s3", "sharepoint", "esgProvider"
 */

export interface DataSourceConfig {
  type: DataSourceType;
  config: Record<string, any>;
}

export interface DataLoadResult {
  rows: Record<string, string | number | null>[];
  columns: Array<{ name: string; type: string }>;
  metadata?: Record<string, any>;
}

/**
 * Load data from a configured source
 */
export async function loadDataFromSource(
  sourceConfig: DataSourceConfig
): Promise<DataLoadResult> {
  switch (sourceConfig.type) {
    case "upload":
      // This is handled directly in the upload API route
      throw new Error("Upload source should be handled via file upload API");
    case "api":
      // TODO: Implement API data source
      throw new Error("API data source not yet implemented");
    case "s3":
      // TODO: Implement S3 data source
      throw new Error("S3 data source not yet implemented");
    case "sharepoint":
      // TODO: Implement SharePoint data source
      throw new Error("SharePoint data source not yet implemented");
    case "esgProvider":
      // TODO: Implement ESG provider integration
      throw new Error("ESG provider data source not yet implemented");
    default:
      throw new Error(`Unknown data source type: ${sourceConfig.type}`);
  }
}

