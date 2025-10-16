"use client";
import { useState } from "react";
import Link from "next/link";

const services = [
  { id: "haircut", name: "Herrklippning", icon: "✂" },
  { id: "beard", name: "Skäggtrimning", icon: "🧔" },
  { id: "combo", name: "Combo (Klipp + Skägg)", icon: "💈" },
];

export default function BookingPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
  });
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.service ||
      !form.date ||
      !form.time
    ) {
      setError("Alla fält måste fyllas i.");
      return;
    }
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (result.success) {
        alert("Tack för din bokning! Vi bekräftar din tid inom kort.");
        setForm({
          name: "",
          email: "",
          phone: "",
          service: "",
          date: "",
          time: "",
        });
        setError("");
      } else {
        setError("Kunde inte skicka bokningen. Försök igen.");
      }
    } catch {
      setError("Något gick fel. Försök igen.");
    }
  }

  return (
    <div className="bg-[#f9f9f9] min-h-screen font-sans">
      {/* Hero Section */}
      <section className="bg-[#1f1f1f] text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Boka Din Tid
        </h1>
        <p className="text-lg md:text-xl text-[#b2862d] font-medium mb-2">
          Välj tjänst, datum och tid — och säkra din plats hos våra
          professionella barberare.
        </p>
      </section>

      {/* Booking Form */}
      <section className="max-w-6xl mx-auto px-4 py-12">
  <div className="bg-[#232323] text-white rounded-2xl shadow-lg p-8 max-w-lg mx-auto">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-[#b2862d] mb-2 text-center">
              Bokningsformulär
            </h2>
            {error && (
              <div className="text-red-600 text-center font-medium">
                {error}
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="font-medium text-white flex items-center gap-2"
              >
                <span>👤</span> Namn
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="border border-[#b2862d] bg-[#232323] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b2862d] placeholder:text-gray-400 transition-all duration-200"
                placeholder="Ditt namn"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="font-medium text-white flex items-center gap-2"
              >
                <span>📧</span> E-post
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="border border-[#b2862d] bg-[#232323] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b2862d] placeholder:text-gray-400 transition-all duration-200"
                placeholder="Din e-postadress"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="phone"
                className="font-medium text-white flex items-center gap-2"
              >
                <span>📱</span> Telefonnummer
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="border border-[#b2862d] bg-[#232323] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b2862d] placeholder:text-gray-400 transition-all duration-200"
                placeholder="Ditt telefonnummer"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="service"
                className="font-medium text-white flex items-center gap-2"
              >
                <span>💈</span> Välj tjänst
              </label>
              <select
                id="service"
                name="service"
                value={form.service}
                onChange={handleChange}
                required
                className="border border-[#b2862d] bg-[#232323] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b2862d] transition-all duration-200"
              >
                <option value="">Välj...</option>
                {services.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.icon} {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="date"
                className="font-medium text-white flex items-center gap-2"
              >
                <span>🗓</span> Datum
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="border border-[#b2862d] bg-[#232323] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b2862d] placeholder:text-gray-400 transition-all duration-200"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="time"
                className="font-medium text-whiteflex items-center gap-2"
              >
                <span>⏰</span> Tid
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                required
                className="border border-[#b2862d] bg-[#232323] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b2862d] placeholder:text-gray-400 transition-all duration-200"
              />
            </div>
            <button
              type="submit"
              className="bg-[#b2862d] text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-[#b2862d]/80 transition-all duration-200 hover:scale-105"
            >
              Boka Nu
            </button>
          </form>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1f1f1f] text-white text-center py-12">
        <h2 className="text-3xl font-bold text-[#b2862d] mb-4">
          Redo för en ny look?
        </h2>
        <p className="mb-6">Vi ser fram emot att välkomna dig till SH-Cutz.</p>
        <Link href="/services">
          <button className="bg-[#b2862d] text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-[#b2862d]/80 transition-all duration-200 hover:scale-105">
            Se Våra Tjänster
          </button>
        </Link>
      </section>
    </div>
  );
}
