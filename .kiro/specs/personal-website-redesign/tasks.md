# Implementation Plan: Personal Website Redesign

## Overview

This implementation plan breaks down the personal website redesign into discrete, manageable coding tasks. Each task builds incrementally on previous work, ensuring a functional website at each checkpoint. The plan focuses on core functionality first, with optional testing tasks marked for faster MVP development.

## Tasks

- [x] 1. Project setup and configuration

  - Set up TypeScript interfaces for data models
  - Configure Tailwind CSS with custom color scheme (dark theme with teal accents)
  - Import and configure Autography font from assets
  - Create basic project structure with components directory
  - _Requirements: 1.5, 9.1_

- [x] 2. Data integration and utilities

  - [x] 2.1 Create data loading utilities in lib/data.ts

    - Write functions to load and parse assets/data.json
    - Create TypeScript interfaces for all data types (Experience, Education, Photo, Project)
    - Add data validation and error handling
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

  - [ ]\* 2.2 Write property test for data loading
    - **Property 6: Data Integration Completeness**
    - **Validates: Requirements 9.1, 9.2, 9.3, 9.4, 9.5**

- [x] 3. Navigation component implementation

  - [x] 3.1 Create Navigation.tsx component

    - Implement fixed navigation bar with Autography font for name
    - Add menu items: Home, About, Experience, Projects, Content
    - Include social media icons (email, GitHub, LinkedIn, resume)
    - Add smooth scroll functionality for homepage sections
    - Implement responsive mobile hamburger menu
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.6_

  - [ ]\* 3.2 Write property tests for navigation

    - **Property 1: Navigation Structure Consistency**
    - **Validates: Requirements 1.1, 1.2**

  - [ ]\* 3.3 Write property test for social links

    - **Property 2: Social Media Links Completeness**
    - **Validates: Requirements 1.3**

  - [ ]\* 3.4 Write property test for scroll behavior
    - **Property 3: Navigation Scroll Behavior**
    - **Validates: Requirements 1.4**

- [x] 4. Hero section implementation

  - [x] 4.1 Create Hero.tsx component

    - Implement two-column layout with profile image and content
    - Add circular cropped profile image from assets/images/profile.jpg
    - Create "hi, [name] here." heading with teal accent on name
    - Add introduction paragraph and "Say hi!" email CTA button
    - Implement responsive stacking for mobile devices
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [ ]\* 4.2 Write property test for hero section
    - **Property 5: Hero Section Content Structure**
    - **Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5**

- [x] 5. About section implementation

  - [x] 5.1 Create About.tsx component
    - Implement "/about me" section with current role and company highlighting
    - Add two-column technology skills layout
    - Include professional profile photo on the right
    - Add personal interests paragraph
    - Ensure responsive design for mobile
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 6. Experience timeline implementation

  - [x] 6.1 Create Experience.tsx component
    - Implement "/experience" section with vertical timeline
    - Add company logos and chronological ordering
    - Include expandable descriptions with bullet points
    - Highlight company names with teal accents
    - Create responsive card layout for mobile
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 7. Projects showcase implementation

  - [x] 7.1 Create Projects.tsx component
    - Implement "/projects" section with CSS Grid layout
    - Add project cards with hover effects and technology stack badges
    - Include navigation arrows for browsing projects
    - Handle external links opening in new tabs
    - Implement lazy loading for performance
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 8. Education section implementation

  - [x] 8.1 Create Education.tsx component
    - Display education entries with school logos and details
    - Show degree names, dates, and academic achievements
    - Highlight honors and relevant coursework
    - Maintain consistent styling with other sections
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [x] 9. Checkpoint - Homepage sections complete

  - Ensure all homepage sections render correctly
  - Test navigation between sections
  - Verify responsive design across breakpoints
  - Ask the user if questions arise

