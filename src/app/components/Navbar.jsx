// src/app/components/Navbar.tsx

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white py-2">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="px-3 py-2 hover:bg-gray-700 rounded">
          Dashboard
        </Link>
        <Link href="/add-expense" className="px-3 py-2 hover:bg-gray-700 rounded">
          Add Expense
        </Link>
        <Link href="/auth/signin" className="px-3 py-2 hover:bg-gray-700 rounded">
          Sign In
        </Link>
        <Link href="/auth/signup" className="px-3 py-2 hover:bg-gray-700 rounded">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
