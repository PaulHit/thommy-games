import Link from "next/link";
import { sanityClient } from "@/lib/sanity";
import { toPlainText } from "@/lib/sanity";

export const revalidate = 86400;

interface IncludeItem {
  _key: string;
  emoji?: string;
  title?: string;
  description?: string;
}

interface PageData {
  title?: string;
  subtitle?: string;
}

interface PackageData {
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
}

export default async function PachetePage() {
  const data = await sanityClient.fetch<{
    packages: PackageData[];
    page: PageData | null;
    includes: IncludeItem[] | null;
  }>(
    `{
      "packages": *[_type == "package"] | order(order asc, _createdAt asc),
      "page": *[_type == "page" && slug.current == "pachete"][0]{ title, subtitle },
      "includes": *[_type == "siteSettings"][0].packageIncludes[]{ _key, emoji, title, description }
    }`
  );

  const packages = data.packages;
  const pageTitle = data.page?.title || "Pachete de jocuri";
  const pageSubtitle =
    data.page?.subtitle ||
    "Toate pachetele includ transport gratuit (70 km de Beclean, Bistrița-Năsăud), montaj, demontaj, instrucțiuni și 5 ore de joc. Pentru pachetele Pro și Epic oferim și asistent dedicat.";

  const defaultIncludes: IncludeItem[] = [
    { _key: "1", emoji: "🚚", title: "Transport gratuit", description: "În limita a 70 km de Beclean, Bistrița-Năsăud" },
    { _key: "2", emoji: "🔧", title: "Montaj & Demontaj", description: "Ne ocupăm de tot setupul" },
    { _key: "3", emoji: "📋", title: "Instrucțiuni", description: "Afișate pentru fiecare joc" },
    { _key: "4", emoji: "⏱️", title: "5 ore de joc", description: "Consecutive, incluse" },
  ];
  const includes = data.includes && data.includes.length > 0 ? data.includes : defaultIncludes;

  return (
    <main className="pt-8 pb-20">
      <div className="container-custom">
        <div className="text-center mb-14">
          <h1 className="font-serif text-4xl md:text-5xl text-gold-dark">{pageTitle}</h1>
          {pageSubtitle && <p className="mt-4 text-text-light max-w-xl mx-auto">{pageSubtitle}</p>}
        </div>

        {packages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg: PackageData) => (
              <div key={pkg._id} className="relative bg-cream rounded-2xl p-8 border border-text-light/20 flex flex-col">
                {pkg.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-block bg-green text-white text-xs px-5 py-2 rounded-full font-sans font-semibold tracking-wide uppercase shadow-md">
                      Recomandat
                    </span>
                  </div>
                )}
                <h2 className="font-serif text-2xl font-bold text-gold-dark">{pkg.name}</h2>
                <p className="text-4xl font-bold text-gold mt-4">{pkg.price} RON</p>
                <p className="text-text-light mt-2">{pkg.totalGames} jocuri</p>
                <p className="text-sm text-text/60 mt-1">{pkg.level1Count} jocuri Nivel 1 + {pkg.level2Count} jocuri Nivel 2</p>
                {pkg.includesAssistant && (
                  <p className="mt-4 inline-block bg-green/10 text-green px-3 py-1 rounded-full text-sm font-medium w-fit">
                    Asistent dedicat inclus
                  </p>
                )}
                <p className="mt-4 text-sm text-text/80 leading-relaxed">{toPlainText(pkg.description)}</p>
                <div className="mt-auto pt-6">
                  <Link href={`/pachete/${pkg.slug.current}`} className="block text-center bg-gold text-white px-6 py-3 rounded-full font-medium hover:bg-gold-dark hover:scale-105 transition-all">
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

        {includes.length > 0 && (
          <div className="mt-20 bg-white rounded-2xl border border-text-light/20 p-8 md:p-12">
            <h2 className="font-serif text-2xl text-gold-dark text-center mb-8">Ce include orice pachet</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {includes.map((item) => (
                <div key={item._key} className="text-center">
                  <p className="font-serif text-3xl text-gold font-bold mb-2">{item.emoji || "✨"}</p>
                  <h3 className="font-semibold text-gold-dark text-sm">{item.title}</h3>
                  {item.description && <p className="text-xs text-text/60 mt-1">{item.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
