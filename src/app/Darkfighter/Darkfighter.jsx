import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { FaShieldAlt, FaMoon, FaCity, FaTools, FaClock, FaBuilding } from "react-icons/fa";

// Darkfighter Schema (update as needed)
const darkfighterSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://hikvisionuae.ae/Darkfighter",
  "name": "Hikvision DarkFighter Security Cameras",
  "headline": "Hikvision DarkFighter Technology in UAE",
  "description": "Advanced low-light security solutions optimized for the UAE. Superior night vision capabilities. Get a demo today!",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  },
  "brand": {
    "@type": "Brand",
    "name": "Hikvision"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://hikvisionuae.ae/Darkfighter"
  },
  "datePublished": "2024-01-01T08:00:00+04:00",
  "dateModified": "2024-03-19T08:00:00+04:00",
  "image": {
    "@type": "ImageObject",
    "url": "https://hikvisionuae.ae/images/darkfighter-security.jpg",
    "width": 1200,
    "height": 630
  },
  "keywords": [
    "Hikvision",
    "Hikvision UAE",
    "DarkFighter UAE",
    "night vision cameras UAE",
    "low light security Dubai",
    "DarkFighter technology Gulf",
    "Hikvision DarkFighter Distributor UAE"
  ],
  "serviceType": "Low-Light Security Solutions",
  "provider": {
    "@type": "Organization",
    "name": "Hikvision UAE",
    "url": "https://hikvisionuae.ae",
    "logo": {
      "@type": "ImageObject",
      "url": "https://hikvisionuae.ae/images/hikvision-logo.jpg"
    },
    "sameAs": [
      "https://www.linkedin.com/company/hikvision",
      "https://twitter.com/hikvision"
    ]
  }
};

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Hikvision DarkFighter?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DarkFighter is Hikvision's advanced low-light camera technology, delivering clear images in near-total darkness—ideal for UAE's security needs."
      }
    },
    {
      "@type": "Question",
      "name": "Where can DarkFighter cameras be used?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "They are perfect for commercial, residential, and public spaces across the UAE, especially where night vision is critical."
      }
    }
  ]
};

const iconList = [
  <FaShieldAlt className="text-[#8B1818] text-3xl mb-2" />,
  <FaMoon className="text-[#8B1818] text-3xl mb-2" />,
  <FaCity className="text-[#8B1818] text-3xl mb-2" />,
  <FaTools className="text-[#8B1818] text-3xl mb-2" />,
  <FaClock className="text-[#8B1818] text-3xl mb-2" />,
  <FaBuilding className="text-[#8B1818] text-3xl mb-2" />,
];

const features = [
  {
    title: "Certified Night Vision",
    description: "DarkFighter cameras deliver full-color images in extremely low-light conditions, ensuring round-the-clock security for UAE businesses and homes."
  },
  {
    title: "Low-Light Performance",
    description: "Engineered for the Gulf's challenging environments, these cameras excel in dusty, low-light, and nighttime scenarios."
  },
  {
    title: "Smart City Ready",
    description: "Seamlessly integrates with urban surveillance and smart city platforms, supporting Dubai and UAE's security vision."
  },
  {
    title: "Professional Installation",
    description: "Expert setup and maintenance by certified Hikvision partners across the Emirates for maximum reliability."
  },
  {
    title: "24/7 Monitoring",
    description: "Continuous surveillance with advanced motion detection and instant alerts, ideal for critical infrastructure."
  },
  {
    title: "Versatile Applications",
    description: "From ports to residential compounds, DarkFighter adapts to diverse UAE security needs with superior clarity."
  }
];

const Darkfighter = () => (
  <>
    <Head>
      <title>Hikvision UAE - DarkFighter Night Vision Security Cameras</title>
      <meta name="description" content="Hikvision UAE: Official distributor of DarkFighter night vision security cameras. Advanced low-light surveillance for Dubai, Abu Dhabi & across UAE." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content="hikvision uae, darkfighter uae, night vision camera dubai, low light cctv uae, security solutions uae" />
      <meta property="og:title" content="Hikvision UAE - DarkFighter Night Vision Security Cameras" />
      <meta property="og:description" content="Official Hikvision UAE distributor. DarkFighter night vision cameras for advanced low-light security in Dubai & UAE." />
      <meta property="og:image" content="https://hikvisionuae.ae/images/darkfighter-security.jpg" />
      <meta property="og:url" content="https://hikvisionuae.ae/Darkfighter" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Hikvision UAE - DarkFighter Night Vision Security Cameras" />
      <meta name="twitter:description" content="Advanced low-light security solutions for UAE. Get a demo of DarkFighter cameras today." />
      <meta name="twitter:image" content="https://hikvisionuae.ae/images/darkfighter-security.jpg" />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href="https://hikvisionuae.ae/Darkfighter" />
      <meta name="geo.region" content="AE" />
      <meta name="geo.placename" content="Dubai" />
      <meta name="geo.position" content="25.2048;55.2708" />
      <meta name="ICBM" content="25.2048, 55.2708" />
    </Head>

    <Script
      id="darkfighter-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(darkfighterSchema) }}
    />
    <Script
      id="faq-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />

    {/* HERO SECTION */}
    <section className="relative bg-gradient-to-br from-white via-red-50 to-red-100 py-10 px-4 sm:px-0 border-b border-red-200">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="mb-4">
          <span className="inline-block px-5 py-1.5 bg-[#8B1818] text-white rounded-full text-xs font-bold tracking-widest uppercase shadow-lg">
            Hikvision UAE
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#8B1818] mb-4 drop-shadow">
          Hikvision DarkFighter in <span className="text-black">UAE</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-700 font-light w-full max-w-5xl mx-auto mb-6">
          Official Distributor of DarkFighter Night Vision Cameras in Dubai &amp; Across UAE
        </p>
        <div className="flex justify-center">
          <span className="inline-block w-24 h-1 rounded-full bg-gradient-to-r from-[#8B1818] via-red-400 to-[#8B1818]"></span>
        </div>
        <a
          href="#features"
          className="mt-8 inline-block px-8 py-3 rounded-full bg-[#8B1818] text-white font-semibold shadow hover:bg-[#a83232] transition-colors"
        >
          Explore Features
        </a>
      </div>
    </section>

    {/* OVERVIEW */}
    <section className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#8B1818] mb-4">
          DarkFighter Solutions for UAE
        </h2>
        <p className="text-lg text-gray-700">
          Discover next-generation night vision security. Hikvision DarkFighter cameras are engineered for the UAE, delivering full-color images in near darkness. Trusted by businesses and government across Dubai, Abu Dhabi, and the Emirates.
        </p>
      </div>
    </section>

    {/* FEATURES GRID */}
    <section id="features" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-bold text-center text-[#8B1818] mb-10">
          Features &amp; Benefits
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group relative bg-white/90 border border-[#8B1818]/20 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:border-[#8B1818]"
            >
              <div className="relative h-32 flex items-center justify-center bg-gradient-to-t from-red-50 via-white to-white rounded-t-3xl">
                {iconList[idx]}
                <div className="absolute top-4 right-4 text-xs font-semibold text-[#8B1818] uppercase tracking-wider">
                  {`Feature ${idx + 1}`}
                </div>
              </div>
              <div className="p-6 flex flex-col justify-between h-full">
                <div>
                  <h4 className="text-xl font-semibold text-[#8B1818] mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="mt-4">
                  <a
                    href="#"
                    className="inline-block text-[#8B1818] text-sm font-semibold hover:underline"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Darkfighter;
