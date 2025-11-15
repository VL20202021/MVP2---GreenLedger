import { EsrsField } from "./types";

export const ESRS_FIELDS: EsrsField[] = [
  // Environmental (E)
  {
    code: "E1-1",
    label: "Gross Scopes 1, 2, 3 GHG emissions",
    category: "E",
  },
  {
    code: "E1-2",
    label: "GHG emission reduction targets",
    category: "E",
  },
  {
    code: "E1-3",
    label: "Energy consumption",
    category: "E",
  },
  {
    code: "E1-4",
    label: "Water consumption",
    category: "E",
  },
  // Social (S)
  {
    code: "S1-1",
    label: "Number of employees by gender",
    category: "S",
  },
  {
    code: "S1-2",
    label: "Employee turnover rate",
    category: "S",
  },
  {
    code: "S1-3",
    label: "Training hours per employee",
    category: "S",
  },
  // Governance (G)
  {
    code: "G1-1",
    label: "Governance structure",
    category: "G",
  },
  {
    code: "G1-2",
    label: "Board diversity",
    category: "G",
  },
  {
    code: "G1-3",
    label: "Remuneration policies",
    category: "G",
  },
];

/**
 * Suggest an ESRS field code based on field name using keyword matching
 */
export function suggestEsrsCode(fieldName: string): EsrsField | null {
  const lowerName = fieldName.toLowerCase();

  // Environmental keywords
  if (
    lowerName.includes("co2") ||
    lowerName.includes("ghg") ||
    lowerName.includes("emission") ||
    lowerName.includes("carbon")
  ) {
    return ESRS_FIELDS.find((f) => f.code === "E1-1") || null;
  }

  if (lowerName.includes("energy")) {
    return ESRS_FIELDS.find((f) => f.code === "E1-3") || null;
  }

  if (lowerName.includes("water")) {
    return ESRS_FIELDS.find((f) => f.code === "E1-4") || null;
  }

  // Social keywords
  if (
    lowerName.includes("employee") ||
    lowerName.includes("headcount") ||
    lowerName.includes("staff") ||
    lowerName.includes("workforce")
  ) {
    return ESRS_FIELDS.find((f) => f.code === "S1-1") || null;
  }

  if (lowerName.includes("turnover")) {
    return ESRS_FIELDS.find((f) => f.code === "S1-2") || null;
  }

  if (lowerName.includes("training")) {
    return ESRS_FIELDS.find((f) => f.code === "S1-3") || null;
  }

  // Governance keywords
  if (
    lowerName.includes("governance") ||
    lowerName.includes("board") ||
    lowerName.includes("director")
  ) {
    return ESRS_FIELDS.find((f) => f.code === "G1-1") || null;
  }

  return null;
}

