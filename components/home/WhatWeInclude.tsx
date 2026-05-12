import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface Benefit {
  title: string;
  description: string;
  image?: SanityImageSource;
}

interface WhatWeIncludeProps {
  benefits: Benefit[];
}

const placeholderGradients = [
  "from-green/20 to-green/40",
  "from-gold/20 to-gold/40",
  "from-green/20 to-green/40",
  "from-gold/20 to-gold/40",
  "from-green/20 to-green/40",
  "from-gold/20 to-gold/40",
];

export default function WhatWeInclude({ benefits }: WhatWeIncludeProps) {
  if (!benefits || benefits.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-3xl md:text-5xl text-gold-dark">
            De ce Thommy Games
          </h2>
          <p className="mt-6 text-text-light text-lg max-w-xl mx-auto">
            Aducem mai mult decât jocuri — aducem atmosferă, interacțiune și amintiri.
          </p>
        </div>

        {/* Benefits rows */}
        <div className="space-y-24 md:space-y-32">
          {benefits.map((benefit, i) => {
            const isEven = i % 2 === 1;
            const imageSrc = benefit.image ? urlFor(benefit.image).width(800).height(600).fit("crop").url() : null;
            const gradient = placeholderGradients[i % placeholderGradients.length];

            return (
              <div
                key={benefit.title}
                className={`flex flex-col ${
                  isEven ? "md:flex-row-reverse" : "md:flex-row"
                } items-center gap-10 md:gap-16`}
              >
                {/* Image */}
                <div className="w-full md:w-2/5 flex-shrink-0">
                  {imageSrc ? (
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src={imageSrc}
                        alt={benefit.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                    </div>
                  ) : (
                    <div
                      className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br ${gradient}`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-white/30 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full border-2 border-white/40" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Text */}
                <div className="w-full md:w-3/5">
                  <h3 className="font-serif text-2xl md:text-3xl text-gold-dark mb-4 uppercase tracking-wide">
                    {benefit.title}
                  </h3>
                  <p className="text-text/75 leading-relaxed md:text-lg max-w-lg">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
