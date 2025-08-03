"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function SignIn() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtionDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
        setLoading(true)
        const response = await axios.post("/api/users/signup", user)
        console.log(response);
        router.push("/login")
        
    } catch (error:any) {   
        console.log("Signup failed", error);
        
    }finally{
        setLoading(false)
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtionDisabled(false);
    } else {
      setButtionDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing": "Signup"}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        type="text"
        className="bg-white placeholder:text-black text-black p-2"
        id="username"
        value={user.username}
        placeholder="username"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <hr />
      <label htmlFor="email">email</label>
      <input
        type="text"
        className="bg-white placeholder:text-black text-black p-2"
        id="email"
        value={user.email}
        placeholder="email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <hr />
      <label htmlFor="password">password</label>
      <input
        type="text"
        className="bg-white placeholder:text-black text-black p-2"
        id="password"
        value={user.password}
        placeholder="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button onClick={onSignUp} className="bg-red-400 my-5 text-black p-4 rounded-3xl w-1/4 cursor-pointer">
        {buttonDisabled ? "NO Signup" : "Signup" }
      </button>
      <Link href="/login">Go to Login </Link>
    </div>
  );
}
