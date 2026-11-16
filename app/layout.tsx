import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adin Prasetya | Portfolio",
  description:
    "Portfolio Adin Prasetya, mahasiswa Ilmu Komputer dan developer yang tertarik pada web, mobile, database, dan teknologi digital.",
  verification: {
    google: "1ArtRZzK5Yk0qQjghkqzBvgqs2KrFYvB_VaKN1LHwqs",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${geistSans.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
