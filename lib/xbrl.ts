import { FieldMapping } from "@prisma/client";

export function buildXbrl(
  entityName: string,
  period: { start: string; end: string },
  mappings: FieldMapping[],
  rows: Record<string, string | number | null>[]
): string {
  const firstRow = rows[0] || {};

  // Escape XML special characters
  function escapeXml(str: string): string {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  const entityId = `entity-${entityName.toLowerCase().replace(/\s+/g, "-")}`;
  const contextId = "context-1";
  const periodId = "period-1";

  const xbrlElements = mappings
    .map((mapping) => {
      const value = firstRow[mapping.fieldName];
      if (value === null || value === undefined || value === "") {
        return null;
      }

      // Convert ESRS code to element name (e.g., "E1-1" -> "esrs_e1_1")
      const elementName = `esrs_${mapping.esrsCode.toLowerCase().replace(/-/g, "_")}`;
      const valueStr = String(value);

      return `    <${elementName} contextRef="${contextId}" unitRef="unit-1">${escapeXml(valueStr)}</${elementName}>`;
    })
    .filter((el) => el !== null)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<xbrl xmlns="http://www.xbrl.org/2003/instance"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xmlns:link="http://www.xbrl.org/2003/linkbase"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xmlns:esrs="http://www.esrs.eu/taxonomy/2024">
  <link:schemaRef xlink:type="simple" xlink:href="esrs-taxonomy.xsd"/>
  
  <context id="${contextId}">
    <entity>
      <identifier scheme="http://www.example.com/entity">${escapeXml(entityName)}</identifier>
    </entity>
    <period>
      <startDate>${period.start}</startDate>
      <endDate>${period.end}</endDate>
    </period>
  </context>

  <unit id="unit-1">
    <measure>iso4217:EUR</measure>
  </unit>

${xbrlElements}
</xbrl>`;
}

