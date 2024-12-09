"use client"
import React, { useState, useRef, useEffect } from "react";

const ImageSlideshow = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const previewContainerRef = useRef(null);

  // Scroll to the active thumbnail
  useEffect(() => {
    if (previewContainerRef.current) {
      const previewContainer = previewContainerRef.current;
      const activeThumbnail = previewContainer.children[currentIndex];
      previewContainer.scrollTo({
        left: activeThumbnail.offsetLeft - previewContainer.offsetWidth / 2 + activeThumbnail.offsetWidth / 2,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  return (
    <div className="max-w-md mx-auto">
      {/* Main Image */}
      <div className="relative">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className="w-full h-96 object-cover rounded-md"
        />
        {/* Navigation Arrows */}
        <button
          onClick={() =>
            setCurrentIndex((currentIndex - 1 + images.length) % images.length)
          }
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-300 p-2 rounded-full hover:bg-gray-400"
        >
          &lt;
        </button>
        <button
          onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-300 p-2 rounded-full hover:bg-gray-400"
        >
          &gt;
        </button>
      </div>

      {/* Image Previews */}
      <div
        ref={previewContainerRef}
        className="flex overflow-x-auto space-x-2 mt-4 scrollbar-hide"
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Preview ${index}`}
            onClick={() => setCurrentIndex(index)}
            className={`w-16 h-16 object-cover rounded-md cursor-pointer ${
              currentIndex === index ? "bg-accent-color-dark ring-gray-800" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const images = [
    "https://museoutfitters.in/wp-content/uploads/2024/12/IMG_5405-1536x1536.png",
    "https://museoutfitters.in/wp-content/uploads/2024/12/IMG_5425.png",
    "https://museoutfitters.in/wp-content/uploads/2024/12/IMG_5463.png",
    "https://museoutfitters.in/wp-content/uploads/2024/12/IMG_5425.png",
    "https://museoutfitters.in/wp-content/uploads/2024/12/IMG_5425.png",
    "https://museoutfitters.in/wp-content/uploads/2024/12/IMG_5406.png",
    "https://museoutfitters.in/wp-content/uploads/2024/12/IMG_5425.png",
    "https://museoutfitters.in/wp-content/uploads/2024/12/IMG_5425.png",
    "https://museoutfitters.in/wp-content/uploads/2024/12/IMG_5425.png",
  ];

  return (
    <div className="p-4">
      <ImageSlideshow images={images} />
    </div>
  );
}
