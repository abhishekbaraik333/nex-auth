"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();

  const [buttonDisabled, setButtionDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (
        user.email.length > 0 &&
        user.password.length > 0 
      ) {
        setButtionDisabled(false);
      } else {
        setButtionDisabled(true);
      }
  }, [user])
  

  const onLogin = async () => {
    try {
        setLoading(true)
        const response = await axios.post("/api/users/login", user)
        console.log(response);
        toast.success(response.data.message)

        router.push("/profile")
        
    } catch (error:any) {
        console.log("Login failed", error);
        toast.error(error.response.data.error)
    }finally{
        setLoading(false)
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Logging In..." : "Login"}</h1>

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
      <button onClick={onLogin} className="bg-red-400 my-5 text-black p-4 rounded-3xl w-1/4 cursor-pointer">
        {buttonDisabled ? "NO Login" : "Login"}
      </button>
      <Link href="/signup">Go to SignUp </Link>
    </div>
  );
}
