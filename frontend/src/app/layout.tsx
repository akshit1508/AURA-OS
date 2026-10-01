import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import AuraAssistant from "@/components/aura/AuraAssistant";
import { AuraContextProvider } from "@/context/AuraContext";

export const metadata: Metadata = {
  title: "AURA OS",
  description: "AI Portfolio",
};

export default function RootLayer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuraContextProvider>
          <Navbar />
          {children}
          <AuraAssistant />
        </AuraContextProvider>
      </body>
    </html>
  );
}