"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/", icon: "📊" },
  { name: "Upload", href: "/upload", icon: "📤" },
  { name: "Mappings", href: "/mappings", icon: "🔗" },
  { name: "Reports", href: "/reports", icon: "📄" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:pt-16 lg:border-r lg:border-gray-200 lg:bg-white">
      <div className="flex-1 flex flex-col pt-6 pb-4 overflow-y-auto">
        <nav className="flex-1 px-3 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                      : "text-gray-700 hover:text-blue-700 hover:bg-gray-50"
                  }
                `}
              >
                <span className="mr-3 text-base">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

