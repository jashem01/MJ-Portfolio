import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import React from "react";
import SmoothScrollProvider from "@/components/common/SmoothScrollProvider";
import Scene3D from "@/components/3d/Scene3D";
import ScrollProgressBar from "@/components/motion/ScrollProgressBar";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohammed Jashem | Frontend Developer",
  description: "Frontend Developer specializing in React.js, building scalable and user-focused web applications.",
  keywords: [
    "Mohammed Jashem",
    "Frontend Developer",
    "React Developer",
    "Next.js",
    "JavaScript",
    "Portfolio",
  ],
  authors: [
    {
      name: "Mohammed Jashem",
    },
  ],
  openGraph: {
    title: "Mohammed Jashem | Frontend Developer",
    description: "Frontend Developer specializing in React.js.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body className="font-body antialiased bg-bg text-text-primary selection:bg-accent/30 selection:text-white">
        <SmoothScrollProvider>
          <ScrollProgressBar />
          <Scene3D />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
