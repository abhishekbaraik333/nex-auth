"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResetPassword() {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState("");
  const router = useRouter();

  const resetPassword = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/resetpassword", {
        token,
        password
      });
      console.log(response);
      
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error:any) {
      console.log(error);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || '')
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Reset Password</h1>
      <div>
        {/* onSubmit passes the event to resetPassword */}
        <form className="flex flex-col gap-10" onSubmit={resetPassword}>
          <input
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white text-black p-2 mt-5"
            placeholder="enter new password"
          />
          <button
            type="submit"
            className="bg-blue-800 text-white p-2 rounded-lg cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
