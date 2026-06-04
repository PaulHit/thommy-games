"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FloatingCTA() {
  const pathname = usePathname();

  if (pathname.startsWith("/studio") || pathname.startsWith("/pachete")) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur border-t border-gold/20 py-3 px-4">
      <Link
        href="/pachete"
        className="block w-full bg-gold text-white text-center py-3.5 rounded-full font-semibold hover:bg-gold-dark hover:scale-[1.02] transition-all shadow-lg shadow-gold/20"
      >
        Rezervă acum
      </Link>
    </div>
  );
}
