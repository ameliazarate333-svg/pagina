import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, Jost } from "next/font/google";
import "./globals.css";
import "./account.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AZ · Amelia Zárate — Atelier de Alta Costura",
  description:
    "AZ · Amelia Zárate. Alta costura y confección a medida. Vestidos hechos a mano con precisión y oficio.",
  metadataBase: new URL("https://azameliazarate.com"),
  keywords: [
    "modista", "alta costura", "confección a medida", "vestidos a medida",
    "atelier", "Amelia Zárate", "AZ", "costura Colombia", "vestidos de gala",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "AZ · Amelia Zárate — Atelier de Alta Costura",
    description: "Alta costura y confección a medida, hecha a mano.",
    type: "website",
    locale: "es_CO",
    siteName: "AZ · Amelia Zárate",
  },
  twitter: {
    card: "summary_large_image",
    title: "AZ · Amelia Zárate — Atelier de Alta Costura",
    description: "Alta costura y confección a medida, hecha a mano.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${cormorant.variable} ${playfair.variable} ${jost.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
