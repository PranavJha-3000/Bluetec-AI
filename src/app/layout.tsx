import type { Metadata, Viewport } from "next";
import { Fraunces, Figtree, Shantell_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PawTrail from "@/components/PawTrail";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", axes: ["SOFT", "WONK", "opsz"], display: "swap" });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });
const shantell = Shantell_Sans({ subsets: ["latin"], variable: "--font-shantell", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://puppy.instabizweb.com"),
  title: { default: "TeddyPups U.A.E. — Premium teacup puppies in Dubai", template: "%s | TeddyPups U.A.E." },
  description: "Premium, health-checked teacup puppies in Dubai — meet them in our Downtown showroom or reserve an imported teacup.",
  openGraph: { images: ["/brand/logo.png"] },
  twitter: { card: "summary_large_image", images: ["/brand/logo.png"] },
};
export const viewport: Viewport = { themeColor: "#fffdf8", viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${figtree.variable} ${shantell.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cocoa focus:px-4 focus:py-2 focus:text-milk">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <PawTrail />
      </body>
    </html>
  );
}
