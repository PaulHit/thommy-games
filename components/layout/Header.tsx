"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const links = [
  { href: "/", label: "Acasă" },
  { href: "/pachete", label: "Pachete" },
  { href: "/jocuri", label: "Jocuri" },
  { href: "/despre", label: "Despre" },
  { href: "/ssi", label: "Întrebări frecvente" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="bg-white border-b border-gold/20 sticky top-0 z-50 shadow-sm">
        <nav className="container-custom flex items-center justify-between py-2.5">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Thommy Games"
              width={80}
              height={80}
              className="h-16 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105 ${
                    isActive
                      ? "bg-gold text-white shadow-sm"
                      : "text-text hover:bg-gold/10 hover:text-gold-dark"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/pachete"
              className="ml-2 bg-gold text-white text-sm px-5 py-2 rounded-full font-medium hover:bg-gold-dark hover:scale-105 transition-all"
            >
              Rezervă acum
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-cream transition-colors cursor-pointer"
            aria-label="Meniu"
          >
            <span
              className={`block w-6 h-0.5 bg-text rounded transition-transform duration-300 ${
                open ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-text rounded transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-text rounded transition-transform duration-300 ${
                open ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/20"
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute top-[72px] left-0 right-0 bg-white shadow-xl border-t border-gold/20 transition-transform duration-300 ${
            open ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <div className="container-custom py-4 flex flex-col gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3.5 rounded-xl text-base font-semibold transition-colors ${
                    isActive
                      ? "bg-gold text-white"
                      : "text-text hover:bg-cream"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/pachete"
              className="mt-2 bg-gold text-white text-center px-5 py-3.5 rounded-full font-medium hover:bg-gold-dark transition-all"
            >
              Rezervă acum
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
