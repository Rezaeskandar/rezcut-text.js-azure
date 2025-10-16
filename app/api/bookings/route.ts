import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const bookingsPath = path.join(process.cwd(), "data", "bookings.json");

export async function GET() {
  try {
    const bookings = fs.existsSync(bookingsPath)
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

export async function PATCH(req: Request) {
  const body = await req.json();
  const { id, handled } = body;
  try {
    let bookings = fs.existsSync(bookingsPath)
      ? JSON.parse(fs.readFileSync(bookingsPath, "utf8"))
      : [];
    bookings = bookings.map((b: any) =>
      b.id === id ? { ...b, handled: handled } : b
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
