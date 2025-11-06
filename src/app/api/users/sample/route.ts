import axios from "axios";
import { NextResponse, NextRequest } from "next/server";
import {Shipment} from "@/models/shipmentModel"; // adjust import path as needed

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    typeOfShipment,
    packageSize,
    email,
    telephone,
    name,
    companyName,
    postCode,
    town,
    street,
    buildingNumber,
    premisesNumber,
    pickupPoint,
    downloadValue,
    bankAccountNumber,
    additionalProtection,
    packageOnWeekend,
    transferShipment,
    loggedUser
  } = body;

  // Telegram Bot credentials
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  const fieldLabels: Record<string, string> = {
    typeOfShipment: "Wybierz rodzaj przesyłki",
    packageSize: "Wybierz rozmiar paczki",
    email: "Adres e-mail",
    telephone: "Numer telefonu",
    pickupPoint: "Punkt odbioru",
    name: "Imię i nazwisko",
    companyName: "Nazwa firmy",
    postCode: "Kod pocztowy",
    town: "Miejscowość",
    street: "Ulica",
    buildingNumber: "Numer budynku",
    premisesNumber: "Numer lokalu",
    downloadValue: "Wartość pobrania",
    bankAccountNumber: "Numer konta bankowego",
    additionalProtection: "Dodatkowa ochrona",
    packageOnWeekend: "Paczka w Weekend",
    transferShipment: "Wybierz sposób przekazania przesyłki",
    loggedUser: "LoggedUser"
  };

  const messageFields = {
    typeOfShipment,
    packageSize,
    email,
    telephone,
    pickupPoint,
    name,
    companyName,
    postCode,
    town,
    street,
    buildingNumber,
    premisesNumber,
    downloadValue,
    bankAccountNumber,
    additionalProtection,
    packageOnWeekend,
    transferShipment,
    loggedUser
  };

  // Only include non-empty fields
  const messageParts = Object.entries(messageFields)
    .filter(([_, value]) => value != null && value !== "")
    .map(([key, value]) => `${fieldLabels[key]}: ${value}`);

  const message = `Form Submission:\n${messageParts.join("\n")}`;

  function generateShipmentNumber() {
    let num = "";
    for (let i = 0; i < 16; i++) {
      num += Math.floor(Math.random() * 10);
    }
    return num;
  }

  try {
    await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
      }
    );

    // Count existing shipments for this email
    const existingCount = await Shipment.countDocuments({ email });

    // Create shipmentIndex as one more than existing count
    const shipmentIndex = existingCount + 1;

    const newShipment = new Shipment({
      email: loggedUser,
      shipmentIndex,
      shipmentNumber: generateShipmentNumber().toString(),
      methodOfAssignment: typeOfShipment,
      shipmentSize: packageSize,
      BankAccountNumber: bankAccountNumber,
      recipient: name,
      pickupMethod: transferShipment,
      Status: "Created",
      Paid: false,
    });

    const createdShipment = await newShipment.save();

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
