import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
    return NextResponse.json({ success: false, error });
  }
}
