import Link from "next/link";

export function TopNav() {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">GL</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">
                Green Ledger
              </span>
            </Link>
            <div className="hidden sm:ml-8 sm:flex lg:hidden sm:space-x-1">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/upload"
                className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Upload
              </Link>
              <Link
                href="/mappings"
                className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Mappings
              </Link>
              <Link
                href="/reports"
                className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Reports
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

