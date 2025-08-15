"use client"

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function ProfilePage(){

    const router = useRouter()

    const [userId,setUserId] = useState('')

    const logout = async()=>{
        try {
            const response = await axios.get("/api/users/logout")
            console.log(response);
            toast.success(response.data.message)
            router.push("/login")
            
        } catch (error) {
            console.log("Something went wrong while logging out", error);
            
        }
    }

    const getUserDetails = async () =>{
        try {
           const response = await axios.get("/api/users/me")
           
           setUserId(response.data.data._id)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
     getUserDetails()
    }, [])
    
    return (
        <div className="flex min-h-screen justify-center items-center flex-col gap-5">
            <h1>Profile page</h1>
            <Link className="text-white bg-red-800 px-6 py-2 rounded-lg" href={`/profile/${userId}`}>{userId}</Link>
            <button className="bg-blue-700 rounded-lg px-6 py-2 cursor-pointer" onClick={logout}>
                Logout
            </button>
        </div>
    )
}