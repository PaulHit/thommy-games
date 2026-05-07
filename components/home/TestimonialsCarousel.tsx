const testimonials = [
  {
    quote:
      "Jocurile au făcut diferența la nunta noastră. Invitații s-au distrat toată seara și încă mai vorbesc despre asta.",
    name: "Andreea & Mihai",
    role: "Miri",
  },
  {
    quote:
      "O alegere excelentă pentru team-building. Echipa a fost încântată, iar jocurile au creat o atmosferă relaxată și competitivă.",
    name: "Compania TechStar",
    role: "Eveniment corporate",
  },
  {
    quote:
      "Foarte profesioniști. Au venit, au instalat totul și la final au strâns fără să deranjeze pe nimeni. Recomand cu toată inima.",
    name: "Ioana P.",
    role: "Petrecere privată",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-14">
          <h2 className="font-serif text-3xl md:text-4xl text-gold-dark">
            Ce spun clienții
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-cream rounded-2xl p-8 border border-text-light/20"
            >
              <p className="text-text/80 italic leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 border-t border-text-light/20 pt-4">
                <p className="font-serif font-semibold text-gold-dark">
                  {t.name}
                </p>
                <p className="text-sm text-text-light">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
