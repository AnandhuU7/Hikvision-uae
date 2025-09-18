import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { FaShieldAlt, FaSun, FaCity, FaTools, FaClock, FaBuilding } from "react-icons/fa";

// TandemVu Schema
const tandemvuSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://hikvisionuae.ae/Tandemvu",
  "name": "Hikvision TandemVu Security Cameras",
  "headline": "Hikvision TandemVu Technology in UAE",
  "description": "Advanced dual-sensor security solutions optimized for the UAE. Combining thermal and visible imaging for comprehensive surveillance. Get a demo today!",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "156",
    "bestRating": "5",
    "worstRating": "1"
  },
  "brand": {
    "@type": "Brand",
    "name": "Hikvision"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://hikvisionuae.ae/Tandemvu"
  },
  "datePublished": "2024-01-01T08:00:00+04:00",
  "dateModified": "2024-03-19T08:00:00+04:00",
  "image": {
    "@type": "ImageObject",
    "url": "https://hikvisionuae.ae/images/tandemvu-security.jpg",
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
    "Security Solutions for uae",
    "Security Solutions in uae",
    "Security Solutions in dubai",
    "Security Solutions in abu dhabi",
    "Security Solutions in sharjah",
    "Security Solutions in ajman",
    "Security Solutions in uae",
    "TandemVu UAE",
    "Hikvision Dubai",
    "Hikvision UAE",
    "dual-sensor cameras UAE",
    "thermal cameras Dubai",
    "smart surveillance UAE",
    "security solutions Dubai",
    "TandemVu installation UAE",
    "commercial security Dubai",
    "Hikvision partner UAE",
    "hikvision uae",
    "hikvision dubai",
    "hikvision middle east",
    "hikvision distributor uae",
    "hikvision supplier uae",
    "hikvision authorized distributor in uae",
    "hikvision support uae",
    "TandemVu Security Solutions",
    "UAE Security Cameras",
    "Dubai Surveillance Systems",
    "UAE Surveillance Solutions",
    "Hikvision TandemVu",
    "UAE Surveillance Technology",
    "hikvision tandemvu",
    "hikvision tandemvu uae",
    "hikvision tandemvu dubai",
    "hikvision tandemvu middle east",
    "hikvision tandemvu distributor uae",
    "hikvision tandemvu supplier uae",
    "hikvision tandemvu authorized distributor in uae",
    "hikvision tandemvu support uae",
    "hikvision uae",
    "hikvision dubai",
    "hikvision middle east",
    "hikvision distributor uae",
    "hikvision supplier uae",
    "hikvision authorized distributor in uae",
    "hikvision support uae",
  ],
  "serviceType": "Dual-Sensor Security Solutions",
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
    "availability": "https://schema.org/InStock",
    "priceCurrency": "AED",
    "priceValidUntil": "2025-12-31",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "minPrice": 2000,
      "maxPrice": 15000,
      "priceCurrency": "AED"
    },
    "hasMerchantReturnPolicy": {
      "@type": "MerchantReturnPolicy",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "returnWindow": "P30D",
      "returnMethod": "https://schema.org/ReturnByMail"
    },
    "seller": {
      "@type": "Organization",
      "name": "Hikvision UAE"
    }
  },
  "manufacturer": {
    "@type": "Organization",
    "name": "Hikvision"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "4.8",
        "bestRating": "5"
      },
      "author": {
        "@type": "Organization",
        "name": "Dubai Security Solutions"
      },
      "datePublished": "2024-03-01",
      "reviewBody": "Hikvision TandemVu cameras have proven exceptional in UAE conditions. The dual-sensor technology provides outstanding surveillance capabilities in both daylight and nighttime conditions."
    },
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "4.9",
        "bestRating": "5"
      },
      "author": {
        "@type": "Organization",
        "name": "Abu Dhabi Smart Systems"
      },
      "datePublished": "2024-02-15",
      "reviewBody": "The TandemVu system's performance in harsh desert conditions is remarkable. Integration with our existing security infrastructure was seamless."
    },
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "4.7",
        "bestRating": "5"
      },
      "author": {
        "@type": "Organization",
        "name": "UAE Port Authority"
      },
      "datePublished": "2024-01-20",
      "reviewBody": "Perfect solution for our maritime security needs. The dual-sensor capability provides excellent coverage in all weather conditions."
    }
  ]
};

// Add FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What makes TandemVu cameras ideal for UAE conditions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TandemVu cameras are specially designed to withstand UAE's harsh climate conditions, delivering exceptional performance in extreme temperatures and sandstorm conditions."
      }
    },
    {
      "@type": "Question",
      "name": "How does TandemVu support Dubai's smart city initiatives?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TandemVu's AI capabilities integrate seamlessly with existing urban security infrastructure, supporting Dubai's vision for a safer, more connected future through smart surveillance solutions."
      }
    }
  ]
};

