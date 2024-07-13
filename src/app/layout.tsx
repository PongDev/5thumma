import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

const kanit = Kanit({ weight: ["400", "500", "700"], subsets: ["thai"] });

export const metadata: Metadata = {
  title: "หาธรรมะ",
  description: "เบื่อบ้านเบื่อเมืองแบบนี้ มาหาอะไรทำมะ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={kanit.className}>{children}</body>
    </html>
  );
}
