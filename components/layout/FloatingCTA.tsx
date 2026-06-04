"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FloatingCTA() {
  const pathname = usePathname();

  if (pathname.startsWith("/studio") || pathname.startsWith("/pachete")) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
      <Link
        href="/pachete"
        className="block w-full bg-gold text-white text-center py-3.5 rounded-full font-semibold hover:bg-gold-dark hover:scale-[1.02] transition-all shadow-xl shadow-black/20"
      >
        Rezervă acum
      </Link>
    </div>
  );
}
