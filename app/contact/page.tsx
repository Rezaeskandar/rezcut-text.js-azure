"use client";
import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("Tack för ditt meddelande!");
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <div className="bg-[#f9f9f9] min-h-screen font-sans">
      {/* Hero Section */}
      <section className="py-16 text-center bg-white">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1f1f1f] mb-4 tracking-tight">
          Kontakta Oss
        </h1>
        <p className="text-lg md:text-xl text-[#b2862d] font-medium mb-2">
          Har du frågor eller vill boka tid? Hör av dig till oss!
        </p>
      </section>

      {/* Main Contact Section */}
      <section className="max-w-6xl mx-auto py-16 px-4 flex flex-col md:flex-row gap-8">
        {/* Kontaktinfo */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex-1 mb-8 md:mb-0">
          <h2 className="text-2xl font-bold text-[#b2862d] mb-6">
            Kontaktinformation
          </h2>
          <ul className="space-y-4 text-gray-700 text-lg">
            <li>
              <span className="mr-2">📍</span>{" "}
              <span className="font-semibold">Adress:</span> Storgatan 12, 111
              22 Stockholm
            </li>
            <li>
              <span className="mr-2">📞</span>{" "}
              <span className="font-semibold">Telefon:</span> 070-123 45 67
            </li>
            <li>
              <span className="mr-2">📧</span>{" "}
              <span className="font-semibold">E-post:</span> info@sh-cutz.se
            </li>
          </ul>
          <div className="mt-8">
            <h3 className="text-lg font-bold text-[#b2862d] mb-2">
              Öppettider
            </h3>
            <ul className="space-y-1 text-gray-700">
              <li>
                <span className="mr-2">⏰</span> Mån–Fre: 10:00–19:00
              </li>
              <li>
                <span className="mr-2">⏰</span> Lör: 10:00–17:00
              </li>
              <li>
                <span className="mr-2">⏰</span> Sön: Stängt
              </li>
            </ul>
          </div>
        </div>

        {/* Kontaktformulär */}
        <form
          className="bg-white rounded-xl shadow-lg p-8 flex-1 max-w-md mx-auto flex flex-col gap-6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-[#b2862d] mb-2">
            Skicka Meddelande
          </h2>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-medium text-gray-700">
              Namn
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b2862d] transition-all duration-200"
              placeholder="Ditt namn"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium text-gray-700">
              E-post
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b2862d] transition-all duration-200"
              placeholder="Din e-postadress"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="font-medium text-gray-700">
              Meddelande
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b2862d] transition-all duration-200"
              placeholder="Skriv ditt meddelande här..."
            />
          </div>
          <button
            type="submit"
            className="bg-[#b2862d] text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-[#b2862d]/80 transition-all duration-200"
          >
            Skicka Meddelande
          </button>
        </form>
      </section>

      {/* CTA / Karta Sektion */}
      <section className="bg-[#1f1f1f] text-white py-12 mt-8">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h3 className="text-2xl font-bold text-[#b2862d] mb-4">
            Besök oss på plats och upplev SH-Cutz skillnaden.
          </h3>
          <Link
            href="https://goo.gl/maps/your-google-maps-link"
            target="_blank"
            rel="noopener"
          >
            <button className="bg-[#b2862d] text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-[#b2862d]/80 transition-all duration-200">
              Visa på Google Maps
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
