"use client";
import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSubmitMessage(null); // Rensa meddelande när användaren börjar skriva igen
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSubmitMessage(null); // Rensa tidigare meddelanden

    try {
      const res = await fetch("/api/contact", {
        // Anropa den nya API-endpointen
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitMessage({
          type: "success",
          text: "Tack för ditt meddelande! Vi återkommer så snart som möjligt.",
        });
        setForm({ name: "", email: "", message: "" }); // Rensa formuläret vid lyckad sändning
      } else {
        setSubmitMessage({
          type: "error",
          text: data.error || "Kunde inte skicka meddelandet. Försök igen.",
        });
      }
    } catch (error) {
      console.error("Fel vid sändning av kontaktformulär:", error);
      setSubmitMessage({
        type: "error",
        text: "Något gick fel. Kontrollera din internetanslutning och försök igen.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section */}
      <section className="py-16 text-center bg-gray-100 dark:bg-[#1f1f1f]">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
          Kontakta Oss
        </h1>
        <p className="text-lg md:text-xl text-yellow-600 dark:text-gold font-medium mb-2">
          Har du frågor eller vill boka tid? Hör av dig till oss!
        </p>
      </section>

      {/* Main Contact Section */}
      <section className="max-w-6xl mx-auto py-16 px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Kontaktinfo */}
        <div className="bg-white dark:bg-[#232323] rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-yellow-600 dark:text-gold mb-6">
            Kontaktinformation
          </h2>
          <ul className="space-y-4 text-gray-700 dark:text-gray-300 text-lg">
            <li>
              <span className="mr-2">📍</span>{" "}
              <span className="font-semibold">Adress:</span> Åsögatan 92
              Södermalm
            </li>
            <li>
              <span className="mr-2">📞</span>{" "}
              <span className="font-semibold">Telefon:</span> 0708659138
            </li>
            <li>
              <span className="mr-2">📧</span>{" "}
              <span className="font-semibold">E-post:</span>{" "}
              info@noorisbarber.se
            </li>
          </ul>
          <div className="mt-8">
            <h3 className="text-lg font-bold text-yellow-600 dark:text-gold mb-2">
              Öppettider
            </h3>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>
                <span className="mr-2">⏰</span> Mån–Fre: 10:00–20:00
              </li>
              <li>
                <span className="mr-2">⏰</span> Lör: 10:00–15:00
              </li>
              <li>
                <span className="mr-2">⏰</span> Sön: Stängt
              </li>
            </ul>
          </div>
        </div>

        {/* Kontaktformulär */}
        <form
          className="bg-white dark:bg-[#232323] rounded-xl shadow-lg p-8 flex flex-col gap-6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-yellow-600 dark:text-gold mb-2">
            Skicka Meddelande
          </h2>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="font-medium text-gray-700 dark:text-gray-300"
            >
              Namn
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 dark:border-gold bg-gray-50 dark:bg-[#1f1f1f] text-gray-800 dark:text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-gold placeholder:text-gray-400"
              placeholder="Ditt namn"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="font-medium text-gray-700 dark:text-gray-300"
            >
              E-post
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 dark:border-gold bg-gray-50 dark:bg-[#1f1f1f] text-gray-800 dark:text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-gold placeholder:text-gray-400"
              placeholder="Din e-postadress"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="font-medium text-gray-700 dark:text-gray-300"
            >
              Meddelande
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full border border-gray-300 dark:border-gold bg-gray-50 dark:bg-[#1f1f1f] text-gray-800 dark:text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-gold placeholder:text-gray-400"
              placeholder="Skriv ditt meddelande här..."
            />
          </div>
          <button
            type="submit"
            disabled={loading} // Inaktivera knappen under sändning
            className="bg-yellow-500 dark:bg-gold text-gray-900 dark:text-charcoal font-semibold px-8 py-3 rounded-lg shadow hover:bg-yellow-600 transition disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {loading ? "Skickar..." : "Skicka Meddelande"}
          </button>
          {submitMessage && (
            <div
              className={`text-center font-medium mt-4 ${
                submitMessage.type === "success"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-500"
              }`}
            >
              {submitMessage.text}
            </div>
          )}
        </form>
      </section>

      {/* CTA / Karta Sektion */}
      <section className="bg-gray-100 dark:bg-[#1f1f1f] py-12 mt-8">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h3 className="text-2xl font-bold text-yellow-600 dark:text-gold mb-4">
            Besök oss på plats och upplev Noori's Barber-skillnaden.
          </h3>
          <Link
            href="https://www.google.com/maps/place/Åsögatan+92,+118+29+Stockholm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-yellow-500 dark:bg-gold text-gray-900 dark:text-charcoal px-6 py-3 rounded-lg font-semibold shadow hover:bg-yellow-600 transition-all duration-200">
              Hitta hit
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
