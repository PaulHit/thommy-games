import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface InstagramPost {
  _key: string;
  image: SanityImageSource;
  url?: string;
  caption?: string;
}

interface InstagramFeedProps {
  username?: string;
  profileUrl?: string;
  posts: InstagramPost[];
}

export default function InstagramFeed({ username, profileUrl, posts }: InstagramFeedProps) {
  if (posts.length === 0) return null;

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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          {posts.slice(0, 4).map((post) => {
            const src = urlFor(post.image).width(400).height(400).fit("crop").url();

            return (
              <Link
                key={post._key}
                href={post.url || profileUrl || "#"}
                target={post.url ? "_blank" : undefined}
                rel={post.url ? "noopener noreferrer" : undefined}
                className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
              >
                <Image
                  src={src}
                  alt={post.caption || "Postare Instagram"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
