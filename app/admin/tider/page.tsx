"use client";

import { useState, useEffect, FormEvent } from "react";

type Availability = {
  startTime: string;
  endTime: string;
  saturdayEndTime: string;
  slotDurationMinutes: number;
  workingDays: number[];
  breakTimes: { start: string; end: string }[];
};

const weekDays = [
  { id: 1, label: "Måndag" },
  { id: 2, label: "Tisdag" },
  { id: 3, label: "Onsdag" },
  { id: 4, label: "Torsdag" },
  { id: 5, label: "Fredag" },
  { id: 6, label: "Lördag" },
  { id: 0, label: "Söndag" },
];

function AvailabilityForm() {
  const [availability, setAvailability] = useState<Availability | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    async function fetchAvailability() {
      try {
        const res = await fetch("/api/availability");
        if (!res.ok) throw new Error("Kunde inte hämta data");
        const data = await res.json();
        setAvailability(data);
      } catch (error) {
        setMessage({
          type: "error",
          text: "Kunde inte ladda nuvarande inställningar.",
        });
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchAvailability();
  }, []);

  const handleWorkingDaysChange = (dayId: number) => {
    if (!availability) return;
    const newWorkingDays = availability.workingDays.includes(dayId)
      ? availability.workingDays.filter((d) => d !== dayId)
      : [...availability.workingDays, dayId];
    setAvailability({ ...availability, workingDays: newWorkingDays });
  };

  const handleBreakChange = (
    index: number,
    field: "start" | "end",
    value: string
  ) => {
    if (!availability) return;
    const newBreakTimes = [...availability.breakTimes];
    newBreakTimes[index][field] = value;
    setAvailability({ ...availability, breakTimes: newBreakTimes });
  };

  const addBreak = () => {
    if (!availability) return;
    setAvailability({
      ...availability,
      breakTimes: [...availability.breakTimes, { start: "", end: "" }],
    });
  };

  const removeBreak = (index: number) => {
    if (!availability) return;
    const newBreakTimes = availability.breakTimes.filter((_, i) => i !== index);
    setAvailability({ ...availability, breakTimes: newBreakTimes });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!availability) return;
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(availability),
      });
      if (!res.ok) throw new Error("Misslyckades att spara");
      setMessage({ type: "success", text: "Inställningarna har sparats!" });
    } catch (error) {
      setMessage({ type: "error", text: "Kunde inte spara inställningarna." });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !availability) {
    return <div className="text-center p-8">Laddar inställningar...</div>;
  }

  if (!availability) {
    return (
      <div className="text-center p-8 text-red-500">
        Kunde inte ladda inställningar.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md"
    >
      {/* Tider */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block font-medium">Starttid (Vardag)</label>
          <input
            type="time"
            value={availability.startTime}
            onChange={(e) =>
              setAvailability({ ...availability, startTime: e.target.value })
            }
            className="p-2 border rounded-md w-full dark:bg-gray-700"
          />
        </div>
        <div>
          <label className="block font-medium">Sluttid (Vardag)</label>
          <input
            type="time"
            value={availability.endTime}
            onChange={(e) =>
              setAvailability({ ...availability, endTime: e.target.value })
            }
            className="p-2 border rounded-md w-full dark:bg-gray-700"
          />
        </div>
        <div>
          <label className="block font-medium">Sluttid (Lördag)</label>
          <input
            type="time"
            value={availability.saturdayEndTime}
            onChange={(e) =>
              setAvailability({
                ...availability,
                saturdayEndTime: e.target.value,
              })
            }
            className="p-2 border rounded-md w-full dark:bg-gray-700"
          />
        </div>
      </div>

      {/* Arbetsdagar */}
      <div>
        <label className="block font-medium mb-2">Arbetsdagar</label>
        <div className="flex flex-wrap gap-4">
          {weekDays.map((day) => (
            <label key={day.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={availability.workingDays.includes(day.id)}
                onChange={() => handleWorkingDaysChange(day.id)}
                className="h-5 w-5 rounded"
              />
              {day.label}
            </label>
          ))}
        </div>
      </div>

      {/* Raster */}
      <div>
        <label className="block font-medium mb-2">Raster</label>
        <div className="space-y-4">
          {availability.breakTimes.map((br, index) => (
            <div key={index} className="flex items-center gap-4">
              <input
                type="time"
                value={br.start}
                onChange={(e) =>
                  handleBreakChange(index, "start", e.target.value)
                }
                className="p-2 border rounded-md dark:bg-gray-700"
              />
              <span>-</span>
              <input
                type="time"
                value={br.end}
                onChange={(e) =>
                  handleBreakChange(index, "end", e.target.value)
                }
                className="p-2 border rounded-md dark:bg-gray-700"
              />
              <button
                type="button"
                onClick={() => removeBreak(index)}
                className="text-red-500 hover:text-red-700 font-bold"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addBreak}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Lägg till rast
        </button>
      </div>

      {/* Slot Duration */}
      <div>
        <label className="block font-medium">Tidsintervall (minuter)</label>
        <input
          type="number"
          value={availability.slotDurationMinutes}
          onChange={(e) =>
            setAvailability({
              ...availability,
              slotDurationMinutes: parseInt(e.target.value),
            })
          }
          className="p-2 border rounded-md w-full dark:bg-gray-700"
        />
      </div>

      {/* Spara-knapp */}
      <div>
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? "Sparar..." : "Spara Inställningar"}
        </button>
      </div>

      {message && (
        <div
          className={`text-center font-medium mt-4 p-3 rounded-md ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}
    </form>
  );
}

export default function AvailabilityAdminPage() {
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

  return (
    <div className="min-h-screen bg-[#f9f9f9] font-sans">
      <header className="bg-[#1f1f1f] text-white py-6 text-center shadow-md">
        <h1 className="text-3xl font-bold text-[#b2862d]">Rezcut Admin</h1>
      </header>

      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-2 flex justify-center gap-6">
          <a
            href="/admin"
            className="font-semibold text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-gold transition-colors"
          >
            Bokningar
          </a>
          <a
            href="/admin/tider"
            className="font-semibold text-yellow-600 dark:text-gold border-b-2 border-yellow-600 dark:border-gold pb-1"
          >
            Hantera Öppettider
          </a>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold mb-6">Hantera Öppettider</h2>
        <AvailabilityForm />
      </main>
    </div>
  );
}
