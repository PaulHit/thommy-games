import { Metadata } from "next";
import Link from "next/link";
import BookingForm from "@/components/packages/BookingForm";
import { sanityClient } from "@/lib/sanity";
import { getPackageBySlug, getAllGames } from "@/lib/queries";
import { toPlainText } from "@/lib/sanity";

export const revalidate = 3600;

interface PackageData {
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  totalGames: number;
  level1Count: number;
  level2Count: number;
  includesAssistant: boolean;
  description: unknown[];
}

function buildIncludes(pkg: PackageData) {
  const items = [
    `${pkg.totalGames} jocuri la alegere`,
    `${pkg.level1Count} jocuri de Nivel 1`,
    `${pkg.level2Count} jocuri de Nivel 2`,
  ];
  if (pkg.includesAssistant) {
    items.push("Asistent dedicat pe durata evenimentului");
  }
  items.push(
    "Transport gratuit (70 km de Beclean, Bistrița-Năsăud)",
    "Montaj și demontaj",
    "Instrucțiuni afișate",
    "5 ore consecutive de joc"
  );
  if (pkg.includesAssistant) {
    items.push("Resetare jocuri", "Explicații pentru invitați");
  }
  return items;
}

export async function generateStaticParams() {
  const packages = await sanityClient.fetch<{ slug: { current: string } }[]>(
    `*[_type == "package"]{ slug }`
  );
  return packages.map((pkg) => ({ slug: pkg.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug) as PackageData | null;
  return {
    title: pkg ? `Pachetul ${pkg.name} — Thommy Games` : "Pachet — Thommy Games",
  };
}

export default async function PackagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug) as PackageData | null;
  const games = await getAllGames();

  if (!pkg) {
    return (
      <main className="pt-8 pb-20">
        <div className="container-custom text-center">
          <h1 className="font-serif text-3xl text-gold-dark">
            Pachetul nu a fost găsit
          </h1>
          <Link href="/pachete" className="text-gold hover:underline mt-4 inline-block">
            Înapoi la pachete
          </Link>
        </div>
      </main>
    );
  }

  const includes = buildIncludes(pkg);
  const descriptionText = toPlainText(pkg.description);

  return (
    <main className="pt-8 pb-20">
      <div className="container-custom">
        <Link
          href="/pachete"
          className="text-sm text-text-light hover:text-gold transition-colors mb-8 inline-block"
        >
          ← Înapoi la pachete
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl text-gold-dark">
              Pachetul {pkg.name}
              {pkg.slug.current === "classic" && (
                <span className="inline-block bg-green text-white text-xs px-3 py-1 rounded-md font-sans font-semibold tracking-wide uppercase ml-3 align-middle">
                  Recomandat
                </span>
              )}
            </h1>
            <p className="text-4xl font-bold text-gold mt-6">€{pkg.price}</p>

            <div className="flex flex-wrap gap-4 mt-4">
              <span className="bg-cream text-gold-dark text-sm px-4 py-1.5 rounded-full font-medium">
                {pkg.totalGames} jocuri
              </span>
              <span className="bg-cream text-gold-dark text-sm px-4 py-1.5 rounded-full font-medium">
                {pkg.level1Count} Nivel 1
              </span>
              <span className="bg-cream text-gold-dark text-sm px-4 py-1.5 rounded-full font-medium">
                {pkg.level2Count} Nivel 2
              </span>
            </div>

            {pkg.includesAssistant && (
              <p className="mt-4 bg-green/10 text-green inline-block px-4 py-2 rounded-full text-sm font-medium">
                ✓ Asistent dedicat inclus
              </p>
            )}

            <p className="mt-8 text-text/80 leading-relaxed text-lg">
              {descriptionText}
            </p>

            <div className="mt-8">
              <h3 className="font-serif text-xl text-gold-dark mb-4">
                Ce include
              </h3>
              <ul className="space-y-2">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-text/80">
                    <span className="text-gold mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <BookingForm
              packageName={`Pachetul ${pkg.name}`}
              level1Count={pkg.level1Count}
              level2Count={pkg.level2Count}
              games={games.map((g: { _id: string; name: string; level: string }) => ({
                _id: g._id,
                name: g.name,
                level: g.level,
              }))}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
