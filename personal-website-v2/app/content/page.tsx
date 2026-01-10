import { Metadata } from "next";
import { SubstackEmbed } from "@/components/SubstackEmbed";
import TwitterWidget from "@/components/TwitterWidget";
import ImageGallery from "@/components/ImageGallery";
import { FeatureFlagWrapper } from "@/components/FeatureFlagWrapper";
import { loadData } from "@/lib/data";

export const metadata: Metadata = {
  title: "Content & Updates",
  description:
    "Stay updated with Noah's latest thoughts, projects, and experiences through newsletter, social media, and photo gallery. Follow along on the journey of a Software Engineering and Business student.",
  keywords: [
    "content",
    "updates",
    "newsletter",
    "blog",
    "photos",
    "gallery",
    "social media",
    "twitter",
    "substack",
    "travel",
    "experiences",
    "student life",
  ],
  openGraph: {
    title: "Content & Updates | Noah - Portfolio",
    description:
      "Stay updated with Noah's latest thoughts, projects, and experiences through newsletter, social media, and photo gallery.",
    url: "https://yourwebsite.com/content",
    images: [
      {
        url: "/assets/images/asulkan2024.jpeg",
        width: 1200,
        height: 630,
        alt: "Noah's Content & Updates - Photo Gallery",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    title: "Content & Updates | Noah - Portfolio",
    description:
      "Stay updated with Noah's latest thoughts, projects, and experiences through newsletter, social media, and photo gallery.",
    images: ["/assets/images/asulkan2024.jpeg"],
  },
  alternates: {
    canonical: "https://yourwebsite.com/content",
  },
};

export default async function ContentPage() {
  // Load photos data for the image gallery
  const data = await loadData();

  return (
    <main className="min-h-screen bg-background">
      {/* Gallery Section */}
      <section
        id="gallery"
        className="scroll-mt-20 flex items-start justify-center px-8 sm:px-12 lg:px-16 xl:px-24 py-16 sm:py-20 lg:py-24 font-mono"
      >
        <div className="max-w-5xl mx-auto w-full">
          <ImageGallery photos={data.photos} />
        </div>
      </section>

      {/* Newsletter Section */}
      <section
        id="newsletter"
        className="scroll-mt-20 min-h-screen flex items-center justify-center px-8 sm:px-12 lg:px-16 xl:px-24 py-16 sm:py-20 lg:py-24 font-mono"
      >
        <div className="max-w-5xl mx-auto w-full">
          {/* Section Header */}
          <div
            className="mb-12 sm:mb-16 text-center lg:text-left"
            style={{ marginBottom: "2.5rem" }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              <span className="text-accent-teal font-autography">/</span>
              newsletter
            </h2>
          </div>

          <div className="flex justify-center">
            <FeatureFlagWrapper
              flagKey="substack_widget_enabled"
              fallback={
                <div className="text-center text-foreground-secondary">
                  <p>Newsletter content is currently unavailable.</p>
                </div>
              }
            >
              <SubstackEmbed />
            </FeatureFlagWrapper>
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section
        id="social"
        className="scroll-mt-20 min-h-screen flex items-center justify-center px-8 sm:px-12 lg:px-16 xl:px-24 py-16 sm:py-20 lg:py-24 font-mono"
      >
        <div className="max-w-5xl mx-auto w-full">
          {/* Section Header */}
          <div
            className="mb-12 sm:mb-16 text-center lg:text-left"
            style={{ marginBottom: "2.5rem" }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              <span className="text-accent-teal font-autography">/</span>social
            </h2>
          </div>

          <div className="flex justify-center">
            <FeatureFlagWrapper
              flagKey="twitter_widget_enabled"
              fallback={
                <div className="text-center text-foreground-secondary">
                  <p>Social media content is currently unavailable.</p>
                </div>
              }
            >
              <TwitterWidget username="noah_jina" tweetCount={3} />
            </FeatureFlagWrapper>
          </div>
        </div>
      </section>
    </main>
  );
}
