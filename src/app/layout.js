import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Curiosos Co",
  description:
    "Tienda de regalos, piñatería y decoración. Detalles, anchetas, desayunos sorpresa, organización de eventos y más.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
