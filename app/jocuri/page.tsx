import { getAllGames } from "@/lib/queries";
import { toPlainText, urlFor } from "@/lib/sanity";
import ImageSlider from "@/components/ui/ImageSlider";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const revalidate = 3600;

interface Game {
  _id: string;
  name: string;
  description: unknown[];
  level: string;
  photos: SanityImageSource[];
}

function GameCard({ game }: { game: Game }) {
  const imageUrls =
    game.photos?.map((p) => urlFor(p).width(600).height(800).fit("crop").crop("focalpoint").url()) || [];
  const hasPhotos = imageUrls.length > 0;

  return (
    <div className="bg-cream rounded-xl overflow-hidden border border-text-light/10 flex flex-col">
      <div className="aspect-[3/4] bg-text-light/10">
        {hasPhotos ? (
          <ImageSlider images={imageUrls} alt={game.name} interactive={false} />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text/20">
            <svg
              className="w-12 h-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="p-5 flex-1">
        <h3 className="font-serif text-lg font-semibold text-gold-dark">
          {game.name}
        </h3>
        <p className="mt-2 text-sm text-text-light/80 leading-relaxed">
          {toPlainText(game.description)}
        </p>
      </div>
    </div>
  );
}

export default async function JocuriPage() {
  const games = (await getAllGames()) as Game[];
  const level1 = games.filter((g) => g.level === "1");
  const level2 = games.filter((g) => g.level === "2");

  return (
    <main className="pt-8 pb-20">
      <div className="container-custom">
        <div className="text-center mb-14">
          <h1 className="font-serif text-4xl md:text-5xl text-gold-dark">
            Jocurile noastre
          </h1>
          <p className="mt-4 text-text-light max-w-xl mx-auto">
            Toate jocurile sunt realizate din lemn și materiale premium,
            gândite să arate impecabil și să reziste.
          </p>
        </div>

        {level1.length > 0 && (
          <section className="mb-16">
            <h2 className="font-serif text-2xl text-gold-dark mb-8">
              Jocuri Nivel 1
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {level1.map((game) => (
                <GameCard key={game._id} game={game} />
              ))}
            </div>
          </section>
        )}

        {level2.length > 0 && (
          <section>
            <h2 className="font-serif text-2xl text-gold-dark mb-8">
              Jocuri Nivel 2
            </h2>
            <p className="text-sm text-text-light mb-6 -mt-4">
              Jocuri mai mari, de tip masă — Fussball, Air-Hockey, Ping-Pong.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {level2.map((game) => (
                <GameCard key={game._id} game={game} />
              ))}
            </div>
          </section>
        )}

        {games.length === 0 && (
          <div className="text-center py-20 text-text/60">
            <p className="text-lg">
              Jocurile vor apărea aici odată adăugate în CMS.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
