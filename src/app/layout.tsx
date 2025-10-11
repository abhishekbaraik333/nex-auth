import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Poppins } from "next/font/google";
import "./globals.css";


const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500',"600", '700'], // Add weights you need
  variable: '--font-montserrat'
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500',"600", '700'], // Add weights you need
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: "InPost - Manager paczek",
  description: "Dzięki Managerowi Paczek możesz: nadawać paczki☑, pobrać etykiety☑, przeglądać archiwum☑ oraz śledzić swoje przesyłki☑. Wszystko w jednym miejscu!!!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${poppins.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
