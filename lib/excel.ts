import * as XLSX from "xlsx";
import { ColumnMetadata } from "./types";

export interface ParsedData {
  rows: Record<string, string | number | null>[];
  columns: ColumnMetadata[];
}

/**
 * Parse Excel file (XLSX or XLS)
 */
export function parseExcel(buffer: Buffer): ParsedData {
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Convert to JSON
  const jsonData = XLSX.utils.sheet_to_json(worksheet, {
    raw: false,
    defval: null,
  }) as Record<string, any>[];

  if (jsonData.length === 0) {
    return { rows: [], columns: [] };
  }

  // Get headers from first row
  const headers = Object.keys(jsonData[0]);

  // Normalize rows
  const rows: Record<string, string | number | null>[] = jsonData.map((row) => {
    const normalized: Record<string, string | number | null> = {};
    headers.forEach((header) => {
      const value = row[header];
      if (value === null || value === undefined || value === "") {
        normalized[header] = null;
      } else if (typeof value === "number") {
        normalized[header] = value;
      } else {
        normalized[header] = String(value);
      }
    });
    return normalized;
  });

  // Infer column types
  const columns: ColumnMetadata[] = headers.map((name) => {
    const sampleValues = rows
      .slice(0, 10)
      .map((row) => row[name])
      .filter((v) => v !== null && v !== "");

    let type: ColumnMetadata["type"] = "string";

    if (sampleValues.length > 0) {
      const firstValue = sampleValues[0];
      if (typeof firstValue === "number") {
        type = "number";
      } else if (typeof firstValue === "boolean") {
        type = "boolean";
      } else if (typeof firstValue === "string") {
        const numValue = parseFloat(firstValue);
        if (!isNaN(numValue) && isFinite(numValue)) {
          type = "number";
        } else if (
          /^\d{4}-\d{2}-\d{2}/.test(firstValue) ||
          /^\d{2}\/\d{2}\/\d{4}/.test(firstValue)
        ) {
          type = "date";
        }
      }
    }

    return { name, type };
  });

  return { rows, columns };
}

