"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationProps } from "@/types";

// Social media icons as SVG components
const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
      clipRule="evenodd"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
      clipRule="evenodd"
    />
  </svg>
);

const ResumeIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
      clipRule="evenodd"
    />
  </svg>
);

const HamburgerIcon = () => (
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
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const CloseIcon = () => (
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
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const Navigation: React.FC<NavigationProps> = ({ currentSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(currentSection || "home");
  const pathname = usePathname();

  // Check if we're on the homepage
  const isHomePage = pathname === "/";

  // Close mobile menu when clicking outside or on a link
  useEffect(() => {
    const handleClickOutside = () => {
      setIsMenuOpen(false);
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isMenuOpen]);

  // Smooth scroll function for homepage sections
  const scrollToSection = (sectionId: string) => {
    if (!isHomePage) {
      // If we're not on the homepage, navigate to homepage with hash
      window.location.href = `/#${sectionId}`;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80; // Account for fixed navigation height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  // Handle home button click
  const handleHomeClick = () => {
    if (isHomePage) {
      scrollToSection("home");
    } else {
      window.location.href = "/";
    }
  };

  // Navigation menu items
  const menuItems = [
    { id: "home", label: "Home", href: "#home" },
    { id: "about", label: "About", href: "#about" },
    { id: "experience", label: "Experience", href: "#experience" },
    { id: "projects", label: "Projects", href: "#projects" },
  ];

  // Social media links
  const socialLinks = [
    {
      name: "Email",
      href: "mailto:njina.hba2025@ivey.ca",
      icon: EmailIcon,
    },
    {
      name: "GitHub",
      href: "https://github.com/noahj9",
      icon: GitHubIcon,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/noahjina",
      icon: LinkedInIcon,
    },
    {
      name: "Instagram",
      href: "https://instagram.com/noahj_09",
      icon: InstagramIcon,
    },
    {
      name: "Resume",
      href: "/assets/resume.pdf",
      icon: ResumeIcon,
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md shadow-sm">
      <div
        className="max-w-6xl mx-auto"
        style={{ paddingLeft: "2rem", paddingRight: "2rem" }}
      >
        <div className="flex justify-between items-center h-20">
          {/* Left side - Logo/Name + Navigation Links */}
          <div className="flex items-center" style={{ gap: "2rem" }}>
            {/* Logo/Name */}
            <div className="shrink-0">
              <button
                onClick={handleHomeClick}
                className="font-autography text-2xl md:text-3xl text-accent-teal hover:text-accent-teal-light transition-colors duration-200"
              >
                Noah Jina
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex" style={{ gap: "1.5rem" }}>
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-base font-medium transition-colors duration-200 cursor-pointer ${
                    activeSection === item.id
                      ? "text-accent-teal"
                      : "text-foreground hover:text-accent-teal"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <Link
                href="/content"
                className="text-base font-medium text-foreground hover:text-accent-teal transition-colors duration-200 cursor-pointer"
              >
                Content
              </Link>
            </div>
          </div>

          {/* Right side - Social Links */}
          <div className="hidden lg:flex items-center" style={{ gap: "1rem" }}>
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.name === "Resume" ? "_blank" : undefined}
                rel={link.name === "Resume" ? "noopener noreferrer" : undefined}
                className="text-foreground-secondary hover:text-accent-teal transition-colors duration-200 p-2 rounded-lg hover:bg-background-secondary"
                aria-label={link.name}
              >
                <link.icon />
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="text-foreground hover:text-accent-teal transition-colors duration-200 p-2 rounded-lg hover:bg-background-secondary"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-md shadow-xl">
            <div className="px-8 py-6 space-y-2">
              {/* Mobile Menu Items */}
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200 ${
                    activeSection === item.id
                      ? "text-accent-teal bg-background-secondary"
                      : "text-foreground hover:text-accent-teal hover:bg-background-secondary"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <Link
                href="/content"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-foreground hover:text-accent-teal hover:bg-background-secondary rounded-lg transition-colors duration-200"
              >
                Content
              </Link>

              {/* Mobile Social Links */}
              <div className="pt-6 border-t border-border mt-6">
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target={link.name === "Resume" ? "_blank" : undefined}
                      rel={
                        link.name === "Resume"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="flex items-center space-x-3 px-4 py-3 text-foreground-secondary hover:text-accent-teal hover:bg-background-secondary rounded-lg transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <link.icon />
                      <span className="text-sm font-medium">{link.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
