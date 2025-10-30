"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const options = [
  { value: "private", label: "Osoba prywatna" },
  { value: "domestic", label: "Firma krajowa" },
  { value: "foreign", label: "Firma zagraniczna" },
];

export default function SignUp() {
  const router = useRouter();
  const [selected, setSelected] = useState("private");

  const [user, setUser] = useState({
    email: "",
    Imie: "",
    Telefon: "",
    Nazwisko: "",
    Haslo: "",
    Powtorz_haslo: "",
    Typ_konta: "private",
  });

  const onSignUp = async () => {
    if (
      !user.email ||
      !user.Imie ||
      !user.Telefon ||
      !user.Nazwisko ||
      !user.Haslo
    ) {
      alert("Please fill the required fields before submitting.");
      return; // prevent submit
    }
    try {
      const response = await axios.post("/api/users/signup", user);
      localStorage.setItem("userEmail", user.email); // Save email to localStorage
      router.push("/sample");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios errors safely
        console.error("Signup failed:", error.response?.data || error.message);
      } else if (error instanceof Error) {
        // Handle generic JS errors
        console.error("Signup failed:", error.message);
      } else {
        console.error("An unexpected error occurred during signup");
      }
    }
  };

  const [allChecked, setAllChecked] = useState(false);
  const [consents, setConsents] = useState({
    regulation: false,
    email: false,
    sms: false,
    phone: false,
  });

  // When select all is toggled
  const handleAllChange = (v: React.ChangeEvent<HTMLInputElement>) => {
    const checked = v.target.checked;
    setAllChecked(checked);
    setConsents({
      regulation: checked,
      email: checked,
      sms: checked,
      phone: checked,
    });
  };

  const handleConsentChange =
    (key: keyof typeof consents) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const updated = { ...consents, [key]: e.target.checked };
      setConsents(updated);
      setAllChecked(Object.values(updated).every(Boolean));
    };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 px-4 lg:px-0 mt-32 lg:mt-42">
        <Navbar />
        <div className="flex flex-col items-start justify-start">
          <Link
            href="/login"
            className="back-to-login yellow-underline text-zinc-900 text-xs font-medium mb-3"
          >
            Powrót do strony logowania
          </Link>
          <div className="flex items-start gap-5">
            <Image
              src="/icon.svg"
              width={150}
              height={150}
              alt="company logo"
            />
            <div>
              <h3 className="text-black text-5xl opacity-80 font-semibold login-title">
                Rejestracja
              </h3>
              <p className="text-zinc-400 text-2xl mt-3">
                Wysyłaj, odbieraj i śledź przesyłki kiedy tylko chcesz!
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-start justify-start w-full lg:w-fit">
            <div className="flex flex-col lg:flex-row w-full items-center gap-6">
              <div className="flex flex-col w-full  lg:w-1/2">
                <label
                  htmlFor="email"
                  className="text-gray-600 text-left text-xs font-semibold opacity-80"
                >
                  E-mail<span className="text-red-500 opacity-75">*</span>
                </label>
                <input
                  type="text"
                  className="bg-white w-full transition-all ease duration-200 text-black py-2 pl-2 pr-10 border border-gray-400 rounded-md focus:border-orange-500 focus:outline-none"
                  id="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
              <div className="flex flex-col w-full lg:w-1/2">
                <label
                  className="text-gray-600 text-left text-xs font-semibold opacity-80"
                  htmlFor="Imię*"
                >
                  Imię<span className="text-red-500 opacity-75">*</span>
                </label>
                <input
                  type="text"
                  className="bg-white w-full transition-all ease duration-200 text-black py-2 pl-2 pr-10 border border-gray-400 rounded-md focus:border-orange-500 focus:outline-none placeholder:text-sm"
                  value={user.Imie}
                  onChange={(e) => setUser({ ...user, Imie: e.target.value })}
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row w-full items-center gap-6 mt-5">
              <div className="flex flex-col w-full  lg:w-1/2">
                <label
                  htmlFor="Telefon"
                  className="text-gray-600 text-left text-xs font-semibold opacity-80"
                >
                  Telefon<span className="text-red-500 opacity-75">*</span>
                </label>
                <div className="flex items-center">
                  <div className="flex items-center justify-center h-[43px] w-[60px] px-3 rounded-tl-md rounded-bl-md border border-gray-400 bg-white">
                    <Image
                      src="/flag.svg"
                      width={50}
                      height={50}
                      className=""
                      alt="flag"
                    ></Image>
                  </div>

                  <input
                    type="text"
                    className="bg-white h-[43px] w-full  transition-all ease duration-200 text-black py-2 pl-2 pr-10 border border-gray-400 rounded-tr-md rounded-br-md focus:border-orange-500 focus:outline-none"
                    id="email"
                    value={user.Telefon}
                    onChange={(e) =>
                      setUser({ ...user, Telefon: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col w-full  lg:w-1/2">
                <label
                  className="text-gray-600 text-left text-xs font-semibold opacity-80"
                  htmlFor="Nazwisko"
                >
                  Nazwisko<span className="text-red-500 opacity-75">*</span>
                </label>
                <input
                  type="text"
                  className="bg-white w-full transition-all ease duration-200 text-black py-2 pl-2 pr-10 border border-gray-400 rounded-md focus:border-orange-500 focus:outline-none placeholder:text-sm"
                  value={user.Nazwisko}
                  onChange={(e) =>
                    setUser({ ...user, Nazwisko: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row w-full items-center gap-6 mt-5">
              <div className="flex flex-col w-full  lg:w-1/2">
                <label
                  className="text-gray-600 text-left text-xs font-semibold opacity-80"
                  htmlFor="Hasło"
                >
                  Hasło<span className="text-red-500 opacity-75">*</span>
                </label>
                <input
                  type="password"
                  className="bg-white w-full transition-all ease duration-200 text-black py-2 pl-2 pr-10 border border-gray-400 rounded-md focus:border-orange-500 focus:outline-none placeholder:text-sm"
                  value={user.Haslo}
                  onChange={(e) => setUser({ ...user, Haslo: e.target.value })}
                />
              </div>

              <div className="flex flex-col w-full  lg:w-1/2">
                <label
                  className="text-gray-600 text-left text-xs font-semibold opacity-80"
                  htmlFor="Powtórz hasło"
                >
                  Powtórz hasło
                  <span className="text-red-500 opacity-75">*</span>
                </label>
                <input
                  type="text"
                  className="bg-white w-full transition-all ease duration-200 text-black py-2 pl-2 pr-10 border border-gray-400 rounded-md focus:border-orange-500 focus:outline-none placeholder:text-sm"
                  value={user.Powtorz_haslo}
                  onChange={(e) =>
                    setUser({ ...user, Powtorz_haslo: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row w-full items-center gap-6 mt-5">
              <div className="w-full">
                <label
                  className="text-gray-600 text-left text-xs font-semibold opacity-80"
                  htmlFor="Typ konta"
                >
                  Typ konta
                  <span className="text-red-500 opacity-75">*</span>
                </label>
                <div className="flex rounded border border-gray-300 overflow-hidden bg-white max-w-2xl">
                  {options.map((option, i) => (
                    <label
                      key={option.value}
                      className={`flex-1 text-center py-3 cursor-pointer font-medium text-[12px] transition
              ${
                selected === option.value
                  ? "bg-yellow-400 text-gray-800"
                  : "bg-white text-gray-600"
              }
              ${i === 0 ? "rounded-l" : ""}
              ${i === options.length - 1 ? "rounded-r" : ""}
              border-r border-gray-400 last:border-r-0
            `}
                    >
                      <input
                        type="radio"
                        value={option.value}
                        checked={selected === option.value}
                        onChange={() => {
                          setSelected(option.value);
                          setUser({ ...user, Typ_konta: option.value }); // <--- add this line
                        }}
                        className="sr-only"
                        name="accountType"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5">
              <h4 className="dinamit text-black font-semibold text-3xl opacity-90">
                Zgody
              </h4>
              <p className="text-xs text-black opacity-75 font-semibold mt-2">
                Zaznacz odpowiednie
              </p>
            </div>

            <div className="max-w-2xl p-4  rounded">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="all"
                  checked={allChecked}
                  onChange={handleAllChange}
                  className="w-5 h-5 accent-yellow-400 border-gray-400 mr-2"
                />
                <label
                  htmlFor="all"
                  className="text-gray-700 text-xs select-none"
                >
                  Zaznacz wszystkie
                </label>
              </div>
              <div className="flex items-start mb-2">
                <input
                  type="checkbox"
                  id="regulation"
                  checked={consents.regulation}
                  onChange={handleConsentChange("regulation")}
                  className="w-5 h-5 accent-yellow-400 border-gray-400 mr-2 mt-1"
                />
                <label
                  htmlFor="regulation"
                  className="text-gray-700 text-xs select-none leading-snug"
                >
                  <span>
                    *Oświadczam, że zapoznałem się i akceptuję aktualny{" "}
                    <span className="font-bold bg-yellow-200 text-black px-1 yellow-underline">
                      regulamin
                    </span>{" "}
                    aplikacji Manager Paczek
                  </span>
                </label>
              </div>
              <div className="text-gray-700 text-xs mt-3 mb-2">
                Dzieje się u nas dużo dobrego. Chcesz być na bieżąco? Jeśli to
                jeszcze przed Tobą, wyraź zgodę na otrzymywanie od InPost sp. z
                o.o ...
              </div>

              <div className="pl-8 mb-2 space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="email"
                    checked={consents.email}
                    onChange={handleConsentChange("email")}
                    className="w-5 h-5 accent-yellow-400 border-gray-400 mr-2"
                  />
                  <label
                    htmlFor="email"
                    className="text-gray-700 text-xs select-none"
                  >
                    poczty elektronicznej (e-mail)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="sms"
                    checked={consents.sms}
                    onChange={handleConsentChange("sms")}
                    className="w-5 h-5 accent-yellow-400 border-gray-400 mr-2"
                  />
                  <label
                    htmlFor="sms"
                    className="text-gray-700 text-xs select-none"
                  >
                    SMS/MMS
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="phone"
                    checked={consents.phone}
                    onChange={handleConsentChange("phone")}
                    className="w-5 h-5 accent-yellow-400 border-gray-400 mr-2"
                  />
                  <label
                    htmlFor="phone"
                    className="text-gray-700 text-xs select-none"
                  >
                    połączenia telefonicznego
                  </label>
                </div>
              </div>

              {/* Description and Privacy Policy */}
              <div className="text-gray-600 text-[12px] mt-5 leading-snug">
                <p>
                  Powyższe zgody są dobrowolne. Możesz wycofać je w każdym
                  czasie...
                  <br />
                  Więcej informacji na temat przetwarzania danych osobowych, w
                  tym o przysługujących Ci prawach znajduje się w{" "}
                  <span className="font-bold yellow-underline text-black bg-yellow-200 ">
                    Polityce Prywatności.
                  </span>
                </p>
              </div>
            </div>

            <button
              onClick={onSignUp}
              className="bg-[#FCC905] w-full lg:w-fit hover:opacity-70 my-5 text-zinc-800 px-8 py-4 text-sm rounded-md font-semibold cursor-pointer"
            >
              Zarejestruj się
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
