import type { Metadata } from "next";
import { Geist_Mono, Bebas_Neue, Anton, Oswald } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Footer from "../components/Footer";

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
  description: "We say what you're thinking but shouldn't. Chaotic, unfiltered, degenerate streetwear for people who are one bad decision away from greatness.",
  icons: {
    icon: "/emoticon.png",
  },
  openGraph: {
    title: "UNHINGED THREADS™ | Respect The Glitch",
    description: "We say what you're thinking but shouldn't. Chaotic, unfiltered, degenerate streetwear for people who are one bad decision away from greatness.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "UNHINGED THREADS - Respect The Glitch",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${bebas.variable} ${anton.variable} ${oswald.variable} h-full antialiased`}
    >
      <head>
        {/* Meta Pixel Base Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1025626486564773'); 
            fbq('track', 'PageView');
          `}
        </Script>
      </head>

      <body className="min-h-full flex flex-col bg-black text-white">
        {children}
        <Footer />

        {/* Google Analytics - Excluding localhost + home IP */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HZJG2GFXW6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            const hostname = window.location.hostname;
            const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
            
            // Your home IP range
            const isHomeIP = /^74\.244\.21\./.test('74.244.21.19');

            if (isLocalhost || isHomeIP) {
              gtag('config', 'G-HZJG2GFXW6', { 
                'traffic_type': 'internal',
                'debug_mode': true 
              });
              console.log('🚫 GA Tracking DISABLED (Localhost or Home IP)');
            } else {
              gtag('config', 'G-HZJG2GFXW6');
              console.log('✅ GA Tracking ENABLED');
            }
          `}
        </Script>
      </body>
    </html>
  );
}
