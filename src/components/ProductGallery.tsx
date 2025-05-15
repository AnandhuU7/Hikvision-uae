"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageItem {
  image: {
    url: string;
  };
  alt: string;
}

interface ProductGalleryProps {
  images: ImageItem[];
  productId?: string; // Optional to maintain backward compatibility
  productTitle?: string;
}

export default function ProductGallery({ images, productId, productTitle }: ProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Check wishlist status on load
  useEffect(() => {
    if (!productId) return;
    
    try {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setIsFavorite(wishlist.some((item: {id: string}) => item.id === productId));
    } catch (error) {
      console.error('Error checking wishlist:', error);
    }
  }, [productId]);
  
  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!productId) return;
    
    try {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      
      if (isFavorite) {
        // Remove from wishlist
        const updatedWishlist = wishlist.filter((item: {id: string}) => item.id !== productId);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      } else {
        // Add to wishlist
        wishlist.push({
          id: productId,
          title: productTitle || 'Product',
          addedAt: new Date().toISOString()
        });
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
      }
      
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };
  
  if (!images.length || !images[0].image.url) {
    return <div className="h-[500px] bg-gray-100 flex items-center justify-center">No images available</div>;
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div>
      <div className="relative">
        <div className="relative h-[500px] bg-white border rounded overflow-hidden">
          <Image 
            src={images[currentImageIndex].image.url}
            alt={images[currentImageIndex].alt || 'Product image'}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          
          {images.length > 1 && (
            <>
              <button 
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 rounded-full p-2 z-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </button>
              <button 
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 rounded-full p-2 z-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
            </>
          )}
        </div>
        
        {/* Only Heart Icon - Grid Icon Removed */}
        <div className="absolute top-2 right-2">
          <button 
            onClick={toggleWishlist}
            className="bg-white shadow hover:shadow-md p-2 rounded-full transition-all duration-200"
            aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill={isFavorite ? "currentColor" : "none"} 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={isFavorite ? "text-red-600" : "text-gray-700"}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>
      
      {images.length > 1 && (
        <div className="flex gap-2 mt-4 justify-center">
          {images.map((image, index) => (
            <div 
              key={index} 
              onClick={() => handleThumbnailClick(index)}
              className={`w-16 h-16 border rounded cursor-pointer ${
                currentImageIndex === index ? 'border-red-600 border-2' : 'hover:border-red-500'
              }`}
            >
              <div className="relative h-full w-full">
                <Image 
                  src={image.image.url} 
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-contain p-1"
                  sizes="64px"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}