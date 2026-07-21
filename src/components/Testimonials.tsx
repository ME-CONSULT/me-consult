const testimonials = [
  {
    quote:
      "It's been a great pleasure working with Mary and her team. They are true experts at the legal profession, and this allows us to focus on what we do best, which is building innovative products for customers. This has been super helpful for us as a startup to iterate at the speed we need to without worrying about the legal implications.",
    name: "David Peterside",
    role: "Co-Founder, Monnaie Technology Limited",
  },
  {
    quote:
      "I am thrilled to offer my heartfelt endorsement for ME Consult. In an ever-evolving legal landscape, ME Consult stands as a beacon of reliability and sets itself apart from other law firms. From navigating complex employment law matters, to providing support on M&A transactions and advising on general corporate matters, ME Consult has exhibited an unmatched commitment to excellence.",
    name: "Efunsola Moore",
    role: "Former Head of Legal, KOBO360",
  },
  {
    quote:
      "Working with Mary has been an incredibly positive experience. Her promptness in responding to inquiries and proactive communication style ensured that we were always informed and prepared. Mary's ability to distil complex legal issues into clear, actionable advice is truly impressive.",
    name: "Ladipo Lawani",
    role: "CEO, L&L Foods",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-10 lg:py-14">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#222753]/[0.03] p-8 sm:p-12 lg:p-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#222753]/60">
            Client Testimonials
          </p>
          <h2 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight text-[#222753] sm:text-4xl">
            What Our Clients Say About Our Services
          </h2>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="hover-glow flex flex-col justify-between rounded-2xl bg-white p-8 shadow-sm ring-1 ring-[#222753]/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                <blockquote className="text-sm leading-6 text-[#222753]/80">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-[#222753]/10 pt-4">
                  <p className="text-sm font-semibold text-[#222753]">{t.name}</p>
                  <p className="text-sm text-[#222753]/60">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
