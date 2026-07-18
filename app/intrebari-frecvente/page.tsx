import { getAllFaqs } from "@/lib/queries";
import { toPlainText } from "@/lib/sanity";
import Link from "next/link";

export const revalidate = 86400;

interface Faq {
  _id: string;
  question: string;
  answer: unknown[];
  order: number;
}

export default async function SSIPage() {
  const faqs = (await getAllFaqs()) as Faq[];

  return (
    <main className="pt-8 pb-20">
      <div className="container-custom">
        <div className="text-center mb-14">
          <h1 className="font-serif text-4xl md:text-5xl text-gold-dark">
            Întrebări frecvente
          </h1>
          <p className="mt-4 text-text-light max-w-xl mx-auto">
            Răspunsuri la cele mai comune întrebări despre serviciile noastre.
          </p>
        </div>

        {faqs.length > 0 ? (
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq._id}
                className="group bg-cream rounded-2xl border border-text-light/20 overflow-hidden"
              >
                <summary className="cursor-pointer px-6 py-4 font-serif text-gold-dark font-semibold marker:text-gold hover:text-gold transition-colors">
                  {faq.question}
                </summary>
                <p className="px-6 pb-4 text-sm text-text/80 leading-relaxed">
                  {toPlainText(faq.answer)}
                </p>
              </details>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-text/60">
            <p className="text-lg">
              Întrebările frecvente vor apărea aici odată adăugate în CMS.
            </p>
          </div>
        )}

        <div className="text-center mt-14">
          <p className="text-sm text-text/60">
            Nu ai găsit răspunsul?{" "}
            <Link href="/contact" className="text-gold hover:underline">
              Contactează-ne
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
