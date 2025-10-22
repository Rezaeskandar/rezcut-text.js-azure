import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] font-sans min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/barbershop-hero.jpg"
          alt="SH-Cutz Barbershop Interior"
          fill
          priority
          className="object-cover object-center brightness-75"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-[var(--gold)] mb-4 drop-shadow-lg">
            Craft. Style. SH-Cutz.
          </h1>
          <p className="text-lg md:text-2xl text-[var(--cream)] mb-8 font-light">
            Professional barbershop where every cut is a craft.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <Link href="/boking">
              <button className="bg-[var(--gold)] text-[var(--charcoal)] font-semibold px-8 py-3 rounded-lg shadow hover:bg-yellow-600 transition">
                Book Now
              </button>
            </Link>
            <Link href="/services">
              <button className="border border-[var(--gold)] text-[var(--gold)] px-8 py-3 rounded-lg shadow hover:bg-[var(--gold)] hover:text-[var(--charcoal)] transition bg-transparent">
                View Services
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-3xl mx-auto py-16 px-4 text-center transition-colors duration-300">
        <h2 className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-4">
          About SH-Cutz
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-200 mb-2">
          SH-Cutz is where classic craftsmanship meets modern style. Our barbers
          are passionate about precision, quality, and making every client look
          their best. Experience a luxurious, welcoming atmosphere with
          attention to every detail.
        </p>
      </section>

      {/* Services Section */}
      <section className="max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-gold mb-8 text-center">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Service Card Example */}
          <div className="bg-[#6b5b5b] rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition">
            <Image
              src="/images/haircut-icon.svg"
              alt="Haircut"
              width={48}
              height={48}
            />
            <h3 className="text-xl font-semibold text-gold mt-4 mb-2">
              Haircut
            </h3>
            <p className="text-cream mb-2">350 kr · 30 min</p>
            <p className="text-sm text-gray-300">
              Classic & modern cuts tailored to you.
            </p>
          </div>
          <div className="bg-[#6b5b5b] rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition">
            <Image
              src="/images/beard-icon.svg"
              alt="Beard Trim"
              width={48}
              height={48}
            />
            <h3 className="text-xl font-semibold text-gold mt-4 mb-2">
              Beard Trim
            </h3>
            <p className="text-cream mb-2">200 kr · 20 min</p>
            <p className="text-sm text-gray-300">
              Sharp lines, perfect shape, expert grooming.
            </p>
          </div>
          <div className="bg-[#6b5b5b] rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition">
            <Image
              src="/images/combo-icon.svg"
              alt="Combo"
              width={48}
              height={48}
            />
            <h3 className="text-xl font-semibold text-gold mt-4 mb-2">Combo</h3>
            <p className="text-cream mb-2">500 kr · 50 min</p>
            <p className="text-sm text-gray-300">
              Haircut & beard trim for a complete look.
            </p>
          </div>
          <div className="bg-[#6b5b5b] rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition">
            <Image
              src="/images/kids-icon.svg"
              alt="Kids Cut"
              width={48}
              height={48}
            />
            <h3 className="text-xl font-semibold text-gold mt-4 mb-2">
              Kids Cut
            </h3>
            <p className="text-cream mb-2">250 kr · 25 min</p>
            <p className="text-sm text-gray-300">
              Fun, stylish cuts for the young ones.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio / Gallery Section */}
      <section className="max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-gold mb-8 text-center">
          Gallery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div
              key={num}
              className="overflow-hidden rounded-xl shadow-lg group"
            >
              <Image
                src={`/n-${num}.jpg`}
                alt={`Client style ${num}`}
                width={400}
                height={300}
                className="w-full h-auto object-cover group-hover:scale-105 group-hover:brightness-90 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="max-w-4xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-gold mb-8 text-center">
          Vad Våra Kunder Säger
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Johan S.",
              review:
                "Bästa herrfrisören i stan! Alltid professionell och trevlig.",
              stars: 5,
            },
            {
              name: "Ali R.",
              review:
                "Fantastisk detaljkänsla. Jag ser alltid fräsch ut när jag går härifrån.",
              stars: 5,
            },
            {
              name: "Marcus L.",
              review: "Lyxig upplevelse med service i toppklass varje gång.",
              stars: 5,
            },
          ].map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-[#6b5b5b] rounded-xl shadow-lg p-6 flex flex-col items-center"
            >
              <div className="flex mb-2">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-gold"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.174 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z" />
                  </svg>
                ))}
              </div>
              <p className="text-cream text-center mb-2 italic">
                &quot;{testimonial.review}&quot;
              </p>
              <span className="text-gold font-semibold">
                {testimonial.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 flex flex-col items-center bg-[#6b5b5b]">
        <h2 className="text-2xl md:text-3xl font-bold text-gold mb-4 text-center">
          Redo att boka?
        </h2>
        <Link href="/boking">
          <button className="bg-gold text-charcoal font-semibold px-8 py-3 rounded-lg shadow hover:bg-yellow-600 transition">
            Boka Nu
          </button>
        </Link>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gold mb-8">Hitta till oss</h2>
          <div className="overflow-hidden rounded-xl shadow-lg border-2 border-gold">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2035.840277688065!2d18.07380137704258!3d59.31550397464879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f77e4a3a3b2e9%3A0x6e3dcf228a30997!2zw4Vzw7ZnYXRhbiA5MiwgMTE4IDI5IFN0b2NraG9sbQ!5e0!3m2!1ssv!2sse!4v1716386954497!5m2!1ssv!2sse"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Karta som visar platsen för SH-Cutz"
            ></iframe>
          </div>
          <p className="text-cream mt-4 text-lg">
            Åsögatan 92, Södermalm, Stockholm
          </p>
        </div>
      </section>
    </div>
  );
}