- [x] 10. Image gallery with masonry layout

  - [x] 10.1 Create ImageGallery.tsx component

    - Implement masonry/collage layout using CSS Grid
    - Add dynamic sizing with some images spanning multiple cells
    - Create responsive grid columns based on screen size
    - Add hover effects with title overlay
    - Implement click handlers for modal popup
    - _Requirements: 8.1, 8.2, 8.5_

  - [x] 10.2 Create ImageModal.tsx component

    - Implement full-screen overlay with backdrop blur
    - Add high-resolution image display with caption below
    - Include navigation arrows for gallery browsing
    - Add close functionality (ESC key and backdrop click)
    - Implement smooth open/close animations
    - _Requirements: 8.3, 8.4, 8.6, 8.7_

  - [ ]\* 10.3 Write property test for gallery modal
    - **Property 7: Image Gallery Modal Behavior**
    - **Validates: Requirements 8.3, 8.4**

- [x] 11. Social media widgets implementation

  - [x] 11.1 Create SubstackWidget.tsx component

    - Implement Substack newsletter signup form integration
    - Add recent posts display functionality
    - Configure dark theme integration
    - Add loading states and error handling
    - _Requirements: 7.2_

  - [x] 11.2 Create TwitterWidget.tsx component

    - Implement Twitter timeline widget integration
    - Configure recent tweets display
    - Add responsive embedding
    - Include loading states and error handling
    - _Requirements: 7.3_

  - [ ]\* 11.3 Write property test for widget integration
    - **Property 9: Content Page Widget Integration**
    - **Validates: Requirements 7.2, 7.3**

- [x] 12. Content page implementation

  - [x] 12.1 Create content/page.tsx
    - Set up content page route with same navigation
    - Integrate Substack and Twitter widgets
    - Add image gallery component
    - Ensure responsive design consistency
    - _Requirements: 7.1, 7.4, 7.5_

- [x] 13. Homepage layout and routing

  - [x] 13.1 Update app/page.tsx with all sections

    - Integrate Hero, About, Experience, Projects, and Education components
    - Ensure proper section spacing and scroll anchors
    - Add smooth scrolling behavior between sections
    - _Requirements: 1.4_

  - [x] 13.2 Update app/layout.tsx with navigation
    - Integrate Navigation component in root layout
    - Configure proper routing between homepage and content page
    - Add global styles and font imports
    - _Requirements: 1.1_

- [x] 14. Image optimization and performance

  - [x] 14.1 Implement Next.js Image optimization

    - Replace all img tags with Next.js Image components
    - Configure proper sizing and lazy loading
    - Add blur placeholders for better UX
    - Optimize images from assets/images directory
    - _Requirements: 10.1, 10.4_

  - [ ]\* 14.2 Write property test for image optimization
    - **Property 8: Image Optimization Implementation**
    - **Validates: Requirements 10.1**

- [-] 15. SEO and meta tags implementation

  - [x] 15.1 Add SEO optimization
    - Configure proper meta tags in layout.tsx
    - Add Open Graph and Twitter Card meta tags
    - Include structured data for better search visibility
    - Set up proper page titles and descriptions
    - _Requirements: 10.2_

- [-] 16. Responsive design and theme testing

  - [x] 16.1 Implement comprehensive responsive design

    - Test and refine all components across breakpoints
    - Ensure consistent dark theme with teal accents
    - Verify mobile navigation functionality
    - Test image gallery responsiveness
    - _Requirements: 1.5, 1.6_

  - [ ]\* 16.2 Write property tests for responsive design

    - **Property 4: Theme Consistency**
    - **Validates: Requirements 1.5**

  - [ ]\* 16.3 Write property test for layout integrity
    - **Property 10: Responsive Layout Integrity**
    - **Validates: Requirements 1.6, 8.2**

- [-] 17. Final integration and testing

  - [x] 17.1 Complete application integration

    - Wire all components together in final application
    - Test all navigation and user interactions
    - Verify data loading from assets/data.json
    - Ensure all external links work correctly
    - _Requirements: All_

  - [ ]\* 17.2 Write integration tests
    - Test end-to-end user flows
    - Verify data integration across all components
    - Test responsive behavior and performance

- [x] 18. Final checkpoint - Complete application
  - Ensure all tests pass and application builds successfully
  - Test deployment readiness for Vercel
  - Verify all requirements are met
  - Ask the user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP development
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation and user feedback
- Property tests validate universal correctness properties using @fast-check/jest
- Unit tests validate specific examples and edge cases using React Testing Library
- The implementation follows a component-by-component approach for manageable development
