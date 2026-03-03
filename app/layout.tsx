import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { Toaster } from "sonner";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: {
    default: "Tes Cleaning | Commercial & Residential Cleaning Miami Lakes",
    template: "%s | Tes Cleaning"
  },
  description: "Professional cleaning services in Miami Lakes & South Florida. Specializing in commercial offices, residential homes, post-construction, and floor care. Licensed & Insured.",
  keywords: ["cleaning services", "miami lakes", "commercial cleaning", "residential cleaning", "janitorial services", "office cleaning", "florida"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tescleans.com",
    title: "Tes Cleaning | Commercial & Residential Cleaning Miami Lakes",
    description: "Professional cleaning services in Miami Lakes & South Florida. Licensed & Insured.",
    siteName: "Tes Cleaning",
    images: [
      {
        url: "/assets/logo-new.png",
        width: 800,
        height: 600,
        alt: "Tes Cleaning Logo",
      },
    ],
  },
  icons: {
    icon: "/assets/logo-new.png",
    shortcut: "/assets/logo-new.png",
    apple: "/assets/logo-new.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={`${outfit.variable} antialiased`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
