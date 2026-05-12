import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20 bg-gold-dark">
      <div className="container-custom text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-white">
          Gata să transformi evenimentul tău?
        </h2>
        <p className="mt-4 text-cream text-lg max-w-xl mx-auto">
          Alege pachetul potrivit și lasă-ne pe noi să aducem distracția.
          Primești ofertă personalizată în maxim 24 de ore.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/pachete"
            className="inline-block bg-white text-gold-dark px-8 py-3.5 rounded-full font-medium hover:bg-cream hover:scale-105 transition-all"
          >
            Vezi pachetele
          </Link>
          <Link
            href="/contact"
            className="inline-block border-2 border-white text-white px-8 py-3.5 rounded-full font-medium hover:bg-white hover:text-gold-dark hover:scale-105 transition-all"
          >
            Solicită ofertă
          </Link>
        </div>
      </div>
    </section>
  );
}
