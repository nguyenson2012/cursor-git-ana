'use client';

import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Navigation() {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <Link href="#features" className="text-gray-700 hover:text-gray-900">
        Features
      </Link>
      <Link href="#pricing" className="text-gray-700 hover:text-gray-900">
        Pricing
      </Link>
      <Link href="#about" className="text-gray-700 hover:text-gray-900">
        About
      </Link>
      <Link href="/dashboards" className="text-gray-700 hover:text-gray-900">
        Dashboards
      </Link>
    </nav>
  );
}