"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SocialLinks from "@/components/ui/SocialLinks";

interface FooterData {
  email?: string;
  phone?: string;
  address?: string;
  footerDescription?: string;
  footerCopyright?: string;
}

export default function FooterClient() {
  const [data, setData] = useState<FooterData | null>(null);

  useEffect(() => {
    fetch("/api/footer-data")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  return (
    <footer className="bg-cream border-t border-text-light/20 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Image
              src="/logo.png"
              alt="Thommy Games"
              width={80}
              height={80}
              className="mb-4"
            />
            <p className="text-text/80 text-sm leading-relaxed">
              {data?.footerDescription ||
                "Închirieri jocuri mari pentru nunți, petreceri private și evenimente corporate. Transport gratuit în limita a 70 km de Beclean, Bistrița-Năsăud."}
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold text-gold-dark mb-4">Linkuri rapide</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/pachete" className="text-text hover:text-gold hover:scale-110 transition-all inline-block">Pachete</Link>
              <Link href="/jocuri" className="text-text hover:text-gold hover:scale-110 transition-all inline-block">Jocuri</Link>
              <Link href="/despre" className="text-text hover:text-gold hover:scale-110 transition-all inline-block">Despre noi</Link>
              <Link href="/intrebari-frecvente" className="text-text hover:text-gold hover:scale-110 transition-all inline-block">Întrebări frecvente</Link>
              <Link href="/contact" className="text-text hover:text-gold hover:scale-110 transition-all inline-block">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold text-gold-dark mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <p className="text-text">
                <span className="text-gold-dark font-medium">Email: </span>
                <a href={`mailto:${data?.email || "contact@thommygames.ro"}`} className="hover:text-gold transition-colors">
                  {data?.email || "contact@thommygames.ro"}
                </a>
              </p>
              <p className="text-text">
                <span className="text-gold-dark font-medium">Telefon: </span>
                <a href={`tel:${data?.phone || "0746471908"}`} className="hover:text-gold transition-colors">
                  {data?.phone || "0746471908"}
                </a>
              </p>
              <p className="text-text">
                <span className="text-gold-dark font-medium">Locație: </span>
                {data?.address || "Beclean, Bistrița-Năsăud"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <SocialLinks />
        </div>

        <div className="border-t border-text-light/20 mt-10 pt-6 text-center text-xs text-text/60">
          {data?.footerCopyright ||
            `© ${new Date().getFullYear()} Thommy Games. Toate drepturile rezervate.`}
        </div>
      </div>
    </footer>
  );
}
