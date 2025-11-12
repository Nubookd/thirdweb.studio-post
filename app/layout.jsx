import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  // variable: "--font-inter",
});

export const metadata = {
  title: "Thirdweb.studio-post",
  description: "Post",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={`${inter.className} antialiased bg-black`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
