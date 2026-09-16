import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, EB_Garamond } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-literary",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://betweenthequiet.com"),
  title: {
    default: "Between the Quiet",
    template: "%s · Between the Quiet",
  },
  description: "Stories for the places darkness lingers.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    title: "Between the Quiet",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "Between the Quiet",
    description: "Stories for the places darkness lingers.",
    type: "website",
    siteName: "Between the Quiet",
  },
  twitter: {
    card: "summary_large_image",
    title: "Between the Quiet",
    description: "Stories for the places darkness lingers.",
  },
};

export const viewport: Viewport = {
  themeColor: "#08090a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-ink-950 text-ivory-100 antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
