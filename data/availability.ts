export type Availability = {
  workingDays: number[]; // 0=Söndag, 1=Måndag, ..., 6=Lördag
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  slotDurationMinutes: number; // Längd på varje tidsslot i minuter
  breakTimes?: { start: string; end: string }[]; // Valfria raster
};

export const availability: Availability = {
  workingDays: [1, 2, 3, 4, 5, 6], // Måndag till Lördag
  startTime: "10:00",
  endTime: "20:00",
  slotDurationMinutes: 30,
  breakTimes: [
    { start: "13:00", end: "14:00" }, // Lunchrast
  ],
};
