"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";


export default function Footer() {
    return (
        <>
        <div className="bg-[#191919] w-full p-5 flex justify-center pt-10">
                <div className="flex flex-col items-start justify-center">
                    <ul className="flex gap-3 items-center justify-center flex-wrap">
                        <li className="text-white text-xs hover:opacity-70">
                            <a href="#">InPost</a>
                        </li>
                        <li className="text-white text-xs hover:opacity-70">
                            <a href="#">FAQ</a>
                        </li>
                        <li className="text-white text-xs hover:opacity-70">
                            <a href="#">Cenniki i regulaminy</a>
                        </li>
                        <li className="text-white text-xs hover:opacity-70">
                            <a href="#">Polityka prywatności</a>
                        </li>
                        <li className="text-white text-xs hover:opacity-70">
                            <a href="#">Polityka cookies</a>
                        </li>
                        <li className="text-white text-xs hover:opacity-70">
                            <a href="#">Pomoc Allegro InPost</a>
                        </li>
                        <li className="text-white text-xs hover:opacity-70">
                            <a href="#">Kontakt</a>
                        </li>
                    </ul>
                    <p className="text-xs mt-5 text-zinc-400">© 2025 INPOST. DESIGNED BY 1000IDEAS. CREATED BY EVL.PL</p>
                </div>
        </div>
        </>
    )
}