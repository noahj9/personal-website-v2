# Requirements Document

## Introduction

A complete redesign of a personal portfolio website built with Next.js, featuring a modern dark theme design inspired by Gazi Jarin's website. The website will showcase professional experience, projects, education, and personal content across two main pages: a portfolio homepage and a content page with social integrations.

## Glossary

- **Portfolio_System**: The complete personal website application
- **Homepage**: The main landing page containing hero, about, experience, projects, and education sections
- **Content_Page**: The secondary page at '/content' containing Substack widget, image gallery, and Twitter widget
- **Image_Gallery**: A collage-style photo display with popup functionality
- **Navigation_Bar**: The top navigation component with menu items and social links
- **Hero_Section**: The main landing section with animated profile image and introduction
- **Social_Widget**: External service integrations (Substack, Twitter)

## Requirements

### Requirement 1: Homepage Layout and Navigation

**User Story:** As a visitor, I want to navigate through different sections of the website, so that I can learn about the owner's background and work.

#### Acceptance Criteria

1. THE Portfolio_System SHALL display a fixed navigation bar with "Home", "About", "Experience", "Projects" menu items
2. THE Navigation_Bar SHALL include social media icons (email, GitHub, LinkedIn, resume/CV) in the top right
3. WHEN a user clicks a navigation item, THE Portfolio_System SHALL scroll to the corresponding section on the homepage
4. THE Portfolio_System SHALL use a dark theme with teal/cyan accent colors matching the reference design
5. THE Portfolio_System SHALL be fully responsive across desktop, tablet, and mobile devices

### Requirement 2: Hero Section with Animated Profile

**User Story:** As a visitor, I want to see an engaging introduction, so that I immediately understand who the website owner is.

#### Acceptance Criteria

1. THE Hero_Section SHALL display a dotted/pixelated animated profile image on the left side
2. THE Hero_Section SHALL show "hi, [name] here." as the main heading with teal accent on the name
3. THE Hero_Section SHALL include a brief introduction paragraph about the owner
4. THE Hero_Section SHALL display a "Say hi!" button that opens the user's email client
5. THE Profile_Image SHALL use CSS animations to create a dynamic dotted effect

### Requirement 3: About Me Section

**User Story:** As a visitor, I want to learn about the owner's background and skills, so that I can understand their expertise.

#### Acceptance Criteria

1. THE About_Section SHALL display "/about me" as the section heading
2. THE About_Section SHALL show the owner's current role and company with highlighted company names
3. THE About_Section SHALL list technologies the owner works with in a two-column layout
4. THE About_Section SHALL include a professional profile photo on the right side
5. THE About_Section SHALL display personal interests and hobbies in a separate paragraph

### Requirement 4: Experience Timeline

**User Story:** As a visitor, I want to see the owner's work experience, so that I can understand their professional background.

#### Acceptance Criteria

1. THE Experience_Section SHALL display "/experience" as the section heading
2. THE Experience_Section SHALL show a timeline of work experiences with company logos on the left
3. WHEN displaying each experience, THE Portfolio_System SHALL show company name, role, and date range
4. THE Experience_Section SHALL include detailed bullet points for each role's accomplishments
5. THE Experience_Section SHALL highlight key companies and achievements with teal accents

### Requirement 5: Projects Showcase

**User Story:** As a visitor, I want to see the owner's projects, so that I can evaluate their technical skills and creativity.

#### Acceptance Criteria

1. THE Projects_Section SHALL display "/pet projects" as the section heading
2. THE Projects_Section SHALL show a grid layout of project cards
3. WHEN displaying each project, THE Portfolio_System SHALL show title, description, and technology stack
4. THE Projects_Section SHALL include navigation arrows to browse through projects
5. WHEN a user clicks a project card, THE Portfolio_System SHALL open the project link in a new tab

### Requirement 6: Education Information

**User Story:** As a visitor, I want to see the owner's educational background, so that I can understand their academic qualifications.

#### Acceptance Criteria

1. THE Education_Section SHALL display education entries with school logos and details
2. THE Education_Section SHALL show degree names, dates, and relevant achievements
3. THE Education_Section SHALL highlight academic honors and relevant coursework
4. THE Education_Section SHALL maintain consistent styling with other sections

### Requirement 7: Content Page with Social Integrations

**User Story:** As a visitor, I want to access additional content and social media, so that I can stay updated with the owner's latest activities.

#### Acceptance Criteria

1. THE Portfolio_System SHALL provide a '/content' route accessible from the navigation
2. THE Content_Page SHALL display a Substack widget showing the latest writing/newsletter posts
3. THE Content_Page SHALL include a Twitter widget displaying recent tweets
4. THE Content_Page SHALL maintain the same navigation and styling as the homepage
5. THE Content_Page SHALL be fully responsive across all device sizes

### Requirement 8: Image Gallery with Collage Layout

**User Story:** As a visitor, I want to view personal photos in an attractive layout, so that I can see the owner's experiences and travels.

#### Acceptance Criteria

1. THE Image_Gallery SHALL display photos from the assets folder in a collage-style layout
2. THE Image_Gallery SHALL resize images to fill the center screen area without overlapping
3. WHEN a user clicks an image, THE Portfolio_System SHALL open a popup with the full-size image
4. THE Image_Popup SHALL display the image caption below the full-size image
5. THE Image_Gallery SHALL load image data from the existing data.json file
6. WHEN the popup is open, THE Portfolio_System SHALL allow closing via click outside or escape key
7. THE Image_Gallery SHALL maintain aspect ratios while creating an aesthetically pleasing collage

### Requirement 9: Data Integration and Content Management

**User Story:** As the website owner, I want the site to use my existing data structure, so that I can easily update content without code changes.

#### Acceptance Criteria

1. THE Portfolio_System SHALL load all content from the existing assets/data.json file
2. THE Portfolio_System SHALL display experience data from the experiences array
3. THE Portfolio_System SHALL show education information from the education array
4. THE Portfolio_System SHALL render photos from the photos array in the image gallery
5. THE Portfolio_System SHALL use portfolio items from the portfolioItems array for projects
6. THE Portfolio_System SHALL serve images from the assets/images directory

### Requirement 10: Performance and SEO Optimization

**User Story:** As a visitor, I want the website to load quickly and be discoverable, so that I have a smooth browsing experience.

#### Acceptance Criteria

1. THE Portfolio_System SHALL implement Next.js Image optimization for all images
2. THE Portfolio_System SHALL include proper meta tags for SEO
3. THE Portfolio_System SHALL achieve a Lighthouse performance score above 90
4. THE Portfolio_System SHALL implement lazy loading for images in the gallery
5. THE Portfolio_System SHALL be deployable to Vercel with optimized build settings
