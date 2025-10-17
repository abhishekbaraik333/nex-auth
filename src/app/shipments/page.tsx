"use client";
import NavAuth from "@/components/navAuth";
import Footer from "@/components/footer";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

type ShipmentType = {
  _id: string;
  Paid: boolean;
  Status: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  methodOfAssignment: string;
  pickupMethod: string;
  recipient: string;
  shipmentNumber: string;
  shipmentSize: string;
  shipmentType: string;
  shipmentIndex: string;
  __v?: number;
};

export default function Shipments() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [shipment, setShipment] = useState<ShipmentType[]>([]);

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

  const fetchShipments = async (email: string | null) => {
    if (!email) return; // Early exit if email is null

    try {
      const response = await fetch(`/api/users/shipments?email=${email}`);

      const data = await response.json();
      console.log(data);

      if (data.success === true) {
        console.log("Shipments:", data.shipments);
        setShipment(data.shipments);
        console.log(shipment);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios errors safely
        console.error(
          "Fetching shipments failed:",
          error.response?.data || error.message
        );
      } else if (error instanceof Error) {
        // Handle generic JS errors
        console.error("process failed:", error.message);
      } else {
        console.error("An unexpected error occurred during fetching shipments");
      }
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // If open and click target is not inside the menu or button, close dropdown
      if (
        open &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) setUser({ ...user, email: email });
    fetchShipments(email);
  }, []);

  useEffect(() => {
    console.log("Current shipment state (after update):", shipment);
  }, [shipment]);

  // Place this utility function at the top of your file:
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const localDate = date.toLocaleDateString();
    const localTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return `${localDate} ${localTime}`;
  }

  return (
    <>
      <div className="shipments-page flex flex-col mb-0 pb-0 items-center justify-center py-2 px-4 lg:px-0 mt-32 lg:mt-20 w-full">
        <NavAuth />

        <div className="flex items-start max-w-5xl mt-[10rem]">
          <div>
            <Image
              src="/niesmialy_2.svg"
              width={50}
              height={50}
              className="min-w-[60px]"
              alt="inpost"
            ></Image>
          </div>
          <div className="bg-[#404041] p-2 font-semibold text-sm">
            You can also view Allegro InPost: Kurier24, Paczkomat® 24/7 and
            miniKurier24 in the shipment list - check the appropriate box in the
            &quot;Passage type&quot; option
          </div>
        </div>

        <div className="w-full max-w-5xl mx-auto mt-8 shadow mb-[15rem]">
          <table className="w-full">
            <thead>
              <tr className="shipments-table text-gray-800 text-[10px] text-wrap">
                <th className="py-3 px-2"></th>
                <th className="py-3 px-2 font-semibold hidden lg:table-cell ">Ip</th>
                <th className="py-3 px-2 font-semibold hidden lg:table-cell ">Shipment number</th>
                <th className="py-3 px-2 font-semibold">Creation date</th>
                <th className="py-3 px-2 font-semibold hidden lg:table-cell">Shipment type</th>
                <th className="py-3 px-2 font-semibold hidden lg:table-cell ">
                  Method of assignment
                </th>
                <th className="py-3 px-2 font-semibold hidden lg:table-cell ">Shipment size</th>
                <th className="py-3 px-2 font-semibold">Recipient</th>
                <th className="py-3 px-2 font-semibold hidden lg:table-cell ">Pickup method</th>
                <th className="py-3 px-2 font-semibold">Status</th>
                <th className="py-3 px-2 font-semibold hidden lg:table-cell ">
                  Date of last change in status
                </th>
                <th className="py-3 px-2 font-semibold">Shares</th>
              </tr>
            </thead>
            <tbody>
              {shipment.map((item, idx) => (
                <tr
                  key={item._id || idx}
                  className="bg-white border-b border-gray-400 text-[10px] text-black"
                >
                  <td className="py-3 px-2">
                    <input type="checkbox" />
                  </td>
                  <td className="py-3 px-2 hidden lg:table-cell">{item.shipmentIndex}</td>
                  <td className="py-3 px-2 hidden lg:table-cell">{item.shipmentNumber}</td>
                  <td className="py-3 px-2">{formatDate(item.createdAt)}</td>
                  <td className="py-3 px-2 hidden lg:flex items-center flex-col justify-center">
                    <span className="mr-2">
                      <div className="relative flex items-center group w-fit">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#414140"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-box-icon lucide-box"
                        >
                          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                          <path d="m3.3 7 8.7 5 8.7-5" />
                          <path d="M12 22V12" />
                        </svg>
                        <span
                          className="
    absolute left-1/2 bottom-[130%] -translate-x-1/2
    min-w-[130px] whitespace-nowrap bg-black text-gray-100 text-[10px] text-center px-5 py-2 rounded
    opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none
    transition-opacity duration-150 z-30 shadow-lg
  "
                        >
                          {item.methodOfAssignment}
                          <span className="tooltip-arrow"></span>
                        </span>
                      </div>
                    </span>
                    {item.shipmentType}
                  </td>
                  <td className="py-3 px-2 text-center hidden lg:table-cell ">{item.pickupMethod}</td>
                  <td className="py-3 px-2 hidden lg:table-cell">
                    <select
                      className="border border-gray-400 rounded px-2 py-1 text-sm"
                      defaultValue={item.shipmentSize}
                    >
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                    </select>
                  </td>
                  <td className="py-3 px-2" >{item.recipient}</td>
                  <td className="py-3 px-2 hidden lg:table-cell">
                    <div className="rounded flex justify-center">
                      <div className="relative flex items-center flex-col justify-center group w-fit">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-calendar-days-icon lucide-calendar-days"
                        >
                          <path d="M8 2v4" />
                          <path d="M16 2v4" />
                          <rect width="18" height="18" x="3" y="4" rx="2" />
                          <path d="M3 10h18" />
                          <path d="M8 14h.01" />
                          <path d="M12 14h.01" />
                          <path d="M16 14h.01" />
                          <path d="M8 18h.01" />
                          <path d="M12 18h.01" />
                          <path d="M16 18h.01" />
                        </svg>
                        <span
                          className="
    absolute left-1/2 bottom-[130%] -translate-x-1/2
    min-w-[130px] whitespace-nowrap bg-black text-gray-100 text-[10px] text-center px-5 py-2 rounded
    opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none
    transition-opacity duration-150 z-30 shadow-lg
  "
                        >
                          {item.pickupMethod}
                          <span className="tooltip-arrow"></span>
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2">{item.Status}</td>
                  <td className="py-3 px-2 hidden lg:table-cell">{formatDate(item.updatedAt)}</td>

                  <td className="py-3 px-2">
                    <div className="relative flex items-center justify-end h-8">
                      {/* Dropdown Button */}
                      <button
                        className="bg-yellow-400 rounded-md px-2 py-2 border border-gray-300 focus:outline-none"
                        onClick={() => setOpen((prev) => !prev)}
                        aria-label="Dropdown"
                        ref={buttonRef}
                      >
                        <span className="inline-block text-[7px] font-bold">
                          ▼
                        </span>
                      </button>

                      {/* Popup menu (left aligned to button) */}
                      {open && (
                        <div
                          ref={menuRef}
                          className="
          absolute right-6 top-1
          border border-gray-300
          min-w-[160px]
          bg-white rounded-md
          py-2
          flex flex-col
          z-40
        "
                        >
                          <button className="cursor-pointer flex items-center justify-center gap-2 py-2 text-gray-900 hover:bg-gray-300  transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-credit-card-icon lucide-credit-card"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                            <span className="text-sm"> Opłać </span>
                          </button>
                          <button className="cursor-pointer flex items-center justify-center gap-2 py-2 text-gray-900 hover:bg-gray-300 transition">
                            {/* Cancel Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-ban-icon lucide-ban"><path d="M4.929 4.929 19.07 19.071"/><circle cx="12" cy="12" r="10"/></svg>
                            <span className="text-sm">Anuluj</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        <Footer />
    </>
  );
}
