import connect from "@/dbConfig/dbConfig"
import {User} from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { sendMail } from "@/helpers/mailer"

connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody =  await request.json()

        const {username, email, password} = reqBody

       const existingUser =  await User.findOne({email})

       if(existingUser){
        return NextResponse.json({error:"User already Exists"}, {status:400})
       }


       const salt = await bcrypt.genSalt(10)
       const hashedPassword = await bcrypt.hash(password,salt)

       const newUser = new User({
        username,
        email,
        password:hashedPassword
       })

       const savedUser = await newUser.save()
       console.log(savedUser);

        // Sending Email
       await sendMail({email,emailType:"VERIFY", userId:savedUser._id})
       return NextResponse.json({
        message:"User created Successfully",
        status:201,
        savedUser
       })
       

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})   
    }
}