"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutDashboard, LineChart, Banknote, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/invest", label: "Invest", icon: LineChart },
  { href: "/loans", label: "Loans", icon: Banknote },
  { href: "/account", label: "Account", icon: User },
];

export default function MobileNav() {
  const pathname = usePathname();

  if (pathname === "/demo") return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#30363D] bg-[#161B22] md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1 text-xs transition-colors",
                isActive ? "text-[#A855F7]" : "text-[#8B949E]"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
