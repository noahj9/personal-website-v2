"use client";

import React from "react";
import Image from "next/image";
import { Education } from "@/types";

interface EducationProps {
  education: Education[];
}

const EducationComponent: React.FC<EducationProps> = ({ education }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = formatDate(startDate);
    const end = formatDate(endDate);
    return `${start} - ${end}`;
  };

  // Sort education by start date (most recent first)
  const sortedEducation = [...education].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  return (
    <section
      id="education"
      className="min-h-screen flex items-center justify-center px-8 sm:px-12 lg:px-16 xl:px-24 py-20 font-mono"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div
          className="mb-12 sm:mb-16 text-center lg:text-left"
          style={{ marginBottom: "2.5rem" }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            <span className="text-accent-teal font-autography">/</span>education
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Timeline Line - Hidden on mobile */}
          <div className="hidden md:block absolute left-12 lg:left-16 top-0 bottom-0 w-0.5 bg-border"></div>

          {/* Education Items */}
          <div className="space-y-8 md:space-y-12">
            {sortedEducation.map((edu) => (
              <div
                key={edu.id}
                className="relative flex flex-col md:flex-row items-start md:items-center group"
              >
                {/* School Logo */}
                <div
                  className="shrink-0 mb-4 md:mb-0"
                  style={{ marginRight: "80px" }}
                >
                  <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl overflow-hidden group-hover:border-accent-teal transition-all duration-300">
                    {/* Timeline dot for desktop */}
                    <div
                      className="hidden md:block absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-accent-teal rounded-full border-4 border-background z-10 group-hover:scale-125 transition-transform duration-300"
                      style={{ right: "-40px" }}
                    ></div>

                    <Image
                      src={
                        edu.imageUrl.startsWith("http")
                          ? edu.imageUrl
                          : `/assets/logos/${edu.imageUrl}`
                      }
                      alt={`${edu.school} logo`}
                      fill
                      className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 64px, (max-width: 1024px) 80px, 96px"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </div>
                </div>

                {/* Education Content */}
                <div className="flex-1 w-full">
                  <div className="p-6">
                    {/* School Name */}
                    <h3
                      className="text-lg sm:text-xl font-bold text-accent-teal"
                      style={{ marginBottom: "0.5rem" }}
                    >
                      {edu.school}
                    </h3>

                    {/* Degree */}
                    <h4
                      className="text-base sm:text-lg font-semibold text-foreground"
                      style={{ marginBottom: "0.5rem" }}
                    >
                      {edu.degree}
                    </h4>

                    {/* Timeline */}
                    <p
                      className="text-sm text-foreground-secondary"
                      style={{ marginBottom: "1.5rem" }}
                    >
                      {formatDateRange(edu.startDate, edu.endDate)}
                    </p>

                    {/* Description and Achievements as bullet points */}
                    <div>
                      {/* Description as first bullet point */}
                      <div
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
                          {edu.description}
                        </p>
                      </div>

                      {/* Achievements as additional bullet points */}
                      {edu.achievements && edu.achievements.length > 0 && (
                        <>
                          {edu.achievements.map((achievement, idx) => (
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
                                {achievement}
                              </p>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline Indicator */}
        <div className="md:hidden mt-12 flex justify-center">
          <div className="flex items-center space-x-2">
            {sortedEducation.map((edu) => (
              <div
                key={edu.id}
                className="w-2 h-2 bg-accent-teal rounded-full opacity-60"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationComponent;
