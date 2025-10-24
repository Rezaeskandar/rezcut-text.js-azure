// components/BookningForm.tsx
"use client";

import { useState, useEffect } from "react"; // Added useEffect for consistency
import { services as allServices, Service } from "../data/services"; // Corrected import
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css"; // Import the default styles
import { format, startOfToday, setHours, setMinutes } from "date-fns";
import { sv } from "date-fns/locale"; // For Swedish locale in calendar
import { availability } from "../data/availability"; // Import availability data

type Availability = {
  startTime: string;
  endTime: string;
  saturdayEndTime: string;
  slotDurationMinutes: number;
  workingDays: number[];
  breakTimes: { start: string; end: string }[];
};

type FormState = {
  name: string;
  email: string;
  phone?: string;
  serviceId: string;
  barber: string;
  time: string;
  notes?: string;
};

// Helper function to generate time slots based on availability
const generateTimeSlots = (date: Date | undefined) => {
  if (!date) return [];

  const slots = [];
  const {
    startTime,
    slotDurationMinutes,
    workingDays,
    breakTimes = [],
  } = availability;
  const now = new Date();
  const isToday = format(date, "yyyy-MM-dd") === format(now, "yyyy-MM-dd");
  const dayOfWeek = date.getDay(); // 0=Söndag, 6=Lördag

  let currentSlotStart = setMinutes(setHours(date, 0), 0); // Start from beginning of selected day
  const [startHour, startMinute] = startTime.split(":").map(Number);
  currentSlotStart = setHours(currentSlotStart, startHour);
  currentSlotStart = setMinutes(currentSlotStart, startMinute);

  const endOfDayTime = setMinutes(setHours(date, 0), 0); // End of selected day
  // Sätt en specifik sluttid för lördagar
  let endTime = availability.endTime;
  if (dayOfWeek === 6) {
    // 6 är lördag
    endTime = "15:00";
  }
  const [endHour, endMinute] = endTime.split(":").map(Number);
  endOfDayTime.setHours(endHour, endMinute);

  while (currentSlotStart < endOfDayTime) {
    const currentSlotEnd = new Date(
      currentSlotStart.getTime() + slotDurationMinutes * 60 * 1000
    );

    // If the slot ends after the defined endTime, break
    if (currentSlotEnd > endOfDayTime) {
      break;
    }

    const isBreak = breakTimes.some((br) => {
      const breakStart = setMinutes(
        setHours(date, parseInt(br.start.split(":")[0])),
        parseInt(br.start.split(":")[1])
      );
      const breakEnd = setMinutes(
        setHours(date, parseInt(br.end.split(":")[0])),
        parseInt(br.end.split(":")[1])
      );
      return currentSlotStart < breakEnd && currentSlotEnd > breakStart;
    });

    const isPast = isToday && currentSlotStart < now;

    if (!isBreak && !isPast) {
      slots.push(format(currentSlotStart, "HH:mm"));
    }

    currentSlotStart = currentSlotEnd; // Move to the start of the next slot
  }

  return slots;
};

