"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

const options = [
  { value: "private", label: "Osoba prywatna" },
  { value: "domestic", label: "Firma krajowa" },
  { value: "foreign", label: "Firma zagraniczna" },
];

export default function SignIn() {
  const router = useRouter();
  const [selectOpen, setSelectOpen] = useState(false);
  const [selected, setSelected] = useState("private");

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtionDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log(response);
      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios errors safely
        console.error("Login failed:", error.response?.data || error.message);
      } else if (error instanceof Error) {
        // Handle generic JS errors
        console.error("Login failed:", error.message);
      } else {
        console.error("An unexpected error occurred during login");
      }
    } finally {
      setLoading(false);
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
      <div className="flex flex-col items-center justify-center min-h-screen py-2 px-4 md:px-0 mt-32 md:mt-42">
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

          <div className="mt-10 flex flex-col items-start justify-start w-full md:w-fit">
            <div className="flex flex-col md:flex-row w-full items-center gap-6">
              <div className="flex flex-col w-full  md:w-1/2">
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
              <div className="flex flex-col w-full md:w-1/2">
                <label
                  className="text-gray-600 text-left text-xs font-semibold opacity-80"
                  htmlFor="Imię*"
                >
                  Imię<span className="text-red-500 opacity-75">*</span>
                </label>
                <input
                  type="text"
                  className="bg-white w-full transition-all ease duration-200 text-black py-2 pl-2 pr-10 border border-gray-400 rounded-md focus:border-orange-500 focus:outline-none placeholder:text-sm"
                  id="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row w-full items-center gap-6 mt-5">
              <div className="flex flex-col w-full  md:w-1/2">
                <label
                  htmlFor="email"
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
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col w-full  md:w-1/2">
                <label
                  className="text-gray-600 text-left text-xs font-semibold opacity-80"
                  htmlFor="Imię*"
                >
                  Nazwisko<span className="text-red-500 opacity-75">*</span>
                </label>
                <input
                  type="text"
                  className="bg-white w-full transition-all ease duration-200 text-black py-2 pl-2 pr-10 border border-gray-400 rounded-md focus:border-orange-500 focus:outline-none placeholder:text-sm"
                  id="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row w-full items-center gap-6 mt-5">
              <div className="flex flex-col w-full  md:w-1/2">
                <label
                  className="text-gray-600 text-left text-xs font-semibold opacity-80"
                  htmlFor="Imię*"
                >
                  Hasło<span className="text-red-500 opacity-75">*</span>
                </label>
                <input
                  type="text"
                  className="bg-white w-full transition-all ease duration-200 text-black py-2 pl-2 pr-10 border border-gray-400 rounded-md focus:border-orange-500 focus:outline-none placeholder:text-sm"
                  id="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col w-full  md:w-1/2">
                <label
                  htmlFor="email"
                  className="text-gray-600 text-left text-xs font-semibold opacity-80"
                >
                  Nazwa skrócona
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    className="bg-white h-[43px] w-full  transition-all ease duration-200 text-black py-2 pl-2 pr-10 border border-gray-400 rounded-tl-md rounded-bl-md focus:border-orange-500 focus:outline-none"
                    id="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />

                  <div className="flex items-center justify-center h-[43px] w-[60px] px-3 rounded-tr-md rounded-br-md border border-gray-400 bg-white text-black opacity-75 relative group align-top">
                    <button
                      type="button"
                      tabIndex={0}
                      className="w-10 h-10 flex items-center justify-center opacity-75  rounded text-xl  focus:outline-none"
                    >
                      ?
                    </button>
                    <div className="absolute left-1/2 bottom-full -translate-x-1/2 mb-3 w-[400px] bg-gray-200 text-black text-[11px] px-2 py-1 rounded-lg shadow-2xl border border-gray-200 opacity-0 pointer-events-none transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 group-hover:pointer-events-auto group-focus-within:pointer-events-auto z-50 text-center">
                      Wpisz nazwę np. Twojej firmy lub Twoje Imię, nazwa ta
                      będzie używana w komunikatach jako nazwa nadawcy. W
                      przypadku braku Nazwy skróconej będziemy używać Twojego
                      adresu e-mail :)
                      {/* Arrow */}
                      <span
                        className="absolute left-1/2 bottom-[-10px] -translate-x-1/2 w-0 h-0 
      border-x-8 border-x-transparent border-t-[10px] border-t-gray-200 shadow-2xl"
                      ></span>
                      <span
                        className="absolute left-1/2 bottom-[-12px] -translate-x-1/2 w-0 h-0 
      border-x-8 border-x-transparent border-t-[12px] border-t-gray-200 shadow-2xl"
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row w-full items-center gap-6 mt-5">
              <div className="flex flex-col w-full  md:w-1/2">
                <label
                  className="text-gray-600 text-left text-xs font-semibold opacity-80"
                  htmlFor="Imię*"
                >
                  Powtórz hasło
                  <span className="text-red-500 opacity-75">*</span>
                </label>
                <input
                  type="text"
                  className="bg-white w-full transition-all ease duration-200 text-black py-2 pl-2 pr-10 border border-gray-400 rounded-md focus:border-orange-500 focus:outline-none placeholder:text-sm"
                  id="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col w-full  md:w-1/2">
                <label
                  htmlFor="email"
                  className="text-gray-600 text-left text-xs font-semibold opacity-80"
                >
                  Kod pocztowy
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    className="bg-white h-[43px] w-full  transition-all ease duration-200 text-black py-2 pl-2 pr-10 border border-gray-400 rounded-tl-md rounded-bl-md focus:border-orange-500 focus:outline-none"
                    id="email"
                    placeholder="01-990"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />

                  <div className="flex items-center justify-center h-[43px] w-[60px] px-3 rounded-tr-md rounded-br-md border border-gray-400 bg-white text-black opacity-75 relative group align-top">
                    <button
                      type="button"
                      tabIndex={0}
                      className="w-10 h-10 flex items-center justify-center opacity-75  rounded text-xl  focus:outline-none"
                    >
                      ?
                    </button>
                    <div className="absolute left-1/2 bottom-full -translate-x-1/2 mb-3 w-[400px] bg-gray-200 text-black text-[11px] px-2 py-1 rounded-lg shadow-4xl border border-gray-200 opacity-0 pointer-events-none transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 group-hover:pointer-events-auto group-focus-within:pointer-events-auto z-50 text-center">
                      Przklad: 01-990
                      <span
                        className="absolute left-1/2 bottom-[-10px] -translate-x-1/2 w-0 h-0 
      border-x-8 border-x-transparent border-t-[10px] border-t-gray-200 shadow-2xl"
                      ></span>
                      <span
                        className="absolute left-1/2 bottom-[-12px] -translate-x-1/2 w-0 h-0 
      border-x-8 border-x-transparent border-t-[12px] border-t-gray-200 shadow-2xl"
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row w-full items-center gap-6 mt-5">
              <div className="flex flex-col w-full ">
                <label
                  htmlFor="paczkomat"
                  className="text-gray-600 text-left text-xs font-semibold opacity-80"
                >
                  Preferowany Paczkomat®
                </label>
                <div className="flex items-center">
                  {/* Select dropdown */}
                  <div className="relative w-full">
                    <button
                      type="button"
                      onClick={() => setSelectOpen((open) => !open)}
                      className="bg-white h-[43px] w-full transition-all ease duration-100 text-black py-2 pl-3 pr-2 border border-gray-400 rounded-tl-md rounded-bl-md focus:border-yellow-400 focus:outline-none placeholder:opacity-75 placeholder:text-sm flex items-center justify-between"
                      id="paczkomat"
                      aria-haspopup="listbox"
                      aria-expanded={selectOpen}
                    >
                      <span className="text-gray-400 text-sm">
                        Wpisz fragment nazwy lub lokalizacji
                      </span>
                      {/* Arrow icon */}
                      <span
                        className={`ml-2 w-4 h-4 transition-transform duration-150 ease-in-out text-gray-400 ${
                          selectOpen ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        <svg
                          fill="none"
                          viewBox="0 0 20 20"
                          className="w-4 h-4"
                        >
                          <path
                            d="M6 8l4 4 4-4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                    {/* Dropdown (Optional: only one option, so can be hidden) */}
                    {selectOpen && (
                      <ul
                        className="absolute left-0 w-full bg-[#EEEEEE] border border-gray-200 rounded shadow mt-1 z-10 text-gray-400 font-medium"
                        tabIndex={-1}
                        role="listbox"
                      >
                        <li
                          className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                          onClick={() => setSelectOpen(false)}
                        >
                          Aby wyszukać wprowadź minimum 3 znaki
                        </li>
                      </ul>
                    )}
                  </div>

                  {/* MAPA Button */}
                  <div className="flex items-center justify-center h-[43px] w-[80px] px-3 rounded-tr-md rounded-br-md border border-gray-400 bg-white text-black opacity-75 relative align-top">
                    <button
                      type="button"
                      tabIndex={0}
                      className="cursor-pointer w-full flex items-center justify-center opacity-75 rounded text-sm focus:outline-none"
                    >
                      MAPA
                      <Image
                        src="/map.svg"
                        width={15}
                        height={15}
                        className="ml-1"
                        alt="map icon"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row w-full items-center gap-6 mt-5">
              <div className="w-full">
                <label
                  className="text-gray-600 text-left text-xs font-semibold opacity-80"
                  htmlFor="Imię*"
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
                        onChange={() => setSelected(option.value)}
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
              className="bg-[#FCC905] w-full md:w-fit hover:opacity-70 my-5 text-zinc-800 px-8 py-4 text-sm rounded-md font-semibold cursor-pointer"
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
