import { Metadata } from "next";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import MailAnimation from "@/components/MailAnimation";
import { loadData } from "@/lib/data";

export const metadata: Metadata = {
  description:
    "Welcome to Noah's portfolio. Software Engineering student at Western University and Business student at Ivey Business School. Currently interning at Amazon Web Services, building scalable solutions.",
  openGraph: {
    title: "Noah",
    description:
      "Software Engineering student at Western University and Business student at Ivey Business School. Currently interning at Amazon Web Services.",
    url: "https://yourwebsite.com",
    images: [
      {
        url: "/assets/images/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Noah",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    title: "Noah",
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
      "I am a Software Engineer currently based in Toronto, originally from Calgary. I'm always working on the next project or venture and happy to chat/connect.",
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
      <Projects projects={data.projects} />

      {/* Education Section */}
      <Education education={data.education} />

      {/* Mail Animation Section */}
      <section className="pt-16 lg:pt-20 pb-8 flex flex-col items-center justify-center bg-background">
        <MailAnimation className="mb-4" />
        <h2 className="text-xl md:text-2xl font-mono text-foreground text-center">
          Let's Connect!
        </h2>
      </section>

      {/* Bottom Spacer */}
      <div className="h-16 lg:h-24 bg-background"></div>
    </main>
  );
}
