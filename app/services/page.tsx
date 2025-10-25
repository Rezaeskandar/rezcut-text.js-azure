"use client";
import Link from "next/link";
import { services, Service } from "../../data/services";

const groupedServices = services.reduce(
  (acc, service) => {
    (acc[service.category] = acc[service.category] || []).push(service);
    return acc;
  },
  {} as Record<string, Service[]>
);

export default function ServicesPage() {
  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section */}
      <section className="py-16 text-center bg-gray-100 dark:bg-[#1f1f1f]">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
          Våra Tjänster
        </h1>
        <p className="text-lg md:text-xl text-yellow-600 dark:text-gold font-medium mb-2">
          Professionella barberartjänster för den moderna mannen.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="space-y-12">
          {Object.entries(groupedServices).map(
            ([category, servicesInCategory]) => (
              <div
                key={category}
                className="border-b-2 border-gray-200 dark:border-gray-700 last:border-b-0 pb-8"
              >
                <h2 className="text-3xl font-bold text-yellow-600 dark:text-gold mb-6">
                  {category}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {servicesInCategory.map((service: Service) => (
                    <div
                      key={service.id}
                      className="bg-white dark:bg-[#232323] text-gray-800 dark:text-cream rounded-2xl shadow-lg p-4 flex flex-col gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg dark:hover:shadow-gold/20"
                    >
                      <div className="text-3xl text-yellow-600 dark:text-gold">
                        {service.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {service.title}
                      </h3>
                      <div className="text-yellow-600 dark:text-gold font-bold text-base mb-1">
                        {service.price} kr &bull; {service.duration} min
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                        {service.description}
                      </p>
                      <Link
                        href={`/boking?service=${service.id}`}
                        className="mt-auto w-full"
                      >
                        <button
                          className="w-full bg-yellow-500 dark:bg-gold text-gray-900 dark:text-charcoal px-4 py-2 rounded-lg font-semibold shadow hover:bg-yellow-600 transition-all duration-200 text-sm"
                          type="button"
                        >
                          Boka Nu
                        </button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 dark:bg-[#1f1f1f] py-16 mt-12">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-600 dark:text-gold mb-4">
            Redo att boka din tid?
          </h2>
          <p className="text-lg text-gray-700 dark:text-white mb-6">
            Använd vårt enkla bokningssystem för att hitta en tid som passar
            dig.
          </p>
          <Link href="/boking">
            <button className="bg-yellow-500 dark:bg-gold text-gray-900 dark:text-charcoal px-8 py-3 rounded-lg font-semibold shadow hover:bg-yellow-600 transition-all duration-200">
              Boka Nu
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
