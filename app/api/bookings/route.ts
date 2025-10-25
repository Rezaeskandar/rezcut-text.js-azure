import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

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
    await ensureDataFileExists();
    const fileData = await fs.readFile(bookingsPath, "utf-8");
    const bookings = JSON.parse(fileData);
    return NextResponse.json(bookings.sort((a: any, b: any) => b.id - a.id));
  } catch (error) {
    console.error("Error reading bookings.json:", error);
    return NextResponse.json(
      { error: "Kunde inte läsa bokningar" },
      { status: 500 }
    );
  }
}

// Uppdatera bokning (markera hanterad / ohanterad)
export async function PATCH(req: Request) {
  const { id, handled } = await req.json();

  try {
    await ensureDataFileExists();
    const fileData = await fs.readFile(bookingsPath, "utf-8");
    let bookings = JSON.parse(fileData);

    const bookingIndex = bookings.findIndex((b: any) => b.id === id);
    if (bookingIndex === -1) {
      return NextResponse.json(
        { error: "Bokning hittades inte" },
        { status: 404 }
      );
    }

    bookings[bookingIndex].handled = handled;

    await fs.writeFile(bookingsPath, JSON.stringify(bookings, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating bookings.json:", error);
    return NextResponse.json(
      { error: "Kunde inte uppdatera bokning" },
      { status: 500 }
    );
  }
}
