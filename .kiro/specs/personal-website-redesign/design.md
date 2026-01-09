# Design Document: Personal Website Redesign

## Overview

This design outlines a modern, responsive personal portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. The website features a dark theme with teal accent colors inspired by Gazi Jarin's design, while incorporating the user's existing header design preferences and Autography font branding.

The application consists of two main pages: a comprehensive homepage with multiple sections (hero, about, experience, projects, education) and a content page featuring social media integrations and an image gallery. The design emphasizes performance, accessibility, and visual appeal while maintaining clean, professional aesthetics.

## Architecture

### Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for utility-first styling
- **Images**: Next.js Image component for optimization
- **Fonts**: Autography font for branding, system fonts for body text
- **Deployment**: Vercel for hosting and optimization

### Project Structure

```
personal-website-v2/
├── app/
│   ├── layout.tsx          # Root layout with navigation
│   ├── page.tsx            # Homepage
│   ├── content/
│   │   └── page.tsx        # Content page
│   └── globals.css         # Global styles and font imports
├── components/
│   ├── Navigation.tsx      # Header navigation component
│   ├── Hero.tsx           # Hero section component
│   ├── About.tsx          # About section component
│   ├── Experience.tsx     # Experience timeline component
│   ├── Projects.tsx       # Projects grid component
│   ├── Education.tsx      # Education section component
│   ├── ImageGallery.tsx   # Masonry image gallery
│   ├── ImageModal.tsx     # Image popup modal
│   ├── SubstackWidget.tsx # Substack integration
│   └── TwitterWidget.tsx  # Twitter integration
├── lib/
│   └── data.ts            # Data loading utilities
├── types/
│   └── index.ts           # TypeScript type definitions
└── assets/                # Static assets (images, fonts, data)
```

### Responsive Design Strategy

- **Mobile-first approach**: Base styles for mobile, progressive enhancement for larger screens
- **Breakpoints**:
  - sm: 640px (tablets)
  - md: 768px (small laptops)
  - lg: 1024px (desktops)
  - xl: 1280px (large desktops)
- **Flexible layouts**: CSS Grid and Flexbox for adaptive layouts
- **Scalable typography**: Responsive font sizes using Tailwind's responsive utilities

## Components and Interfaces

### Navigation Component

```typescript
interface NavigationProps {
  currentSection?: string;
}

interface SocialLink {
  name: string;
  href: string;
  icon: React.ComponentType;
}
```

**Features:**

- Fixed positioning with backdrop blur effect
- Autography font for name/logo on the left
- Horizontal menu items (Home, About, Experience, Projects, Content)
- Social media icons on the right (email, GitHub, LinkedIn, resume)
- Smooth scroll navigation for homepage sections
- Mobile hamburger menu for smaller screens

### Hero Section Component

```typescript
interface HeroProps {
  name: string;
  introduction: string;
  profileImageSrc: string;
}
```

**Features:**

- Two-column layout: profile image left, content right
- Circular cropped profile image with hover effects
- "hi, [name] here." heading with teal accent on name
- Brief introduction paragraph
- "Say hi!" CTA button opening email client
- Responsive stacking on mobile devices

### Experience Timeline Component

```typescript
interface Experience {
  id: number;
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string | null;
  order: number;
  imageUrl: string;
}

interface ExperienceProps {
  experiences: Experience[];
}
```

**Features:**

- Vertical timeline layout with company logos
- Chronological ordering (most recent first)
- Company name highlighting with teal accents
- Expandable descriptions with bullet points
- Responsive card layout for mobile

### Projects Grid Component

```typescript
interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  order: number;
}

interface ProjectsProps {
  projects: Project[];
}
```

**Features:**

- CSS Grid layout with responsive columns
- Project cards with hover effects
- Navigation arrows for browsing
- External link handling (new tab)
- Technology stack badges
- Lazy loading for performance

### Image Gallery Component

```typescript
interface Photo {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  date: string;
}

interface ImageGalleryProps {
  photos: Photo[];
}
```

**Features:**

- Masonry/collage layout using CSS Grid
- Dynamic sizing (some images span multiple grid cells)
- Responsive grid columns based on screen size
- Click handlers for modal popup
- Lazy loading with Next.js Image optimization
- Hover effects with title overlay

### Image Modal Component

```typescript
interface ImageModalProps {
  isOpen: boolean;
  image: Photo | null;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}
```

**Features:**

- Full-screen overlay with backdrop blur
- High-resolution image display
- Caption display below image
- Navigation arrows for gallery browsing
- Close on ESC key or backdrop click
- Smooth animations for open/close

### Social Widgets

```typescript
interface SubstackWidgetProps {
  substackUrl: string;
  theme?: "light" | "dark";
}

interface TwitterWidgetProps {
  username: string;
  tweetCount?: number;
}
```

**Features:**

- Substack: Newsletter signup form and recent posts
- Twitter: Recent tweets timeline
- Responsive embedding
- Dark theme integration
- Loading states and error handling

## Data Models

### Core Data Structure

The application uses the existing `assets/data.json` structure with TypeScript interfaces:

