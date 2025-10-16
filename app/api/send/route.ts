import nodemailer from "nodemailer";

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

  try {
    // Spara bokning till fil
    const fs = require('fs');
    const path = require('path');
    const bookingsPath = path.join(process.cwd(), 'data', 'bookings.json');
    let bookings = [];
    if (fs.existsSync(bookingsPath)) {
      bookings = JSON.parse(fs.readFileSync(bookingsPath, 'utf8'));
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
      handled: false
    };
    bookings.push(newBooking);
    fs.writeFileSync(bookingsPath, JSON.stringify(bookings, null, 2));

    // Skicka till salongen
    await transporter.sendMail({
      from: `"SH-Cutz" <${process.env.SMTP_USER}>`,
      to: "rezaeskandari.ammori@yahoo.com", // eller din testmail
      subject: `Ny bokning från ${name}`,
      text: `Ny bokning via hemsidan:\n\nNamn: ${name}\nE-post: ${email}\nTelefon: ${phone}\nTjänst: ${service}\nDatum: ${date}\nTid: ${time}${message ? `\nMeddelande: ${message}` : ""}`,
    });

    // Skicka bekräftelse till kund
    await transporter.sendMail({
      from: `"SH-Cutz" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Din bokning hos SH-Cutz är mottagen!",
      text: `Hej ${name}!\n\nTack för din bokning hos SH-Cutz.\n\nVi har mottagit din bokning:\nTjänst: ${service}\nDatum: ${date}\nTid: ${time}\n\nVi återkommer med bekräftelse så snart som möjligt.\n\nVänliga hälsningar,\nSH-Cutz Barbershop`,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Nodemailer error:", error);
    return Response.json({ success: false, error });
  }
}