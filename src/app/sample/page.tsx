"use client";
import NavAuth from "@/components/navAuth";
import Footer from "@/components/footer";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

const typeShipment = [
  { value: "Parcel Lockers® 24/7", label: "Paczkomat® 24/7" },
  { value: "InPost Courier", label: "InPost Kurier" },
];

const packageSize = [
  { value: "A", size: "max. 8 x 38 x 64 cm" },
  { value: "B", size: "max. 19 x 38 x 64 cm" },
  { value: "C", size: "max. 41 x 38 x 64 cm" },
  { value: "D", size: "max. 80 x 50 x 50 cm" },
];

const transferShipment = [
  {
    value: "I will send it at the Paczkomat® slot machine",
    label: "Nadam w automacie Paczkomat®",
  },
  {
    value: "The parcel will be collected by the InPost courier",
    label: "Przesyłkę odbierze kurier InPost",
    label2: "Usługa dodatkowo płatna",
  },
  {
    value: "I will send it at PaczkoPunkt",
    label: "Nadam w PaczkoPunkcie",
    label2: "Sprawdź gdzie nadać przesyłkę",
  },
];

export default function Login() {
  const router = useRouter();
  const [selectedShipment, setSelectedShipment] = useState(
    "Parcel Lockers® 24/7"
  );

  const [selectedTransferShipment, setSelectedTransferShipment] = useState(
    "I will send it at the Paczkomat® slot machine"
  );
  const [selectOpen, setSelectOpen] = useState(false);

  const [selectedPackage, setSelectedPackage] = useState("A");

  const [user, setUser] = useState({
    typeOfShipment: "Parcel Lockers® 24/7",
    packageSize: "A",
    email: "",
    telephone: "",
    name: "",
    companyName: "",
    postCode: "",
    town: "",
    street: "",
    buildingNumber: "",
    premisesNumber: "",
    pickupPoint: "",
    downloadValue: "",
    additionalProtection: "Do 5 000.00 zł",
    packageOnWeekend: "",
    transferShipment: "I will send it at the Paczkomat® slot machine",
  });

  const onSubmit = async () => {
    try {
      const response = await axios.post("/api/users/sample", user);
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

  const filteredPackageSizes =
    selectedShipment === "Parcel Lockers® 24/7"
      ? packageSize.filter((pkg) => ["A", "B", "C"].includes(pkg.value))
      : packageSize; // all options for InPost Courier

  // Optional useEffect for auto-reset
  useEffect(() => {
    if (
      selectedShipment === "Parcel Lockers® 24/7" &&
      !["A", "B", "C"].includes(selectedPackage)
    ) {
      setSelectedPackage("A");
      setUser({ ...user, packageSize: "A" });
    }
  }, [selectedShipment]);


  return (
    <>
      <div className="sample-page flex flex-col items-center justify-center min-h-screen py-2 px-4 lg:px-0 mt-32 lg:mt-20">
        <NavAuth />
        <div className="lg:mt-10 flex flex-col items-start justify-start w-full md:p-4 lg:p-0 lg:w-1/2">
          <p className="text-black lg:hidden font-medium text-base opacity-90 lg:ml-[23%] mb-10 italic">
             Wyślij przesyłki &gt;  Przygotuj jedną 
          </p>
          <p className="text-black font-semibold text-sm opacity-70 lg:ml-[23%]">
            Sposób doręczenia
          </p>

          {/* SHIPMENT TYPE */}
          <div className="flex flex-col lg:flex-row w-full lg:items-center gap-1 lg:gap-3 mt-5">
            <div className="lg:w-[20%]">
              <label
                className="text-gray-600 text-left text-xs font-semibold opacity-80 text-nowrap"
                htmlFor="Typ konta"
              >
                Wybierz rodzaj przesyłki
              </label>
            </div>
            <div className="lg:w-[80%]">
              <div className="flex gap-3 rounded  overflow-hidden max-w-5xl">
                {typeShipment.map((option, i) => (
                  <label
                    key={option.value}
                    className={`w-1/2 rounded text-center py-2 cursor-pointer font-medium bg-white text-[12px] transition
                      ${
                        selectedShipment === option.value
                          ? "border-yellow-400 border-2 text-gray-800"
                          : " text-gray-600 border-1 border-gray-400"
                      }
                      
                    `}
                  >
                    <input
                      type="radio"
                      value={option.value}
                      checked={selectedShipment === option.value}
                      onChange={() => {
                        setSelectedShipment(option.value);
                        setUser({ ...user, typeOfShipment: option.value }); // <--- add this line
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

          {/* PACKAGE SIZE */}
          <div className="flex flex-col lg:flex-row w-full gap-1 lg:gap-3 mt-5">
            <div className="lg:w-[20%]">
              <label
                className="text-gray-600 text-left text-xs font-semibold opacity-80 text-nowrap"
                htmlFor="Typ konta"
              >
                Wybierz rozmiar paczki
              </label>
            </div>
            <div className="lg:w-[80%]">
              <div className="flex flex-col lg:flex-row gap-3 rounded  overflow-hidden max-w-5xl">
                {filteredPackageSizes.map((option, i) => (
                  <label
                    key={option.value}
                    className={`lg:w-1/3 flex gap-5 lg:gap-0 lg:flex-col justify-start items-center p-2 lg:p-0 rounded text-center cursor-pointer font-medium bg-white text-[12px] transition
                      ${
                        selectedPackage === option.value
                          ? "border-yellow-400 border-2 text-gray-800"
                          : " text-gray-600 border-1 border-gray-400"
                      }
                      
                    `}
                  >
                    <input
                      type="radio"
                      value={option.value}
                      checked={selectedPackage === option.value}
                      onChange={() => {
                        setSelectedPackage(option.value);
                        setUser({ ...user, packageSize: option.value }); // <--- add this line
                      }}
                      className="sr-only "
                      name="accountType"
                    />
                    <p>{option.value}</p>
                    <p className="">{option.size}</p>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* EMAIL */}
          <div className="flex flex-col lg:flex-row w-full lg:items-center gap-1 lg:gap-3 mt-5">
            <div className="lg:w-[20%] flex lg:justify-end">
              <label className="text-gray-600  lg:text-right text-xs font-semibold opacity-80 text-nowrap">
                Adres e-mail<span className="text-red-500 opacity-75">*</span>
              </label>
            </div>
            <div className="lg:w-[80%]">
              <input
                type="text"
                className="bg-white w-full transition-all ease duration-200 text-black py-2 pl-2 pr-10 border border-gray-400 rounded focus:border-orange-300 focus:outline-none text-sm placeholder:text-xs placeholder:text-gray-400"
                id="email"
                value={user.email}
                placeholder="Wpisz adres e-mail"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
          </div>

          {/* TELEPHONE */}
          <div className="flex flex-col lg:flex-row w-full lg:items-center gap-1 lg:gap-3 mt-5">
            <div className="lg:w-[20%] flex lg:justify-end">
              <label className="text-gray-600  lg:text-right text-xs font-semibold opacity-80 text-nowrap">
                Numer telefonu<span className="text-red-500 opacity-75">*</span>
              </label>
            </div>
            <div className="lg:w-[80%]">
              <div className="flex items-center">
                <div className="flex items-center justify-center h-[37px] w-[50px] px-3 rounded-tl-md rounded-bl-md border border-gray-400 bg-white">
                  <Image
                    src="/flag.svg"
                    width={25}
                    height={25}
                    className=""
                    alt="flag"
                  ></Image>
                </div>

                <input
                  type="text"
                  className="bg-white h-[37px] w-full text-xs placeholder:text-xs transition-all ease duration-200 text-black pl-2 pr-10 border border-gray-400 rounded-tr-md rounded-br-md focus:border-orange-500 focus:outline-none"
                  id="email"
                  placeholder="wpisz numer telefonu"
                  value={user.telephone}
                  onChange={(e) =>
                    setUser({ ...user, telephone: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* PICKUP POINT */}
          {selectedShipment === "Parcel Lockers® 24/7" ? (
            <div className="flex flex-col lg:flex-row w-full lg:items-center gap-1 lg:gap-3 mt-5">
              <div className="lg:w-[20%] flex lg:justify-end">
                <label className="text-gray-600  lg:text-right text-xs font-semibold opacity-80 text-nowrap">
                  Punkt odbioru
                  <span className="text-red-500 opacity-75">*</span>
                </label>
              </div>
              <div className="lg:w-[80%]">
                <div className="flex flex-col w-full ">
                  <div className="flex items-center">
                    {/* Select dropdown */}
                    <div className="relative w-full">
                      <button
                        type="button"
                        onClick={() => setSelectOpen((open) => !open)}
                        className="bg-white h-[43px] w-full transition-all ease duration-200 text-black py-2 pl-3 pr-1 border border-gray-400 rounded-tl-md rounded-bl-md focus:border-yellow-400 focus:outline-none placeholder:opacity-75 placeholder:text-xs flex items-center justify-between"
                        id="paczkomat"
                        aria-haspopup="listbox"
                        aria-expanded={selectOpen}
                      >
                        <span className="text-gray-400 text-xs">
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
                          className="absolute left-0 w-full bg-[#EEEEEE] border border-gray-200 shadow z-10 text-gray-900"
                          tabIndex={-1}
                          role="listbox"
                        >
                          <li
                            className="px-4 py-2 text-xs cursor-pointer text-gray-500 font-semibold"
                            onClick={() => setSelectOpen(false)}
                          >
                            Zacznij wpisywać, aby wyszukać – minimum 3 znaki
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
            </div>
          ) : (
            <div className="w-full">
              <div className="flex flex-col lg:flex-row w-full lg:items-center gap-1 lg:gap-3 mt-5">
                <div className="lg:w-[20%] flex lg:justify-end">
                  <label className="text-gray-600  lg:text-right text-xs font-semibold opacity-80 text-nowrap">
                    Imię i nazwisko{" "}
                    <span className="text-red-500 opacity-75">*</span>
                  </label>
                </div>
                <div className="lg:w-[80%]">
                  <input
                    type="text"
                    className="bg-white w-full transition-all ease duration-200 text-black py-2 pl-2 pr-10 border border-gray-400 rounded focus:border-orange-300 focus:outline-none text-sm placeholder:text-xs placeholder:text-gray-400"
                    id="email"
                    value={user.name}
                    placeholder="Wpisz nazwe nazwisko"
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row w-full lg:items-center gap-1 lg:gap-3 mt-5">
                <div className="lg:w-[20%] flex lg:justify-end">
                  <label className="text-gray-600  lg:text-right text-xs font-semibold opacity-80 text-nowrap">
                    Nazwa firmy{" "}
                    <span className="text-red-500 opacity-75">*</span>
                  </label>
                </div>
                <div className="lg:w-[80%]">
                  <input
                    type="text"
                    className="bg-white w-full transition-all ease duration-200 text-black py-2 pl-2 pr-10 border border-gray-400 rounded focus:border-orange-300 focus:outline-none text-sm placeholder:text-xs placeholder:text-gray-400"
                    id="email"
                    value={user.companyName}
                    placeholder="Wpisz nazwe nazwisko"
                    onChange={(e) =>
                      setUser({ ...user, companyName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row w-full lg:items-center gap-1 lg:gap-3 mt-5">
                <div className="lg:w-[20%] flex lg:justify-end">
                  <label className="text-gray-600  lg:text-right text-xs font-semibold opacity-80 text-nowrap">
                    Kod pocztowy{" "}
                    <span className="text-red-500 opacity-75">*</span>
                  </label>
                </div>
                <div className="lg:w-[80%]">
                  <input
                    type="text"
                    className="bg-white w-full transition-all ease duration-200 text-black py-2 pl-2 pr-10 border border-gray-400 rounded focus:border-orange-300 focus:outline-none text-sm placeholder:text-xs placeholder:text-gray-400"
                    id="email"
                    value={user.postCode}
                    placeholder="Wpisz kod pocztowy"
                    onChange={(e) =>
                      setUser({ ...user, postCode: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row w-full lg:items-center gap-1 lg:gap-3 mt-5">
                <div className="lg:w-[20%] flex lg:justify-end">
                  <label className="text-gray-600  lg:text-right text-xs font-semibold opacity-80 text-nowrap">
                    Miejscowość{" "}
                    <span className="text-red-500 opacity-75">*</span>
                  </label>
                </div>
                <div className="lg:w-[80%]">
                  <input
                    type="text"
                    className="bg-white w-full transition-all ease duration-200 text-black py-2 pl-2 pr-10 border border-gray-400 rounded focus:border-orange-300 focus:outline-none text-sm placeholder:text-xs placeholder:text-gray-400"
                    id="email"
                    value={user.town}
                    placeholder="Wpisz Miejscowość"
                    onChange={(e) => setUser({ ...user, town: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row w-full lg:items-center gap-1 lg:gap-3 mt-5">
                <div className="lg:w-[20%] flex lg:justify-end">
                  <label className="text-gray-600  lg:text-right text-xs font-semibold opacity-80 text-nowrap">
                    Ulica <span className="text-red-500 opacity-75">*</span>
                  </label>
                </div>
                <div className="lg:w-[80%]">
                  <input
                    type="text"
                    className="bg-white w-full transition-all ease duration-200 text-black py-2 pl-2 pr-10 border border-gray-400 rounded focus:border-orange-300 focus:outline-none text-sm placeholder:text-xs placeholder:text-gray-400"
                    id="email"
                    value={user.street}
                    placeholder="Wpisz Ulica"
                    onChange={(e) =>
                      setUser({ ...user, street: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row w-full lg:items-center gap-1 lg:gap-3 mt-5">
                <div className="lg:w-[20%] flex lg:justify-end">
                  <label className="text-gray-600  lg:text-right text-xs font-semibold opacity-80 text-nowrap">
                    Numer budynku{" "}
                    <span className="text-red-500 opacity-75">*</span>
                  </label>
                </div>
                <div className="lg:w-[80%]">
                  <input
                    type="text"
                    className="bg-white w-full transition-all ease duration-200 text-black py-2 pl-2 pr-10 border border-gray-400 rounded focus:border-orange-300 focus:outline-none text-sm placeholder:text-xs placeholder:text-gray-400"
                    id="email"
                    value={user.buildingNumber}
                    placeholder="Wpisz numer"
                    onChange={(e) =>
                      setUser({ ...user, buildingNumber: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row w-full lg:items-center gap-1 lg:gap-3 mt-5">
                <div className="lg:w-[20%] flex lg:justify-end">
                  <label className="text-gray-600  lg:text-right text-xs font-semibold opacity-80 text-nowrap">
                    Numer lokalu{" "}
                  </label>
                </div>
                <div className="lg:w-[80%]">
                  <input
                    type="text"
                    className="bg-white w-full transition-all ease duration-200 text-black py-2 pl-2 pr-10 border border-gray-400 rounded focus:border-orange-300 focus:outline-none text-sm placeholder:text-xs placeholder:text-gray-400"
                    id="email"
                    value={user.premisesNumber}
                    placeholder="Wpisz Ulica"
                    onChange={(e) =>
                      setUser({ ...user, premisesNumber: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          )}

          <div className="w-full flex justify-end my-5">
            <p className="yellow-underline">
              Dodaj odbiorcę do książki adresowej
            </p>
          </div>

          <p className="text-black font-semibold text-sm opacity-70 lg:ml-[23%]">
            Dodatkowe usługi
          </p>

          {/* DOWNLOAD VALUE */}
          <div className="flex flex-col lg:flex-row w-full lg:items-center gap-1 lg:gap-3 mt-5">
            <div className="lg:w-[20%] flex lg:justify-end">
              <label className="text-gray-600  lg:text-right text-xs font-semibold opacity-80 text-nowrap">
                Wartość pobrania
                <span className="text-red-500 opacity-75">*</span>
              </label>
            </div>
            <div className="lg:w-[80%]">
              <input
                type="text"
                className="bg-white w-full transition-all ease duration-200 text-black py-2 pl-2 pr-10 border border-gray-400 rounded focus:border-orange-300 focus:outline-none text-sm placeholder:text-xs placeholder:text-gray-400"
                id="email"
                value={user.downloadValue}
                placeholder="Wpisz kwotę, aby nadać przesyłkę za pobraniem "
                onChange={(e) =>
                  setUser({ ...user, downloadValue: e.target.value })
                }
              />
            </div>
          </div>

          {/* ADDITIONAL PROTECTION */}
          <div className="flex flex-col lg:flex-row w-full lg:items-center gap-1 lg:gap-3 mt-5">
            <div className="lg:w-[20%]">
              <label
                className="text-gray-600 text-left text-xs font-semibold opacity-80 text-nowrap"
                htmlFor="Typ konta"
              >
                Dodatkowa ochrona
              </label>
            </div>
            <div className="lg:w-[80%]">
              <div className="flex gap-3 rounded overflow-hidden max-w-5xl">
                <label
                  className={`w-full flex flex-col items-center justify-center rounded text-center cursor-pointer font-medium bg-white text-[12px] transition border-yellow-400 border-2 text-gray-800
                      
                    `}
                >
                  <input type="radio" className="sr-only" name="accountType" />
                  <p>Do 5 000.00 zł</p>
                  <p className="text-[10px] text-gray-400">Koszt: 0,00 zł</p>
                </label>
              </div>
            </div>
          </div>

          {/* PACKAGE ON THE WEEKEND */}
          {selectedShipment === "Parcel Lockers® 24/7" && (
            <div className="flex flex-col lg:flex-row w-full lg:items-center gap-1 lg:gap-3 mt-5">
              <div className="lg:w-[20%]">
                <label className="text-gray-600 text-left text-xs font-semibold opacity-80 text-nowrap">
                  Paczka w Weekend
                </label>
              </div>
              <div className="lg:w-[80%]">
                <div className="flex gap-3 rounded overflow-hidden max-w-5xl">
                  <label
                    className={`w-1/2 flex flex-col items-center justify-center rounded text-center cursor-not-allowed font-medium bg-white text-[12px] transition border-yellow-400 border-2 text-gray-800 
                      
                    `}
                  >
                    <input
                      type="radio"
                      className="sr-only"
                      name="accountType"
                    />
                    <p className="text-gray-400 text-xs font-sembold">NIE</p>
                    <p className="text-[10px] text-gray-400">Koszt: 0,00 zł</p>
                  </label>

                  <label
                    className={`w-1/2 flex flex-col items-center justify-center rounded text-center cursor-not-allowed font-medium bg-white text-[12px] transition border-gray-300 border-2 text-gray-800 
                      
                    `}
                  >
                    <input
                      type="radio"
                      className="sr-only"
                      name="accountType"
                    />
                    <p className="text-gray-400 text-xs font-sembold">TAK</p>
                    <p className="text-[10px] text-gray-400">Koszt: 0,00 zł</p>
                  </label>
                </div>
              </div>
            </div>
          )}

          <p className="text-black font-semibold text-sm opacity-70 lg:ml-[23%] my-5">
            Sposób nadania
          </p>

          {/* TRANSFER YOUR SHIPMENT */}
          <div className="flex flex-col lg:flex-row w-full lg:items-center gap-1 lg:gap-3 mt-5">
            <div className="lg:w-[20%]">
              <label className="text-gray-600 text-left text-xs font-semibold opacity-80 ">
                Wybierz sposób przekazania przesyłki
              </label>
            </div>
            <div className="lg:w-[80%]">
              <div className="flex flex-col lg:flex-row gap-3 rounded  overflow-hidden max-w-5xl">
                {transferShipment.map((option, i) => (
                  <label
                    key={option.label}
                    className={`lg:w-1/2 flex flex-col items-center justify-center lg:block rounded h-[60px] lg:h-auto text-center py-2 cursor-pointer font-medium bg-white text-[12px] transition
                      ${
                        selectedTransferShipment === option.value
                          ? "border-yellow-400 border-2 text-gray-800"
                          : " text-gray-600 border-1 border-gray-400"
                      }
                      
                    `}
                  >
                    <input
                      type="radio"
                      value={option.value}
                      checked={selectedTransferShipment === option.value}
                      onChange={() => {
                        setSelectedTransferShipment(option.value);
                        setUser({ ...user, typeOfShipment: option.value }); // <--- add this line
                      }}
                      className="sr-only"
                      name="accountType"
                    />
                    <p className="font-medium text-xs">{option.label}</p>
                    <p
                      className={`text-[10px]  ${
                        option.label2 === "Sprawdź gdzie nadać przesyłkę"
                          ? "text-black font-semibold yellow-underline2"
                          : "text-gray-400"
                      }`}
                    >
                      {option.label2}
                    </p>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-start mb-2 mt-10">
            <input
              type="checkbox"
              id="regulation"
              className="w-7 h-7 accent-yellow-400 border-gray-400 mr-2"
            />
            <label
              htmlFor="regulation"
              className="text-gray-700 text-xs select-none leading-snug"
            >
              <p className="text-[10px]">
                Oświadczam, że zapoznałem/am się i akceptuję aktualny{" "}
                <span className="yellow-underline3 text-[9px]">
                  Regulamin świadczenia usługi Paczkomat® 24/7 przez InPost Sp.
                  z o.o.
                </span>{" "}
                , a w przypadku przesyłek nadawanych w ramach usługi Allegro
                Paczkomat® 24/7, także{" "}
                <span className="yellow-underline3 text-[9px]">
                  Regulamin świadczenia usługi „Allegro Paczkomat® InPost”
                  świadczonej przez InPost Sp. z o.o
                </span>
                . Oświadczenie nie dotyczy przesyłek nadawanych przez Allegro.pl
                sp. z o.o. w ramach Allegro Smart, przy czym jeżeli przy
                zlecaniu usług doręczenia przesyłek w ramach Allegro Smart!
                zamawiam usługę odbioru przesyłek przez kuriera, oświadczam, że
                zapoznałem/am się i akceptuję aktualny{" "}
                <span className="yellow-underline3 text-[9px]">
                  Regulamin świadczenia Usług odbioru przesyłek przez kuriera
                  InPost w ramach Allegro Smart! przez InPost Sp. z o.o
                </span>
                . Administratorem danych osobowych nadawców przesyłek do
                automatu Paczkomat® jest InPost sp. z o.o. z siedzibą w Krakowie
                przy ul. Pana Tadeusza 4, 30-727 Kraków, nr KRS: 0000543759.
                Zasady przetwarzania danych osobowych określa{" "}
                <span className="yellow-underline3 text-[9px]">
                  Polityka prywatności.
                </span>
              </p>
            </label>
          </div>
          <div className="w-full border-b-1 border-gray-300 mt-10"></div>

          <div className="flex flex-col lg:flex-row justify-between gap-5 w-full mt-10">
            <div className="bg-white lg:w-1/2 p-3 flex flex-col gap-3">
              <div className="flex justify-between  ">
                <p className="text-black text-sm font-semibold">
                  Koszt przesyłki
                </p>
                <p className="text-black text-sm font-semibold">0,00 zł</p>
              </div>

              <div className="flex justify-between  ">
                <p className="text-gray-400 text-[10px] font-medium">
                  Dostępne środki
                </p>
                <p className="text-gray-400 text-[10px] font-medium">0,00 zł</p>
              </div>
            </div>

            <div className="bg-white lg:w-1/2 p-3 flex flex-col gap-3">
              <div className="flex justify-between gap-2">
                <p className="text-black text-sm font-semibold">
                  Koszt nadania
                </p>
                <p className="text-black text-sm font-semibold">0,00 zł</p>
              </div>

              <div className="flex justify-start gap-3 ">
                <p className="text-gray-400 text-[10px] font-medium">
                  Zasady naliczania opłat za nadanie przesyłki kurierem
                </p>
                <Image src="/info.svg" height={15} width={15} alt="info"/>
              </div>
            </div>
          </div>

          <button
            onClick={onSubmit}
            className="bg-[#FCC905] w-full lg:w-1/2 mx-auto hover:opacity-70 mt-10 mb-5 text-zinc-800  py-2 text-sm rounded-md font-semibold cursor-pointer"
          >
            Opłać
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
