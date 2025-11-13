import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { bricolageGrotesque } from "@/fonts";
import "@/styles/globals.css";
import { SidebarProvider } from "./_components/SidebarContext";
import LayoutClient from "./_components/LayoutClient";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SEO Panel",
  description: "Công cụ quản trị SEO & nội dung",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body
        className={cn(
          bricolageGrotesque.variable,
          geistSans.variable,
          geistMono.variable,
          "antialiased bg-gray-50"
        )}
      >
        <SidebarProvider>
          <LayoutClient>{children}</LayoutClient>
        </SidebarProvider>
      </body>
    </html>
  );
}
