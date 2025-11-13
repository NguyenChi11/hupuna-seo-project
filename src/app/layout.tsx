import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { bricolageGrotesque, philosopher } from "@/fonts";
import "@/styles/globals.css";

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
        className={`${bricolageGrotesque.variable} ${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        {/* Main content chừa không gian cho sidebar */}
        <main className="">{children}</main>
      </body>
    </html>
  );
}
