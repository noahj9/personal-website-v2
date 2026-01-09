"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Project } from "@/types";

interface ProjectsProps {
  projects: Project[];
}

const ProjectsComponent: React.FC<ProjectsProps> = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sort projects by order
  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % sortedProjects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? sortedProjects.length - 1 : prev - 1
    );
  };

  const handleProjectClick = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  if (sortedProjects.length === 0) {
    return (
      <section
        id="projects"
        className="min-h-screen flex items-center justify-center px-8 sm:px-12 lg:px-16 xl:px-24 py-20 font-mono"
      >
        <div className="max-w-5xl mx-auto w-full text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8">
            <span className="text-accent-teal font-autography">/</span>
            projects
          </h2>
          <p className="text-foreground-secondary text-lg">
            No projects available at the moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center px-8 sm:px-12 lg:px-16 xl:px-24 py-20 font-mono"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-16 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-accent-teal font-autography">/</span>
            projects
          </h2>
          <p className="text-foreground-secondary text-lg max-w-2xl">
            A collection of personal projects showcasing various technologies
            and creative solutions.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12">
          {sortedProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative bg-background-secondary border border-border rounded-xl overflow-hidden hover:border-accent-teal transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-[1.02] ${
                index >= currentIndex && index < currentIndex + 3
                  ? "opacity-100"
                  : "opacity-60 hover:opacity-80"
              }`}
              onClick={() => handleProjectClick(project.link)}
            >
              {/* Project Image */}
              <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-flex items-center space-x-2 bg-accent-teal text-background px-3 sm:px-4 py-2 rounded-lg font-semibold text-sm sm:text-base">
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

              {/* Project Content */}
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 group-hover:text-accent-teal transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-foreground-secondary text-sm sm:text-base leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technology Stack Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent-teal rounded-full"></div>
                    <span className="text-xs text-foreground-secondary uppercase tracking-wide">
                      Project #{project.order}
                    </span>
                  </div>

                  {/* External link indicator */}
                  <div className="text-accent-teal opacity-60 group-hover:opacity-100 transition-opacity duration-300">
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
          ))}
        </div>

        {/* Navigation Controls */}
        {sortedProjects.length > 3 && (
          <div className="flex items-center justify-center space-x-6">
            <button
              onClick={prevProject}
              className="group flex items-center space-x-2 bg-background-secondary border border-border hover:border-accent-teal px-4 py-2 rounded-lg transition-all duration-300 hover:bg-background-tertiary"
              aria-label="Previous projects"
            >
              <svg
                className="w-5 h-5 text-foreground-secondary group-hover:text-accent-teal transition-colors duration-300"
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
              <span className="text-foreground-secondary group-hover:text-accent-teal transition-colors duration-300 font-medium">
                Previous
              </span>
            </button>

            {/* Project indicators */}
            <div className="flex items-center space-x-2">
              {Array.from({ length: Math.ceil(sortedProjects.length / 3) }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index * 3)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      Math.floor(currentIndex / 3) === index
                        ? "bg-accent-teal w-6"
                        : "bg-border hover:bg-accent-teal/50"
                    }`}
                    aria-label={`Go to projects ${index * 3 + 1}-${Math.min(
                      (index + 1) * 3,
                      sortedProjects.length
                    )}`}
                  />
                )
              )}
            </div>

            <button
              onClick={nextProject}
              className="group flex items-center space-x-2 bg-background-secondary border border-border hover:border-accent-teal px-4 py-2 rounded-lg transition-all duration-300 hover:bg-background-tertiary"
              aria-label="Next projects"
            >
              <span className="text-foreground-secondary group-hover:text-accent-teal transition-colors duration-300 font-medium">
                Next
              </span>
              <svg
                className="w-5 h-5 text-foreground-secondary group-hover:text-accent-teal transition-colors duration-300"
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

        {/* Project count indicator */}
        <div className="mt-8 text-center">
          <p className="text-foreground-secondary text-sm">
            Showing {Math.min(3, sortedProjects.length)} of{" "}
            {sortedProjects.length} projects
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProjectsComponent;
