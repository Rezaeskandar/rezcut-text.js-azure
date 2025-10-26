import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";

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

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, phone, service, barber, date, time, message } = body;
  // --- E-posthantering (ingen ändring här) ---
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    // Spara till JSON-fil
    await ensureDataFileExists();

    const newBooking = {
      id: Date.now(),
      name,
      email,
      phone,
      service,
      barber,
      date,
      time,
      message,
      created: new Date().toISOString(),
      handled: false,
    };

    // Läs befintlig data, lägg till ny bokning och skriv tillbaka.
    // Detta är säkrare än att läsa och skriva om hela filen.
    const fileData = await fs.readFile(bookingsPath, "utf-8");
    const bookings: Booking[] = fileData ? JSON.parse(fileData) : [];

    bookings.push(newBooking);

    // Skriv tillbaka hela arrayen för att behålla JSON-strukturen korrekt.
    await fs.writeFile(
      bookingsPath,
      JSON.stringify(bookings, null, 2),
      "utf-8"
    );

    // Skicka mail till salongen
    await transporter.sendMail({
      from: `"Rezcut" <${process.env.SMTP_USER}>`,
      to: "rezaeskandari.ammori@yahoo.com",
      subject: `Ny bokning från ${name}`,
      text: `Ny bokning via hemsidan:\n\nNamn: ${name}\nE-post: ${email}\nTelefon: ${phone}\nTjänst: ${service}\nBarberare: ${barber}\nDatum: ${date}\nTid: ${time}${
        message ? `\nMeddelande: ${message}` : ""
      }`,
    });

    // Skicka bekräftelse till kund
    await transporter.sendMail({
      from: `"Rezcut" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Din bokning hos Rezcut är mottagen!",
      text: `Hej ${name}!\n\nTack för din bokning hos Rezcut.\n\nVi har mottagit din bokning:\nTjänst: ${service}\nBarberare: ${barber}\nDatum: ${date}\nTid: ${time}\n\nVi återkommer med bekräftelse så snart som möjligt.\n\nVänliga hälsningar,\nRezcut`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Nodemailer error:", error);
    // Skicka ett enkelt textmeddelande istället för hela fel-objektet
    return NextResponse.json(
      {
        success: false,
        error: "Ett serverfel inträffade. Bokningen kunde inte slutföras.",
      },
      { status: 500 }
    );
  }
}
