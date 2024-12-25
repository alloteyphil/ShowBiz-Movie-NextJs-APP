import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import NavBar from "./components/NavBar";
import Body from "./components/Body";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "ShowBiz",
  description: "Movie/TV Show Streaming App",
};

export default function RootLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <html lang="en">
      <Body>
        <NavBar />
        {children}
        <Footer />
        <Toaster />
      </Body>
    </html>
  );
}
