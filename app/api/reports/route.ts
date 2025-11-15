import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildXbrl } from "@/lib/xbrl";
import { buildHtmlReport } from "@/lib/reportTemplate";
import { buildDefaultSections } from "@/lib/reportTemplate";
import { computeKpis } from "@/lib/kpi";
import { config } from "@/lib/config";
import puppeteer from "puppeteer";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const datasetId = searchParams.get("datasetId");

    // Get latest dataset if no ID provided
    const dataset = datasetId
      ? await prisma.dataset.findUnique({
          where: { id: datasetId },
          include: { fieldMappings: true, reportSections: true },
        })
      : await prisma.dataset.findFirst({
          orderBy: { createdAt: "desc" },
          include: { fieldMappings: true, reportSections: true },
        });

    if (!dataset) {
      return NextResponse.json({ dataset: null, sections: [] });
    }

    // Generate default sections if none exist
    let sections = dataset.reportSections;
    if (sections.length === 0 && dataset.fieldMappings.length > 0) {
      const defaultSections = buildDefaultSections(dataset, dataset.fieldMappings);
      const createdSections = await Promise.all(
        defaultSections.map((section) =>
          prisma.reportSection.create({
            data: {
              datasetId: dataset.id,
              sectionCode: section.sectionCode,
              title: section.title,
              content: section.content,
            },
          })
        )
      );
      sections = createdSections;
    }

    return NextResponse.json({ dataset, sections });
  } catch (error) {
    console.error("Get reports error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch reports" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, datasetId, sections } = body;

    if (!action) {
      return NextResponse.json({ error: "action is required" }, { status: 400 });
    }

    // Get dataset
    const dataset = datasetId
      ? await prisma.dataset.findUnique({
          where: { id: datasetId },
          include: { fieldMappings: true },
        })
      : await prisma.dataset.findFirst({
          orderBy: { createdAt: "desc" },
          include: { fieldMappings: true },
        });

    if (!dataset) {
      return NextResponse.json({ error: "Dataset not found" }, { status: 404 });
    }

    // Handle different actions
    if (action === "save") {
      if (!Array.isArray(sections)) {
        return NextResponse.json({ error: "sections array is required" }, { status: 400 });
      }

      // Update or create sections
      for (const section of sections) {
        if (section.id) {
          // Update existing section
          await prisma.reportSection.update({
            where: { id: section.id },
            data: {
              title: section.title,
              content: section.content,
            },
          });
        } else {
          // Find existing section by sectionCode and datasetId, or create new
          const existing = await prisma.reportSection.findFirst({
            where: {
              datasetId: dataset.id,
              sectionCode: section.sectionCode,
            },
          });

          if (existing) {
            await prisma.reportSection.update({
              where: { id: existing.id },
              data: {
                title: section.title,
                content: section.content,
              },
            });
          } else {
            await prisma.reportSection.create({
              data: {
                datasetId: dataset.id,
                sectionCode: section.sectionCode,
                title: section.title,
                content: section.content,
              },
            });
          }
        }
      }

      return NextResponse.json({ ok: true });
    }

    if (action === "generateXbrl") {
      const rows = dataset.rows as Record<string, string | number | null>[];
      const period = {
        start: new Date().getFullYear() - 1 + "-01-01",
        end: new Date().getFullYear() - 1 + "-12-31",
      };

      const xbrl = buildXbrl(config.defaultEntityName, period, dataset.fieldMappings, rows);

      return new NextResponse(xbrl, {
        headers: {
          "Content-Type": "application/xml",
          "Content-Disposition": 'attachment; filename="green-ledger-csrd-report.xbrl"',
        },
      });
    }

    if (action === "exportHtml") {
      const reportSections = await prisma.reportSection.findMany({
        where: { datasetId: dataset.id },
        orderBy: { sectionCode: "asc" },
      });

      const kpis = await computeKpis(dataset.id);
      const period = {
        start: new Date().getFullYear() - 1 + "-01-01",
        end: new Date().getFullYear() - 1 + "-12-31",
      };

      const html = buildHtmlReport(reportSections, kpis, {
        entityName: config.defaultEntityName,
        period,
      });

      return new NextResponse(html, {
        headers: {
          "Content-Type": "text/html",
          "Content-Disposition": 'attachment; filename="green-ledger-csrd-report.html"',
        },
      });
    }

    if (action === "exportPdf") {
      const reportSections = await prisma.reportSection.findMany({
        where: { datasetId: dataset.id },
        orderBy: { sectionCode: "asc" },
      });

      const kpis = await computeKpis(dataset.id);
      const period = {
        start: new Date().getFullYear() - 1 + "-01-01",
        end: new Date().getFullYear() - 1 + "-12-31",
      };

      const html = buildHtmlReport(reportSections, kpis, {
        entityName: config.defaultEntityName,
        period,
      });

      // Generate PDF using Puppeteer
      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: "networkidle0" });
      const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: { top: "20mm", right: "15mm", bottom: "20mm", left: "15mm" },
      });
      await browser.close();

      return new NextResponse(Buffer.from(pdf), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="green-ledger-csrd-report.pdf"',
        },
      });
    }

    return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
  } catch (error) {
    console.error("Reports API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to process request" },
      { status: 500 }
    );
  }
}

