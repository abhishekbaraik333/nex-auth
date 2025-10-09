"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function Login() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    try {
      const response = await axios.post("/api/users/login", user);
      router.push("/sample"); 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Login failed:", error.response?.data || error.message);
      } else if (error instanceof Error) {
        // Handle generic JS errors
        console.error("Login failed:", error.message);
      } else {
        console.error("An unexpected error occurred during login");
      }
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 px-4 md:px-0 mt-32 md:mt-20">
        <Navbar />
        <h1 className="text-black text-2xl">Sample page</h1>
      </div>
      <Footer />
    </>
  );
}
