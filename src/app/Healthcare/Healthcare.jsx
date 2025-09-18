import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { FaShieldAlt, FaUserMd, FaHospital, FaEye, FaHeartbeat, FaUserShield, FaLinkedin, FaTwitter, FaFacebook} from "react-icons/fa";

// Healthcare Schema
const healthcareSchema = {
  "@context": "https://schema.org",
  "@type": ["Service", "Product"],
  "@id": "https://hikvisionuae.ae/Healthcare",
  "name": "Healthcare Security Solutions Dubai",
  "headline": "Healthcare Security Solutions in Dubai",
  "description": "Advanced healthcare security and surveillance solutions for hospitals and medical facilities in Dubai. Discover Hikvision's comprehensive healthcare security systems.",
  "brand": {
    "@type": "Brand",
    "name": "Hikvision"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://hikvisionuae.ae/Healthcare"
  },
  "datePublished": "2024-01-01T08:00:00+04:00",
  "dateModified": "2024-03-19T08:00:00+04:00",
  "image": {
    "@type": "ImageObject",
    "url": "https://hikvisionuae.ae/images/healthcare-security.jpg",
    "width": 1200,
    "height": 630
  },
  "keywords": [
    "Hikvision",
    "Hikvision UAE",
    "Hikvision Dubai",
    "Hikvision Abu Dhabi",
    "Hikvision Sharjah",
    "Hikvision Ajman",
    "Hikvision Fujairah",
    "healthcare security Dubai",
    "healthcare security uae",
    "healthcare security in dubai",
    "healthcare security in uae",
    "hospital surveillance UAE",
    "medical facility security",
    "Hikvision healthcare solutions",
    "patient monitoring systems",
    "hikvision uae",
    "hikvision dubai",
    "hikvision middle east",
    "hikvision distributor uae",
    "hikvision supplier uae",
    "hikvision authorized distributor in uae",
    "hikvision support uae",
    "hikvision healthcare solutions uae",
    "hikvision healthcare solutions dubai"
  ],
  "serviceType": "Healthcare Security Solutions",
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
  "review": [{
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5",
      "bestRating": "5"
    },
    "author": {
      "@type": "Organization",
      "name": "Dubai Healthcare City"
    },
    "datePublished": "2024-03-01",
    "reviewBody": "Excellent healthcare security solutions that have significantly improved our facility's safety and monitoring capabilities."
  },
  {
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "4.8",
      "bestRating": "5"
    },
    "author": {
      "@type": "Organization",
      "name": "Al Zahra Hospital Dubai"
    },
    "datePublished": "2024-02-15",
    "reviewBody": "Hikvision's healthcare security solutions have revolutionized our patient monitoring capabilities."
  }],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "156",
    "reviewCount": "89"
  }
};

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What security solutions are available for healthcare facilities?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer advanced low-light surveillance technology, AI-driven patient behavior analysis, and comprehensive monitoring systems designed specifically for healthcare environments."
      }
    },
    {
      "@type": "Question",
      "name": "How do your healthcare security solutions protect patient privacy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our solutions include advanced privacy protection features ensuring compliance with healthcare regulations while maintaining optimal security and monitoring capabilities."
      }
    }
  ]
};

const iconList = [
  <FaShieldAlt className="text-[#8B1818] text-3xl mb-2" />,
  <FaUserMd className="text-[#8B1818] text-3xl mb-2" />,
  <FaHospital className="text-[#8B1818] text-3xl mb-2" />,
  <FaEye className="text-[#8B1818] text-3xl mb-2" />,
  <FaHeartbeat className="text-[#8B1818] text-3xl mb-2" />,
  <FaUserShield className="text-[#8B1818] text-3xl mb-2" />,
];

const features = [
  {
    title: "24/7 Patient & Staff Safety",
    description: "Continuous monitoring with advanced surveillance ensures the safety of patients, visitors, and staff in all areas of your facility."
  },
  {
    title: "AI-Driven Incident Detection",
    description: "Intelligent analytics detect unusual behavior or emergencies, enabling rapid response and proactive care."
  },
  {
    title: "Seamless Facility Integration",
    description: "Our solutions integrate with existing hospital systems for unified management and streamlined operations."
  },
  {
    title: "Privacy-First Monitoring",
    description: "Compliant with healthcare privacy standards, our systems protect sensitive areas while maintaining security."
  },
  {
    title: "Critical Area Coverage",
    description: "Specialized cameras for ICUs, ERs, and restricted zones provide high-definition, low-light visibility."
  },
  {
    title: "Expert Local Support",
    description: "Certified professionals in Dubai and across UAE deliver installation, training, and ongoing support."
  }
];

