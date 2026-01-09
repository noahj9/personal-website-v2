"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { ImageModalProps } from "@/types";

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  image,
  onClose,
  onNext,
  onPrevious,
}) => {
  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowRight" && onNext) {
        onNext();
      } else if (event.key === "ArrowLeft" && onPrevious) {
        onPrevious();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, onNext, onPrevious]);

  // Handle backdrop click
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !image) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="relative max-w-6xl max-h-full w-full animate-slide-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 text-white hover:text-accent-teal text-2xl sm:text-3xl font-light transition-colors duration-200 bg-black/50 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center backdrop-blur-sm"
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Navigation Arrows */}
        {onPrevious && (
          <button
            onClick={onPrevious}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-accent-teal text-3xl sm:text-4xl font-light transition-colors duration-200 bg-black/50 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center backdrop-blur-sm"
            aria-label="Previous image"
          >
            ‹
          </button>
        )}

        {onNext && (
          <button
            onClick={onNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-accent-teal text-3xl sm:text-4xl font-light transition-colors duration-200 bg-black/50 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center backdrop-blur-sm"
            aria-label="Next image"
          >
            ›
          </button>
        )}

        {/* Image Container */}
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <div className="relative max-w-full max-h-[70vh] sm:max-h-[80vh] w-full">
            <Image
              src={`/assets/images/${image.imageUrl}`}
              alt={image.title}
              width={1200}
              height={800}
              className="max-w-full max-h-[70vh] sm:max-h-[80vh] object-contain mx-auto"
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
            />
          </div>

          {/* Caption */}
          <div className="text-center mt-4 sm:mt-6 max-w-2xl px-2 sm:px-4">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2">
              {image.title}
            </h3>
            <p className="text-foreground-secondary text-sm sm:text-base leading-relaxed">
              {image.description}
            </p>
            <p className="text-foreground-muted text-xs sm:text-sm mt-2">
              {new Date(image.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Mobile swipe hint */}
          <div className="sm:hidden absolute bottom-4 left-1/2 -translate-x-1/2 text-foreground-muted text-xs">
            Swipe or use arrows to navigate
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
