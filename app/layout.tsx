"use client";

import "./globals.css";
import Head from "next/head";
import Navbar2 from "@/components/common/Navbar2";
import Footer from "@/components/common/Footer";
import Sidebar from "@/components/common/Sidebar";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider"

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

// export const metadata = {
//   metadataBase: new URL(defaultUrl),
//   title: "Scripture",
//   description: "The best online bible learning platform.",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();
  const isHomePage = pathname === "/";
  
  return (
    <html lang="en">
        <head>
          <title>Scripture</title>
        </head>
        <body className="antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar2 />

            {/* Main layout container */}
            <div
              className={`flex ${isHomePage ? "lg:max-h-[100vh] md:max-h-[100vh]" : ""}`}
            >
              <Sidebar />
              <main className="flex-grow">{children}</main>
            </div>

            {/* Footer (Hidden on home page) */}
            {!isHomePage && <Footer />}
          </ThemeProvider>
        </body>
      </html>
  );
}