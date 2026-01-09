"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Project } from "@/types";

interface ProjectsProps {
  projects: Project[];
}

const ProjectsComponent: React.FC<ProjectsProps> = ({ projects }) => {
  // Separate featured and small projects
  const featuredProjects = projects
    .filter((p) => p.type === "featured")
    .sort((a, b) => a.order - b.order);
  const smallProjects = projects
    .filter((p) => p.type === "small")
    .sort((a, b) => a.order - b.order);

  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);

  const nextFeatured = () => {
    setCurrentFeaturedIndex((prev) => (prev + 1) % featuredProjects.length);
  };

  const prevFeatured = () => {
    setCurrentFeaturedIndex((prev) =>
      prev === 0 ? featuredProjects.length - 1 : prev - 1
    );
  };

  const handleProjectClick = (project: Project) => {
    if (project.liveUrl) {
      window.open(project.liveUrl, "_blank", "noopener,noreferrer");
    } else {
      window.open(project.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center px-8 sm:px-12 lg:px-16 xl:px-24 py-16 sm:py-20 lg:py-24 font-mono"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header - matching Experience component style */}
        <div
          className="mb-12 sm:mb-16"
          style={{ marginBottom: "2.5rem", textAlign: "left" }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            <span className="text-accent-teal font-autography">/</span>
            projects
          </h2>
        </div>

        {/* Featured Project Display */}
        {featuredProjects.length > 0 && (
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentFeaturedIndex * 100}%)`,
              }}
            >
              {featuredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="w-full flex-shrink-0 bg-background-secondary border border-border rounded-xl overflow-hidden hover:border-accent-teal transition-all duration-300 cursor-pointer group"
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="flex flex-col lg:flex-row lg:min-h-[500px]">
                    {/* Project Image */}
                    <div className="relative lg:w-1/2 h-64 lg:h-auto lg:flex-1 overflow-hidden">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />

                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-center">
                          <div
                            className="inline-flex items-center space-x-2 bg-accent-teal text-background rounded-lg font-semibold"
                            style={{ padding: "0.75rem 1.5rem" }}
                          >
                            <span>View Project</span>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div
                      className="lg:w-1/2 flex flex-col justify-center"
                      style={{ padding: "2rem" }}
                    >
                      <h3
                        className="text-2xl lg:text-3xl font-bold text-foreground group-hover:text-accent-teal transition-colors duration-300"
                        style={{ marginBottom: "2rem" }}
                      >
                        {project.title}
                      </h3>

                      <p
                        className="text-foreground-secondary text-base leading-relaxed"
                        style={{ marginBottom: "2.5rem" }}
                      >
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div style={{ marginBottom: "2.5rem" }}>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="bg-accent-teal/10 text-accent-teal rounded-full border border-accent-teal/20"
                              style={{
                                padding: "0.25rem 0.5rem",
                                fontSize: "10px",
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Project Links */}
                      <div
                        className="flex items-center"
                        style={{ gap: "2rem" }}
                      >
                        {project.githubUrl && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(
                                project.githubUrl,
                                "_blank",
                                "noopener,noreferrer"
                              );
                            }}
                            className="flex items-center space-x-2 text-foreground-secondary hover:text-accent-teal transition-colors duration-300"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            <span>GitHub</span>
                          </button>
                        )}

                        {project.liveUrl && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(
                                project.liveUrl,
                                "_blank",
                                "noopener,noreferrer"
                              );
                            }}
                            className="flex items-center space-x-2 text-foreground-secondary hover:text-accent-teal transition-colors duration-300"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                            <span>Live Demo</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Featured Project Navigation */}
            {featuredProjects.length > 1 && (
              <div
                className="flex items-center justify-center space-x-6"
                style={{ marginTop: "1.5rem" }}
              >
                <button
                  onClick={prevFeatured}
                  className="p-3 text-foreground-secondary hover:text-accent-teal transition-colors duration-300 hover:bg-background-secondary rounded-full"
                  aria-label="Previous featured project"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <div className="flex" style={{ gap: "0.75rem" }}>
                  {featuredProjects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentFeaturedIndex(index)}
                      className="transition-all duration-300 hover:scale-110"
                      aria-label={`Go to featured project ${index + 1}`}
                    >
                      {index === currentFeaturedIndex ? (
                        <svg
                          className="w-3 h-3 text-accent-teal"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <circle cx="12" cy="12" r="12" />
                        </svg>
                      ) : (
                        <svg
                          className="w-3 h-3 text-foreground-secondary hover:text-accent-teal transition-colors duration-300"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <circle cx="12" cy="12" r="11" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>

                <button
                  onClick={nextFeatured}
                  className="p-3 text-foreground-secondary hover:text-accent-teal transition-colors duration-300 hover:bg-background-secondary rounded-full"
                  aria-label="Next featured project"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsComponent;
