import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Typ för bokningar
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

// Sökväg till JSON-filen med bokningar
const bookingsPath = path.join(process.cwd(), "data", "bookings.json");

// Hämta alla bokningar
export async function GET() {
  try {
    const bookings: Booking[] = fs.existsSync(bookingsPath)
      ? JSON.parse(fs.readFileSync(bookingsPath, "utf8"))
      : [];
    return NextResponse.json(bookings);
  } catch (error) {
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
    let bookings: Booking[] = fs.existsSync(bookingsPath)
      ? JSON.parse(fs.readFileSync(bookingsPath, "utf8"))
      : [];

    bookings = bookings.map((b: Booking) =>
      b.id === id ? { ...b, handled } : b
    );

    fs.writeFileSync(bookingsPath, JSON.stringify(bookings, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Kunde inte uppdatera bokning" },
      { status: 500 }
    );
  }
}
