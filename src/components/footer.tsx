"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const productLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/loans", label: "Loans" },
  { href: "/insurance", label: "Insurance" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/demo") return null;

  return (
    <footer className="border-t border-[#21262D] bg-[#0D1117]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-bold text-white">
              Mehnat
            </Link>
            <p className="mt-2 text-sm text-[#8B949E] max-w-sm">
              Mehnat is an AI-driven financial OS providing daily allowances, micro-loans, and automated investments for India's 30 crore gig workers.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-white">Product</h3>
            <ul className="mt-3 space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#8B949E] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="#" className="text-sm text-[#F59E0B] hover:text-[#FCD34D] transition-colors font-medium">
                  Pitch Deck (PPT) ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-white">Company</h3>
            <ul className="mt-3 space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#8B949E] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-[#21262D] pt-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-xs text-[#8B949E] max-w-3xl">
              <strong>Disclaimer:</strong> This is a demo prototype only created for the Zupee Case Study (May 2026). Mehnat is not a registered NBFC or Bank. All data, yields, and structures shown are illustrative.
            </p>
            <p className="text-sm text-[#8B949E]">
              Built for India&apos;s 30 crore gig workers &middot; Powered by RBI Account Aggregator Framework
            </p>
            <div className="text-sm text-[#8B949E] flex flex-wrap justify-center gap-2">
              <span>Contact: Krishna</span>
              <span className="hidden sm:inline">&middot;</span>
              <span>+91 7337211721</span>
              <span className="hidden sm:inline">&middot;</span>
              <a href="mailto:f20211119@pilani.bits-pilani.ac.in" className="hover:text-white transition-colors">f20211119@pilani.bits-pilani.ac.in</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
