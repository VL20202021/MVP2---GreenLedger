import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ESRS_FIELDS } from "@/lib/esrsMap";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const datasetId = searchParams.get("datasetId");

    if (!datasetId) {
      // Get latest dataset
      const latestDataset = await prisma.dataset.findFirst({
        orderBy: { createdAt: "desc" },
        include: { fieldMappings: true },
      });

      if (!latestDataset) {
        return NextResponse.json({ dataset: null, mappings: [] });
      }

      return NextResponse.json({
        dataset: latestDataset,
        mappings: latestDataset.fieldMappings,
      });
    }

    const dataset = await prisma.dataset.findUnique({
      where: { id: datasetId },
      include: { fieldMappings: true },
    });

    if (!dataset) {
      return NextResponse.json({ error: "Dataset not found" }, { status: 404 });
    }

    return NextResponse.json({
      dataset,
      mappings: dataset.fieldMappings,
    });
  } catch (error) {
    console.error("Get mappings error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch mappings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { datasetId, mappings } = body;

    if (!datasetId || !Array.isArray(mappings)) {
      return NextResponse.json(
        { error: "datasetId and mappings array are required" },
        { status: 400 }
      );
    }

    // Verify dataset exists
    const dataset = await prisma.dataset.findUnique({
      where: { id: datasetId },
    });

    if (!dataset) {
      return NextResponse.json({ error: "Dataset not found" }, { status: 404 });
    }

    // Delete existing mappings for this dataset
    await prisma.fieldMapping.deleteMany({
      where: { datasetId },
    });

    // Create new mappings
    const createdMappings = [];
    for (const mapping of mappings) {
      if (mapping.esrsCode && mapping.fieldName) {
        const esrsField = ESRS_FIELDS.find((f) => f.code === mapping.esrsCode);
        const mappingRecord = await prisma.fieldMapping.create({
          data: {
            datasetId,
            fieldName: mapping.fieldName,
            esrsCode: mapping.esrsCode,
            esrsLabel: esrsField?.label || mapping.esrsCode,
          },
        });
        createdMappings.push(mappingRecord);
      }
    }

    return NextResponse.json({ ok: true, count: createdMappings.length });
  } catch (error) {
    console.error("Save mappings error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save mappings" },
      { status: 500 }
    );
  }
}

