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
    <section className="py-20 bg-cream">
      <div className="container-custom">
        <div className="text-center mb-14">
          <h2 className="font-serif text-3xl md:text-4xl text-gold-dark">
            De ce Thommy Games
          </h2>
          <p className="mt-4 text-brown max-w-lg mx-auto">
            Aducem mai mult decât jocuri — aducem atmosferă, interacțiune și
            amintiri.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="bg-white rounded-xl p-6 border border-brown/10"
            >
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
