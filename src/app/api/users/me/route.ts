import connect from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    
    const user = await User.findOne({ _id: userId })

    return NextResponse.json(
      {
        message: "User found",
        data: user,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    console.log(error.message);
  }
}
