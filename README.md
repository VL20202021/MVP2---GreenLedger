# Green Ledger – CSRD / ESRS MVP

Green Ledger is an end-to-end CSRD (Corporate Sustainability Reporting Directive) and ESRS (European Sustainability Reporting Standards) reporting platform. It helps organizations upload ESG data, automatically map fields to ESRS taxonomy, and generate compliant CSRD reports in multiple formats.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Database**: PostgreSQL with Prisma ORM
- **File Parsing**: xlsx (for Excel), custom CSV parser
- **PDF Generation**: Puppeteer

## Features

1. **Upload Excel/CSV**: Upload portfolio, ESG KPIs, emissions, workforce data
2. **ESRS Mapping**: Automatically map data fields to ESRS → XBRL taxonomy
3. **Report Generation**: Generate structured CSRD report templates (E1, S1, G1)
4. **Export**: Export reports to PDF, HTML, or XBRL format
5. **Dashboard**: View mandatory KPIs (GHG emissions, workforce, governance)

## Setup

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database

### Installation

1. **Clone the repository** (or navigate to the project directory)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set your `DATABASE_URL`:
   ```
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/green_ledger?schema=public"
   ```

4. **Set up the database**:
   ```bash
   npx prisma migrate dev
   ```
   This will create the database schema and generate the Prisma client.

5. **Run the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Core Flows

### 1. Upload Data
- Navigate to `/upload`
- Upload a CSV or Excel file (e.g., with columns like `isin`, `market_value`, `quantity`, `co2_emissions`)
- Preview the parsed dataset

### 2. Map to ESRS
- Navigate to `/mappings`
- Review suggested ESRS mappings based on field names
- Adjust mappings as needed
- Save mappings
- Optionally generate XBRL file directly

### 3. Generate Reports
- Navigate to `/reports`
- Review auto-generated CSRD sections (E1, S1, G1)
- Edit section content
- Save changes
- Export to HTML, PDF, or XBRL

### 4. Dashboard
- View KPI cards on the main dashboard (`/`)
- See total emissions, employees, and governance data points
- Quick links to upload, mappings, and reports

## Architecture Overview

### UI Layer (`app/`, `components/`)
- **Pages**: Next.js App Router pages in `app/`
  - `app/page.tsx` - Main dashboard
  - `app/upload/page.tsx` - File upload page
  - `app/mappings/page.tsx` - ESRS mappings editor
  - `app/reports/page.tsx` - Report editor
- **Components**: Reusable UI components in `components/`
  - Layout components (`PageShell`, `TopNav`, `Breadcrumbs`)
  - Feature components (`FileUploadForm`, `DatasetTable`, `MappingEditor`, `ReportEditor`, `KpiCards`)

### Domain Logic (`lib/`)
- **`lib/csv.ts`** - CSV parsing utilities
- **`lib/excel.ts`** - Excel parsing utilities
- **`lib/esrsMap.ts`** - ESRS field dictionary and mapping suggestions
- **`lib/kpi.ts`** - KPI computation logic
- **`lib/reportTemplate.ts`** - Report template generation and HTML export
- **`lib/xbrl.ts`** - XBRL generation
- **`lib/types.ts`** - TypeScript type definitions
- **`lib/config.ts`** - Configuration constants

### Persistence (`prisma/`)
- **`prisma/schema.prisma`** - Database schema
  - `Dataset` - Uploaded datasets with parsed rows and columns
  - `FieldMapping` - ESRS field mappings
  - `ReportSection` - CSRD report sections

### Integration Layer (`lib/integrations/`)
- **`lib/integrations/dataSources.ts`** - Abstraction for data sources
  - Currently implements "upload" source
  - Stubs for future integrations (API, S3, SharePoint, ESG providers)

### API Routes (`app/api/`)
- **`app/api/upload/route.ts`** - Handle file uploads and parsing
- **`app/api/mappings/route.ts`** - Save and retrieve ESRS mappings
- **`app/api/reports/route.ts`** - Generate reports and handle exports

## Extensibility

The codebase is designed to be easily extensible:

### Adding New Data Sources
- Extend `lib/integrations/dataSources.ts` with new source types
- Implement the data loading logic for the new source

### Adding New Report Frameworks
- Create new domain modules in `lib/` (e.g., `lib/sfdr.ts`, `lib/taxonomy.ts`)
- Add new report generation functions similar to `buildDefaultSections`
- Extend the reports API to handle new report types

### Adding New ESRS Fields
- Update `ESRS_FIELDS` array in `lib/esrsMap.ts`
- Enhance `suggestEsrsCode` function with new keyword patterns

### Adding Authentication
- Add authentication middleware to API routes
- Extend Prisma schema with `User` model
- Add user context to dataset and report queries

## Acceptance Tests

All of the following should work:

1. ✅ Run `npm install`, configure `DATABASE_URL`, run migrations, and `npm run dev` with no TypeScript errors
2. ✅ Go to `/upload`, upload a CSV (e.g., with `isin`, `market_value`, `quantity`, `co2_emissions`), and see a preview
3. ✅ Go to `/mappings`, see each column, map `co2_emissions` to an E1 ESRS field, and save mappings
4. ✅ Click "Generate XBRL" and download an `.xbrl` file with mapped values
5. ✅ Go to `/reports`, see auto-generated E1, S1, G1 sections, edit content, save, and export HTML and PDF
6. ✅ On the main dashboard (`/`), see KPI cards showing total emissions and total employees if such fields exist and are mapped
7. ✅ The code structure makes it obvious where to add new data sources, mappings, and report types in the future

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:migrate` - Run Prisma migrations
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:studio` - Open Prisma Studio

## License

This is an MVP project for demonstration purposes.

