"use client";

import React, { useContext } from "react";
import { ModeProvider, useMode } from "./modecontext";
import { Geist, Geist_Mono } from "next/font/google";
import { Navigation } from "@/app/navigation";
import { Footer } from "@/app/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModeProvider>
      <html lang="en">
        <BodyContent>{children}</BodyContent>
      </html>
    </ModeProvider>
  );
}

const BodyContent = ({ children }: { children: React.ReactNode }) => {
  // Using useMode inside the body to access mode
  const { mode } = useMode();

  return (
    <body
      className={`${geistSans.variable} ${
        geistMono.variable
      }bg-[rgba(0,0,0,0.5)] antialiased w-screen h-[100%] flex flex-col ${
        mode ? "bg-white" : "bg-black"
      }`}>
      <Navigation />
      {children}
      <Footer />
    </body>
  );
};
