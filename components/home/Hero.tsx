import Link from "next/link";

interface HeroProps {
  backgroundImage?: string;
}

export default function Hero({ backgroundImage }: HeroProps) {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {/* Background fallback gradient */}
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-cream-light to-gold/20" />
      )}

      {/* Dark overlay for readability */}
      <div
        className={`absolute inset-0 ${
          backgroundImage
            ? "bg-gradient-to-r from-black/60 to-black/40"
            : "bg-cream-light/30"
        }`}
      />

      <div className="relative container-custom text-center py-20 z-10">
        <p
          className={`text-sm tracking-[0.2em] uppercase mb-6 ${
            backgroundImage ? "text-gold/90" : "text-gold"
          }`}
        >
          Închirieri jocuri pentru evenimente
        </p>

        <h1
          className={`font-serif text-5xl md:text-7xl lg:text-8xl leading-tight max-w-5xl mx-auto ${
            backgroundImage ? "text-white" : "text-text"
          }`}
        >
          Thommy Games
        </h1>

        <p
          className={`mt-8 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${
            backgroundImage ? "text-white/80" : "text-text-light"
          }`}
        >
          Uită de evenimentele plictisitoare. Cu Thommy Games, invitații tăi
          se joacă, râd, interacționează și își amintesc cu drag de
          evenimentul tău.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/pachete"
            className="inline-block bg-gold text-white px-8 py-3.5 rounded-full font-medium hover:bg-gold-dark transition-colors shadow-lg shadow-gold/20"
          >
            Vezi pachetele
          </Link>
          <Link
            href="/contact"
            className={`inline-block border-2 px-8 py-3.5 rounded-full font-medium transition-colors ${
              backgroundImage
                ? "border-white text-white hover:bg-white hover:text-text"
                : "border-gold text-gold hover:bg-gold hover:text-white"
            }`}
          >
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
