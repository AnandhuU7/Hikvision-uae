import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { FaShieldAlt, FaCogs, FaLock, FaMobileAlt, FaChartBar, FaFire } from "react-icons/fa";
import img1 from '../../../public/manufacture/1.jpg';
import img2 from '../../../public/manufacture/2.jpg';
import img3 from '../../../public/manufacture/3.jpg';

// Manufacturing Schema
const manufacturingSchema = {
  "@context": "https://schema.org",
  "@type": ["Service", "Product"],
  "@id": "https://hikvisionuae.ae/Manufacturing",
  "name": "Hikvision Manufacturing Security Solutions",
  "headline": "Hikvision Security Solutions for Manufacturing in UAE",
  "description": "Advanced surveillance and security systems for manufacturing excellence. Discover Hikvision's comprehensive security solutions for manufacturing facilities across UAE.",
  "brand": {
    "@type": "Brand",
    "name": "Hikvision"
  },
  "image": {
    "@type": "ImageObject",
    "url": "https://hikvisionuae.ae/images/manufacturing-security.jpg",
    "width": 1200,
    "height": 630
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://hikvisionuae.ae/Manufacturing"
  },
  "datePublished": "2024-01-01T08:00:00+04:00",
  "dateModified": "2024-03-19T08:00:00+04:00",
  "keywords": [
    "hikvision Uae",
    "Hikvision",
    "Hikvision UAE",
    "Security Solutions for uae",
    "manufacturing security uae",
    "manufacturing security in dubai",
    "manufacturing security in uae",
    "Hikvision Dubai",
    "Hikvision Sharjah",
    "Hikvision Ajman",
    "Hikvision Fujairah",
    "Hikvision Ras Al Khaimah",
    "Hikvision Umm Al Quwain",
    "Hikvision Abu Dhabi",
    "Hikvision manufacturing security",
    "industrial security cameras UAE",
    "manufacturing surveillance Dubai",
    "thermal cameras UAE",
    "PTZ cameras manufacturing",
    "AI security solutions UAE",
    "factory security systems Dubai",
    "factory security systems UAE"
  ],
  "serviceType": "Manufacturing Security Solutions",
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
    "@type": "AggregateOffer",
    "priceCurrency": "AED",
    "price": "1999",
    "minPrice": "1999",
    "maxPrice": "9999",
    "offerCount": "5",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "156",
    "bestRating": "5",
    "worstRating": "1"
  }
};

// Add FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the best security cameras for manufacturing facilities?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hikvision offers advanced industrial security cameras such as PTZ cameras, thermal imaging cameras, and AI-powered surveillance systems tailored for manufacturing environments."
      }
    },
    {
      "@type": "Question",
      "name": "Can Hikvision security systems integrate with access control in factories?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Hikvision security solutions integrate seamlessly with access control systems to restrict unauthorized access and enhance manufacturing facility security."
      }
    }
  ]
};

const iconList = [
  <FaShieldAlt className="text-[#8B1818] text-3xl mb-2" />,
  <FaCogs className="text-[#8B1818] text-3xl mb-2" />,
  <FaLock className="text-[#8B1818] text-3xl mb-2" />,
  <FaMobileAlt className="text-[#8B1818] text-3xl mb-2" />,
  <FaChartBar className="text-[#8B1818] text-3xl mb-2" />,
  <FaFire className="text-[#8B1818] text-3xl mb-2" />,
];

const features = [
  {
    title: "Enhanced Security Monitoring",
    description: "Advanced CCTV and AI-powered surveillance for 24/7 monitoring, real-time threat detection, and comprehensive coverage across manufacturing facilities."
  },
  {
    title: "Smart Video Analytics",
    description: "Deep learning analytics for automated incident detection, people counting, and behavioral analysis to improve operational intelligence."
  },
  {
    title: "Integrated Access Control",
    description: "Seamless integration of access control with CCTV to ensure only authorized personnel access sensitive areas."
  },
  {
    title: "Remote Monitoring",
    description: "Access real-time footage and alerts from anywhere via mobile apps and cloud solutions for proactive management."
  },
  {
    title: "Operational Insights",
    description: "Gain actionable insights into facility operations, safety compliance, and workflow optimization through intelligent analytics."
  },
  {
    title: "Early Fire & Hazard Detection",
    description: "Thermal imaging and smart sensors for early fire, smoke, and hazard detection to protect assets and personnel."
  }
];

