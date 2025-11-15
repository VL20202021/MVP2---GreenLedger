import { ReactNode } from "react";
import { TopNav } from "./TopNav";
import { Breadcrumbs } from "./Breadcrumbs";

interface PageShellProps {
  children: ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export function PageShell({ children, breadcrumbs }: PageShellProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
        {children}
      </main>
    </div>
  );
}

