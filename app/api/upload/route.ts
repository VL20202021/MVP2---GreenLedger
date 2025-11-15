import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseCsv } from "@/lib/csv";
import { parseExcel } from "@/lib/excel";
import { config } from "@/lib/config";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const name = (formData.get("name") as string) || "Untitled Dataset";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file size
    if (file.size > config.maxFileSize) {
      return NextResponse.json(
        { error: `File size exceeds ${config.maxFileSize / 1024 / 1024}MB limit` },
        { status: 400 }
      );
    }

    // Validate file type
    const fileName = file.name.toLowerCase();
    const isCsv = fileName.endsWith(".csv");
    const isExcel = fileName.endsWith(".xlsx") || fileName.endsWith(".xls");

    if (!isCsv && !isExcel) {
      return NextResponse.json(
        { error: "File must be CSV or Excel (.xlsx, .xls)" },
        { status: 400 }
      );
    }

    // Parse file
    let parsedData;
    if (isCsv) {
      const text = await file.text();
      parsedData = parseCsv(text);
    } else {
      const buffer = Buffer.from(await file.arrayBuffer());
      parsedData = parseExcel(buffer);
    }

    // Save to database
    const dataset = await prisma.dataset.create({
      data: {
        name,
        fileName: file.name,
        rows: parsedData.rows as any,
        columns: parsedData.columns as any,
      },
    });

    return NextResponse.json({ dataset });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to upload file" },
      { status: 500 }
    );
  }
}

