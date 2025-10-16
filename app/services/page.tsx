import Link from "next/link";

const services = [
  {
    id: "herrklippning",
    title: "Herrklippning",
    price: 450,
    duration: 45,
    description: "Professionell herrklippning anpassad efter din stil.",
    icon: "✂",
  },
  {
    id: "skaggtrimning",
    title: "Skäggtrimning",
    price: 300,
    duration: 30,
    description: "Expertmässig skäggtrimning och formning.",
    icon: "🧔",
  },
  {
    id: "combo",
    title: "Combo",
    price: 650,
    duration: 60,
    description: "Komplett behandling med klipp och skägg.",
    icon: "💈",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-[#f9f9f9] min-h-screen font-sans">
      {/* Hero Section */}
      <section className="py-16 text-center bg-white">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1f1f1f] mb-4 tracking-tight">
          Våra Tjänster
        </h1>
        <p className="text-lg md:text-xl text-[#b2862d] font-medium mb-2">
          Professionella barberartjänster för den moderna mannen.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4 transition-all duration-200 hover:scale-105 hover:shadow-xl"
            >
              <div className="text-4xl mb-2 text-[#b2862d]">{service.icon}</div>
              <h2 className="text-2xl font-semibold text-[#1f1f1f] mb-1">
                {service.title}
              </h2>
              <div className="text-[#b2862d] font-bold text-lg mb-1">
                {service.price} kr &bull; {service.duration} min
              </div>
              <p className="text-gray-700 mb-4">{service.description}</p>
              <Link href="/booking">
                <button
                  className="bg-[#b2862d] text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-[#b2862d]/80 transition-all duration-200"
                  type="button"
                >
                  Boka Nu
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1f1f1f] py-16 mt-12">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#b2862d] mb-4">
            Redo att boka din tid?
          </h2>
          <p className="text-lg text-white mb-6">
            Använd vårt enkla bokningssystem för att hitta en tid som passar
            dig.
          </p>
          <Link href="/booking">
            <button className="bg-[#b2862d] text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-[#b2862d]/80 transition-all duration-200">
              Boka Nu
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
// lib/services.ts
export type Service = {
  id: string;
  title: string;
  price: number;
  duration: number; // minuter
  description: string;
  icon?: string;
};

