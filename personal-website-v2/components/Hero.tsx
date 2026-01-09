"use client";

import React from "react";
import Image from "next/image";
import { HeroProps } from "@/types";

// Email icon component
const EmailIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);

const Hero: React.FC<HeroProps> = ({ name, introduction, profileImageSrc }) => {
  const handleEmailClick = () => {
    window.location.href = "mailto:njina.hba2025@ivey.ca"; // This should be updated with actual email
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-8 sm:px-12 lg:px-16 xl:px-24 py-20 lg:py-24 font-mono">
      <div className="max-w-5xl mx-auto w-full">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 items-center"
          style={{ gap: "2rem" }}
        >
          {/* Profile Image Column - Now on the left */}
          <div className="order-1 flex justify-center lg:justify-start">
            <div className="relative group">
              {/* Main profile image container - removed decorative elements and borders */}
              <div
                className="relative rounded-full overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105"
                style={{ width: "320px", height: "320px" }}
              >
                <Image
                  src={profileImageSrc}
                  alt={`${name} profile photo`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, (max-width: 1024px) 224px, (max-width: 1280px) 256px, 288px"
                />
              </div>
            </div>
          </div>

          {/* Content Column - Now on the right */}
          <div className="order-2 text-center lg:text-left">
            <h1
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal leading-tight"
              style={{ marginBottom: "1rem" }}
            >
              hi,<span className="text-accent-teal">{name}</span> here.
            </h1>
            <p
              className="text-foreground-secondary leading-relaxed max-w-2xl mx-auto lg:mx-0"
              style={{ marginBottom: "1rem", fontSize: "14px" }}
            >
              {introduction}
            </p>
            <div style={{ paddingTop: "1rem" }}>
              <button
                onClick={handleEmailClick}
                className="inline-flex items-center gap-2 border border-accent-teal text-accent-teal hover:bg-accent-teal hover:text-background rounded-lg font-medium transition-all duration-300 text-base focus:outline-none focus:ring-2 focus:ring-accent-teal focus:ring-offset-2 focus:ring-offset-background"
                style={{ padding: "1rem 2rem" }}
              >
                <EmailIcon />
                Say hi!
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
