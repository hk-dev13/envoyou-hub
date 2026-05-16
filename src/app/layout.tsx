import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ServiceWorkerCleanup from "@/components/ServiceWorkerCleanup";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Envoyou — Technology, AI, and Digital Insight Platform",
  description: "Envoyou explores technology, artificial intelligence, digital strategy, and future systems through insights, research, and engineering.",
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
                  "jobTitle": "Software Engineer & Digital Builder",
                  "url": "https://envoyou.com",
                  "sameAs": [
                    "https://www.linkedin.com/in/husni-kusuma",
                    "https://github.com/hk-dev13"
                  ]
                },
                {
                  "@type": "Organization",
                  "@id": "https://envoyou.com/#organization",
                  "name": "Envoyou",
                  "url": "https://envoyou.com",
                  "logo": "https://envoyou.com/brand/logo-500.svg",
                  "founder": {
                    "@id": "https://envoyou.com/#person"
                  },
                  "sameAs": [
                    "https://blog.envoyou.com",
                    "https://youtube.com"
                  ],
                  "description": "Technology, AI, and digital insight platform."
                }
              ]
            }),
          }}
        />
        <ServiceWorkerCleanup />
        {children}
      </body>
    </html>
  );
}
