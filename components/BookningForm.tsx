// components/BookningForm.tsx
"use client";

import { useState } from "react";
import { services as allServices, Service } from "../data/services";


type FormState = {
  name: string;
  email: string;
  phone?: string;
  serviceId: string;
  date: string;
  time: string;
  notes?: string;
};

export default function BookingForm({ defaultServiceId }: { defaultServiceId?: string }) {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    serviceId: defaultServiceId || allServices[0].id,
    date: "",
    time: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "Något gick fel" });
      } else {
        setMessage({ type: "success", text: "Bokningen är mottagen! Vi skickar bekräftelse via e-post." });
        setForm({
          name: "",
          email: "",
          phone: "",
          serviceId: defaultServiceId || allServices[0].id,
          date: "",
          time: "",
          notes: "",
        });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Nätverksfel" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Namn</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="Ditt namn"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">E-post</label>
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            type="email"
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="mail@exempel.se"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Telefon</label>
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            placeholder="070-123 45 67"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tjänst</label>
          <select
            value={form.serviceId}
            onChange={(e) => setForm({ ...form, serviceId: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          >
            {allServices.map((s: Service) => (
              <option key={s.id} value={s.id}>
                {s.title} — {s.price} kr
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Datum</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tid</label>
          <input
            type="time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Notering (valfritt)</label>
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            rows={3}
            placeholder="Önskemål eller info"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          type="submit"
          disabled={loading}
          className="bg-gold hover:opacity-90 text-white px-5 py-2 rounded"
        >
          {loading ? "Bokar..." : "Boka tid"}
        </button>

        {message && (
          <div
            className={`text-sm ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </form>
  );
}
