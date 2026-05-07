const benefits = [
  {
    title: "Spargem gheața",
    description:
      "Invitații care nu se cunosc ajung să râdă, să vorbească și să interacționeze natural prin jocuri.",
  },
  {
    title: "Eveniment memorabil",
    description:
      "Oamenii uită meniul sau decorul, dar își amintesc momentele în care s-au simțit bine.",
  },
  {
    title: "Pentru toate vârstele",
    description:
      "Copii, tineri, adulți — fiecare găsește un joc potrivit și se distrează.",
  },
  {
    title: "Ne ocupăm de tot",
    description:
      "Transport, montaj, instrucțiuni și strângere. Tu doar te bucuri de eveniment.",
  },
  {
    title: "5 ore de joc",
    description:
      "Până la 5 ore consecutive de joc și socializare, incluse în orice pachet.",
  },
  {
    title: "Arată impecabil",
    description:
      "Jocuri din lemn și materiale premium, elegante, care completează atmosfera evenimentului.",
  },
];

export default function WhatWeInclude() {
  return (
    <section className="py-20 bg-cream relative overflow-hidden">
      {/* Decorative green shapes */}
      <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-green/5 pointer-events-none" />
      <div className="absolute bottom-16 right-8 w-16 h-16 rounded-full bg-green/5 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-green/[0.03] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-green" />
            <div className="w-2 h-2 rounded-full bg-gold" />
            <div className="w-2 h-2 rounded-full bg-green" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-gold-dark">
            De ce Thommy Games
          </h2>
          <p className="mt-4 text-text-light max-w-lg mx-auto">
            Aducem mai mult decât jocuri — aducem atmosferă, interacțiune și
            amintiri.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className="relative bg-white rounded-xl p-6 border-t-2 border-green/30 hover:border-green/60 transition-colors shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-green/60 flex-shrink-0" />
                <div className="w-2 h-2 rounded-full bg-gold/50 flex-shrink-0" />
                <div className="w-2 h-2 rounded-full bg-green/30 flex-shrink-0" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-gold-dark mb-2">
                {b.title}
              </h3>
              <p className="text-sm text-text/80 leading-relaxed">
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
