import React from "react";
import { FiHome, FiSettings, FiBookOpen, FiCreditCard, FiCode, FiStar } from "react-icons/fi";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg rounded-2xl flex flex-col justify-between py-6 px-4 min-h-screen">
      <div>
        <div className="flex items-center gap-2 mb-8">
          <span className="text-2xl font-bold text-gray-800">tavily</span>
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
      <div className="flex items-center gap-2 mt-8">
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" className="w-8 h-8 rounded-full" />
        <span className="text-gray-700 font-medium">sơn nguyễn</span>
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