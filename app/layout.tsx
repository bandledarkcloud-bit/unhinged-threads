import type { Metadata } from "next";
import { Geist_Mono, Bebas_Neue, Anton, Oswald } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Footer from "./components/Footer";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://threadglitch.com"),
  title: {
    default: "UNHINGED THREADS™ | Respect The Glitch",
    template: "%s | UNHINGED THREADS",
  },
  description: "We say what you’re thinking but shouldn’t. Chaotic, unfiltered, degenerate streetwear for people who are one bad decision away from greatness.",
  icons: {
    icon: "/emoticon.png",
  },
  openGraph: {
    title: "UNHINGED THREADS™ | Respect The Glitch",
    description: "We say what you’re thinking but shouldn’t. Chaotic, unfiltered, degenerate streetwear for people who are one bad decision away from greatness.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "UNHINGED THREADS - Respect The Glitch",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UNHINGED THREADS™ | Respect The Glitch",
    description: "We say what you’re thinking but shouldn’t. Chaotic, unfiltered, degenerate streetwear.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://threadglitch.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${bebas.variable} ${anton.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        {children}
        <Footer />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HZJG2GFXW6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HZJG2GFXW6');
          `}
        </Script>
      </body>
    </html>
  );
}
