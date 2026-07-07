import { sanityClient } from "@/lib/sanity";
import Link from "next/link";

export const revalidate = 86400;

interface PageContent {
  title?: string;
  content?: { _type: string; style?: string; children?: { _type?: string; text?: string; marks?: string[] }[] }[];
}

export default async function DesprePage() {
  const page = await sanityClient.fetch<PageContent | null>(
    `*[_type == "page" && slug.current == "despre"][0]{ title, content }`
  );

  const pageTitle = page?.title || "Despre Thommy Games";

  return (
    <main className="pt-8 pb-20">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl text-gold-dark text-center">{pageTitle}</h1>

          <div className="mt-12 text-text/80 leading-relaxed text-lg">
            {page?.content && page.content.length > 0 ? (
              <SanityContent blocks={page.content} />
            ) : (
              <>
                <p>
                  <strong>Thommy Games</strong> este un serviciu de închiriere de
                  jocuri mari, din lemn și materiale premium, pentru evenimente
                  private și corporate. Scopul nostru este să transformăm
                  evenimentele în experiențe memorabile, în care invitații nu stau
                  doar la mese, ci interacționează, se distrează și creează amintiri
                  împreună.
                </p>
                <p className="mt-6">
                  Oferim jocuri potrivite pentru nunți, petreceri private, botezuri,
                  aniversări, evenimente corporate, team-building-uri, evenimente
                  outdoor și alte contexte sociale în care organizatorii vor să
                  creeze atmosferă.
                </p>
                <p className="mt-6">
                  Ideea principală este simplă și puternică:{" "}
                  <strong className="text-gold-dark">
                    jocurile noastre sparg gheața între invitați
                  </strong>
                  . Ele creează o formă de divertisment naturală, relaxată și
                  elegantă, fără să acapareze evenimentul, ci completând atmosfera.
                </p>
                <h2 className="font-serif text-2xl text-gold-dark pt-8">
                  Misiunea noastră
                </h2>
                <p className="mt-4">
                  Transformăm evenimentele în amintiri de neuitat prin jocuri
                  interactive, elegante și potrivite pentru toate vârstele. Fiecare
                  joc este atent selecționat și întreținut pentru a oferi o
                  experiență impecabilă.
                </p>
                <p className="mt-6">
                  Lucrăm cu miri, wedding planners, companii și organizatori de
                  evenimente care vor ca invitații lor să aibă parte de ceva
                  diferit — ceva care rămâne în amintire mult după ce evenimentul
                  s-a încheiat.
                </p>
                <h2 className="font-serif text-2xl text-gold-dark pt-8">
                  Unde livrăm
                </h2>
                <p className="mt-4">
                  Suntem bazați în <strong>Beclean, Bistrița-Năsăud</strong> și oferim transport
                  gratuit în limita a <strong>70 km</strong>. Pentru evenimente în
                  afara acestei raze, oferim oferte personalizate în funcție de
                  distanță și complexitate.
                </p>
              </>
            )}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/contact"
              className="inline-block bg-gold text-white px-8 py-3.5 rounded-full font-medium hover:bg-gold-dark transition-colors"
            >
              Ia legătura cu noi
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function SanityContent({
  blocks,
}: {
  blocks: { _type: string; style?: string; children?: { _type?: string; text?: string; marks?: string[] }[] }[];
}) {
  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        if (block._type !== "block") return null;
        const style = block.style || "normal";

        const renderChildren = () =>
          block.children?.map((child, ci) => {
            const text = child.text || "";
            const isBold = child.marks?.includes("strong");
            if (isBold) {
              return (
                <strong key={ci} className="text-gold-dark">
                  {text}
                </strong>
              );
            }
            return <span key={ci}>{text}</span>;
          });

        switch (style) {
          case "h2":
            return (
              <h2 key={i} className="font-serif text-2xl text-gold-dark pt-8">
                {renderChildren()}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="font-serif text-xl text-gold-dark pt-6">
                {renderChildren()}
              </h3>
            );
          default:
            return <p key={i}>{renderChildren()}</p>;
        }
      })}
    </div>
  );
}
