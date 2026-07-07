interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  quote: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-14">
          <h2 className="font-serif text-3xl md:text-4xl text-gold-dark">
            Ce spun clienții
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="bg-cream rounded-2xl p-8 border border-text-light/20"
            >
              <p className="text-text/80 italic leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 border-t border-text-light/20 pt-4">
                <p className="font-serif font-semibold text-gold-dark">
                  {t.name}
                </p>
                {t.role && (
                  <p className="text-sm text-text-light">{t.role}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
