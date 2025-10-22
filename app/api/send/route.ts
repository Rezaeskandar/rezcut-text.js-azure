import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";

type Booking = {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message?: string;
  created: string;
  handled: boolean;
};

// Sökväg till JSON-filen med bokningar
const bookingsPath = path.join(process.cwd(), "data", "bookings.json");

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, phone, service, date, time, message } = body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const newBooking: Booking = {
    id: Date.now(),
    name,
    email,
    phone,
    service,
    date,
    time,
    message,
    created: new Date().toISOString(),
    handled: false,
  };

  try {
    // 1. Läs befintliga bokningar
    let bookings: Booking[] = [];
    try {
      const fileContent = await fs.readFile(bookingsPath, "utf8");
      bookings = JSON.parse(fileContent);
    } catch (readError) {
      // Filen finns inte, fortsätt med en tom lista
    }

    // 2. Lägg till den nya bokningen och spara
    bookings.push(newBooking);
    await fs.writeFile(bookingsPath, JSON.stringify(bookings, null, 2));

    // Skicka mail till salongen
    await transporter.sendMail({
      from: `"Noori's Barber" <${process.env.SMTP_USER}>`,
      to: "rezaeskandari.ammori@yahoo.com",
      subject: `Ny bokning från ${name}`,
      text: `Ny bokning via hemsidan:\n\nNamn: ${name}\nE-post: ${email}\nTelefon: ${phone}\nTjänst: ${service}\nDatum: ${date}\nTid: ${time}${message ? `\nMeddelande: ${message}` : ""}`,
    });

    // Skicka bekräftelse till kund
    await transporter.sendMail({
      from: `"Noori's Barber" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Din bokning hos Noori's Barber är mottagen!",
      text: `Hej ${name}!\n\nTack för din bokning hos Noori's Barber.\n\nVi har mottagit din bokning:\nTjänst: ${service}\nDatum: ${date}\nTid: ${time}\n\nVi återkommer med bekräftelse så snart som möjligt.\n\nVänliga hälsningar,\nNoori's Barber`,
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
