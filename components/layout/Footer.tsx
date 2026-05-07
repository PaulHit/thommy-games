import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-cream border-t border-brown/20 pt-16 pb-8">
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
              Închirieri jocuri mari pentru nunți, petreceri private și
              evenimente corporate. Transport gratuit în limita a 70 km de
              Beclean, Bistrița-Năsăud.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold text-gold-dark mb-4">
              Linkuri rapide
            </h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/pachete" className="text-text hover:text-gold transition-colors">Pachete</Link>
              <Link href="/jocuri" className="text-text hover:text-gold transition-colors">Jocuri</Link>
              <Link href="/despre" className="text-text hover:text-gold transition-colors">Despre noi</Link>
              <Link href="/galerie" className="text-text hover:text-gold transition-colors">Galerie</Link>
              <Link href="/ssi" className="text-text hover:text-gold transition-colors">Întrebări frecvente</Link>
              <Link href="/contact" className="text-text hover:text-gold transition-colors">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold text-gold-dark mb-4">
              Contact
            </h4>
            <div className="space-y-3 text-sm">
              <p className="text-text">
                <span className="text-gold-dark font-medium">Email: </span>
                <a href="mailto:contact@thommygames.ro" className="hover:text-gold transition-colors">
                  contact@thommygames.ro
                </a>
              </p>
              <p className="text-text">
                <span className="text-gold-dark font-medium">Locație: </span>
                Beclean, Bistrița-Năsăud
              </p>
              <p className="text-text/80 text-xs mt-4">
                Transport gratuit în limita a 70 km
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-brown/20 mt-10 pt-6 text-center text-xs text-text/60">
          © {new Date().getFullYear()} Thommy Games. Toate drepturile
          rezervate.
        </div>
      </div>
    </footer>
  );
}
