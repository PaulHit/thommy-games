import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-cream py-20">
      <div className="container-custom text-center py-20">
        <p className="text-gold text-sm tracking-widest uppercase mb-4">
          Închirieri jocuri pentru evenimente
        </p>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-gold-dark leading-tight max-w-4xl mx-auto">
          Thommy Games
        </h1>
        <p className="mt-8 text-lg md:text-xl text-brown max-w-2xl mx-auto leading-relaxed">
          Uită de evenimentele plictisitoare. Cu Thommy Games, invitații tăi se
          joacă, râd, interacționează și își amintesc cu drag de evenimentul
          tău.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/pachete"
            className="inline-block bg-gold text-white px-8 py-3.5 rounded-full font-medium hover:bg-gold-dark transition-colors"
          >
            Vezi pachetele
          </Link>
          <Link
            href="/contact"
            className="inline-block border-2 border-gold text-gold-dark px-8 py-3.5 rounded-full font-medium hover:bg-gold hover:text-white transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
