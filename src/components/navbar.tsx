"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {!menuOpen && (
        <nav className="w-full lg:px-[10%] px-4 pt-2 pb-10 lg:pb-0 flex items-center justify-between bg-white bg-opacity-70 fixed top-0 left-0 z-50 shadow-xl">
          {/* Logo */}
          <div className="flex items-center gap-10">
            <div className="text-2xl font-semibold text-white">
              <Image
                src="/inpost-logo.svg"
                alt="Logo"
                className="lg:w-[150px] w-[100px]"
                width={150}
                height={40}
              />
            </div>
            <div className="flex-col gap-10 hidden lg:flex">
              <div className="flex items-center gap-5">
                <a href="#" className="flex items-center gap-2">
                  {" "}
                  <span>
                    <svg
                      className="w-2 h-2"
                      fill="#ffc000"
                      viewBox="-64 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M365.52 209.85L59.22 67.01c-16.06-7.49-35.15-.54-42.64 15.52L3.01 111.61c-7.49 16.06-.54 35.15 15.52 42.64L236.96 256.1 18.49 357.99C2.47 365.46-4.46 384.5 3.01 400.52l13.52 29C24 445.54 43.04 452.47 59.06 445l306.47-142.91a32.003 32.003 0 0 0 18.48-29v-34.23c-.01-12.45-7.21-23.76-18.49-29.01z"></path>
                      </g>
                    </svg>
                  </span>
                  <span className="text-black opacity-80 hover:text-[#ffc000]">
                    Dia Ciebie
                  </span>
                </a>
                <a href="#" className="flex items-center gap-2">
                  {" "}
                  <span>
                    <svg
                      className="w-2 h-2"
                      fill="#ffc000"
                      viewBox="-64 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M365.52 209.85L59.22 67.01c-16.06-7.49-35.15-.54-42.64 15.52L3.01 111.61c-7.49 16.06-.54 35.15 15.52 42.64L236.96 256.1 18.49 357.99C2.47 365.46-4.46 384.5 3.01 400.52l13.52 29C24 445.54 43.04 452.47 59.06 445l306.47-142.91a32.003 32.003 0 0 0 18.48-29v-34.23c-.01-12.45-7.21-23.76-18.49-29.01z"></path>
                      </g>
                    </svg>
                  </span>
                  <span className="text-black opacity-80 hover:text-[#ffc000]">
                    Dia Firm
                  </span>
                </a>
                <a href="#" className="flex items-center gap-2">
                  {" "}
                  <span>
                    <svg
                      className="w-3 h-3 scale-x-[-1]"
                      fill="none"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                          stroke="#ffc000"
                          stroke-width="3"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  </span>
                  <span className="text-black opacity-80 hover:text-[#ffc000]">
                    {" "}
                    Znajdź przesyłkę{" "}
                  </span>
                </a>
                <a href="#" className="flex items-center gap-2">
                  {" "}
                  <span>
                    <svg
                      className="w-3 h-3 scale-x-[-1]"
                      fill="none"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                          stroke="#ffc000"
                          stroke-width="3"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  </span>
                  <span className="text-black opacity-80 hover:text-[#ffc000]">
                    Sprawdź godziny nadania
                  </span>
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="text-xl border-l-1 pl-4 border-zinc-400 text-black hover:text-[#ffc000] opacity-80 uppercase"
                >
                  Jak to działa
                </a>
                <a
                  href="#"
                  className="text-xl border-l-1 pl-4 ml-4 border-zinc-400 text-black hover:text-[#ffc000] opacity-80 uppercase"
                >
                  Znajdź Paczkomat®
                </a>
              </div>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex flex-col items-center gap-2">
            <Link href="/login" className="btn-primary text-sm">
              LOGOWANIE
            </Link>
            <Link
              href="/signup"
              className="underline text-black opacity-70 text-xs"
            >
              Rejestracja
            </Link>
          </div>

          <div className="flex flex-row-reverse items-center gap-4 lg:hidden">
            {/* Hamburger Button */}
            <button
              className="flex flex-col lg:hidden justify-center items-center space-y-1 outline-none"
              aria-label="Open Menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="block w-6 h-[3px] bg-black rounded"></span>
              <span className="block w-6 h-[3px] bg-black rounded"></span>
              <span className="block w-6 h-[3px] bg-black rounded"></span>
            </button>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#000"
              stroke="#000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-message-square-icon lucide-message-square"
            >
              <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#000"
              stroke="#000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-phone-icon lucide-phone"
            >
              <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
            </svg>
          </div>
        </nav>
      )}

      {/* Overlay Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black opacity-90 bg-opacity-90 flex flex-col items-start px-4 justify-start z-50 transition-all duration-300">
          <div className="flex items-center justify-between w-full">
            <Image
              src="/inpost-logo-white.svg"
              alt="Logo"
              className="lg:w-[150px] w-[100px] pt-2"
              width={150}
              height={40}
            />
            <div className="flex items-center gap-3">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#fff"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-phone-icon lucide-phone"
              >
                <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#fff"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-message-square-icon lucide-message-square"
              >
                <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
              </svg>
              <button
                className=" text-white text-3xl flex flex-col gap-1"
                aria-label="Close Menu"
                onClick={() => setMenuOpen(false)}
              >
                <span className="block w-6 h-[3px] bg-white rounded"></span>
                <span className="block w-6 h-[3px] bg-white rounded"></span>
                <span className="block w-6 h-[3px] bg-white rounded"></span>
              </button>
            </div>
          </div>
          <nav className="flex flex-col gap-8 mt-10 w-full">
            <div className="flex flex-col items-start gap-2">
              <a href="#" className="flex items-center gap-2">
                {" "}
                <span>
                  <svg
                    className="w-2 h-2"
                    fill="#fff"
                    viewBox="-64 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M365.52 209.85L59.22 67.01c-16.06-7.49-35.15-.54-42.64 15.52L3.01 111.61c-7.49 16.06-.54 35.15 15.52 42.64L236.96 256.1 18.49 357.99C2.47 365.46-4.46 384.5 3.01 400.52l13.52 29C24 445.54 43.04 452.47 59.06 445l306.47-142.91a32.003 32.003 0 0 0 18.48-29v-34.23c-.01-12.45-7.21-23.76-18.49-29.01z"></path>
                    </g>
                  </svg>
                </span>
                <span className="text-white opacity-80 hover:text-[#ffc000]">
                  Dia Ciebie
                </span>
              </a>
              <a href="#" className="flex items-center gap-2">
                {" "}
                <span>
                  <svg
                    className="w-2 h-2"
                    fill="#fff"
                    viewBox="-64 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M365.52 209.85L59.22 67.01c-16.06-7.49-35.15-.54-42.64 15.52L3.01 111.61c-7.49 16.06-.54 35.15 15.52 42.64L236.96 256.1 18.49 357.99C2.47 365.46-4.46 384.5 3.01 400.52l13.52 29C24 445.54 43.04 452.47 59.06 445l306.47-142.91a32.003 32.003 0 0 0 18.48-29v-34.23c-.01-12.45-7.21-23.76-18.49-29.01z"></path>
                    </g>
                  </svg>
                </span>
                <span className="text-white opacity-80 hover:text-[#ffc000]">
                  Dia Firm
                </span>
              </a>
              <a href="#" className="flex items-center gap-2">
                {" "}
                <span>
                  <svg
                    className="w-2 h-2"
                    fill="#fff"
                    viewBox="-64 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M365.52 209.85L59.22 67.01c-16.06-7.49-35.15-.54-42.64 15.52L3.01 111.61c-7.49 16.06-.54 35.15 15.52 42.64L236.96 256.1 18.49 357.99C2.47 365.46-4.46 384.5 3.01 400.52l13.52 29C24 445.54 43.04 452.47 59.06 445l306.47-142.91a32.003 32.003 0 0 0 18.48-29v-34.23c-.01-12.45-7.21-23.76-18.49-29.01z"></path>
                    </g>
                  </svg>
                </span>
                <span className="text-white opacity-80 hover:text-[#ffc000]">
                  {" "}
                  Znajdź przesyłkę{" "}
                </span>
              </a>
              <a href="#" className="flex items-center gap-2">
                {" "}
                <span>
                  <svg
                    className="w-2 h-2"
                    fill="#fff"
                    viewBox="-64 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M365.52 209.85L59.22 67.01c-16.06-7.49-35.15-.54-42.64 15.52L3.01 111.61c-7.49 16.06-.54 35.15 15.52 42.64L236.96 256.1 18.49 357.99C2.47 365.46-4.46 384.5 3.01 400.52l13.52 29C24 445.54 43.04 452.47 59.06 445l306.47-142.91a32.003 32.003 0 0 0 18.48-29v-34.23c-.01-12.45-7.21-23.76-18.49-29.01z"></path>
                    </g>
                  </svg>
                </span>
                <span className="text-white opacity-80 hover:text-[#ffc000]">
                  Sprawdź godziny nadania
                </span>
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="#"
                className="text-base  text-white hover:text-[#ffc000] opacity-80 uppercase"
              >
                Jak to działa
              </a>
              <a
                href="#"
                className="text-base  text-white hover:text-[#ffc000] opacity-80 uppercase"
              >
                Znajdź Paczkomat®
              </a>
            </div>

            <div className="lg:hidden flex flex-col items-center gap-2 w-full">
              <Link
                href="/login"
                className="bg-[#ffcb04] text-black text-base font-[500]  w-full p-2 flex items-center justify-between"
              >
                <span>LOGOWANIE</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-log-out-icon lucide-log-out"
                >
                  <path d="m16 17 5-5-5-5" />
                  <path d="M21 12H9" />
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                </svg>
              </Link>
              <Link
                href="/signup"
                className="bg-[#ffcb04] text-black text-base font-[500]  w-full p-2 flex items-center justify-between"
              >
                <span>REJESTRACJA</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-log-out-icon lucide-log-out"
                >
                  <path d="m16 17 5-5-5-5" />
                  <path d="M21 12H9" />
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                </svg>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
