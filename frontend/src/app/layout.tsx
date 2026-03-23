import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { PortfolioProvider } from "./portfolio-store";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yewon Jang | Research Portfolio",
  description:
    "Research portfolio for Yewon Jang, featuring projects, publications, background, and contact information.",
  metadataBase: new URL("https://yewon.duckdns.org"),
  icons: {
    icon: [
      { url: "/icon?v=3", type: "image/png" },
    ],
    shortcut: "/icon?v=3",
    apple: "/apple-icon.svg?v=3",
  },
  openGraph: {
    title: "Yewon Jang | Research Portfolio",
    description:
      "Research portfolio for Yewon Jang, featuring projects, publications, background, and contact information.",
    url: "https://yewon.duckdns.org",
    siteName: "Yewon Jang | Research Portfolio",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Yewon Jang research portfolio preview",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yewon Jang | Research Portfolio",
    description:
      "Research portfolio for Yewon Jang, featuring projects, publications, background, and contact information.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={manrope.variable}>
      <body>
        <PortfolioProvider>{children}</PortfolioProvider>
      </body>
    </html>
  );
}
