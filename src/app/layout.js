import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${inter.variable}`}
      >
        {children}
      </body>
    </html>
  );
}