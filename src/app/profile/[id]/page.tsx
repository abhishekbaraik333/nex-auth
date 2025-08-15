"use client"

import axios from "axios";

export default async function UserProfile({params}:any){
    const resolvedParams = await params;
    const id = resolvedParams.id

    const forgotpassword = async()=>{
        try {
           const response =  await axios.post("/api/users/forgotpassword", {id})
            console.log(response);
            
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen flex-col">
            <h1>Profile page <span className="bg-yellow-500 text-black p-2">{resolvedParams.id}</span></h1>
            <button onClick={forgotpassword} className="bg-blue-800 text-xl text-white p-2 rounded-lg mt-5 cursor-pointer">
                Forgot Password
            </button>
        </div>
    )
}