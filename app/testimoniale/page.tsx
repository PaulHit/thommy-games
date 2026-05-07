export default function TestimonialePage() {
  return (
    <main className="pb-20">
      <div className="container-custom">
        <div className="text-center mb-14">
          <h1 className="font-serif text-4xl md:text-5xl text-gold-dark">
            Testimoniale
          </h1>
          <p className="mt-4 text-brown max-w-xl mx-auto">
            Ce spun clienții noștri despre experiența Thommy Games.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
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
                "Foarte profesioniști. Au venit, au instalat totul și la final au strâns fără să deranjeze pe nimeni. Recomand.",
              name: "Ioana P.",
              role: "Petrecere privată",
            },
            {
              quote:
                "Perfect pentru botezul copilului. Atât adulții cât și copiii au avut ce face. Zona de jocuri a fost mereu plină.",
              name: "Familia Popescu",
              role: "Botez",
            },
            {
              quote:
                "Am organizat o nuntă cu 200 de invitați și jocurile au fost una dintre cele mai apreciate surprize. Recomand cu încredere.",
              name: "Elena & Radu",
              role: "Miri",
            },
            {
              quote:
                "La festivalul nostru, zona Thommy Games a fost mereu aglomerată. Profesioniști, punctuali și jocuri impecabile.",
              name: "Festivalul Verii",
              role: "Festival",
            },
          ].map((t) => (
            <div
              key={t.name}
              className="bg-cream rounded-2xl p-8 border border-brown/20"
            >
              <p className="text-text/80 italic leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 border-t border-brown/20 pt-4">
                <p className="font-serif font-semibold text-gold-dark">
                  {t.name}
                </p>
                <p className="text-sm text-brown">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
