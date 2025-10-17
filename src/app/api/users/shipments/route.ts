// src/app/api/shipments/route.ts
import { NextRequest, NextResponse } from "next/server";
import Connect from "@/dbConfig/dbConfig";
import { Shipment } from "@/models/shipmentModel";

Connect();

export async function GET(req: NextRequest) {
  try {
    // Get email from query parameters
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json(
        { error: "Email parameter is required" },
        { status: 400 }
      );
    }

    // Find all shipments for this email
    const shipments = await Shipment.find({ email }).sort({ createdAt: -1 });    

    return NextResponse.json({ 
      success: true, 
      shipments,
      count: shipments.length 
    });

  } catch (error) {
    console.error("Error fetching shipments:", error);
    return NextResponse.json(
      { error: "Failed to fetch shipments" },
      { status: 500 }
    );
  }
}
