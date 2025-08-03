import mongoose from "mongoose";

export default function Connect(){
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection

        connection.on("connected", ()=>{
            console.log("DB connected successfully");
        })

        connection.on("error",(err)=>{
            console.log("MongoDb connection error:", err);
            process.exit();
            
        })
    } catch (error) {
        console.log("Something went wrong while connecting DB");
        
    }
}