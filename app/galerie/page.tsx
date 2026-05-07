export default function GaleriePage() {
  return (
    <main className="pb-20">
      <div className="container-custom">
        <div className="text-center mb-14">
          <h1 className="font-serif text-4xl md:text-5xl text-gold-dark">
            Galerie
          </h1>
          <p className="mt-4 text-brown max-w-xl mx-auto">
            Evenimente trecute și momente capturate. Vezi cum arată jocurile
            noastre în acțiune.
          </p>
        </div>

        <div className="text-center text-brown py-20">
          <p className="text-6xl mb-4">📸</p>
          <p className="text-lg">
            Galeria va fi populată cu poze din evenimente.
          </p>
          <p className="text-sm text-text/50 mt-2">
            Conținutul va fi gestionat prin Sanity CMS.
          </p>
        </div>
      </div>
    </main>
  );
}
