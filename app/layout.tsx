import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/sections/Header";
import Footer from "@/app/sections/Footer";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import ModeButtons from "@/app/components/ModeButtons";
import HeroBeams from "@/app/components/HeroBeams";
import { PartyModeProvider } from "@/app/context/PartyModeContext";
import PartyMode from "@/app/components/PartyMode";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const metadata: Metadata = {
  title: "Kea Logic",
  description: "Modern web solutions for forward-thinking businesses",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en" suppressHydrationWarning>
        <body className="flex min-h-screen flex-col bg-background font-primary">
          <ThemeProvider>
            <PartyModeProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <PartyMode />
            </PartyModeProvider>
          </ThemeProvider>
        </body>
      </html>
    </QueryClientProvider>
  );
}
