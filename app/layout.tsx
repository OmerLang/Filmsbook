import type { Metadata } from "next";
import { Roboto, Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Navbar } from "@/components/common/Navbar";

const roboto = Roboto({
  subsets: ["latin"],
});
const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Filmsbook - The Social Network for Movie Lovers",
    template: "%s | Filmsbook",
  },
  description:
    "Connect with film lovers, share reviews, track your favorites, and discover your next watch. Filmsbook is the social network built for movie fans.",
  keywords: [
    "movies",
    "social network",
    "film reviews",
    "movie recommendations",
    "watchlists",
    "cinephile community",
  ],
  openGraph: {
    title: "Filmsbook — The Social Network for Movie Lovers",
    description:
      "Connect with film lovers, share reviews, track your favorites, and discover your next watch.",
    url: "https://filmsbook.com",
    siteName: "Filmsbook",
    images: [
      {
        url: "/Images/brand-images/filmsbook_backdrop.png",
        width: 1200,
        height: 630,
        alt: "Filmsbook — The Social Network for Movie Lovers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filmsbook — The Social Network for Movie Lovers",
    description:
      "Connect with film lovers, share reviews, track your favorites, and discover your next watch.",
    images: ["/images/brand-images/filmsbook_backdrop.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-900">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
