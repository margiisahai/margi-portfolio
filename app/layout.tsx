import type { Metadata } from "next";
import { Inter, DM_Sans, Bebas_Neue } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";

const inter = Inter({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Margi Sahai — Product Designer",
  description:
    "Product designer crafting thoughtful digital experiences through UX research, UI design, and systems thinking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable} ${bebasNeue.variable}`}>
      <body className="antialiased" style={{ cursor: "none" }}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
