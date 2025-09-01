import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ai-mantra.vercel.app'),
  title: {
    default: "Ai-Mantra | Your Daily AI Mantra",
    template: "%s | Ai-Mantra"
  },
  description: "Ai-Mantra lets you compare multiple AI models at once, explore creativity, and experience next-level AI interactions in one place. Your Daily AI Mantra — Compare, Create, Conquer.",
  keywords: ["AI", "artificial intelligence", "AI comparison", "multiple AI models", "GPT", "Claude", "AI playground", "machine learning"],
  authors: [{ name: "Ai-Mantra Team" }],
  creator: "Ai-Mantra",
  publisher: "Ai-Mantra",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ai-mantra.vercel.app",
    title: "Ai-Mantra | Your Daily AI Mantra",
    description: "Compare multiple AI models side by side. Experience next-level AI interactions in one beautiful interface.",
    siteName: "Ai-Mantra",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ai-Mantra - Compare Multiple AI Models",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ai-Mantra | Your Daily AI Mantra",
    description: "Compare multiple AI models side by side. Experience next-level AI interactions.",
    images: ["/og-image.png"],
    creator: "@aimantra",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body
        className={`${poppins.variable} ${inter.variable} font-poppins antialiased bg-black text-white overflow-x-hidden`}
      >
        <div className="relative min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
