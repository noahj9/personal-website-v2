"use client";

import React, { useState } from "react";

export interface MailAnimationProps {
  onClick?: () => void;
  className?: string;
  enabled?: boolean;
}

const MailAnimation: React.FC<MailAnimationProps> = ({
  onClick,
  className = "",
  enabled = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default email contact functionality
      window.location.href = "mailto:njina.hba2025@ivey.ca";
    }
  };

  if (!enabled) {
    return null;
  }

  return (
    <div className={`mail-animation-container ${className}`}>
      <div
        className="mail-envelope"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        aria-label="Send email"
      >
        {/* Envelope Base */}
        <div className="envelope-base">
          {/* Envelope Body */}
          <div className="envelope-body" />

          {/* Envelope Flaps */}
          <div className="envelope-flap envelope-flap-left" />
          <div className="envelope-flap envelope-flap-right" />
          <div className="envelope-flap envelope-flap-top" />

          {/* Letter inside envelope */}
          <div className={`letter ${isHovered ? "letter-visible" : ""}`}>
            <div className="letter-content">
              <div className="letter-line letter-line-1" />
              <div className="letter-line letter-line-2" />
              <div className="letter-line letter-line-3" />
            </div>
          </div>
        </div>

        {/* Shadow */}
        <div
          className={`envelope-shadow ${isHovered ? "shadow-expanded" : ""}`}
        />
      </div>

      <style jsx>{`
        .mail-animation-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .mail-envelope {
          position: relative;
          cursor: pointer;
          transition: transform 0.3s ease;
          width: 120px;
          height: 80px;
        }

        .mail-envelope:hover {
          transform: translateY(-4px);
        }

        .mail-envelope:focus-visible {
          outline: 2px solid var(--accent-teal);
          outline-offset: 4px;
          border-radius: 8px;
        }

        .envelope-base {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .envelope-body {
          position: absolute;
          width: 100%;
          height: 100%;
          background: #e95f55;
          border-radius: 4px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          z-index: 1;
        }

        .envelope-flap {
          position: absolute;
          background: #d44a40;
          transition: transform 0.4s ease;
          z-index: 2;
        }

        .envelope-flap-left {
          width: 60px;
          height: 60px;
          left: 0;
          top: 0;
          clip-path: polygon(0 0, 100% 100%, 0 100%);
          transform-origin: 0 100%;
        }

        .envelope-flap-right {
          width: 60px;
          height: 60px;
          right: 0;
          top: 0;
          clip-path: polygon(0 100%, 100% 0, 100% 100%);
          transform-origin: 100% 100%;
        }

        .envelope-flap-top {
          width: 100%;
          height: 50px;
          top: 0;
          left: 0;
          clip-path: polygon(0 0, 50% 80%, 100% 0, 100% 100%, 0 100%);
          transform-origin: 50% 0;
          background: #c73e34;
        }

        .mail-envelope:hover .envelope-flap-left {
          transform: rotateY(-45deg);
        }

        .mail-envelope:hover .envelope-flap-right {
          transform: rotateY(45deg);
        }

        .mail-envelope:hover .envelope-flap-top {
          transform: rotateX(-180deg);
        }

        .letter {
          position: absolute;
          width: 80%;
          height: 70%;
          background: #f8f8f8;
          border-radius: 2px;
          top: 15%;
          left: 10%;
          z-index: 0;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.4s ease 0.2s;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .letter-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .letter-content {
          padding: 8px;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .letter-line {
          height: 2px;
          background: #333;
          border-radius: 1px;
        }

        .letter-line-1 {
          width: 80%;
        }

        .letter-line-2 {
          width: 60%;
        }

        .letter-line-3 {
          width: 70%;
        }

        .envelope-shadow {
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 20px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 50%;
          filter: blur(8px);
          transition: all 0.3s ease;
          z-index: 0;
        }

        .shadow-expanded {
          width: 120px;
          height: 25px;
          bottom: -12px;
          background: rgba(0, 0, 0, 0.3);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .mail-envelope {
            width: 100px;
            height: 66px;
          }

          .mail-animation-container {
            padding: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .mail-envelope {
            width: 80px;
            height: 53px;
          }

          .mail-animation-container {
            padding: 1rem;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .mail-envelope,
          .envelope-flap,
          .letter,
          .envelope-shadow {
            transition: none;
          }

          .mail-envelope:hover {
            transform: none;
          }

          .mail-envelope:hover .envelope-flap-left,
          .mail-envelope:hover .envelope-flap-right,
          .mail-envelope:hover .envelope-flap-top {
            transform: none;
          }

          .letter-visible {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
};

export default MailAnimation;
