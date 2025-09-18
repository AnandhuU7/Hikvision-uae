"use client";
import React from 'react';
import Head from 'next/head';

// Update schema markup with more comprehensive details
const schema = {
  "@context": "https://schema.org",
  "@type": ["Service", "Organization"],
  "@id": "https://hikvisionuae.ae/customer-support",
  "name": "Security Systems Customer Support",
  "headline": "24/7 Security Systems Customer Support in Dubai",
  "description": "24/7 professional customer support and after-sale services for security systems in Dubai, UAE and Middle East",
  "image": [
    "https://hikvisionuae.ae/images/customer-support.jpg"
  ],
  "imageObject": {
    "@type": "ImageObject",
    "url": "https://hikvisionuae.ae/images/customer-support.jpg",
    "width": 1200,
    "height": 630
  },
  "brand": {
    "@type": "Brand",
    "name": "Hikvision"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://hikvisionuae.ae/customer-support"
  },
  "datePublished": "2024-01-01T08:00:00+04:00",
  "dateModified": new Date().toISOString(),
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "No. 12, Al khabaisi, Abu hail",
    "addressLocality": "Dubai",
    "addressCountry": "UAE"
  },
  "telephone": "+971 50 989 3134",
  "openingHours": "Mo-Su 00:00-24:00",
  "areaServed": ["Dubai", "UAE", "Middle East"],
  "serviceType": ["Security Camera Installation", "CCTV Support", "After-Sales Service"],
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
    "priceCurrency": "AED",
    "price": "1000.00",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Hikvision UAE"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "156",
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
      "name": "What kind of support services do you offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer 24/7 customer support, professional installation, maintenance services, and comprehensive after-sales support for all security systems."
      }
    },
    {
      "@type": "Question",
      "name": "How can I contact your support team?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can reach our support team through multiple channels including phone, email, or by visiting our location in Dubai. We provide 24/7 assistance for urgent matters."
      }
    }
  ]
};

const CustomerSupport: React.FC = () => {
  return (
    <>
      <Head>
        <title>24/7 Security Systems Customer Support in Dubai | Professional CCTV Service</title>
        <meta name="description" content="Get expert 24/7 customer support for security cameras in Dubai. Professional installation, maintenance & after-sales service. Best security solutions in UAE." />
        <meta name="keywords" content="security system support Dubai, CCTV maintenance UAE, Hikvision support, security camera installation, 24/7 technical support, CCTV service Dubai, security system maintenance UAE" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="24/7 Security Systems Customer Support in Dubai | Professional CCTV Service" />
        <meta property="og:description" content="Get expert 24/7 customer support for security cameras in Dubai. Professional installation, maintenance & after-sales service." />
        <meta property="og:image" content="https://hikvisionuae.ae/images/customer-support.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hikvisionuae.ae/customer-support" />
        <meta property="og:locale" content="en_AE" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="24/7 Security Systems Customer Support in Dubai" />
        <meta name="twitter:description" content="Expert 24/7 customer support for security cameras in Dubai. Professional installation & maintenance services." />
        <meta name="twitter:image" content="https://hikvisionuae.ae/images/customer-support.jpg" />
        
        {/* Additional SEO tags */}
        <link rel="canonical" href="https://hikvisionuae.ae/customer-support" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Schema markup */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <section className="py-20 px-4 bg-white min-h-[80vh] relative overflow-hidden">
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-14">
            <span className="inline-block bg-gradient-to-r from-red-600 to-red-400 text-white px-6 py-2 rounded-full text-xs font-bold tracking-widest shadow mb-6 uppercase">
              Hikvision UAE Support
            </span>
            <h1 className="text-5xl font-extrabold mb-4 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-400 to-black">24/7 Customer Support</span>
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mt-4">
              Your security is our priority. Our Dubai-based team is always ready to help you with installation, troubleshooting, and after-sales service—anytime, anywhere.
            </p>
          </div>

          {/* Steps Timeline */}
          <div className="relative mt-16 mb-20">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-red-200 via-red-400 to-white rounded-full -translate-x-1/2"></div>
            <div className="flex flex-col md:flex-row md:justify-between gap-12">
              {/* Step 1 */}
              <div className="relative md:w-1/4 flex flex-col items-center text-center z-10">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-400 text-white text-2xl font-bold shadow-lg mb-4 border-4 border-white">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2 text-red-600">Contact Us</h3>
                <p className="text-gray-700">Call, email, or chat with our support team 24/7 for instant help.</p>
              </div>
              {/* Step 2 */}
              <div className="relative md:w-1/4 flex flex-col items-center text-center z-10">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-400 text-white text-2xl font-bold shadow-lg mb-4 border-4 border-white">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2 text-red-600">Diagnosis</h3>
                <p className="text-gray-700">We quickly assess your issue and provide clear, step-by-step solutions.</p>
              </div>
              {/* Step 3 */}
              <div className="relative md:w-1/4 flex flex-col items-center text-center z-10">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-400 text-white text-2xl font-bold shadow-lg mb-4 border-4 border-white">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2 text-red-600">Resolution</h3>
                <p className="text-gray-700">Our certified engineers resolve your problem—onsite or remotely.</p>
              </div>
              {/* Step 4 */}
              <div className="relative md:w-1/4 flex flex-col items-center text-center z-10">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-400 text-white text-2xl font-bold shadow-lg mb-4 border-4 border-white">
                  4
                </div>
                <h3 className="text-xl font-bold mb-2 text-red-600">Follow Up</h3>
                <p className="text-gray-700">We check in to ensure you’re satisfied and your system is secure.</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <a
              href="tel:+971509893134"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl font-extrabold text-lg bg-gradient-to-r from-red-800 via-red-600 to-red-400 text-white shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
            >
              <svg className="w-7 h-7 mr-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
              Call Now: +971 50 989 3134
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-red-600">Why Choose</span>
            <span className="text-black"> Our Services?</span>
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-4"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            We combine industry expertise with exceptional service to deliver the best security solutions in Dubai
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl hover:transform hover:scale-105 transition-all duration-300 border border-red-100">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4 text-red-600">Premium Quality</h3>
            <p className="text-gray-600">
              We offer only genuine, high-quality products, ensuring you get the finest security solutions available in the market.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl hover:transform hover:scale-105 transition-all duration-300 border border-red-100">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4 text-red-600">Expert Team</h3>
            <p className="text-gray-600">
              Our certified professionals bring years of experience in security system installation and maintenance.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl hover:transform hover:scale-105 transition-all duration-300 border border-red-100">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4 text-red-600">Guaranteed Results</h3>
            <p className="text-gray-600">
              We stand behind our work with comprehensive warranties and guaranteed customer satisfaction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerSupport;
