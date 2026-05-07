export default function DesprePage() {
  return (
    <main className="pb-20">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl text-gold-dark text-center">
            Despre Thommy Games
          </h1>

          <section className="mt-12 space-y-6 text-text/80 leading-relaxed text-lg">
            <p>
              <strong>Thommy Games</strong> este un serviciu de închiriere de
              jocuri mari, din lemn și materiale premium, pentru evenimente
              private și corporate. Scopul nostru este să transformăm
              evenimentele în experiențe memorabile, în care invitații nu stau
              doar la mese, ci interacționează, se distrează și creează amintiri
              împreună.
            </p>

            <p>
              Oferim jocuri potrivite pentru nunți, petreceri private, botezuri,
              aniversări, evenimente corporate, team-building-uri, evenimente
              outdoor și alte contexte sociale în care organizatorii vor să
              creeze atmosferă.
            </p>

            <p>
              Ideea principală este simplă și puternică:{' '}
              <strong className="text-gold-dark">
                jocurile noastre sparg gheața între invitați
              </strong>
              . Ele creează o formă de divertisment naturală, relaxată și
              elegantă, fără să acapareze evenimentul, ci completând atmosfera.
            </p>

            <h2 className="font-serif text-2xl text-gold-dark pt-8">
              Misiunea noastră
            </h2>
            <p>
              Transformăm evenimentele în amintiri de neuitat prin jocuri
              interactive, elegante și potrivite pentru toate vârstele. Fiecare
              joc este atent selecționat și întreținut pentru a oferi o
              experiență impecabilă.
            </p>

            <p>
              Lucrăm cu miri, wedding planners, companii și organizatori de
              evenimente care vor ca invitații lor să aibă parte de ceva
              diferit — ceva care rămâne în amintire mult după ce evenimentul
              s-a încheiat.
            </p>

            <h2 className="font-serif text-2xl text-gold-dark pt-8">
              Unde livrăm
            </h2>
            <p>
              Suntem bazați în <strong>Beclean, Bistrița-Năsăud</strong> și oferim transport
              gratuit în limita a <strong>70 km</strong>. Pentru evenimente în
              afara acestei raze, oferim oferte personalizate în funcție de
              distanță și complexitate.
            </p>
          </section>

          <div className="mt-14 text-center">
            <a
              href="/contact"
              className="inline-block bg-gold text-white px-8 py-3.5 rounded-full font-medium hover:bg-gold-dark transition-colors"
            >
              Ia legătura cu noi
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
