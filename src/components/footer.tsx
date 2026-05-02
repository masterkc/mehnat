import Link from "next/link";

const productLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/loans", label: "Loans" },
  { href: "/insurance", label: "Insurance" },
  { href: "/chat", label: "Chat" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#21262D] bg-[#0D1117]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-bold text-white">
              Mehnat
            </Link>
            <p className="mt-2 text-sm text-[#8B949E]">
              Aapki mehnat, aapka control
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
            <p className="text-sm text-[#8B949E]">
              Built for India&apos;s 30 crore gig workers &middot; Powered by
              RBI Account Aggregator Framework
            </p>
            <p className="text-sm text-[#8B949E]">
              Contact: Krishna &middot; +91 7337211721
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
