import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import { Analytics } from "@vercel/analytics/react";
import NextTopLoader from "nextjs-toploader";
import UserWrapper from "./components/user/UserWrapper";
import AuthDrawer from "./components/auth/AuthDrawer";
import SearchDrawer from "./components/search/SearchDrawer";
import MobileSideBar from "./components/mobile/MobileSideBar";
import MobileNavbar from "./components/mobile/MobileNavbar";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShowBiz",
  description: "Movie/TV Show Streaming App",
};

export default async function RootLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} antialiased bg-[#111111] relative`}>
        <NextTopLoader showSpinner={false} color="#ffffff" />
        <Analytics />
        <NavBar>
          <UserWrapper />
        </NavBar>
        <MobileNavbar />
        <AuthDrawer />
        <SearchDrawer />
        <MobileSideBar />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
