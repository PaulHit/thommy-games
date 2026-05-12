import Link from "next/link";
import { getAllPackages } from "@/lib/queries";
import { toPlainText } from "@/lib/sanity";

export const revalidate = 86400;

export default async function PachetePage() {
  const packages = await getAllPackages();

  return (
    <main className="pt-8 pb-20">
      <div className="container-custom">
        <div className="text-center mb-14">
          <h1 className="font-serif text-4xl md:text-5xl text-gold-dark">
            Pachete de jocuri
          </h1>
          <p className="mt-4 text-text-light max-w-xl mx-auto">
            Toate pachetele includ transport gratuit (70 km de Beclean, Bistrița-Năsăud), montaj,
            demontaj, instrucțiuni și 5 ore de joc. Pentru pachetele Pro și Epic
            oferim și asistent dedicat.
          </p>
        </div>

        {packages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg: {
              _id: string;
              name: string;
              slug: { current: string };
              price: number;
              totalGames: number;
              level1Count: number;
              level2Count: number;
              includesAssistant: boolean;
              recommended?: boolean;
              description: unknown[];
            }) => (
              <div
                key={pkg._id}
                className="relative bg-cream rounded-2xl p-8 border border-text-light/20 flex flex-col"
              >
                {/* Recomandat badge - top center */}
                {pkg.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-block bg-green text-white text-xs px-5 py-2 rounded-full font-sans font-semibold tracking-wide uppercase shadow-md">
                      Recomandat
                    </span>
                  </div>
                )}
                <h2 className="font-serif text-2xl font-bold text-gold-dark">
                  {pkg.name}
                </h2>
                <p className="text-4xl font-bold text-gold mt-4">€{pkg.price}</p>
                <p className="text-text-light mt-2">{pkg.totalGames} jocuri</p>
                <p className="text-sm text-text/60 mt-1">
                  {pkg.level1Count} jocuri Nivel 1 + {pkg.level2Count} jocuri Nivel 2
                </p>
                {pkg.includesAssistant && (
                  <p className="mt-4 inline-block bg-green/10 text-green px-3 py-1 rounded-full text-sm font-medium w-fit">
                    Asistent dedicat inclus
                  </p>
                )}
                <p className="mt-4 text-sm text-text/80 leading-relaxed">
                  {toPlainText(pkg.description)}
                </p>
                <div className="mt-auto pt-6">
                  <Link
                    href={`/pachete/${pkg.slug.current}`}
                    className="block text-center bg-gold text-white px-6 py-3 rounded-full font-medium hover:bg-gold-dark hover:scale-105 transition-all"
                  >
                    Vezi detalii și rezervă
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-text/60">
            <p className="text-lg">Pachetele vor apărea aici odată adăugate în CMS.</p>
          </div>
        )}

        <div className="mt-20 bg-white rounded-2xl border border-text-light/20 p-8 md:p-12">
          <h2 className="font-serif text-2xl text-gold-dark text-center mb-8">
            Ce include orice pachet
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="font-serif text-3xl text-gold font-bold mb-2">
                🚚
              </p>
              <h3 className="font-semibold text-gold-dark text-sm">
                Transport gratuit
              </h3>
              <p className="text-xs text-text/60 mt-1">
                În limita a 70 km de Beclean, Bistrița-Năsăud
              </p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl text-gold font-bold mb-2">
                🔧
              </p>
              <h3 className="font-semibold text-gold-dark text-sm">
                Montaj & Demontaj
              </h3>
              <p className="text-xs text-text/60 mt-1">
                Ne ocupăm de tot setupul
              </p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl text-gold font-bold mb-2">
                📋
              </p>
              <h3 className="font-semibold text-gold-dark text-sm">
                Instrucțiuni
              </h3>
              <p className="text-xs text-text/60 mt-1">
                Afișate pentru fiecare joc
              </p>
            </div>
            <div className="text-center">
              <p className="font-serif text-3xl text-gold font-bold mb-2">
                ⏱️
              </p>
              <h3 className="font-semibold text-gold-dark text-sm">
                5 ore de joc
              </h3>
              <p className="text-xs text-text/60 mt-1">Consecutive, incluse</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
