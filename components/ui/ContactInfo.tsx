"use client";

import { useEffect, useState } from "react";

interface ContactInfoData {
  email?: string;
  phone?: string;
  address?: string;
  freeTransportKm?: number;
  monFri?: string;
  saturday?: string;
  sunday?: string;
}

export default function ContactInfo() {
  const [data, setData] = useState<ContactInfoData | null>(null);

  useEffect(() => {
    fetch("/api/contact-info")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data) return null;

  return (
    <div className="space-y-8">
      <div className="bg-cream rounded-2xl p-8 border border-text-light/20">
        <h2 className="font-serif text-xl text-gold-dark mb-4">Informații de contact</h2>
        <div className="space-y-4 text-text/80">
          <div>
            <p className="text-sm font-medium text-gold-dark">Email</p>
            <a href={`mailto:${data.email}`} className="hover:text-gold transition-colors">
              {data.email || "contact@thommygames.ro"}
            </a>
          </div>
          <div>
            <p className="text-sm font-medium text-gold-dark">Telefon</p>
            <a href={`tel:${data.phone}`} className="hover:text-gold transition-colors">
              {data.phone || "0746471908"}
            </a>
          </div>
          <div>
            <p className="text-sm font-medium text-gold-dark">Locație</p>
            <p>{data.address || "Beclean, Bistrița-Năsăud"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gold-dark">Transport gratuit</p>
            <p>În limita a {data.freeTransportKm || 70} km de Beclean, Bistrița-Năsăud</p>
          </div>
        </div>
      </div>

      <div className="bg-cream rounded-2xl p-8 border border-text-light/20">
        <h2 className="font-serif text-xl text-gold-dark mb-4">Program</h2>
        <div className="space-y-2 text-sm text-text/80">
          <p>{data.monFri || "Luni — Vineri: 09:00 — 18:00"}</p>
          <p>{data.saturday || "Sâmbătă: 10:00 — 16:00"}</p>
          <p>{data.sunday || "Duminică: Închis (evenimente programate)"}</p>
        </div>
      </div>
    </div>
  );
}
