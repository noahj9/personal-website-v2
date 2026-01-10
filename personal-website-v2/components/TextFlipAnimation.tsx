"use client";

import React, { useState, useEffect } from "react";

export interface TextFlipAnimationProps {
  words?: string[];
  animationDuration?: number;
  className?: string;
  enabled?: boolean;
}

const TextFlipAnimation: React.FC<TextFlipAnimationProps> = ({
  words = ["hobbies", "lifestyle", "interests", "content"],
  animationDuration = 5000, // 5 seconds per word
  className = "",
  enabled = true,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<
    "entering" | "displaying" | "exiting"
  >("displaying");

  useEffect(() => {
    if (!enabled || words.length === 0) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setAnimationPhase("exiting");

      // After exit animation, change word and enter
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setAnimationPhase("entering");

        // After enter animation, set to displaying
        setTimeout(() => {
          setAnimationPhase("displaying");
          setIsAnimating(false);
        }, 300); // Enter animation duration
      }, 300); // Exit animation duration
    }, animationDuration);

    return () => clearInterval(interval);
  }, [enabled, words, animationDuration]);

  if (!enabled) {
    return null;
  }

  return (
    <div className={`text-flip-animation-container ${className}`}>
      <div className="text-flip-wrapper">
        <span className="text-flip-prefix">explore my: </span>
        <div className="text-flip-word-container">
          <span
            className={`text-flip-word ${animationPhase}`}
            key={currentWordIndex}
          >
            {words[currentWordIndex]}
          </span>
        </div>
      </div>

      <style jsx>{`
        .text-flip-animation-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem 1rem;
          font-family: var(--font-mono);
          overflow: visible;
        }

        .text-flip-wrapper {
          display: inline-flex;
          align-items: center;
          font-size: 1.5rem;
          font-weight: 600;
          line-height: 1;
          text-align: center;
        }

        .text-flip-prefix {
          color: var(--foreground);
          margin-right: 0.5rem;
        }

        .text-flip-word-container {
          position: relative;
          display: inline-block;
          min-width: 140px;
          height: 1.5rem;
          overflow: hidden;
          vertical-align: baseline;
        }

        .text-flip-word {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          color: var(--accent-teal);
          font-weight: 700;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(0);
          opacity: 1;
          white-space: nowrap;
          text-align: left;
        }

        .text-flip-word.exiting {
          transform: translateY(-100%);
          opacity: 0;
        }

        .text-flip-word.entering {
          transform: translateY(100%);
          opacity: 0;
          animation: slideInFromBottom 0.3s cubic-bezier(0.4, 0, 0.2, 1)
            forwards;
        }

        .text-flip-word.displaying {
          transform: translateY(0);
          opacity: 1;
        }

        @keyframes slideInFromBottom {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        /* Responsive typography scaling */
        @media (max-width: 768px) {
          .text-flip-wrapper {
            font-size: 1.25rem;
          }

          .text-flip-word-container {
            min-width: 120px;
            height: 1.25rem;
          }

          .text-flip-animation-container {
            padding: 1.5rem 0.5rem;
          }
        }

        @media (max-width: 480px) {
          .text-flip-wrapper {
            font-size: 1.125rem;
          }

          .text-flip-word-container {
            min-width: 100px;
            height: 1.125rem;
          }

          .text-flip-animation-container {
            padding: 1rem 0.25rem;
          }
        }

        /* Large screen optimizations */
        @media (min-width: 1024px) {
          .text-flip-wrapper {
            font-size: 1.75rem;
          }

          .text-flip-word-container {
            min-width: 160px;
            height: 1.75rem;
          }
        }

        @media (min-width: 1280px) {
          .text-flip-wrapper {
            font-size: 2rem;
          }

          .text-flip-word-container {
            min-width: 180px;
            height: 2rem;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .text-flip-word {
            transition: none;
            animation: none;
          }

          .text-flip-word.exiting,
          .text-flip-word.entering {
            transform: translateY(0);
            opacity: 1;
          }

          @keyframes slideInFromBottom {
            from,
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .text-flip-word {
            color: var(--accent-teal-light);
            text-shadow: 0 0 2px var(--background);
          }
        }

        /* Focus styles for accessibility */
        .text-flip-animation-container:focus-visible {
          outline: 2px solid var(--accent-teal);
          outline-offset: 4px;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};

export default TextFlipAnimation;