```typescript
interface DataStructure {
  portfolioItems: Project[];
  photos: Photo[];
  experiences: Experience[];
  education: Education[];
}

interface Education {
  id: number;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  imageUrl: string;
}
```

### Data Loading Strategy

- **Static data**: Load from `assets/data.json` at build time
- **Images**: Serve from `assets/images/` directory
- **Fonts**: Load Autography font from `assets/` directory
- **Caching**: Leverage Next.js static generation for performance

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

Based on the prework analysis, I've identified several properties that can be validated through property-based testing. After reviewing for redundancy, here are the key correctness properties:

### Property 1: Navigation Structure Consistency

_For any_ viewport size, the navigation component should always contain the owner's name with Autography font class on the left and all required menu items ("Home", "About", "Experience", "Projects", "Content") in the correct order
**Validates: Requirements 1.1, 1.2**

### Property 2: Social Media Links Completeness

_For any_ navigation render, all required social media icons (email, GitHub, LinkedIn, resume/CV) should be present and have valid href attributes
**Validates: Requirements 1.3**

### Property 3: Navigation Scroll Behavior

_For any_ navigation menu item click on the homepage, the system should trigger smooth scroll to the corresponding section element
**Validates: Requirements 1.4**

### Property 4: Theme Consistency

_For any_ page component, dark theme classes and teal accent colors should be consistently applied according to the design system
**Validates: Requirements 1.5**

### Property 5: Hero Section Content Structure

_For any_ hero section render, it should contain a circular profile image, properly formatted heading with teal accent, introduction paragraph, and email CTA button
**Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5**

### Property 6: Data Integration Completeness

_For any_ data array (experiences, education, photos, portfolioItems), all items should be rendered in their respective components with complete information
**Validates: Requirements 9.1, 9.2, 9.3, 9.4, 9.5**

### Property 7: Image Gallery Modal Behavior

_For any_ image in the gallery, clicking it should open a modal containing the full-size image and its caption below
**Validates: Requirements 8.3, 8.4**

### Property 8: Image Optimization Implementation

_For any_ image rendered in the application, it should use the Next.js Image component instead of standard HTML img tags
**Validates: Requirements 10.1**

### Property 9: Content Page Widget Integration

_For any_ content page render, it should contain both Substack and Twitter widget components properly configured and accessible
**Validates: Requirements 7.2, 7.3**

### Property 10: Responsive Layout Integrity

_For any_ viewport size within supported breakpoints, all components should maintain proper layout structure without overlapping or breaking
**Validates: Requirements 1.6, 8.2**

## Error Handling

### Image Loading Failures

- **Fallback images**: Provide placeholder images for failed loads
- **Graceful degradation**: Show alt text when images fail
- **Retry mechanism**: Implement retry logic for network failures
- **Loading states**: Display skeleton loaders during image loading

### Data Loading Errors

- **Static fallbacks**: Provide default data structure if JSON fails to load
- **Validation**: Validate data structure at runtime with TypeScript
- **Error boundaries**: React error boundaries to catch component failures
- **User feedback**: Display friendly error messages for data issues

### Widget Integration Failures

- **Substack widget**: Handle API failures with fallback content
- **Twitter widget**: Graceful degradation when Twitter API is unavailable
- **Network timeouts**: Set reasonable timeout limits for external services
- **Loading indicators**: Show loading states while widgets initialize

### Navigation and Routing

- **404 handling**: Custom 404 page with navigation back to homepage
- **Scroll restoration**: Maintain scroll position on navigation
- **Hash link failures**: Fallback behavior when section anchors don't exist
- **Mobile menu**: Proper state management for mobile navigation

## Testing Strategy

### Dual Testing Approach

The application will use both unit testing and property-based testing for comprehensive coverage:

**Unit Tests:**

- Component rendering with specific props
- User interaction handlers (clicks, form submissions)
- Data transformation utilities
- Edge cases and error conditions
- Integration between components

**Property-Based Tests:**

- Universal properties across all inputs using React Testing Library
- Minimum 100 iterations per property test
- Each test tagged with: **Feature: personal-website-redesign, Property {number}: {property_text}**
- Comprehensive input coverage through randomization

### Testing Framework Configuration

- **Framework**: Jest with React Testing Library
- **Property testing**: @fast-check/jest for property-based testing
- **Coverage**: Minimum 80% code coverage requirement
- **E2E testing**: Playwright for critical user journeys
- **Visual regression**: Chromatic for component visual testing

### Key Testing Areas

1. **Component Integration**: Verify data flows correctly between components
2. **Responsive Behavior**: Test layout integrity across viewport sizes
3. **User Interactions**: Validate all click handlers and form submissions
4. **Performance**: Test image loading and lazy loading behavior
5. **Accessibility**: Ensure WCAG compliance and keyboard navigation
6. **SEO**: Validate meta tags and structured data

### Property Test Examples

Each correctness property will be implemented as a property-based test:

- **Property 1**: Generate random viewport sizes, verify navigation structure
- **Property 5**: Generate random user data, verify hero section content
- **Property 7**: Generate random image data, verify modal behavior
- **Property 10**: Generate random screen sizes, verify layout integrity

The testing strategy ensures both specific functionality (unit tests) and universal correctness (property tests) are validated throughout development.
