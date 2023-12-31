import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";
import QueryProvider from "@/providers/query-provider";
import { Toaster } from "react-hot-toast";
import { ModalProvider } from "@/providers/modal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider>
        <body className={cn("antialiased scroll-smooth", inter.className)}>
          {/* <Providers> */}
          <ThemeProvider attribute="class" defaultTheme="dark">
            <QueryProvider>
              <Toaster />
              <ModalProvider />
              {children}
            </QueryProvider>
          </ThemeProvider>
          {/* </Providers> */}
        </body>
      </ClerkProvider>
    </html>
  );
}