const Manufacturing = () => {
  return (
    <>
      <Head>
        <title>Hikvision UAE - Manufacturing Security Solutions</title>
        <meta name="description" content="Hikvision UAE: Advanced security solutions for manufacturing. CCTV, access control, and AI surveillance for factories in Dubai & UAE." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="hikvision uae, manufacturing security, cctv dubai, factory surveillance, industrial security uae" />
        <meta property="og:title" content="Hikvision UAE - Manufacturing Security Solutions" />
        <meta property="og:description" content="Advanced security and surveillance for manufacturing in UAE. CCTV, access control, and AI solutions for factories." />
        <meta property="og:image" content="https://hikvisionuae.ae/images/manufacturing-security.jpg" />
        <meta property="og:url" content="https://hikvisionuae.ae/Manufacturing" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hikvision UAE - Manufacturing Security Solutions" />
        <meta name="twitter:description" content="Advanced security and surveillance for manufacturing in UAE." />
        <meta name="twitter:image" content="https://hikvisionuae.ae/images/manufacturing-security.jpg" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://hikvisionuae.ae/Manufacturing" />
        <meta name="geo.region" content="AE" />
        <meta name="geo.placename" content="Dubai" />
        <meta name="geo.position" content="25.2048;55.2708" />
        <meta name="ICBM" content="25.2048, 55.2708" />
      </Head>

      <Script
        id="manufacturing-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(manufacturingSchema) }}
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
              Manufacturing Security
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#8B1818] mb-4 drop-shadow">
            Hikvision Solutions for <span className="text-black">Manufacturing</span> in UAE
          </h1>
          <p className="text-base sm:text-lg text-gray-700 font-light w-full max-w-5xl mx-auto mb-6">
            Secure your factory with advanced surveillance, access control, and AI-powered monitoring. Trusted by UAE industries for reliability and innovation.
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
            Security for Modern Manufacturing
          </h2>
          <p className="text-lg text-gray-700">
            Hikvision delivers robust, scalable security solutions tailored for manufacturing environments in the UAE. Our systems combine high-definition cameras, AI analytics, and integrated access control to protect assets, ensure safety, and optimize operations.
          </p>
        </div>
      </section>

      {/* SOLUTIONS GRID */}
      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Solution 1 */}
          <div className="group relative bg-white/90 border border-[#8B1818]/20 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:border-[#8B1818]">
            <div className="relative h-48 flex items-center justify-center bg-gradient-to-t from-red-50 via-white to-white rounded-t-3xl">
              <img
                src={img1.src}
                alt="Thermal Imaging Cameras"
                className="object-cover w-full h-full rounded-t-3xl"
                loading="lazy"
              />
              <div className="absolute top-4 right-4 text-xs font-semibold text-[#8B1818] uppercase tracking-wider">
                Solution 1
              </div>
            </div>
            <div className="p-6 flex flex-col justify-between h-full">
              <div>
                <h4 className="text-xl font-semibold text-[#8B1818] mb-2">
                  Thermal Imaging Cameras
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  24/7 temperature monitoring and early fire detection for industrial safety and asset protection.
                </p>
              </div>
              <div className="mt-4">
                <a
                  href="#features"
                  className="inline-block text-[#8B1818] text-sm font-semibold hover:underline"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
          {/* Solution 2 */}
          <div className="group relative bg-white/90 border border-[#8B1818]/20 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:border-[#8B1818]">
            <div className="relative h-48 flex items-center justify-center bg-gradient-to-t from-red-50 via-white to-white rounded-t-3xl">
              <img
                src={img2.src}
                alt="PTZ Surveillance Systems"
                className="object-cover w-full h-full rounded-t-3xl"
                loading="lazy"
              />
              <div className="absolute top-4 right-4 text-xs font-semibold text-[#8B1818] uppercase tracking-wider">
                Solution 2
              </div>
            </div>
            <div className="p-6 flex flex-col justify-between h-full">
              <div>
                <h4 className="text-xl font-semibold text-[#8B1818] mb-2">
                  PTZ Surveillance Systems
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Pan-Tilt-Zoom cameras for 360° coverage, advanced zoom, and auto-tracking for perimeter security.
                </p>
              </div>
              <div className="mt-4">
                <a
                  href="#features"
                  className="inline-block text-[#8B1818] text-sm font-semibold hover:underline"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
          {/* Solution 3 */}
          <div className="group relative bg-white/90 border border-[#8B1818]/20 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:border-[#8B1818]">
            <div className="relative h-48 flex items-center justify-center bg-gradient-to-t from-red-50 via-white to-white rounded-t-3xl">
              <img
                src={img3.src}
                alt="AI-Powered Smart Cameras"
                className="object-cover w-full h-full rounded-t-3xl"
                loading="lazy"
              />
              <div className="absolute top-4 right-4 text-xs font-semibold text-[#8B1818] uppercase tracking-wider">
                Solution 3
              </div>
            </div>
            <div className="p-6 flex flex-col justify-between h-full">
              <div>
                <h4 className="text-xl font-semibold text-[#8B1818] mb-2">
                  AI-Powered Smart Cameras
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Deep learning cameras for intelligent monitoring, PPE compliance, and advanced analytics.
                </p>
              </div>
              <div className="mt-4">
                <a
                  href="#features"
                  className="inline-block text-[#8B1818] text-sm font-semibold hover:underline"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section id="features" className="bg-gray-50 py-16">
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
};

export default Manufacturing;
