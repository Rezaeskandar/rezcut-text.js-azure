import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    // Jämför det inskickade lösenordet med serverns miljövariabel
    if (password === process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: "Fel lösenord" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Serverfel" }, { status: 500 });
  }
}
