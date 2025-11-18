import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from 'next/font/google'; // <-- 1. IMPORT POPPINS
import "./globals.css";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Sesuaikan bobot yang ingin dimuat
  variable: '--font-poppins', // Opsional: untuk penggunaan Tailwind/CSS Variables
});

export const metadata: Metadata = {
  title: "Perayaan 2 Tahun Kita | Khoirudin & Almira",
  description: "Selamat ulang tahun ke-2! Halaman spesial ini berisi kenangan terindah dan kejutan manis untuk perayaan 2 tahun cinta kita.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
