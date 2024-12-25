
"use client";
import React, { useState, useEffect, useRef } from "react";

const ImageSlideshow = ({ images, selectedColor }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const previewContainerRef = useRef(null);

  // Find the initial index based on the selected color
  useEffect(() => {
    const index = images.findIndex((image) => image.color === selectedColor);
    if (index !== -1) setCurrentIndex(index);
  }, [selectedColor, images]);

  // Scroll to the active thumbnail
  useEffect(() => {
    if (previewContainerRef.current && images.length > 0) {
      const previewContainer = previewContainerRef.current;
      const activeThumbnail = previewContainer.children[currentIndex];
      if (activeThumbnail) {
        previewContainer.scrollTo({
          left:
            activeThumbnail.offsetLeft -
            previewContainer.offsetWidth / 2 +
            activeThumbnail.offsetWidth / 2,
          behavior: "smooth",
        });
      }
    }
  }, [currentIndex, images]);

  return (
    <div className="max-w-md mx-auto">
      {/* Main Image */}
      <div className="relative">
        <img
          src={images[currentIndex]?.url}
          alt={`Slide ${currentIndex}`}
          className="w-full h-96 object-cover rounded-md"
        />
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrentIndex((currentIndex - 1 + images.length) % images.length)
              }
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-300 p-2 rounded-full hover:bg-gray-400 focus:outline-none"
            >
              &lt;
            </button>
            <button
              onClick={() =>
                setCurrentIndex((currentIndex + 1) % images.length)
              }
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-300 p-2 rounded-full hover:bg-gray-400 focus:outline-none"
            >
              &gt;
            </button>
          </>
        )}
      </div>

      {/* Image Previews */}
      <div
        ref={previewContainerRef}
        className="flex justify-center overflow-x-auto space-x-2 mt-4 scrollbar-hide"
      >
        {images.map((imageObj, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="flex flex-col items-center cursor-pointer"
          >
            <img
              src={imageObj.url}
              alt={`Preview ${index}`}
              className={`w-16 h-16 object-cover rounded-md transition-transform duration-200 ${
                currentIndex === index
                  ? "bg-black scale-105"
                  : "hover:opacity-75"
              }`}
            />
            {/* <span
              className={`text-sm mt-1 ${
                currentIndex === index ? "font-bold text-gray-800" : "text-gray-500"
              }`}
            >
              {imageObj.color}
            </span> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlideshow;
