import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, phone, service, date, time, message } = body;

  // Skapa transporter
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
    // 🔧 Spara bokning till fil (utan require)
    const bookingsPath = path.join(process.cwd(), "data", "bookings.json");
    let bookings: any[] = [];

    if (fs.existsSync(bookingsPath)) {
      const data = fs.readFileSync(bookingsPath, "utf8");
      bookings = JSON.parse(data);
    }

    const newBooking = {
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

    bookings.push(newBooking);
    fs.writeFileSync(bookingsPath, JSON.stringify(bookings, null, 2));

    // ✉️ Skicka till salongen
    await transporter.sendMail({
      from: `"SH-Cutz" <${process.env.SMTP_USER}>`,
      to: "rezaeskandari.ammori@yahoo.com", // din mailadress
      subject: `Ny bokning från ${name}`,
      text: `Ny bokning via hemsidan:\n\nNamn: ${name}\nE-post: ${email}\nTelefon: ${phone}\nTjänst: ${service}\nDatum: ${date}\nTid: ${time}${message ? `\nMeddelande: ${message}` : ""}`,
    });

    // ✉️ Skicka bekräftelse till kund
    await transporter.sendMail({
      from: `"SH-Cutz" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Din bokning hos SH-Cutz är mottagen!",
      text: `Hej ${name}!\n\nTack för din bokning hos SH-Cutz.\n\nVi har mottagit din bokning:\nTjänst: ${service}\nDatum: ${date}\nTid: ${time}\n\nVi återkommer med bekräftelse så snart som möjligt.\n\nVänliga hälsningar,\nSH-Cutz Barbershop`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Nodemailer error:", error);
    return NextResponse.json({ success: false, error });
  }
}
