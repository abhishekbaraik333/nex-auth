import Connect from "@/dbConfig/dbConfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

Connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, password } = reqBody;
    console.log(token, password);

    const user = await User.findOne({ forgotPasswordToken: token });

    if (!user) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
    }

    console.log(user);

    const passwordSame = await bcrypt.compare(password, user.password);

    if (passwordSame) {
      return NextResponse.json(
        { message: "please enter new password" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword
    user.forgotPasswordToken = undefined
    user.forgotPasswordTokenExpiry = undefined

    user.save()

    const response =  NextResponse.json({
      message: "Password Changed Successfully",
      success: true,
    });

    response.cookies.set("token","",{
        httpOnly:true,
        expires:new Date(0),
    })

    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
