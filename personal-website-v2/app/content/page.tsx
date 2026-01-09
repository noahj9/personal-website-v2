import { Metadata } from "next";
import SubstackWidget from "@/components/SubstackWidget";
import TwitterWidget from "@/components/TwitterWidget";
import ImageGallery from "@/components/ImageGallery";
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
      {/* Page Header */}
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-accent-teal mb-4">/content</h1>
          <p className="text-lg text-foreground-secondary max-w-2xl">
            Stay updated with my latest thoughts, projects, and experiences
            through my newsletter, social media, and photo gallery.
          </p>
        </div>
      </div>

      {/* Content Widgets Section */}
      <div className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {/* Substack Widget */}
            <div className="flex justify-center">
              <SubstackWidget
                substackUrl="https://yoursubstack.substack.com"
                theme="dark"
              />
            </div>

            {/* Twitter Widget */}
            <div className="flex justify-center">
              <TwitterWidget username="yourusername" tweetCount={3} />
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery Section */}
      <div className="border-t border-border">
        <ImageGallery photos={data.photos} />
      </div>
    </main>
  );
}
