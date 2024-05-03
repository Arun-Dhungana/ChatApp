import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ThemeProvider from "./ThemeProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatApp",
  description: "Live chat made using streak and clerk.",
  metadataBase: new URL("/https://chatapp-five-black.vercel.app/"),
  openGraph: {
    images: {
      url: "https://chatapp-five-black.vercel.app/opengraph-image.jpg",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider>
            <main>{children}</main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
