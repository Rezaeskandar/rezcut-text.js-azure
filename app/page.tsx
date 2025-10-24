"use client";
import Image from "next/image";
import Link from "next/link";
import { services, Service } from "../data/services";
import { useState } from "react";

// Gruppera tjänster efter kategori
const groupedServices = services.reduce(
  (acc, service) => {
    (acc[service.category] = acc[service.category] || []).push(service);
    return acc;
  },
  {} as Record<string, Service[]>
);

export default function HomePage() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] font-sans min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/barbershop-hero.jpg"
          alt="Rezcut Interior"
          fill
          priority
          className="object-cover object-center brightness-75"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-[var(--gold)] mb-4 drop-shadow-lg">
            Rezcut
          </h1>
          <p className="text-lg md:text-2xl text-[var(--cream)] mb-8 font-light">
            Professionell barbershop där varje klippning är ett hantverk.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <Link href="/boking">
              <button className="bg-[var(--gold)] text-[var(--charcoal)] font-semibold px-8 py-3 rounded-lg shadow hover:bg-yellow-600 transition">
                Boka Nu
              </button>
            </Link>
            <Link href="/services">
              <button className="border border-[var(--gold)] text-[var(--gold)] px-8 py-3 rounded-lg shadow hover:bg-[var(--gold)] hover:text-[var(--charcoal)] transition bg-transparent">
                Se Tjänster
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-3xl mx-auto py-16 px-4 text-center transition-colors duration-300">
        <h2 className="text-3xl font-bold text-yellow-600 dark:text-gold mb-4">
          Om Rezcut
        </h2>
        <p className="text-lg text-gray-700 dark:text-white mb-2">
          Rezcut är där klassiskt hantverk möter modern stil. Våra barberare
          brinner för precision, kvalitet och att få varje kund att se sitt
          bästa ut. Upplev en lyxig, välkomnande atmosfär med omsorg för varje
          detalj.
        </p>
      </section>

      {/* Services Section */}
      <section className="max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-yellow-600 dark:text-gold mb-8 text-center">
          Våra Tjänster
        </h2>
        <div className="space-y-8">
          {Object.entries(groupedServices).map(
            ([category, servicesInCategory]) => (
              <div
                key={category}
                className="border-b-2 border-gray-200 dark:border-gray-700 last:border-b-0 pb-8"
              >
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex justify-between items-center text-left"
                >
                  <h3 className="text-2xl font-bold text-yellow-600 dark:text-gold">
                    {category}
                  </h3>
                  <span className="text-3xl text-yellow-600 dark:text-gold transform transition-transform duration-300">
                    {openCategory === category ? "−" : "+"}
                  </span>
                </button>
                {openCategory === category && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                    {servicesInCategory.map((service: Service) => (
                      <div
                        key={service.id}
                        className="bg-white dark:bg-[#232323] rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition"
                      >
                        <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                          {service.title}
                        </h4>
                        <p className="text-gray-700 dark:text-white mb-2">
                          {service.price} kr · {service.duration} min
                        </p>
                        <p className="text-sm text-gray-500 dark:text-white flex-grow">
                          {service.description}
                        </p>
                        <Link
                          href={`/boking?service=${service.id}`}
                          className="mt-4"
                        >
                          <button className="bg-yellow-500 dark:bg-gold text-gray-900 dark:text-charcoal font-semibold px-5 py-2 rounded-lg shadow hover:bg-yellow-600 transition-all text-sm">
                            Boka
                          </button>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </section>

      {/* Portfolio / Gallery Section */}
      <section className="max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-yellow-600 dark:text-gold mb-8 text-center">
          Galleri
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
        <h2 className="text-3xl font-bold text-yellow-600 dark:text-gold mb-8 text-center">
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
              className="bg-white dark:bg-[#232323] rounded-xl shadow-lg p-6 flex flex-col items-center"
            >
              <div className="flex mb-2">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-500 dark:text-gold"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.174 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 dark:text-white text-center mb-2 italic">
                &quot;{testimonial.review}&quot;
              </p>
              <span className="text-gray-800 dark:text-gold font-semibold">
                {testimonial.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 flex flex-col items-center bg-gray-100 dark:bg-[#232323]">
        <h2 className="text-2xl md:text-3xl font-bold text-yellow-600 dark:text-gold mb-4 text-center">
          Redo att boka tid?
        </h2>
        <Link href="/boking">
          <button className="bg-yellow-500 dark:bg-gold text-gray-900 dark:text-charcoal font-semibold px-8 py-3 rounded-lg shadow hover:bg-yellow-600 transition">
            Boka nu
          </button>
        </Link>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto text-center ">
          <h2 className="text-3xl font-bold text-yellow-600 dark:text-gold mb-8">
            Hitta till oss
          </h2>
          <div className="overflow-hidden rounded-xl shadow-lg border-2 border-gray-200 dark:border-gold">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2024.085828158095!2d17.92318967705277!3d59.51749997482326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f97b163a3c5a9%3A0x811c733c1393899!2sCentralv%C3%A4gen%201%2C%20194%2076%20Upplands%20V%C3%A4sby!5e0!3m2!1ssv!2sse!4v1721298154915!5m2!1ssv!2sse"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Karta som visar platsen för Rezcut i Upplands Väsby"
            ></iframe>
          </div>
          <p className="text-gray-700 dark:text-white mt-4 text-lg">
            Centralvägen 1, 194 76 Upplands Väsby
          </p>
        </div>
      </section>
    </div>
  );
}