const Healthcare = () => {
  return (
    <>
      <Head>
        <title>Healthcare Security Solutions Dubai | Hikvision UAE</title>
        <meta name="description" content="Advanced healthcare security and surveillance solutions for hospitals and medical facilities in Dubai. Discover Hikvision's comprehensive healthcare security systems." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="healthcare security dubai, hospital surveillance uae, patient monitoring systems, hikvision healthcare uae" />
        <meta property="og:title" content="Healthcare Security Solutions Dubai | Hikvision UAE" />
        <meta property="og:description" content="Advanced healthcare security and surveillance solutions for hospitals and medical facilities in Dubai." />
        <meta property="og:image" content="https://hikvisionuae.ae/images/healthcare-security.jpg" />
        <meta property="og:url" content="https://hikvisionuae.ae/Healthcare" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Healthcare Security Solutions Dubai | Hikvision UAE" />
        <meta name="twitter:description" content="Advanced healthcare security and surveillance solutions for hospitals and medical facilities in Dubai." />
        <meta name="twitter:image" content="https://hikvisionuae.ae/images/healthcare-security.jpg" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://hikvisionuae.ae/Healthcare" />
      </Head>

      <Script
        id="healthcare-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(healthcareSchema) }}
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
              Healthcare Security UAE
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#8B1818] mb-4 drop-shadow">
            Healthcare Security <span className="text-black">Solutions</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-700 font-light w-full max-w-5xl mx-auto mb-6">
            Protecting Patients, Staff &amp; Facilities with Advanced Surveillance and AI-Driven Monitoring
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
            Modern Security for Healthcare
          </h2>
          <p className="text-lg text-gray-700">
            Our healthcare security solutions are designed for the unique challenges of hospitals and clinics in Dubai and the UAE.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-[#8B1818] mb-4">
              Comprehensive Surveillance Systems
            </h3>
            <p className="text-gray-700 mb-4">
              We provide a range of surveillance systems tailored for healthcare facilities, including high-definition cameras, thermal imaging, and low-light surveillance technologies.
            </p>
            <ul className="list-disc list-inside mb-4">
              <li className="text-gray-700">✓ 24/7 monitoring and recording</li>
              <li className="text-gray-700">✓ Remote access to live feeds</li>
              <li className="text-gray-700">✓ Integration with existing security systems</li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-[#8B1818] mb-4">
              AI-Driven Patient Monitoring
            </h3>
            <p className="text-gray-700 mb-4">
              Our AI-powered systems enhance patient monitoring with real-time analytics, alerting staff to potential issues before they escalate.
            </p>
            <ul className="list-disc list-inside mb-4">
              <li className="text-gray-700">✓ Automated alerts for abnormal behavior</li>
              <li className="text-gray-700">✓ Integration with nurse call systems</li>
              <li className="text-gray-700">✓ Customizable monitoring parameters</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#8B1818] mb-4">
              Key Features of Our Healthcare Solutions
            </h2>
            <p className="text-lg text-gray-700">
              Our solutions offer a wide range of features to meet the diverse needs of healthcare facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                  {iconList[index % iconList.length]}
                </div>
                <h3 className="text-xl font-semibold text-[#8B1818] mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-700">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#8B1818] mb-4">
            Why Choose Our Healthcare Solutions
          </h2>
          <p className="text-lg text-gray-700">
            We are committed to providing the best security solutions for healthcare facilities in Dubai and the UAE.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-[#8B1818] mb-4">
              Expertise & Experience
            </h3>
            <ul className="list-disc list-inside mb-4">
              <li className="text-gray-700">✓ Over 10 years of experience in healthcare security</li>
              <li className="text-gray-700">✓ Certified healthcare security professionals</li>
              <li className="text-gray-700">✓ Customized solutions for medical facilities</li>
              <li className="text-gray-700">✓ Proven track record in Dubai's healthcare sector</li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-[#8B1818] mb-4">
              Advanced Technology
            </h3>
            <ul className="list-disc list-inside mb-4">
              <li className="text-gray-700">✓ State-of-the-art surveillance systems</li>
              <li className="text-gray-700">✓ Integration with existing hospital infrastructure</li>
              <li className="text-gray-700">✓ Regular software updates and maintenance</li>
              <li className="text-gray-700">✓ 24/7 technical support</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Healthcare;
