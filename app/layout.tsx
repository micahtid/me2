import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import ModalProvider from "@/providers/ModalProvider";
import { DataContextProvider } from "@/providers/DataProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Me2",
  description: "The chat app for students by students. Through an algorithm based sorting, users are matched with others with similar interests they can chat with.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DataContextProvider>
          {children}
          <ModalProvider />
        </DataContextProvider>
      </body>
    </html>
  );
}
