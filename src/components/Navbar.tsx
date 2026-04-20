"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, Home, Building2, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar({ isAdmin }: { isAdmin?: boolean }) {
  const pathname = usePathname();

  const navLinks = [
    { name: "Asosiy", href: "/", icon: Home },
    { name: "E'lonlar", href: "/listings", icon: Building2 },
  ];

  return (
    <nav className="sticky top-0 z-50 glass h-16 flex items-center px-4 md:px-8">
      <div className="max-w-[1920px] mx-auto w-full flex items-center justify-between xl:px-16 2xl:px-24">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform">
            R
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">
            Rent Without Stress
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-gray-500"
                )}
              >
                <Icon size={18} />
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/admin/login"
            className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            <User size={18} />
            <span className="hidden sm:inline">Admin</span>
          </Link>
          <Menu className="md:hidden text-gray-500 cursor-pointer" />
        </div>
      </div>
    </nav>
  );
}
