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
      className="block bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow"
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </Link>
  );
}

