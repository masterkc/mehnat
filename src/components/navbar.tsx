"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/loans", label: "Loans" },
  { href: "/insurance", label: "Insurance" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-[#0D1117]/95 backdrop-blur-md border-b border-[#30363D]"
          : "bg-[#0D1117]"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Wordmark */}
        <Link href="/" className="text-xl font-bold text-white">
          Mehnat
        </Link>

        {/* Center: Navigation Links (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-white bg-[#21262D]"
                    : "text-[#8B949E] hover:text-white hover:bg-[#21262D]"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right: Auth Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-[#8B949E] hover:text-white transition-colors"
          >
            Login
          </Link>
          <Link
            href="/login"
            className="rounded-md bg-[#238636] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2EA043]"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
