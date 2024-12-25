"use client";

import { Geist, Geist_Mono, Raleway } from "next/font/google";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});
const Body = ({ children }: { children: Readonly<React.ReactNode> }) => {
  const pathname = usePathname();
  return (
    <body
      className={`${raleway.variable} antialiased ${
        pathname === "/" ? "bg-[#111111] text-white" : "bg-white text-[#111111]"
      }`}
    >
      {children}
    </body>
  );
};

export default Body;
