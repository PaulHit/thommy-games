"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/", label: "Acasă" },
  { href: "/pachete", label: "Pachete" },
  { href: "/jocuri", label: "Jocuri" },
  { href: "/despre", label: "Despre" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gold/20">
      <nav className="container-custom flex items-center justify-between py-3">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Thommy Games"
            width={96}
            height={96}
            className="h-20 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/pachete"
            className="bg-gold text-white text-sm px-5 py-2 rounded-full font-medium hover:bg-gold-dark transition-colors"
          >
            Rezervă acum
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Meniu"
        >
          <div className="w-6 h-0.5 bg-text mb-1.5 transition-all" />
          <div className="w-6 h-0.5 bg-text mb-1.5 transition-all" />
          <div className="w-6 h-0.5 bg-text transition-all" />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gold/20 py-4">
          <div className="container-custom flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text hover:text-gold transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/pachete"
              className="bg-gold text-white text-center px-5 py-3 rounded-full font-medium hover:bg-gold-dark transition-colors"
              onClick={() => setOpen(false)}
            >
              Rezervă acum
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
