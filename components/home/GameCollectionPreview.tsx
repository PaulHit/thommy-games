import Image from "next/image";

export default function GameCollectionPreview() {
  return (
    <section className="py-8 lg:py-12 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <div className="bg-cream rounded-xl overflow-hidden border border-text-light/10">
            <div className="relative aspect-[9/16]">
              <Image
                src="/left.jpg"
                alt="Colecția de jocuri Thommy Games"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="bg-cream rounded-xl overflow-hidden border border-text-light/10">
            <div className="relative aspect-[9/16]">
              <Image
                src="/right.jpg"
                alt="Colecția de jocuri Thommy Games"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