const iconList = [
  <FaShieldAlt className="text-[#8B1818] text-3xl mb-2" />,
  <FaSun className="text-[#8B1818] text-3xl mb-2" />,
  <FaCity className="text-[#8B1818] text-3xl mb-2" />,
  <FaTools className="text-[#8B1818] text-3xl mb-2" />,
  <FaClock className="text-[#8B1818] text-3xl mb-2" />,
  <FaBuilding className="text-[#8B1818] text-3xl mb-2" />,
];

const Tandemvu = () => {
  const features = [
    {
      title: "UAE-Certified Security Solution",
      description: "TandemVu cameras are fully compliant with UAE security standards and regulations, making them ideal for Dubai's sophisticated security requirements. Our systems are trusted by leading UAE enterprises, government facilities, and commercial establishments."
    },
    {
      title: "Desert-Optimized Performance",
      description: "Specially designed to withstand the UAE's harsh climate conditions, TandemVu cameras deliver exceptional performance in extreme temperatures and sandstorm conditions, ensuring reliable surveillance across Dubai's diverse environments."
    },
    {
      title: "Smart City Integration",
      description: "Aligned with Dubai's smart city initiatives, TandemVu's AI capabilities integrate seamlessly with existing urban security infrastructure, supporting the emirate's vision for a safer, more connected future."
    },
    {
      title: "Local Support & Maintenance",
      description: "As authorized Hikvision partners in Dubai, we provide comprehensive local support, rapid maintenance response, and professional installation services across the UAE, ensuring maximum system uptime and reliability."
    },
    {
      title: "24/7 Monitoring Solutions",
      description: "Perfect for Dubai's round-the-clock business environment, TandemVu provides uninterrupted surveillance with both thermal and visible imaging, ideal for monitoring critical infrastructure, commercial properties, and residential compounds."
    },
    {
      title: "UAE-Specific Applications",
      description: "From monitoring port facilities in Dubai to securing smart buildings in Abu Dhabi, TandemVu's dual-sensor technology is customized for UAE-specific security applications, offering superior detection in both day and night conditions."
    }
  ];

  return (
    <>
      <Head>
        <title>Hikvision UAE - Official Security Solutions & CCTV Systems Provider</title>
        <meta name="description" content="Hikvision UAE - Leading provider of security solutions, CCTV cameras, and surveillance systems in Dubai, Abu Dhabi & across UAE. Authorized distributor & expert installation." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Primary Keywords */}
        <meta name="keywords" content="hikvision uae, hikvision dubai, hikvision abu dhabi, cctv camera uae, security systems uae, surveillance solutions dubai, hikvision tandemvu uae" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Hikvision UAE - Official Security Solutions Provider" />
        <meta property="og:description" content="Leading provider of Hikvision security solutions in UAE. Professional CCTV installation, surveillance systems, and security cameras across Dubai & UAE." />
        <meta property="og:image" content="https://hikvisionuae.ae/images/hikvision-uae-office.jpg" />
        <meta property="og:url" content="https://hikvisionuae.ae" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hikvision UAE - Official Security Solutions Provider" />
        <meta name="twitter:description" content="Leading provider of Hikvision security solutions in UAE. Professional CCTV installation and surveillance systems." />
        <meta name="twitter:image" content="https://hikvisionuae.ae/images/hikvision-uae-office.jpg" />
        
        {/* Additional SEO Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://hikvisionuae.ae" />
        
        {/* Region-specific Tags */}
        <meta name="geo.region" content="AE" />
        <meta name="geo.placename" content="Dubai" />
        <meta name="geo.position" content="25.2048;55.2708" />
        <meta name="ICBM" content="25.2048, 55.2708" />
      </Head>

      <Script
        id="tandemvu-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tandemvuSchema) }}
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
            Hikvision TandemVu in <span className="text-black">UAE</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-700 font-light w-full max-w-5xl mx-auto mb-6">
            Premier Authorized Hikvision Partner in Dubai &amp; Across UAE
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
            TandemVu Solutions for UAE
          </h2>
          <p className="text-lg text-gray-700">
            Experience cutting-edge surveillance technology tailored for the UAE market. TandemVu combines advanced thermal and visible-light cameras in a single unit, perfectly adapted to meet the unique security challenges of Dubai and the wider UAE region. Our solutions are backed by local expertise and support, ensuring optimal performance in the Gulf's demanding environment.
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
};

export default Tandemvu;
