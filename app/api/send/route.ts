import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, phone, service, barber, date, time, message } = body;

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
