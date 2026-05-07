import Link from "next/link";

interface PackageProps {
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  totalGames: number;
  level1Count: number;
  level2Count: number;
  includesAssistant: boolean;
  featured?: boolean;
}

interface FeaturedPackagesProps {
  packages: PackageProps[];
}

export default function FeaturedPackages({ packages }: FeaturedPackagesProps) {
  if (packages.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-14">
          <h2 className="font-serif text-3xl md:text-4xl text-gold-dark">
            Pachetele noastre
          </h2>
          <p className="mt-4 text-brown max-w-lg mx-auto">
            Alege pachetul potrivit pentru evenimentul tău. Toate includ
            transport, montaj, instrucțiuni și 5 ore de joc.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className="bg-cream rounded-2xl p-6 flex flex-col items-center text-center border border-brown/20 hover:border-gold/50 transition-colors"
            >
              <div className="flex-1 flex flex-col items-center w-full">
                <h3 className="font-serif text-2xl font-bold text-gold-dark">
                  {pkg.name}
                </h3>
                <p className="mt-3 text-3xl font-bold text-gold">
                  €{pkg.price}
                </p>
                <p className="mt-2 text-sm text-brown">
                  {pkg.totalGames} jocuri
                </p>
                <p className="text-xs text-text/60">
                  {pkg.level1Count} Nivel 1 + {pkg.level2Count} Nivel 2
                </p>
                <div className="mt-3 h-7">
                  {pkg.includesAssistant && (
                    <span className="text-xs bg-gold/10 text-gold-dark px-3 py-1 rounded-full font-medium">
                      + Asistent dedicat
                    </span>
                  )}
                </div>
              </div>
              <Link
                href={`/pachete/${pkg.slug.current}`}
                className="mt-4 w-full bg-gold text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gold-dark transition-colors"
              >
                Vezi detalii
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
