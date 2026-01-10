// TypeScript interfaces for data models based on assets/data.json structure

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies: string[];
  type: "featured" | "small";
  order: number;
}

export interface Photo {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  date: string;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string | null;
  order: number;
  imageUrl: string;
}

export interface Education {
  id: number;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  imageUrl: string;
}

export interface DataStructure {
  projects: Project[];
  portfolioItems: Project[];
  photos: Photo[];
  experiences: Experience[];
  education: Education[];
}

// Component prop interfaces
export interface NavigationProps {
  currentSection?: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: React.ComponentType;
}

export interface HeroProps {
  name: string;
  introduction: string;
  profileImageSrc: string;
}

export interface ExperienceProps {
  experiences: Experience[];
}

export interface ProjectsProps {
  projects: Project[];
}

export interface ImageGalleryProps {
  photos: Photo[];
}

export interface ImageModalProps {
  isOpen: boolean;
  image: Photo | null;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export interface TwitterWidgetProps {
  username: string;
  tweetCount?: number;
}

export interface InstagramWidgetProps {
  username: string;
  postCount?: number;
}

// Feature Flag Component Interfaces
export interface FeatureFlagWrapperProps {
  flagKey: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  className?: string;
}

export interface WidgetControllerProps {
  substackEnabled?: boolean;
  twitterEnabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

// Mail Animation Component Interface
export interface MailAnimationProps {
  onClick?: () => void;
  className?: string;
  enabled?: boolean;
}
