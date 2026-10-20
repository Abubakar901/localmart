import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LocalMart",
  description: "Shop from stores in your Neighbourhood",
};

export default function RootLayout({
  children,
  fullWidth
}: Readonly<{
  children: React.ReactNode;
  fullWidth?: boolean;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SessionProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: "items-start",
            }}
          />
        </SessionProvider>
      </body>
    </html>
  );
}
