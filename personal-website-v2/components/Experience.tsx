"use client";

import React, { useState } from "react";
import { Experience } from "@/types";

interface ExperienceProps {
  experiences: Experience[];
}

const ExperienceComponent: React.FC<ExperienceProps> = ({ experiences }) => {
  // Sort experiences by order, then by start date (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    if (a.order !== b.order) {
      return a.order - b.order;
    }
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  // Set the first experience as selected by default
  const [selectedExperience, setSelectedExperience] = useState<Experience>(
    sortedExperiences[0]
  );

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
    return `${start.toUpperCase()} - ${end.toUpperCase()}`;
  };

  return (
    <section
      id="experience"
      className="min-h-screen flex items-center justify-center px-8 sm:px-12 lg:px-16 xl:px-24 py-16 sm:py-20 lg:py-24 font-mono"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div
          className="mb-12 sm:mb-16 text-center lg:text-left"
          style={{ marginBottom: "2.5rem" }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            <span className="text-accent-teal font-autography">/</span>
            experience
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-start">
          {/* Company List - Left side */}
          <div>
            <div className="relative">
              {/* Animated sliding border */}
              <div
                className="absolute w-0.5 bg-accent-teal transition-all duration-300 ease-in-out"
                style={{
                  height: "60px",
                  top: `${
                    sortedExperiences.findIndex(
                      (exp) => exp.id === selectedExperience.id
                    ) *
                    (60 + 32)
                  }px`,
                  right: "0px",
                }}
              />

              {sortedExperiences.map((experience, index) => (
                <div
                  key={experience.id}
                  className={`cursor-pointer transition-all duration-200 flex items-center ${
                    selectedExperience.id === experience.id
                      ? "text-accent-teal"
                      : "hover:bg-accent-teal/5 text-foreground-secondary hover:text-foreground"
                  }`}
                  style={{
                    marginBottom:
                      index < sortedExperiences.length - 1 ? "32px" : "0",
                    minHeight: "60px",
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    maxWidth: "350px",
                  }}
                  onClick={() => setSelectedExperience(experience)}
                >
                  <div
                    style={{
                      fontSize: "16px",
                      lineHeight: "1.4",
                      fontWeight: "500",
                    }}
                  >
                    {experience.company.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Details - Right side */}
          <div className="flex-1" style={{ marginLeft: "48px" }}>
            <div style={{ marginBottom: "1.5rem" }}>
              <h3
                className="font-bold text-foreground"
                style={{
                  fontSize: "18px",
                  lineHeight: "1.4",
                  marginBottom: "0.5rem",
                }}
              >
                {selectedExperience.role} @{" "}
                <span className="text-accent-teal">
                  {selectedExperience.company}
                </span>
              </h3>
              <p
                className="text-foreground-secondary"
                style={{
                  fontSize: "12px",
                  lineHeight: "1.4",
                  marginBottom: "0",
                }}
              >
                {formatDateRange(
                  selectedExperience.startDate,
                  selectedExperience.endDate
                )}
              </p>
            </div>

            <div>
              {selectedExperience.description
                .split(". ")
                .filter((sentence) => sentence.trim().length > 0)
                .map((sentence, idx) => (
                  <div
                    key={idx}
                    className="flex items-center mb-4 last:mb-0"
                    style={{ marginBottom: "1rem" }}
                  >
                    <span
                      className="text-accent-teal shrink-0"
                      style={{
                        fontSize: "12px",
                        marginRight: "12px",
                        marginTop: "2px",
                      }}
                    >
                      ▶
                    </span>
                    <p
                      style={{
                        fontSize: "14px",
                        lineHeight: "1.6",
                        marginBottom: "0",
                        textAlign: "justify",
                      }}
                      className="text-foreground-secondary"
                    >
                      {sentence.trim()}
                      {sentence.includes(".") ? "" : "."}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceComponent;
