import { Metadata } from "next";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import { loadData } from "@/lib/data";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to Noah's portfolio. Software Engineering student at Western University and Business student at Ivey Business School. Currently interning at Amazon Web Services, building scalable solutions.",
  openGraph: {
    title: "Noah - Software Engineer & Business Student",
    description:
      "Software Engineering student at Western University and Business student at Ivey Business School. Currently interning at Amazon Web Services.",
    url: "https://yourwebsite.com",
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
    title: "Noah - Software Engineer & Business Student",
    description:
      "Software Engineering student at Western University and Business student at Ivey Business School. Currently interning at Amazon Web Services.",
    images: ["/assets/images/profile.jpg"],
  },
  alternates: {
    canonical: "https://yourwebsite.com",
  },
};

export default async function Home() {
  // Load all data
  const data = await loadData();

  // For now, using placeholder data - this will be replaced with actual data loading in later tasks
  const heroData = {
    name: "Noah", // This should come from data.json or be configured
    introduction:
      "I'm a Software Engineering student at Western University and Business student at Ivey Business School. Currently interning at Amazon Web Services, building scalable solutions and exploring the intersection of technology and business.",
    profileImageSrc: "/assets/images/profile.jpg",
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section - Full viewport height */}
      <section id="home" className="scroll-mt-20">
        <Hero
          name={heroData.name}
          introduction={heroData.introduction}
          profileImageSrc={heroData.profileImageSrc}
        />
      </section>

      {/* About Section */}
      <About />

      {/* Experience Section */}
      <Experience experiences={data.experiences} />

      {/* Projects Section */}
      <Projects projects={data.portfolioItems} />

      {/* Education Section */}
      <Education education={data.education} />
    </main>
  );
}
