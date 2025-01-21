import type { Metadata } from "next";
import { Geist, Geist_Mono, Raleway } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import AuthDrawer from "./components/AuthDrawer";
import SearchDrawer from "./components/SearchDrawer";

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

export const metadata: Metadata = {
  title: "ShowBiz",
  description: "Movie/TV Show Streaming App",
};

export default function RootLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const noFooterRoutes = ["/profile"];

  return (
    <html lang="en">
      <body className={`${raleway.variable} antialiased bg-[#111111] relative`}>
        <NavBar />
        <AuthDrawer />
        <SearchDrawer />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
