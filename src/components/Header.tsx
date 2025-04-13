"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/batiments", label: "Bâtiments" },
  { href: "/appartements", label: "Appartements" },
  { href: "/interventions", label: "Interventions" },
  { href: "/contrats", label: "Contrats" },
  { href: "/garants", label: "Garants" },
  { href: "/locataires", label: "Locataires" },
  { href: "/paiements", label: "Paiements" },
];

export default function Header() {
  const path = usePathname();

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-gray-700">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${path === link.href ? 'bg-gray-200' : ''} ...`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}