import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { FaShieldAlt, FaUserCheck, FaChalkboardTeacher } from "react-icons/fa";
import img1 from '../../../public/education/1.jpg';
import img2 from '../../../public/education/2.jpg';

// Education Schema
const educationSchema = {
  "@context": "https://schema.org",
  "@type": ["Service", "Product"],
  "@id": "https://hikvisionuae.ae/Education",
  "name": "Education Security Solutions UAE",
  "headline": "Security Solutions for Educational Institutions in UAE",
  "description": "Advanced surveillance and security systems for educational institutions. Discover comprehensive security solutions for schools, colleges, and universities across UAE.",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://hikvisionuae.ae/Education"
  },
  "datePublished": "2024-01-01T08:00:00+04:00",
  "dateModified": "2024-03-19T08:00:00+04:00",
  "image": {
    "@type": "ImageObject",
    "url": "https://hikvisionuae.ae/images/education-security.jpg",
    "width": 1200,
    "height": 630
  },
  "keywords": [
    "education security UAE",
    "school security systems Dubai",
    "campus surveillance UAE",
    "smart classroom security",
    "school access control Dubai",
    "hikvision",
    "Hikvision UAE",
    "Hikvision Dubai",
    "Hikvision Abu Dhabi",
    "Hikvision Sharjah",
    "Hikvision Ajman",
    "Hikvision Fujairah",
    "Security Solutions for uae",
    "Security Solutions in uae",
    "Security Solutions in dubai",
    "Security Solutions in abu dhabi",
    "Security Solutions in sharjah",
    "Security Solutions in ajman",
    "Security Solutions in uae",
    "hikvision distributor uae",
    "hikvision supplier uae",
    "hikvision authorized distributor in uae",
    "hikvision support uae",
    "hikvision dubai",
    "hikvision middle east",
    "hikvision distributor uae",
    "hikvision uae",
    "hikvision security solutions uae",
    "hikvision security systems uae",
    "hikvision security cameras uae",
    "hikvision security systems dubai",
    "hikvision security cameras dubai",
    "hikvision security systems UAE",
    "hikvision security cameras UAE",
  ],
  "serviceType": "Education Security Solutions",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "156",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": {
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5",
      "bestRating": "5"
    },
    "author": {
      "@type": "Person",
      "name": "Mohammed Ahmed"
    },
    "datePublished": "2024-03-01",
    "reviewBody": "Excellent security solutions for our educational institution. The smart campus features have significantly improved our operational efficiency and safety measures."
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "AED",
    "price": "0",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2025-12-31",
    "hasMerchantReturnPolicy": false,
    "seller": {
      "@type": "Organization",
      "name": "Hikvision UAE"
    }
  },
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
};

// Add FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What security solutions are available for educational institutions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer comprehensive security solutions including smart surveillance systems, access control, attendance management, and emergency response systems designed specifically for educational environments."
      }
    },
    {
      "@type": "Question",
      "name": "How can smart campus solutions improve school security?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Smart campus solutions enhance security through integrated systems including automated attendance tracking, visitor management, perimeter security, and real-time monitoring capabilities."
      }
    }
  ]
};

const features = [
  {
    icon: <FaShieldAlt className="text-[#8B1818] text-3xl mb-2" />,
    title: "Advanced Security",
    description: "State-of-the-art surveillance systems with AI-powered threat detection and immediate response capabilities."
  },
  {
    icon: <FaUserCheck className="text-[#8B1818] text-3xl mb-2" />,
    title: "Smart Attendance",
    description: "Automated attendance tracking using facial recognition and mobile check-in systems for students and staff."
  },
  {
    icon: <FaChalkboardTeacher className="text-[#8B1818] text-3xl mb-2" />,
    title: "Smart Classrooms",
    description: "Interactive learning environments with integrated AV systems and automated environmental controls."
  }
];

const Education = () => {
  return (
    <>
      <Head>
        <title>Hikvision UAE - Official Security Solutions Provider | Education Security Systems</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Official Hikvision UAE dealer & distributor. Leading provider of education security systems, CCTV cameras, and smart campus solutions in Dubai, Abu Dhabi & across UAE. Best prices guaranteed." />
        <meta name="keywords" content="hikvision uae, hikvision dubai, hikvision dealer uae, hikvision distributor dubai, hikvision security camera uae, hikvision cctv dubai, hikvision education solutions uae, hikvision smart campus" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://hikvisionuae.ae/Education" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hikvisionuae.ae/Education" />
        <meta property="og:title" content="Hikvision UAE - Official Security Solutions Provider | Education Security Systems" />
        <meta property="og:description" content="Leading provider of education security systems, CCTV cameras, and smart campus solutions in UAE. Expert installation and support available." />
        <meta property="og:image" content="https://hikvisionuae.ae/images/education-security.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hikvision UAE - Official Security Solutions Provider" />
        <meta name="twitter:description" content="Leading provider of education security systems, CCTV cameras, and smart campus solutions in UAE. Expert installation and support available." />
        <meta name="twitter:image" content="https://hikvisionuae.ae/images/education-security.jpg" />
      </Head>

      <Script
        id="education-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(educationSchema) }}
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
              Education Security
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#8B1818] mb-4 drop-shadow">
            Hikvision Solutions for <span className="text-black">Education</span> in UAE
          </h1>
          <p className="text-base sm:text-lg text-gray-700 font-light w-full max-w-5xl mx-auto mb-6">
            Empowering educational environments with cutting-edge security and tech-driven operational excellence.
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
            Security for Modern Education
          </h2>
          <p className="text-lg text-gray-700">
            Hikvision delivers robust, scalable security solutions tailored for educational institutions in the UAE. Our systems combine high-definition cameras, AI analytics, and integrated access control to protect students, staff, and assets while enabling smart learning environments.
          </p>
        </div>
      </section>

      {/* SOLUTIONS GRID */}
      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Solution 1 */}
          <div className="group relative bg-white/90 border border-[#8B1818]/20 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:border-[#8B1818]">
            <div className="relative h-48 flex items-center justify-center">
              <img
                src={img1.src}
                alt="Intelligent applications"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Advanced Smart Campus Solutions
              </h3>
              <p className="text-gray-600">
                State-of-the-art applications designed to create digital campuses with enhanced automation and comprehensive security features
              </p>
            </div>
          </div>

          {/* Solution 2 */}
          <div className="group relative bg-white/90 border border-[#8B1818]/20 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:border-[#8B1818]">
            <div className="relative h-48 flex items-center justify-center">
              <img
                src={img2.src}
                alt="Easy integration"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Easy integration with third-party systems
              </h3>
              <p className="text-gray-600">
                Easily integrates with external information management systems or other third-party systems, adding to the diversity of educational resources and methods
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ENHANCED SECURITY SECTION */}
      <section className="bg-gray-50 rounded-xl p-8 mb-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Comprehensive Campus Security Solutions
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our solutions provide end-to-end security coverage for educational institutions, encompassing school transportation, entry points, perimeter security, building access, and internal monitoring. With advanced applications for vehicle management, personnel tracking, and emergency response systems, we ensure a safe and secure learning environment for students, staff, and visitors alike.
          </p>
        </div>
      </section>

      {/* KEY FEATURES SECTION */}
      <section className="mb-20" id="features">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Key Features for Educational Institutions
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Education;
