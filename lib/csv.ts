import { ColumnMetadata } from "./types";

export interface ParsedData {
  rows: Record<string, string | number | null>[];
  columns: ColumnMetadata[];
}

/**
 * Parse CSV file content
 */
export function parseCsv(content: string): ParsedData {
  const lines = content.split("\n").filter((line) => line.trim());
  if (lines.length === 0) {
    return { rows: [], columns: [] };
  }

  // Parse header
  const headerLine = lines[0];
  const headers = parseCsvLine(headerLine);

  // Parse data rows
  const rows: Record<string, string | number | null>[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i]);
    const row: Record<string, string | number | null> = {};
    headers.forEach((header, index) => {
      const value = values[index]?.trim() || null;
      row[header] = value;
    });
    rows.push(row);
  }

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
        // Try to parse as number
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

/**
 * Parse a single CSV line, handling quoted values
 */
function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++; // Skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);

  return result;
}

