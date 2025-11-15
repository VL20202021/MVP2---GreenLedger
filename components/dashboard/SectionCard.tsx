"use client";

import Link from "next/link";

interface SectionCardProps {
  title: string;
  description: string;
  href: string;
  icon?: string;
}

export function SectionCard({ title, description, href, icon }: SectionCardProps) {
  return (
    <Link
      href={href}
      className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all group"
    >
      <h3 className="text-sm font-semibold mb-1.5 text-gray-900 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
      <div className="mt-3 flex items-center text-xs text-blue-600 font-medium">
        Get started
        <svg className="w-3 h-3 ml-1.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}

