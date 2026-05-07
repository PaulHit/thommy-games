const faqs = [
  {
    question: "Ce zone acoperiți cu transport gratuit?",
    answer: "Oferim transport gratuit în limita a 70 km de Beclean, Bistrița-Năsăud. Pentru distanțe mai mari, putem oferi o ofertă personalizată în funcție de locația evenimentului.",
  },
  {
    question: "Cât durează perioada de joc?",
    answer: "Fiecare pachet include până la 5 ore consecutive de joc. Aceasta este durata standard, dar putem discuta și pentru evenimente mai lungi.",
  },
  {
    question: "Cum rezerv o dată?",
    answer: "Rezervarea se face prin completarea formularului de contact de pe site sau direct pe pagina pachetului dorit. Confirmarea datei se face după plata unui avans de 30%.",
  },
  {
    question: "Cine instalează jocurile?",
    answer: "Echipa Thommy Games se ocupă de tot: transport, montaj, afișarea instrucțiunilor și strângerea jocurilor după eveniment. Pentru pachetele Pro și Epic, un asistent rămâne pe durata evenimentului.",
  },
  {
    question: "Sunt jocurile potrivite pentru copii?",
    answer: "Da, majoritatea jocurilor sunt potrivite pentru toate vârstele. Avem jocuri care pot fi jucate atât de copii, cât și de adulți. Menționăm acest lucru și în descrierea fiecărui joc.",
  },
  {
    question: "Ce se întâmplă dacă plouă?",
    answer: "Jocurile pot fi amplasate și în interior, în funcție de spațiul disponibil. Pentru evenimente outdoor, recomandăm să aveți un plan de rezervă (cort, sală interioară). Discutăm aceste detalii înainte de eveniment.",
  },
  {
    question: "Când trebuie să fac rezervarea?",
    answer: "Recomandăm rezervarea cu cel puțin 2-3 săptămâni în avans, mai ales în sezonul de vârf (mai — septembrie). Verificăm disponibilitatea și confirmăm cât mai rapid.",
  },
  {
    question: "Pot alege eu jocurile din pachet?",
    answer: "Da, poți alege jocurile dorite din categoria corespunzătoare (Nivel 1 sau Nivel 2), în limita numărului de jocuri inclus în pachet.",
  },
];

export default function SSIPage() {
  return (
    <main className="pb-20">
      <div className="container-custom">
        <div className="text-center mb-14">
          <h1 className="font-serif text-4xl md:text-5xl text-gold-dark">
            Întrebări frecvente
          </h1>
          <p className="mt-4 text-text-light max-w-xl mx-auto">
            Răspunsuri la cele mai comune întrebări despre serviciile noastre.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group bg-cream rounded-2xl border border-text-light/20 overflow-hidden"
            >
              <summary className="cursor-pointer px-6 py-4 font-serif text-gold-dark font-semibold marker:text-gold hover:text-gold transition-colors">
                {faq.question}
              </summary>
              <p className="px-6 pb-4 text-sm text-text/80 leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        <div className="text-center mt-14">
          <p className="text-sm text-text/60">
            Nu ai găsit răspunsul?{" "}
            <a href="/contact" className="text-gold hover:underline">
              Contactează-ne
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
