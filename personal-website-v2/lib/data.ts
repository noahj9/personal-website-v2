// Data loading utilities for personal website
import { DataStructure, Project, Photo, Experience, Education } from "@/types";
import fs from "fs";
import path from "path";

/**
 * Validates that a value is a non-empty string
 */
function isValidString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Validates that a value is a positive number
 */
function isValidNumber(value: unknown): value is number {
  return typeof value === "number" && value > 0;
}

/**
 * Validates that a value is a valid date string
 */
function isValidDate(value: unknown): value is string {
  if (!isValidString(value)) return false;
  const date = new Date(value);
  return !isNaN(date.getTime());
}

/**
 * Validates a Project object with new fields
 */
function validateProject(item: unknown): item is Project {
  const obj = item as Record<string, unknown>;
  return (
    typeof item === "object" &&
    item !== null &&
    isValidNumber(obj.id) &&
    isValidString(obj.title) &&
    isValidString(obj.description) &&
    isValidString(obj.imageUrl) &&
    isValidString(obj.link) &&
    Array.isArray(obj.technologies) &&
    obj.technologies.every((tech: unknown) => isValidString(tech)) &&
    (obj.type === "featured" || obj.type === "small") &&
    isValidNumber(obj.order) &&
    (obj.githubUrl === undefined || isValidString(obj.githubUrl)) &&
    (obj.liveUrl === undefined || isValidString(obj.liveUrl))
  );
}

/**
 * Validates a legacy Portfolio Item object (for backwards compatibility)
 */
function validatePortfolioItem(item: unknown): item is Project {
  return (
    typeof item === "object" &&
    item !== null &&
    isValidNumber((item as Record<string, unknown>).id) &&
    isValidString((item as Record<string, unknown>).title) &&
    isValidString((item as Record<string, unknown>).description) &&
    isValidString((item as Record<string, unknown>).imageUrl) &&
    isValidString((item as Record<string, unknown>).link) &&
    isValidNumber((item as Record<string, unknown>).order)
  );
}

/**
 * Validates a Photo object
 */
function validatePhoto(item: unknown): item is Photo {
  return (
    typeof item === "object" &&
    item !== null &&
    isValidNumber((item as Record<string, unknown>).id) &&
    isValidString((item as Record<string, unknown>).title) &&
    isValidString((item as Record<string, unknown>).imageUrl) &&
    isValidString((item as Record<string, unknown>).description) &&
    isValidDate((item as Record<string, unknown>).date)
  );
}

/**
 * Validates an Experience object
 */
function validateExperience(item: unknown): item is Experience {
  const obj = item as Record<string, unknown>;
  return (
    typeof item === "object" &&
    item !== null &&
    isValidNumber(obj.id) &&
    isValidString(obj.company) &&
    isValidString(obj.role) &&
    isValidString(obj.description) &&
    isValidString(obj.startDate) &&
    (obj.endDate === null || isValidString(obj.endDate)) &&
    isValidNumber(obj.order) &&
    isValidString(obj.imageUrl)
  );
}

/**
 * Validates an Education object
 */
function validateEducation(item: unknown): item is Education {
  const obj = item as Record<string, unknown>;
  return (
    typeof item === "object" &&
    item !== null &&
    isValidNumber(obj.id) &&
    isValidString(obj.school) &&
    isValidString(obj.degree) &&
    isValidString(obj.startDate) &&
    isValidString(obj.endDate) &&
    isValidString(obj.description) &&
    Array.isArray(obj.achievements) &&
    obj.achievements.every((achievement: unknown) =>
      isValidString(achievement)
    ) &&
    isValidString(obj.imageUrl)
  );
}

/**
 * Loads and parses the data.json file with validation
 */
