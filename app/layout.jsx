import { Inter } from "next/font/google";
import "./globals.css";
import LayoutClient from "./layoutClient";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  // variable: "--font-inter",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata = {
  title: "Thirdweb.studio-post",
  description: "Post",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={`${inter.className} antialiased bg-black`}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