export default function BookingForm({
  defaultServiceId,
}: {
  defaultServiceId?: string;
}) {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    serviceId: defaultServiceId || allServices[0].id,
    barber: "Vem som helst",
    time: "",
    notes: "",
  });

  const [selectedDay, setSelectedDay] = useState<Date | undefined>();
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    // Reset time when day changes
    setForm((prev) => ({ ...prev, time: "" }));
    // Regenerate time slots
    setTimeSlots(generateTimeSlots(selectedDay));
  }, [selectedDay]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage(null); // Clear message on input change
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    if (!selectedDay || !form.time) {
      setMessage({
        type: "error",
        text: "Vänligen välj ett datum och en tid.",
      });
      setLoading(false);
      return;
    }

    const selectedService = allServices.find((s) => s.id === form.serviceId);
    if (!selectedService) {
      setMessage({ type: "error", text: "Vänligen välj en tjänst." });
      setLoading(false);
      return;
    }

    const bookingData = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      service: selectedService.title, // Use service title for API
      barber: form.barber,
      date: format(selectedDay, "yyyy-MM-dd"), // Format date for API
      time: form.time,
      message: form.notes, // Use notes for message
    };

    try {
      // Use /api/send as per README.md for new bookings and email sending
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setMessage({
          type: "error",
          text: data.error || "Något gick fel vid bokningen.",
        });
      } else {
        setMessage({
          type: "success",
          text: "Tack för din bokning! En bekräftelse har skickats till din e-post.",
        });
        setForm({
          name: "",
          email: "",
          phone: "",
          serviceId: defaultServiceId || allServices[0].id,
          barber: "Vem som helst",
          time: "",
          notes: "",
        });
        setSelectedDay(undefined); // Clear selected day
      }
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: "Nätverksfel. Kontrollera din internetanslutning.",
      });
    } finally {
      setLoading(false);
    }
  }

  // Disable days that are not working days
  const disabledDays = [
    { before: startOfToday() }, // Inaktivera alla dagar före idag
    (day: Date) => !availability.workingDays.includes(day.getDay()), // Inaktivera dagar som inte är arbetsdagar
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto p-4 sm:p-8 bg-white dark:bg-[#232323] text-gray-800 dark:text-cream shadow-2xl rounded-2xl"
    >
      <h2 className="text-2xl font-bold text-yellow-600 dark:text-gold mb-6 text-center">
        Boka Din Tid
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Date Selection */}
        <div className="flex flex-col gap-4">
          <label className="block text-lg font-medium text-yellow-600 dark:text-gold mb-2">
            1. Välj Datum
          </label>
          <DayPicker
            mode="single"
            selected={selectedDay}
            onSelect={setSelectedDay}
            locale={sv}
            disabled={disabledDays} // Använd den kombinerade regeln
            className="bg-gray-50 dark:bg-[#1f1f1f] p-4 rounded-lg shadow-inner"
            classNames={{
              caption_label: "text-yellow-600 dark:text-gold",
              head_cell:
                "text-gray-500 dark:text-gray-400 w-10 font-medium text-sm",
              day: "text-gray-800 dark:text-white hover:bg-yellow-500 dark:hover:bg-gold hover:text-gray-900 dark:hover:text-charcoal rounded-full",
              day_selected:
                "bg-yellow-500 dark:bg-gold text-gray-900 dark:text-charcoal rounded-full",
              day_today: "text-yellow-600 dark:text-gold font-bold",
              day_disabled: "text-gray-600 cursor-not-allowed",
              nav_button_previous:
                "text-gray-700 dark:text-cream hover:bg-gray-200 dark:hover:bg-gray-700",
              nav_button_next:
                "text-gray-700 dark:text-cream hover:bg-gray-200 dark:hover:bg-gray-700",
              month: "space-y-4",
              row: "flex w-full mt-2",
              cell: "h-10 w-10 flex items-center justify-center",
            }}
          />
        </div>

        {/* Time and Details */}
        <div className="flex flex-col gap-6">
          {selectedDay && (
            <div className="flex flex-col gap-4">
              <label className="block text-lg font-medium text-yellow-600 dark:text-gold mb-2">
                2. Välj Tid
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-60 overflow-y-auto pr-2">
                {timeSlots.length > 0 ? (
                  timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setForm({ ...form, time })}
                      className={`p-2 rounded-lg text-center transition-colors text-sm ${
                        form.time === time
                          ? "bg-yellow-500 dark:bg-gold text-gray-900 dark:text-charcoal font-bold"
                          : "bg-gray-100 dark:bg-[#1f1f1f] text-gray-800 dark:text-white hover:bg-yellow-500 dark:hover:bg-gold hover:text-gray-900 dark:hover:text-charcoal"
                      }`}
                    >
                      {time}
                    </button>
                  ))
                ) : (
                  <p className="text-gray-400 col-span-full text-sm">
                    Inga lediga tider för det valda datumet.
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <label className="block text-lg font-medium text-yellow-600 dark:text-gold mb-1 mt-4">
              3. Dina Uppgifter
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 dark:border-gold bg-gray-50 dark:bg-[#1f1f1f] text-gray-800 dark:text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-gold placeholder:text-gray-400"
              placeholder="Ditt namn"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              required
              className="w-full border border-gray-300 dark:border-gold bg-gray-50 dark:bg-[#1f1f1f] text-gray-800 dark:text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-gold placeholder:text-gray-400"
              placeholder="mail@exempel.se"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gold bg-gray-50 dark:bg-[#1f1f1f] text-gray-800 dark:text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-gold placeholder:text-gray-400"
              placeholder="070-123 45 67 (valfritt)"
            />
            <select
              name="barber"
              value={form.barber}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gold bg-gray-50 dark:bg-[#1f1f1f] text-gray-800 dark:text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-gold"
            >
              <option value="Vem som helst">
                Välj barberare (Vem som helst)
              </option>
              <option value="Ahmad">Ahmad</option>
              <option value="Farshad">Farshad</option>
            </select>
            <select
              name="serviceId"
              value={form.serviceId}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gold bg-gray-50 dark:bg-[#1f1f1f] text-gray-800 dark:text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-gold"
            >
              {allServices.map((s: Service) => (
                <option key={s.id} value={s.id}>
                  {s.title} — {s.price} kr
                </option>
              ))}
            </select>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gold bg-gray-50 dark:bg-[#1f1f1f] text-gray-800 dark:text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-gold placeholder:text-gray-400"
              rows={3}
              placeholder="Önskemål eller info"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 text-center lg:col-span-2">
        <button
          type="submit"
          disabled={
            loading || !selectedDay || !form.time || !form.name || !form.email
          }
          className="bg-yellow-500 dark:bg-gold text-gray-900 dark:text-charcoal font-semibold px-8 py-3 rounded-lg shadow hover:bg-yellow-600 transition disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {loading ? "Bokar..." : "Slutför Bokning"}
        </button>

        {message && (
          <div
            className={`text-center font-medium mt-4 ${
              message.type === "success"
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-500"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </form>
  );
}
