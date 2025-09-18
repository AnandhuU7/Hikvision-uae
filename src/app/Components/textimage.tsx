'use client';
import React from 'react';
import Image from 'next/image';
import img from '../../../public/banner2.jpg';
import Head from 'next/head';
import Script from 'next/script';

// Schema for the section
const textImageSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Hikvision Security Solutions UAE",
  "description": "Experience cutting-edge security technology with Hikvision in the UAE. Comprehensive security solutions featuring advanced surveillance systems, smart cameras, and integrated security platforms.",
  "brand": {
    "@type": "Brand",
    "name": "Hikvision"
  },
  "image": img.src,
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "AED",
    "price": "199.00",
    "priceValidUntil": "2025-12-31",
    "seller": {
      "@type": "Organization",
      "name": "Hikvision UAE"
    }
  },
  "provider": {
    "@type": "Organization",
    "name": "Hikvision UAE",
    "url": "https://hikvisionuae.ae"
  }
};

const TextImage = () => {
  return (
    <>
      <Head>
        <title>Hikvision UAE | Leading Security Solutions Provider</title>
        <meta
          name="description"
          content="Experience cutting-edge security technology with Hikvision in the UAE. Professional security solutions, surveillance systems, and technical support available."
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="Hikvision UAE | Leading Security Solutions Provider" />
        <meta property="og:description" content="Experience cutting-edge security technology with Hikvision in the UAE. Professional security solutions and support available." />
        <meta property="og:image" content={img.src} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hikvision UAE | Security Solutions Provider" />
        <meta name="twitter:description" content="Experience cutting-edge security technology with Hikvision in the UAE." />
        <meta name="twitter:image" content={img.src} />
        
        {/* Additional SEO */}
        <meta name="keywords" content="Hikvision UAE, security solutions UAE, surveillance systems Dubai, CCTV cameras UAE, security cameras Dubai, Hikvision distributor UAE" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://hikvisionuae.ae" />
      </Head>

      <Script
        id="textimage-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(textImageSchema) }}
      />

      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-14">
            {/* Image Section */}
            <div
              className="w-full md:w-1/2 flex justify-center"
            >
              <div className="relative rounded-3xl overflow-hidden border-4 border-red-100 group transition-all duration-300 hover:scale-[1.03]">
                <Image
                  src={img.src}
                  alt="Hikvision Security Solutions"
                  width={1000}
                  height={450}
                  className="w-full h-[350px] object-cover rounded-2xl"
                  priority
                  quality={90}
                />
              </div>
            </div>

            {/* Content Section */}
            <div
              className="w-full md:w-1/2 space-y-7 md:ml-[-96px]" // Further increased negative left margin
            >
              <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-400 to-black">Hikvision UAE</span>{' '}
                <span className="text-black">Security Solutions</span>
              </h2>
              <p className="text-lg text-gray-800 leading-relaxed">
                Experience <span className="text-red-600 font-semibold">cutting-edge security technology</span> with Hikvision in the UAE. We provide comprehensive security solutions featuring advanced surveillance systems, smart cameras, and integrated security platforms designed for the unique needs of UAE businesses and properties.
              </p>
              <div
                className="bg-white/80 border border-red-100 rounded-2xl shadow p-6"
              >
                <p className="text-black font-semibold mb-3">Choose Hikvision UAE for:</p>
                <ul className="list-none space-y-3">
                  <li className="flex items-center gap-3">
                    <span className="inline-block w-3 h-3 rounded-full bg-gradient-to-br from-red-600 to-red-400" />
                    <span>Complete range of Hikvision products</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-block w-3 h-3 rounded-full bg-gradient-to-br from-red-600 to-red-400" />
                    <span>Professional system integration</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-block w-3 h-3 rounded-full bg-gradient-to-br from-red-600 to-red-400" />
                    <span>Local technical support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-block w-3 h-3 rounded-full bg-gradient-to-br from-red-600 to-red-400" />
                    <span>Customized security solutions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Animations */}
      </section>
    </>
  );
};

export default TextImage;
