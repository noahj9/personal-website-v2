"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ImageGalleryProps, Photo } from "@/types";
import ImageModal from "./ImageModal";

const ImageGallery: React.FC<ImageGalleryProps> = ({ photos }) => {
  const [selectedImage, setSelectedImage] = useState<Photo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (photo: Photo) => {
    setSelectedImage(photo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleNextImage = () => {
    if (!selectedImage) return;
    const currentIndex = photos.findIndex((p) => p.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % photos.length;
    setSelectedImage(photos[nextIndex]);
  };

  const handlePreviousImage = () => {
    if (!selectedImage) return;
    const currentIndex = photos.findIndex((p) => p.id === selectedImage.id);
    const previousIndex =
      currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
    setSelectedImage(photos[previousIndex]);
  };

  // Create a masonry layout with dynamic sizing
  const getGridItemClass = (index: number) => {
    // Use different patterns based on screen size
    // For mobile (2 columns), use simpler patterns
    if (index % 8 === 0)
      return "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2"; // Large every 8th
    if (index % 5 === 0)
      return "col-span-1 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-2"; // Tall every 5th
    if (index % 3 === 0)
      return "col-span-2 row-span-1 sm:col-span-2 sm:row-span-1 md:col-span-2 md:row-span-1"; // Wide every 3rd
    return "col-span-1 row-span-1"; // Regular for others
  };

  return (
    <div>
      {/* Navbar spacer - matches navbar height */}
      <div className="h-20"></div>

      {/* Section Header - matching other sections */}
      <div
        className="mb-12 sm:mb-16 text-center lg:text-left"
        style={{ marginBottom: "2.5rem" }}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
          <span className="text-accent-teal font-autography">/</span>gallery
        </h2>
      </div>

      {/* Masonry Grid Layout - Responsive columns with improved spacing */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[120px] sm:auto-rows-[150px] md:auto-rows-[180px] lg:auto-rows-[200px] gap-2 sm:gap-3 md:gap-4">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className={`${getGridItemClass(
              index
            )} relative group cursor-pointer overflow-hidden rounded-lg bg-background-secondary hover:scale-[1.02] transition-all duration-300 hover:shadow-lg hover:shadow-accent-teal/10`}
            onClick={() => handleImageClick(photo)}
          >
            {/* Image */}
            <Image
              src={`/assets/images/${photo.imageUrl}`}
              alt={photo.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />

            {/* Hover Overlay with Title */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <div className="p-2 sm:p-3 md:p-4 w-full">
                <h3 className="text-white font-semibold text-xs sm:text-sm md:text-base line-clamp-2 leading-tight">
                  {photo.title}
                </h3>
                <p className="text-gray-300 text-xs mt-1 line-clamp-1">
                  {new Date(photo.date).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Click indicator */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black/50 rounded-full p-1 sm:p-1.5 md:p-2">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {photos.length === 0 && (
        <div className="text-center py-16 sm:py-20">
          <p className="text-foreground-secondary text-base sm:text-lg">
            No photos to display
          </p>
        </div>
      )}

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        image={selectedImage}
        onClose={handleCloseModal}
        onNext={handleNextImage}
        onPrevious={handlePreviousImage}
      />
    </div>
  );
};

export default ImageGallery;