export async function loadData(): Promise<DataStructure> {
  try {
    // Determine the correct path to the data file
    const dataPath = path.join(process.cwd(), "public", "assets", "data.json");

    // Check if file exists, if not try alternative path
    let jsonData: string;
    try {
      jsonData = fs.readFileSync(dataPath, "utf8");
    } catch {
      // Try alternative path for development
      const altPath = path.join(process.cwd(), "..", "assets", "data.json");
      jsonData = fs.readFileSync(altPath, "utf8");
    }

    const rawData = JSON.parse(jsonData);

    // Validate the structure
    if (!rawData || typeof rawData !== "object") {
      throw new Error("Invalid data structure: root must be an object");
    }

    // Validate and filter projects array
    const projects: Project[] = [];
    if (Array.isArray(rawData.projects)) {
      for (const item of rawData.projects) {
        if (validateProject(item)) {
          projects.push(item);
        } else {
          console.warn("Invalid project item skipped:", item);
        }
      }
    }

    // Validate and filter legacy portfolioItems array (for backwards compatibility)
    const portfolioItems: Project[] = [];
    if (Array.isArray(rawData.portfolioItems)) {
      for (const item of rawData.portfolioItems) {
        if (validatePortfolioItem(item)) {
          // Convert legacy portfolio item to new project format
          const project: Project = {
            ...item,
            technologies: [],
            type: "small" as const,
            githubUrl: item.link,
          };
          portfolioItems.push(project);
        } else {
          console.warn("Invalid portfolio item skipped:", item);
        }
      }
    }

    // Validate and filter other arrays
    const photos: Photo[] = [];
    if (Array.isArray(rawData.photos)) {
      for (const item of rawData.photos) {
        if (validatePhoto(item)) {
          photos.push(item);
        } else {
          console.warn("Invalid photo item skipped:", item);
        }
      }
    }

    const experiences: Experience[] = [];
    if (Array.isArray(rawData.experiences)) {
      for (const item of rawData.experiences) {
        if (validateExperience(item)) {
          experiences.push(item);
        } else {
          console.warn("Invalid experience item skipped:", item);
        }
      }
    }

    const education: Education[] = [];
    if (Array.isArray(rawData.education)) {
      for (const item of rawData.education) {
        if (validateEducation(item)) {
          education.push(item);
        } else {
          console.warn("Invalid education item skipped:", item);
        }
      }
    }

    return {
      projects: projects.sort((a, b) => a.order - b.order),
      portfolioItems: portfolioItems.sort((a, b) => a.order - b.order),
      photos: photos.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
      experiences: experiences.sort((a, b) => a.order - b.order),
      education: education.sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      ),
    };
  } catch (error) {
    console.error("Error loading data:", error);

    // Return fallback data structure to prevent application crashes
    return {
      projects: [],
      portfolioItems: [],
      photos: [],
      experiences: [],
      education: [],
    };
  }
}

/**
 * Loads data for client-side usage (using fetch)
 */
export async function loadDataClient(): Promise<DataStructure> {
  try {
    const response = await fetch("/assets/data.json");

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }

    const rawData = await response.json();

    // Validate the structure
    if (!rawData || typeof rawData !== "object") {
      throw new Error("Invalid data structure: root must be an object");
    }

    // Validate and filter projects array
    const projects: Project[] = [];
    if (Array.isArray(rawData.projects)) {
      for (const item of rawData.projects) {
        if (validateProject(item)) {
          projects.push(item);
        } else {
          console.warn("Invalid project item skipped:", item);
        }
      }
    }

    // Validate and filter legacy portfolioItems array
    const portfolioItems: Project[] = [];
    if (Array.isArray(rawData.portfolioItems)) {
      for (const item of rawData.portfolioItems) {
        if (validatePortfolioItem(item)) {
          const project: Project = {
            ...item,
            technologies: [],
            type: "small" as const,
            githubUrl: item.link,
          };
          portfolioItems.push(project);
        } else {
          console.warn("Invalid portfolio item skipped:", item);
        }
      }
    }

    // Validate and filter other arrays
    const photos: Photo[] = [];
    if (Array.isArray(rawData.photos)) {
      for (const item of rawData.photos) {
        if (validatePhoto(item)) {
          photos.push(item);
        } else {
          console.warn("Invalid photo item skipped:", item);
        }
      }
    }

    const experiences: Experience[] = [];
    if (Array.isArray(rawData.experiences)) {
      for (const item of rawData.experiences) {
        if (validateExperience(item)) {
          experiences.push(item);
        } else {
          console.warn("Invalid experience item skipped:", item);
        }
      }
    }

    const education: Education[] = [];
    if (Array.isArray(rawData.education)) {
      for (const item of rawData.education) {
        if (validateEducation(item)) {
          education.push(item);
        } else {
          console.warn("Invalid education item skipped:", item);
        }
      }
    }

    return {
      projects: projects.sort((a, b) => a.order - b.order),
      portfolioItems: portfolioItems.sort((a, b) => a.order - b.order),
      photos: photos.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
      experiences: experiences.sort((a, b) => a.order - b.order),
      education: education.sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      ),
    };
  } catch (error) {
    console.error("Error loading data on client:", error);

    // Return fallback data structure to prevent application crashes
    return {
      projects: [],
      portfolioItems: [],
      photos: [],
      experiences: [],
      education: [],
    };
  }
}

/**
 * Gets a specific project by ID
 */
export async function getProjectById(id: number): Promise<Project | null> {
  const data = await loadData();
  return (
    data.projects.find((project) => project.id === id) ||
    data.portfolioItems.find((project) => project.id === id) ||
    null
  );
}

/**
 * Gets a specific photo by ID
 */
export async function getPhotoById(id: number): Promise<Photo | null> {
  const data = await loadData();
  return data.photos.find((photo) => photo.id === id) || null;
}

/**
 * Gets experiences sorted by most recent first
 */
export async function getExperiencesSorted(): Promise<Experience[]> {
  const data = await loadData();
  return data.experiences.sort((a, b) => {
    // Sort by order first, then by start date (most recent first)
    if (a.order !== b.order) {
      return a.order - b.order;
    }
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });
}

/**
 * Gets education entries sorted by most recent first
 */
export async function getEducationSorted(): Promise<Education[]> {
  const data = await loadData();
  return data.education.sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );
}
