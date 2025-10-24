import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Typ för bokningar
interface Booking {
  id: number;
  name: string;
  email: string;
  phone?: string;
  service: string;
  barber: string;
  date: string;
  time: string;
  message?: string;
  handled: boolean;
  created: string;
}

// Sökväg till JSON-filen med bokningar
const bookingsPath = path.join(process.cwd(), "data", "bookings.json");

async function ensureDataFileExists() {
  try {
    await fs.access(bookingsPath);
  } catch (error) {
    // Filen eller mappen finns inte, skapa dem.
    const dir = path.dirname(bookingsPath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(bookingsPath, "[]", "utf-8");
  }
}

// Hämta alla bokningar
export async function GET() {
  try {
    await ensureDataFileExists(); // Se till att filen finns innan läsning
    const fileData = await fs.readFile(bookingsPath, "utf-8");
    const bookings: Booking[] = JSON.parse(fileData);
    return NextResponse.json(bookings);
  } catch {
    return NextResponse.json(
      { error: "Kunde inte läsa bokningar" },
      { status: 500 }
    );
  }
}

// Uppdatera bokning (markera hanterad / ohanterad)
export async function PATCH(req: Request) {
  const body = await req.json();
  const { id, handled } = body as { id: number; handled: boolean };

  try {
    await ensureDataFileExists(); // Se till att filen finns innan läsning/skrivning
    const fileData = await fs.readFile(bookingsPath, "utf-8");
    let bookings: Booking[] = JSON.parse(fileData);

    bookings = bookings.map((b: Booking) =>
      b.id === id ? { ...b, handled } : b
    );

    await fs.writeFile(bookingsPath, JSON.stringify(bookings, null, 2));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Kunde inte uppdatera bokning" },
      { status: 500 }
    );
  }
}
