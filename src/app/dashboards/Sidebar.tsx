'use client';

import React from "react";
import { FiHome, FiSettings, FiBookOpen, FiCreditCard, FiCode, FiStar } from "react-icons/fi";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Sidebar() {
  const { data: session } = useSession();

  return (
    <aside className="w-64 bg-white shadow-lg rounded-2xl flex flex-col justify-between py-6 px-4 min-h-screen">
      <div>
        <div className="flex items-center gap-2 mb-8">
          <span className="text-2xl font-bold text-gray-800">Github Analytics</span>
        </div>
        <nav className="flex flex-col gap-2">
          <SidebarLink icon={<FiHome />} label="Overview" active />
          <SidebarLink icon={<FiCode />} label="API Playground" href="/playground" />
          <SidebarLink icon={<FiStar />} label="Use Cases" />
          <SidebarLink icon={<FiCreditCard />} label="Billing" />
          <SidebarLink icon={<FiSettings />} label="Settings" />
          <SidebarLink icon={<FiBookOpen />} label="Documentation" external />
        </nav>
      </div>
      <div className="flex flex-col gap-2 mt-8">
        {session ? (
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <img src={session.user?.image || "https://randomuser.me/api/portraits/men/32.jpg"} 
                   alt="avatar" 
                   className="w-8 h-8 rounded-full" />
              <span className="text-gray-700 font-medium">{session.user?.name}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-8" /> {/* Spacer to align with avatar */}
              <button
                onClick={() => signOut()}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <img src="https://authjs.dev/img/providers/google.svg" 
                 alt="Google" 
                 className="w-5 h-5" />
            Sign in with Google
          </button>
        )}
      </div>
    </aside>
  );
}

function SidebarLink({ icon, label, active, external, href }: { icon: React.ReactNode; label: string; active?: boolean; external?: boolean; href?: string }) {
  if (href) {
    return (
      <Link
        href={href}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-gray-700 font-medium ${active ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100"}`}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        <span className="text-lg">{icon}</span>
        {label}
        {external && <span className="ml-auto text-xs text-gray-400">↗</span>}
      </Link>
    );
  }
  return (
    <a
      href="#"
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-gray-700 font-medium ${active ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100"}`}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <span className="text-lg">{icon}</span>
      {label}
      {external && <span className="ml-auto text-xs text-gray-400">↗</span>}
    </a>
  );
}