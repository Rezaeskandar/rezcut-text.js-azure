"use client";

import { useState, useEffect } from "react";

type Booking = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  service: string;
  barber: string;
  date: string;
  time: string;
  message?: string;
  created: string;
  handled: boolean;
};

function AdminContent() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch("/api/bookings");
        if (!res.ok) {
          throw new Error("Kunde inte hämta bokningar");
        }
        const data = await res.json();
        // Sortera bokningar med de senaste först
        setBookings(data.sort((a: Booking, b: Booking) => b.id - a.id));
      } catch (error) {
        setError("Kunde inte ladda bokningar. Försök igen senare.");
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  async function toggleHandled(id: number, handled: boolean) {
    // Uppdatera UI direkt för en snabbare upplevelse
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, handled } : b))
    );

    try {
      const res = await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, handled }),
      });
      if (!res.ok) {
        throw new Error("Kunde inte uppdatera status");
      }
    } catch (error) {
      // Återställ UI om anropet misslyckas
      alert("Kunde inte uppdatera status. Försök igen.");
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, handled: !handled } : b))
      );
    }
  }

  if (loading) {
    return <div className="text-center p-8">Laddar bokningar...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] font-sans">
      <header className="bg-[#1f1f1f] text-white py-6 text-center shadow-md">
        <h1 className="text-3xl font-bold text-[#b2862d]">Rezcut Admin</h1>
      </header>

      <main className="max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold mb-6">Bokningar</h2>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <li
                  key={booking.id}
                  className={`p-6 transition-colors ${
                    booking.handled ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-lg text-gray-800">
                        {booking.name}
                      </p>
                      <p className="text-sm text-gray-600">{booking.email}</p>
                      <p className="text-sm text-gray-600">{booking.phone}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        {booking.date} kl. {booking.time}
                      </p>
                      <p className="text-sm text-gray-600">{booking.service}</p>
                    </div>
                  </div>
                  {booking.message && (
                    <p className="mt-4 text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
                      Meddelande: {booking.message}
                    </p>
                  )}
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() =>
                        toggleHandled(booking.id, !booking.handled)
                      }
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        booking.handled
                          ? "bg-gray-300 text-gray-700 hover:bg-gray-400"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                    >
                      {booking.handled
                        ? "Markera som ohanterad"
                        : "Markera som hanterad"}
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="p-6 text-center text-gray-500">
                Inga bokningar att visa.
              </p>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "";

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

  return <AdminContent />;
}
