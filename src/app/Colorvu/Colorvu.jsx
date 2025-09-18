import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { FaEye, FaSun, FaCity, FaTools, FaClock, FaBuilding } from "react-icons/fa";

// ColorVu Schema
const colorvuSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://hikvisionuae.ae/Colorvu",
  "name": "Hikvision ColorVu Security Cameras",
  "headline": "Hikvision ColorVu Technology in UAE",
  "description": "24/7 full-color surveillance cameras optimized for UAE. Superior low-light performance, weather-resistant, and ideal for Dubai’s security needs.",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "150",
    "bestRating": "5",
    "worstRating": "1"
  },
  "brand": {
    "@type": "Brand",
    "name": "Hikvision"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://hikvisionuae.ae/Colorvu"
  },
  "datePublished": "2024-01-01T08:00:00+04:00",
  "dateModified": "2024-03-19T08:00:00+04:00",
  "image": {
    "@type": "ImageObject",
    "url": "https://hikvisionuae.ae/images/colorvu-security.jpg",
    "width": 1200,
    "height": 630
  },
  "keywords": [
    "Hikvision ColorVu",
    "ColorVu UAE",
    "ColorVu Dubai",
    "full-color cameras UAE",
    "low-light CCTV Dubai",
    "security solutions UAE",
    "ColorVu installation UAE",
    "Hikvision distributor UAE"
  ],
  "serviceType": "Full-Color Surveillance Solutions",
  "provider": {
    "@type": "Organization",
    "name": "Hikvision UAE",
    "url": "https://hikvisionuae.ae",
    "logo": {
      "@type": "ImageObject",
      "url": "https://hikvisionuae.ae/images/hikvision-logo.jpg"
    }
  },
  "offers": {
    "@type": "AggregateOffer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "AED",
    "priceValidUntil": "2025-12-31",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "minPrice": 800,
      "maxPrice": 7000,
      "priceCurrency": "AED"
    },
    "seller": {
      "@type": "Organization",
      "name": "Hikvision UAE"
    }
  }
};

const iconList = [
  <FaEye className="text-[#8B1818] text-3xl mb-2" />,
  <FaSun className="text-[#8B1818] text-3xl mb-2" />,
  <FaCity className="text-[#8B1818] text-3xl mb-2" />,
  <FaTools className="text-[#8B1818] text-3xl mb-2" />,
  <FaClock className="text-[#8B1818] text-3xl mb-2" />,
  <FaBuilding className="text-[#8B1818] text-3xl mb-2" />,
];

const features = [
  {
    title: "24/7 Full-Color Surveillance",
    description: "ColorVu cameras deliver vivid, full-color images day and night, ensuring critical details are always visible for enhanced security in any UAE environment."
  },
  {
    title: "Desert-Optimized Performance",
    description: "Engineered for the UAE’s climate, ColorVu’s advanced lenses and sensors provide reliable performance in intense sunlight and low-light conditions."
  },
  {
    title: "Smart Environmental Lighting",
    description: "Intelligent supplemental lighting adapts to ambient conditions, offering optimal visibility while blending with modern UAE architecture."
  },
  {
    title: "Easy Installation & Local Support",
    description: "Our Dubai-based team provides professional installation and ongoing support, ensuring your ColorVu system operates flawlessly."
  },
  {
    title: "Continuous Monitoring",
    description: "Ideal for round-the-clock business and residential security, ColorVu ensures uninterrupted surveillance with high clarity."
  },
  {
    title: "Versatile UAE Applications",
    description: "Perfect for malls, hotels, communities, and smart city projects across the UAE where reliable color surveillance is essential."
  }
];

const Colorvu = () => {
  return (
    <>
      <Head>
        <title>Hikvision ColorVu UAE | Full-Color Security Cameras Dubai</title>
        <meta name="description" content="Hikvision ColorVu: 24/7 full-color CCTV cameras for Dubai & UAE. Superior low-light performance, weather-resistant, and ideal for all security needs. Get a quote!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="hikvision colorvu, colorvu uae, colorvu dubai, full-color cctv uae, security cameras dubai, hikvision distributor uae" />
        <meta property="og:title" content="Hikvision ColorVu UAE - Full-Color Security Cameras" />
        <meta property="og:description" content="24/7 full-color surveillance for Dubai & UAE. Advanced ColorVu technology for unmatched security." />
        <meta property="og:image" content="https://hikvisionuae.ae/images/colorvu-security.jpg" />
        <meta property="og:url" content="https://hikvisionuae.ae/Colorvu" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hikvision ColorVu UAE - Full-Color Security Cameras" />
        <meta name="twitter:description" content="24/7 full-color surveillance for Dubai & UAE. Advanced ColorVu technology for unmatched security." />
        <meta name="twitter:image" content="https://hikvisionuae.ae/images/colorvu-security.jpg" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://hikvisionuae.ae/Colorvu" />
        <meta name="geo.region" content="AE" />
        <meta name="geo.placename" content="Dubai" />
        <meta name="geo.position" content="25.2048;55.2708" />
        <meta name="ICBM" content="25.2048, 55.2708" />
      </Head>

      <Script
        id="colorvu-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(colorvuSchema) }}
      />

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-white via-red-50 to-red-100 py-10 px-4 sm:px-0 border-b border-red-200">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="mb-4">
            <span className="inline-block px-5 py-1.5 bg-[#8B1818] text-white rounded-full text-xs font-bold tracking-widest uppercase shadow-lg">
              Hikvision ColorVu
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#8B1818] mb-4 drop-shadow">
            Hikvision ColorVu in <span className="text-black">UAE</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-700 font-light w-full max-w-5xl mx-auto mb-6">
            Official Hikvision ColorVu Partner in Dubai &amp; Across UAE
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {iconList.map((icon, index) => (
              <div key={index} className="flex flex-col items-center">
                {icon}
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                  {features[index]?.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              Why Choose Hikvision ColorVu?
            </h2>
            <p className="text-lg text-gray-600">
              Hikvision ColorVu technology is your ultimate solution for comprehensive surveillance in Dubai and the wider UAE. Discover the key features that make ColorVu the preferred choice for security professionals.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#8B1818] text-white mr-4">
                    {iconList[index]}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Colorvu;
