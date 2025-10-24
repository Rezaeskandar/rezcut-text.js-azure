import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, message } = body;

  // Enkel validering
  if (!name || !email || !message) {
    return NextResponse.json(
      { success: false, error: "Alla fält måste fyllas i." },
      { status: 400 }
    );
  }

  // Konfigurera Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Eller din SMTP-server
    port: 587,
    secure: false, // true för 465, false för andra portar som 587
    auth: {
      user: process.env.SMTP_USER, // Din e-postadress från .env.local
      pass: process.env.SMTP_PASS, // Ditt app-lösenord från .env.local
    },
  });

  try {
    // Skicka mail till salongen med kontaktmeddelandet
    await transporter.sendMail({
      from: `"Rezcut Kontakt" <${process.env.SMTP_USER}>`,
      to: "rezaeskandari.ammori@yahoo.com", // Salongens e-postadress dit meddelanden ska skickas
      subject: `Nytt meddelande från ${name} via hemsidan`,
      text: `Nytt meddelande via kontaktformuläret:\n\nNamn: ${name}\nE-post: ${email}\nMeddelande: ${message}`,
      html: `<p>Nytt meddelande via kontaktformuläret:</p>
             <p><strong>Namn:</strong> ${name}</p>
             <p><strong>E-post:</strong> ${email}</p>
             <p><strong>Meddelande:</strong> ${message}</p>`,
    });

    // Skicka bekräftelse till avsändaren (kunden)
    await transporter.sendMail({
      from: `"Rezcut" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Tack för ditt meddelande till Rezcut!",
      text: `Hej ${name}!\n\nTack för att du kontaktade Rezcut.\nVi har mottagit ditt meddelande och återkommer så snart som möjligt.\n\nVänliga hälsningar,\nRezcut`,
      html: `<p>Hej ${name}!</p>
             <p>Tack för att du kontaktade Rezcut.</p>
             <p>Vi har mottagit ditt meddelande och återkommer så snart som möjligt.</p>
             <p>Vänliga hälsningar,<br/>Rezcut</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Nodemailer error for contact form:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Kunde inte skicka meddelandet på grund av ett serverfel.",
      },
      { status: 500 }
    );
  }
}
