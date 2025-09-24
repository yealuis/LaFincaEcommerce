import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from '@vercel/analytics/next';
config.autoAddCss = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "La Finca Productos y Servicios Agropecuarios C.A.",
  description: "Productos y Servicios Agropecuarios",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      suppressHydrationWarning="true"
      data-lt-installed="true">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header>
          <Navbar/>
        </header>
        {children}
        <SpeedInsights/>
        <Analytics/>
        <Footer/>
      </body>
    </html>
  );
}
