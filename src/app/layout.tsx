import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Envoyou Hub | Husni Kusuma",
  description: "The digital ecosystem of Envoyou. Discover my blog, projects, and latest activities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://envoyou.com/#person",
                  "name": "Husni Kusuma",
                  "jobTitle": "Fullstack Developer & Data Analyst",
                  "url": "https://envoyou.com",
                  "sameAs": [
                    "https://linkedin.com/in/husnikusuma",
                    "https://github.com/hk-dev13",
                    "https://kaggle.com"
                  ]
                },
                {
                  "@type": "Organization",
                  "@id": "https://envoyou.com/#organization",
                  "name": "Envoyou",
                  "url": "https://envoyou.com",
                  "logo": "https://envoyou.com/brand/logo.svg",
                  "founder": {
                    "@id": "https://envoyou.com/#person"
                  },
                  "sameAs": [
                    "https://blog.envoyou.com",
                    "https://store.envoyou.com",
                    "https://youtube.com"
                  ],
                  "description": "Technology, AI, and digital insight platform."
                }
              ]
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
