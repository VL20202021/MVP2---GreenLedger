import Link from "next/link";

export function TopNav() {
  return (
    <nav className="bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14">
          <div className="flex">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-green-500 rounded flex items-center justify-center">
                <span className="text-black font-bold text-sm">G</span>
              </div>
              <span className="text-xl font-bold text-white">
                Green Ledger
              </span>
            </Link>
            <div className="hidden sm:ml-8 sm:flex lg:hidden sm:space-x-1">
              <Link
                href="/"
                className="text-gray-300 hover:text-white hover:bg-gray-900 inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/upload"
                className="text-gray-300 hover:text-white hover:bg-gray-900 inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Upload
              </Link>
              <Link
                href="/mappings"
                className="text-gray-300 hover:text-white hover:bg-gray-900 inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Mappings
              </Link>
              <Link
                href="/reports"
                className="text-gray-300 hover:text-white hover:bg-gray-900 inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors"
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

