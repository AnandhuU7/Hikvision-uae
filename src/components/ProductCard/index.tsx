'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  slug: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  imageUrl,
  slug,
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
      className="bg-white border border-gray-200 rounded-lg overflow-hidden h-full flex flex-col shadow-sm"
    >
      {/* Product Image Container */}
      <div className="relative aspect-video w-full">
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt={title} 
            fill 
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
        
        {/* Even Smaller Product Badge */}
        <div className="absolute top-1 left-1 bg-red-600 text-white text-[8px] font-medium px-1 py-0.5 rounded-sm leading-none shadow-sm max-w-[90px] truncate">
          {title}
        </div>
      </div>
      
      {/* Product Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-1">{description}</p>
        
        {/* Learn More Button */}
        <Link href={`/network-products/${slug}`} className="mt-auto block">
          <button className="bg-white border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-200 py-2 px-4 rounded w-full flex items-center justify-center">
            Learn More
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-1" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </button>
        </Link>
      </div>
    </motion.div>
  );
};