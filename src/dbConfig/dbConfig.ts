import mongoose from "mongoose";

export default function Connect(){
    try {
        console.log("Mongo db uri",process.env.MONGO_URI)
        mongoose.connect(process.env.MONGO_URI!)
        
        const connection = mongoose.connection

        connection.on("connected", ()=>{
            console.log("DB connected successfully");
        })

        connection.on("error",(err)=>{
            console.log("MongoDb error:", err);
            process.exit();
            
        })
    } catch (error) {
        console.log("Something went wrong while connecting DB");
        
    }
}