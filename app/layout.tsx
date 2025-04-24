import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/sections/Header";
import Footer from "@/app/sections/Footer";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import { PartyModeProvider } from "@/app/context/PartyModeContext";
import PartyMode from "@/app/components/PartyMode";
import Providers from "@/app/components/Providers";

export const metadata: Metadata = {
  title: "Kea Logic",
  description: "Modern web solutions for forward-thinking businesses",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="flex min-h-screen flex-col bg-background font-primary">
        <Providers>
          <ThemeProvider>
            <PartyModeProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <PartyMode />
            </PartyModeProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
