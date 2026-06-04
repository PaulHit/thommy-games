interface InstagramFeedProps {
  username?: string;
  profileUrl?: string;
  embedUrl?: string;
}

export default function InstagramFeed({ username, profileUrl, embedUrl }: InstagramFeedProps) {
  if (!embedUrl) return null;

  return (
    <section className="py-20 bg-cream">
      <div className="container-custom">
        <div className="text-center mb-12">
          <p className="text-sm tracking-[0.2em] uppercase text-gold mb-3">
            Instagram
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-gold-dark">
            {username ? `@${username}` : "Urmărește-ne"}
          </h2>
          {profileUrl && (
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-gold hover:text-gold-dark font-medium text-sm transition-colors"
            >
              Vezi profilul complet →
            </a>
          )}
        </div>

        <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src={embedUrl}
            title="Instagram feed"
            className="w-full border-0"
            style={{ minHeight: "400px" }}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
