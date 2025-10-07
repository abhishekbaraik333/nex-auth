"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Login() {
  const router = useRouter();

  const [buttonDisabled, setButtionDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtionDisabled(false);
    } else {
      setButtionDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log(response);

      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen py-2 px-4 md:px-0 mt-32 md:mt-20">
      <Navbar />
      <div className="flex flex-col items-start justify-start">
        <div className="flex items-start gap-5">
          <Image src="/icon.svg" width={120} height={120} alt="company logo" />
          <div>
            <h3 className="text-black text-5xl opacity-80 font-semibold login-title">
              Zaloguj się do <br /> swojego konta
            </h3>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-start w-full md:w-fit">
          <label htmlFor="email" className="text-gray-400 text-left text-sm">
            E-mail
          </label>
          <input
            type="text"
            className="bg-white w-full md:w-fit transition-all ease duration-200 text-black py-2 pl-2 pr-10 border border-gray-400 rounded-md focus:border-orange-500 focus:outline-none"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <label
            className="text-gray-400 text-left text-sm mt-8"
            htmlFor="Hasło"
          >
            Hasło
          </label>
          <input
            type="text"
            className="bg-white w-full md:w-fit transition-all ease duration-200 text-black py-2 pl-2 pr-10 border border-gray-400 rounded-md focus:border-orange-500 focus:outline-none placeholder:text-sm"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <div className="flex justify-center gap-2 border bg-white border-zinc-300 p-2 mt-5 rounded max-w-[300px]">
            <div className="w-[60%]">
              <div className="flex gap-2 items-center">
                <label className="checkbox-container">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                 
                </label>
                <span className="text-zinc-800 text-sm">I'm not a robot</span>
              </div>
              <p className="text-[8px] text-zinc-700 mt-1">reCAPTCHA is changing its terms of service. Take action.</p>
            </div>
            <div className="w-[40%] flex flex-col justify-end items-center">
              <Image src="/google_recaptcha-official.svg" width={45} height={45} alt="captcha" />
              <div className="flex gap-1 items-center mt-1">
                <span className="text-zinc-700 text-[8px] hover:underline cursor-pointer">Privacy</span>
                <span className="text-zinc-700 text-[8px] hover:underline cursor-pointer">Terms</span>
              </div>
            </div>
          </div>

          <button
            onClick={onLogin}
            className="bg-[#FCC905] w-full md:w-fit hover:opacity-70 my-5 text-zinc-800 px-8 py-4 text-sm rounded-md font-semibold cursor-pointer"
          >
            Zaloguj
          </button>
          <Link href="/signup" className="text-black underline text-xs">
            Zarejestruj się
          </Link>
        </div>
      </div>

    </div>
      <Footer />
    </>
  );
}
