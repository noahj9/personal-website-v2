"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Experience } from "@/types";

interface ExperienceProps {
  experiences: Experience[];
}

const ExperienceComponent: React.FC<ExperienceProps> = ({ experiences }) => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleExpanded = (id: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const formatDateRange = (startDate: string, endDate: string | null) => {
    const start = formatDate(startDate);
    const end = endDate ? formatDate(endDate) : "Present";
    return `${start} - ${end}`;
  };

  // Sort experiences by order, then by start date (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    if (a.order !== b.order) {
      return a.order - b.order;
    }
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  return (
    <section
      id="experience"
      className="min-h-screen flex items-center justify-center px-8 sm:px-12 lg:px-16 xl:px-24 py-20 font-mono"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-16 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-accent-teal font-autography">/</span>
            experience
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Timeline Line - Hidden on mobile */}
          <div className="hidden md:block absolute left-12 lg:left-16 top-0 bottom-0 w-0.5 bg-border"></div>

          {/* Experience Items */}
          <div className="space-y-8 md:space-y-12">
            {sortedExperiences.map((experience) => (
              <div
                key={experience.id}
                className="relative flex flex-col md:flex-row items-start md:items-center group"
              >
                {/* Company Logo */}
                <div className="shrink-0 mb-4 md:mb-0 md:mr-6 lg:mr-8">
                  <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl overflow-hidden bg-background-secondary border-2 border-border group-hover:border-accent-teal transition-all duration-300 shadow-lg hover:shadow-xl">
                    {/* Timeline dot for desktop */}
                    <div className="hidden md:block absolute -right-4 lg:-right-6 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-accent-teal rounded-full border-4 border-background z-10 group-hover:scale-125 transition-transform duration-300"></div>

                    <Image
                      src={
                        experience.imageUrl.startsWith("http")
                          ? experience.imageUrl
                          : `/assets/logos/${experience.imageUrl}`
                      }
                      alt={`${experience.company} logo`}
                      fill
                      className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 64px, (max-width: 1024px) 80px, 96px"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </div>
                </div>

                {/* Experience Content */}
                <div className="flex-1 w-full">
                  <div
                    className="bg-background-secondary border border-border rounded-xl p-4 sm:p-6 hover:border-accent-teal transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.01]"
                    onClick={() => toggleExpanded(experience.id)}
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div className="mb-2 sm:mb-0">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-1">
                          {experience.role}
                        </h3>
                        <p className="text-base sm:text-lg font-semibold">
                          <span className="text-accent-teal">
                            {experience.company}
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-xs sm:text-sm text-foreground-secondary bg-background-tertiary px-2 sm:px-3 py-1 rounded-full">
                          {formatDateRange(
                            experience.startDate,
                            experience.endDate
                          )}
                        </span>
                        <div
                          className={`transform transition-transform duration-200 ${
                            expandedItems.has(experience.id) ? "rotate-180" : ""
                          }`}
                        >
                          <svg
                            className="w-5 h-5 text-accent-teal"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Description - Expandable */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        expandedItems.has(experience.id)
                          ? "max-h-96 opacity-100"
                          : "max-h-16 sm:max-h-20 opacity-75"
                      }`}
                    >
                      <div className="text-foreground-secondary leading-relaxed text-sm sm:text-base">
                        {experience.description
                          .split(". ")
                          .map((sentence, idx) => (
                            <div
                              key={idx}
                              className="flex items-start mb-2 last:mb-0"
                            >
                              <span className="text-accent-teal mr-2 mt-1.5 shrink-0">
                                •
                              </span>
                              <span>
                                {sentence.trim()}
                                {sentence.includes(".") ? "" : "."}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Expand/Collapse Hint */}
                    {!expandedItems.has(experience.id) && (
                      <div className="mt-3 text-xs text-accent-teal font-medium">
                        Click to expand details
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline Indicator */}
        <div className="md:hidden mt-12 flex justify-center">
          <div className="flex items-center space-x-2">
            {sortedExperiences.map((experience) => (
              <div
                key={experience.id}
                className="w-2 h-2 bg-accent-teal rounded-full opacity-60"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceComponent;
