import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import AuthDrawer from "./components/AuthDrawer";
import SearchDrawer from "./components/SearchDrawer";
import UserWrapper from "./components/UserWrapper";

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
        <NavBar>
          <UserWrapper />
        </NavBar>
        <AuthDrawer />
        <SearchDrawer />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
