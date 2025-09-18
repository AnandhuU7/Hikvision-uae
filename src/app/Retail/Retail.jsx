import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { FaVideo, FaUserShield, FaChartBar, FaLayerGroup } from "react-icons/fa";

// Retail Schema
const retailSchema = {
  "@context": "https://schema.org",
  "@type": ["Service", "Product"],
  "@id": "https://hikvisionuae.ae/Retail",
  "name": "Retail Security Solutions UAE",
  "headline": "Retail Security Solutions in UAE | Advanced Video Surveillance",
  "url": "https://hikvisionuae.ae/Retail",
  "description": "Advanced retail surveillance and security systems for stores in UAE. Comprehensive video monitoring, loss prevention, and business intelligence solutions.",
  "brand": {
    "@type": "Brand",
    "name": "Hikvision UAE"
  },
  "image": {
    "@type": "ImageObject",
    "url": "https://hikvisionuae.ae/images/retail-security.jpg",
    "width": 1200,
    "height": 630
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://hikvisionuae.ae/Retail"
  },
  "datePublished": "2024-01-01T08:00:00+04:00",
  "dateModified": "2024-03-19T08:00:00+04:00",
  "keywords": [
    "Hikvision",
    "Hikvision UAE",
    "Retail Security UAE",
    "store surveillance Dubai",
    "loss prevention cameras",
    "retail CCTV systems",
    "shop security cameras",
    "retail analytics UAE",
    "store monitoring Dubai",
    "retail loss prevention",
    "business intelligence cameras",
    "retail security solutions"
  ],
  "serviceType": "Retail Security Solutions",
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
  },
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "AED",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "minPrice": "1000.00",
      "maxPrice": "50000.00"
    },
    "seller": {
      "@type": "Organization",
      "name": "Hikvision UAE"
    },
    "hasMerchantReturnPolicy": {
      "@type": "MerchantReturnPolicy",
      "applicableCountry": "AE",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "merchantReturnDays": "30",
      "returnMethod": "https://schema.org/ReturnByMail"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "95"
  }
};

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the best security cameras for retail stores?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Advanced HD cameras with AI-powered analytics are ideal for retail stores, offering features like behavior analysis, theft prevention, and customer tracking capabilities."
      }
    },
    {
      "@type": "Question",
      "name": "How can video surveillance help prevent retail theft?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Modern surveillance systems use AI-powered cameras to detect suspicious behavior, monitor high-risk areas, and integrate with POS systems for comprehensive loss prevention."
      }
    }
  ]
};

const iconList = [
  <FaVideo className="text-[#8B1818] text-3xl mb-2" />,
  <FaUserShield className="text-[#8B1818] text-3xl mb-2" />,
  <FaChartBar className="text-[#8B1818] text-3xl mb-2" />,
  <FaLayerGroup className="text-[#8B1818] text-3xl mb-2" />,
];

const features = [
  {
    title: "Advanced Video Surveillance",
    description: "Deploy state-of-the-art HD cameras and NVR systems to monitor store activities, protect assets, and ensure customer safety across all retail locations."
  },
  {
    title: "Smart Loss Prevention",
    description: "Utilize AI-powered cameras with behavior analysis to detect suspicious activities, prevent theft, and reduce shrinkage in real-time."
  },
  {
    title: "Business Intelligence",
    description: "Leverage built-in analytics to track customer flow, analyze shopping patterns, and generate heat maps for optimized store layouts."
  },
  {
    title: "Integrated Security Solution",
    description: "Implement comprehensive security with integrated cameras, access control, POS integration, and remote monitoring capabilities."
  }
];

const Retail = () => {
  return (
    <>
      <Head>
        <title>Retail Security Solutions UAE | Hikvision UAE</title>
        <meta name="description" content="Advanced retail surveillance and security systems for stores in UAE. Comprehensive video monitoring, loss prevention, and business intelligence solutions." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="retail security uae, retail cctv, loss prevention, business intelligence, hikvision uae" />
        <meta property="og:title" content="Retail Security Solutions UAE | Hikvision UAE" />
        <meta property="og:description" content="Advanced retail surveillance and security systems for stores in UAE. Comprehensive video monitoring, loss prevention, and business intelligence solutions." />
        <meta property="og:image" content="https://hikvisionuae.ae/images/retail-security.jpg" />
        <meta property="og:url" content="https://hikvisionuae.ae/Retail" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Retail Security Solutions UAE | Hikvision UAE" />
        <meta name="twitter:description" content="Advanced retail surveillance and security systems for stores in UAE." />
        <meta name="twitter:image" content="https://hikvisionuae.ae/images/retail-security.jpg" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://hikvisionuae.ae/Retail" />
        <meta name="geo.region" content="AE" />
        <meta name="geo.placename" content="Dubai" />
        <meta name="geo.position" content="25.2048;55.2708" />
        <meta name="ICBM" content="25.2048, 55.2708" />
      </Head>

      <Script
        id="retail-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(retailSchema) }}
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
            Retail Security Solutions <span className="text-black">UAE</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-700 font-light w-full max-w-5xl mx-auto mb-6">
            Secure and Optimize Your Retail Space with Advanced Video Surveillance
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
            Advanced Retail Surveillance Solutions
          </h2>
          <p className="text-lg text-gray-700">
            Modern retail security demands have evolved. Our comprehensive range of security cameras and surveillance systems provide cutting-edge protection, featuring AI-powered analytics, high-resolution monitoring, and smart retail solutions designed for the modern retail environment in the UAE.
          </p>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section id="features" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-[#8B1818] mb-10">
            Features &amp; Benefits
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
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
};

export default Retail;
