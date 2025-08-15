import Connect from "@/dbConfig/dbConfig";
import { sendMail } from "@/helpers/mailer";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

Connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {id} = reqBody
        console.log(id);
        
        const user = await User.findOne({_id:id})

        if(!user){
            return NextResponse.json({error:"Invalid Id"}, {status:400})
        }

        console.log(user)

        await sendMail({email:user.email,emailType:"RESET",userId:user._id })

        return NextResponse.json({
            message:"Email Sent Successfully",
            success:true
        })
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
        
    }
}