"use client";

import React from "react";
import Image from "next/image";

const About: React.FC = () => {
  // Current role and company information
  const currentRole = "Software Development Engineer Intern";
  const currentCompany = "Amazon Web Services";

  // Personal interests
  const personalInterests =
    "When I'm not coding, you'll find me exploring the mountains of British Columbia, whether it's hiking to remote cabins like Asulkan Hut or skiing fresh powder. I'm passionate about travel and have backpacked through Europe, exploring everything from Croatia's stunning Plitvice Lakes to Poland's Tatra Mountains. I also enjoy golfing, managing investment portfolios, and discovering new cultures through food and local experiences.";

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-8 sm:px-12 lg:px-16 xl:px-24 py-16 sm:py-20 lg:py-24 font-mono"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div
          className="mb-12 sm:mb-16 text-center lg:text-left"
          style={{ marginBottom: "2.5rem" }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            <span className="text-accent-teal font-autography">/</span>about me
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Content Column - Left side */}
          <div>
            {/* Current Role */}
            <div style={{ marginBottom: "1.5rem" }}>
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: "1.6",
                  marginBottom: "0",
                  textAlign: "justify",
                }}
              >
                I'm currently a{" "}
                <span className="text-accent-teal font-semibold">
                  {currentRole}
                </span>{" "}
                at{" "}
                <span className="text-accent-teal font-semibold">
                  {currentCompany}
                </span>
                , where I work on building scalable cloud infrastructure and
                security features that serve millions of users worldwide.
                I&apos;m passionate about creating elegant solutions to complex
                technical challenges.
              </p>
            </div>

            {/* Personal Interests */}
            <div>
              <h3
                className="text-lg sm:text-xl font-bold text-foreground"
                style={{ marginBottom: "0.75rem" }}
              >
                Beyond the code
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: "1.6",
                  marginBottom: "0",
                  textAlign: "justify",
                }}
                className="text-foreground-secondary"
              >
                {personalInterests}
              </p>
            </div>
          </div>

          {/* Professional Profile Photo Column - Right side, centered */}
          <div className="flex justify-center">
            <div className="relative group">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/10 to-accent-teal-dark/10 rounded-2xl blur-xl transform scale-110 group-hover:scale-125 transition-transform duration-500"></div>

              {/* Main profile image container */}
              <div className="relative w-56 h-72 sm:w-64 sm:h-80 md:w-72 md:h-90 lg:w-80 lg:h-96 rounded-2xl overflow-hidden border-2 border-border shadow-2xl shadow-accent-teal/10 transition-all duration-300 hover:border-accent-teal hover:shadow-accent-teal/20 hover:scale-105 group-hover:rotate-1">
                <Image
                  src="/assets/images/profile.jpg"
                  alt="Professional profile photo"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
