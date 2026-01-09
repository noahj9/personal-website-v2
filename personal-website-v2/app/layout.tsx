import type { Metadata, Viewport } from "next";
import { Inter, Space_Mono } from "next/font/google";
import Navigation from "@/components/Navigation";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Noah Jina - Software Engineer & Business Student",
    template: "%s | Noah - Portfolio",
  },
  description:
    "Software Engineering student at Western University and Business student at Ivey Business School. Currently interning at Amazon Web Services, building scalable solutions and exploring the intersection of technology and business.",
  keywords: [
    "Noah",
    "Software Engineer",
    "Western University",
    "Ivey Business School",
    "Amazon Web Services",
    "AWS",
    "Software Development",
    "Business Strategy",
    "Portfolio",
    "Web Development",
    "React",
    "Next.js",
    "TypeScript",
    "Full Stack Developer",
    "Student",
    "Intern",
  ],
  authors: [{ name: "Noah", url: "https://yourwebsite.com" }],
  creator: "Noah",
  publisher: "Noah",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourwebsite.com",
    siteName: "Noah - Portfolio",
    title: "Noah - Software Engineer & Business Student",
    description:
      "Software Engineering student at Western University and Business student at Ivey Business School. Currently interning at Amazon Web Services.",
    images: [
      {
        url: "/assets/images/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Noah - Software Engineer & Business Student",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noah - Software Engineer & Business Student",
    description:
      "Software Engineering student at Western University and Business student at Ivey Business School. Currently interning at Amazon Web Services.",
    images: ["/assets/images/profile.jpg"],
    creator: "@yourusername",
    site: "@yourusername",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://yourwebsite.com",
  },
  category: "technology",
  classification: "Personal Portfolio",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://yourwebsite.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured data for better search visibility
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Noah",
    jobTitle: "Software Development Engineer Intern",
    worksFor: {
      "@type": "Organization",
      name: "Amazon Web Services",
      url: "https://aws.amazon.com",
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Western University",
        url: "https://www.uwo.ca",
      },
      {
        "@type": "EducationalOrganization",
        name: "Ivey Business School",
        url: "https://www.ivey.uwo.ca",
      },
    ],
    url: "https://yourwebsite.com",
    image: "https://yourwebsite.com/assets/images/profile.jpg",
    sameAs: [
      "https://github.com/yourusername",
      "https://linkedin.com/in/yourusername",
      "https://twitter.com/yourusername",
    ],
    knowsAbout: [
      "Software Engineering",
      "Web Development",
      "Business Strategy",
      "Amazon Web Services",
      "React",
      "Next.js",
      "TypeScript",
      "Full Stack Development",
    ],
    description:
      "Software Engineering student at Western University and Business student at Ivey Business School. Currently interning at Amazon Web Services, building scalable solutions and exploring the intersection of technology and business.",
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#0d9488" />
        <meta name="msapplication-TileColor" content="#0d9488" />
        {/* Additional SEO meta tags */}
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
      </head>
      <body
        className={`${inter.variable} ${spaceMono.variable} font-sans antialiased`}
      >
        <Navigation />
        <div className="pt-20 font-mono">
          {/* Add padding-top to account for fixed navigation */}
          {children}
        </div>
      </body>
    </html>
  );
}
