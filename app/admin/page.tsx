"use client";
import { useState, useEffect } from "react";

// Typ för en bokning
interface Booking {
  id: number;
  name: string;
  service: string;
  date: string;
  time: string;
  phone: string;
  email: string;
  message?: string;
  handled: boolean;
  created: string;
}

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  // Ditt admin-lösenord (lägg helst i .env.local)
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "";

  useEffect(() => {
    if (loggedIn) {
      fetchBookings();
    }
  }, [loggedIn]);

  async function fetchBookings() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/bookings");
      if (!res.ok) throw new Error("Nätverksfel");
      const data: Booking[] = await res.json();
      setBookings(data);
    } catch {
      setError("Kunde inte hämta bokningar.");
    } finally {
      setLoading(false);
    }
  }

  async function handleMarkHandled(id: number, handled: boolean) {
    try {
      await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, handled }),
      });
      fetchBookings();
    } catch {
      setError("Kunde inte uppdatera bokning.");
    }
  }

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setLoggedIn(true);
    } else {
      setError("Fel lösenord!");
    }
  }

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1f1f1f]">
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4 max-w-sm w-full"
        >
          <h2 className="text-2xl font-bold text-[#b2862d] mb-2 text-center">
            Admin Login
          </h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Lösenord"
            className="border border-[#b2862d] bg-[#232323] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b2862d] placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="bg-[#b2862d] text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-[#b2862d]/80 transition-all duration-200"
          >
            Logga in
          </button>
          {error && (
            <div className="text-red-600 text-center font-medium">{error}</div>
          )}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] font-sans">
      <header className="bg-[#1f1f1f] text-white py-6 text-center shadow-md">
        <h1 className="text-3xl font-bold text-[#b2862d]">SH-Cutz Admin</h1>
      </header>

      <main className="max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold mb-6">Bokningar</h2>

        {loading ? (
          <div>Laddar bokningar...</div>
        ) : bookings.length === 0 ? (
          <div>Inga bokningar ännu.</div>
        ) : (
          <ul className="space-y-6">
            {bookings.map((b) => (
              <li
                key={b.id}
                className={`bg-[#232323] rounded-xl shadow p-6 flex flex-col gap-2 border-l-4 ${
                  b.handled ? "border-green-500" : "border-[#b2862d]"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-white">{b.name}</span>
                  <span className="text-sm text-gray-400">
                    {new Date(b.created).toLocaleString()}
                  </span>
                </div>
                <div className="text-white">
                  <span className="font-semibold">Tjänst:</span> {b.service}
                </div>
                <div className="text-white">
                  <span className="font-semibold">Datum:</span> {b.date}{" "}
                  <span className="font-semibold">Tid:</span> {b.time}
                </div>
                <div className="text-white">
                  <span className="font-semibold">Telefon:</span> {b.phone}
                </div>
                <div className="text-white">
                  <span className="font-semibold">E-post:</span> {b.email}
                </div>
                {b.message && (
                  <div className="text-white">
                    <span className="font-semibold">Meddelande:</span>{" "}
                    {b.message}
                  </div>
                )}

                <div className="flex gap-4 mt-2">
                  <button
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                      b.handled
                        ? "bg-green-500 text-white"
                        : "bg-[#b2862d] text-white hover:bg-[#b2862d]/80"
                    }`}
                    onClick={() => handleMarkHandled(b.id, !b.handled)}
                  >
                    {b.handled
                      ? "Markera som ohanterad"
                      : "Markera som hanterad"}
                  </button>

                  <a
                    href={`mailto:${b.email}`}
                    className="px-4 py-2 rounded-lg bg-[#232323] border border-[#b2862d] text-[#b2862d] font-semibold hover:bg-[#b2862d] hover:text-white transition-all duration-200"
                  >
                    Svara
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}

        {error && (
          <div className="text-red-600 text-center font-medium mt-6">
            {error}
          </div>
        )}
      </main>
    </div>
  );
}
