import Link from "next/link";

interface HeroProps {
  heroTitle?: string;
  heroSubtitle?: string;
}

export default function Hero({ heroTitle, heroSubtitle }: HeroProps) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-cream via-cream-light to-gold/10">
      <div className="container-custom py-20 z-10 text-center max-w-4xl mx-auto">
        <p className="text-sm tracking-[0.2em] uppercase mb-6 text-gold">
          Închirieri jocuri pentru evenimente
        </p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight text-text">
          {heroTitle || "Thommy Games"}
        </h1>
        <p className="mt-8 text-lg md:text-xl max-w-xl mx-auto leading-relaxed text-text-light">
          {heroSubtitle ||
            "Uită de evenimentele plictisitoare. Cu Thommy Games, invitații tăi se joacă, râd, interacționează și își amintesc cu drag de evenimentul tău."}
        </p>
        <div className="mt-12 flex gap-4 justify-center flex-col sm:flex-row">
          <Link
            href="/pachete"
            className="inline-block bg-gold text-white px-8 py-3.5 rounded-full font-medium hover:bg-gold-dark hover:scale-105 transition-all shadow-lg shadow-gold/20"
          >
            Vezi pachetele
          </Link>
          <Link
            href="/contact"
            className="inline-block border-2 border-gold text-gold px-8 py-3.5 rounded-full font-medium hover:bg-gold hover:text-white hover:scale-105 transition-all"
          >
            Contact
          </Link>
        </div>
        <div className="mt-6">
          <Link
            href="/jocuri"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-dark hover:text-gold hover:scale-105 transition-all"
          >
            Vezi toate jocurile
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
