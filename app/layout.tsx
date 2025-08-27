import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// FIX: Import `ReactNode` to resolve the "Cannot find namespace 'React'" error.
import type { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Todo App",
  description: "Todo app con Next.js y Vercel Postgres",
};

export default function RootLayout({
  children,
}: Readonly<{
  // FIX: Use the imported `ReactNode` type.
  children: ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-slate-100 text-slate-800`}>
        {children}
      </body>
    </html>
  );
}
