'use client';
import React, { useState, useEffect } from 'react';

import Head from 'next/head';
import Script from 'next/script';

// Privacy Policy Schema
const privacySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://hikvisionuae.ae/privacy",
  "name": "Privacy Policy - Hikvision UAE",
  "description": "Learn about how Hikvision UAE handles and protects your personal information. Our privacy policy outlines data collection, usage, and your rights under UAE law.",
  "keywords": ["Hikvision UAE", "privacy policy", "data protection", "security solutions", "UAE law","Hikvision UAE privacy policy","Hikvision UAE data protection","Hikvision UAE security solutions","Hikvision UAE UAE law" , "hikvision uae privacy policy", "hikvision uae data protection", "hikvision uae security solutions", "hikvision uae UAE law"],
  "publisher": {
    "@type": "Organization",
    "name": "Hikvision UAE",
    "logo": {
      "@type": "ImageObject",
      "url": "https://hikvisionuae.ae/images/hikvision-logo.jpg"
    }
  },
  "datePublished": "2024-01-01T08:00:00+04:00",
  "dateModified": "2024-03-19T08:00:00+04:00",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://hikvisionuae.ae/privacy"
  }
};

const PrivacyPolicy = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  return (
    <>
      <Head>
        <title>Hikvision UAE - Official Security Solutions & CCTV Systems Provider</title>
        <meta name="description" content="Hikvision UAE - Your trusted partner for security solutions, CCTV cameras, and surveillance systems. Official distributor in Dubai, Abu Dhabi & across UAE." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Primary Keywords */}
        <meta name="keywords" content="hikvision uae, hikvision dubai, hikvision abu dhabi, cctv camera uae, security systems uae, surveillance solutions dubai" />
        
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
        id="privacy-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacySchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="mb-4">
            Welcome to our Privacy Policy. This document outlines how we collect, use, and protect your personal information
            as a Hikvision security solutions distributor in the UAE.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Contact information (name, email, phone number, company details)</li>
            <li>Business registration and trade license information</li>
            <li>Purchase history and product preferences</li>
            <li>Technical information related to product installations and support</li>
            <li>CCTV and security system specifications for project planning</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Process and fulfill your orders for Hikvision products</li>
            <li>Provide technical support and warranty services</li>
            <li>Send updates about new products, features, and security patches</li>
            <li>Comply with UAE security and surveillance regulations</li>
            <li>Improve our distribution and support services</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p className="mb-4">
            We implement strict security measures to protect your information, following both UAE data protection laws
            and Hikvision&apos;s global security standards. This includes encryption, secure servers, and restricted access protocols.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="mb-4">
            Under UAE law, you have the right to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal information</li>
            <li>Request corrections to your data</li>
            <li>Ask for deletion of your information</li>
            <li>Withdraw consent for marketing communications</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <div className="pl-6">
            <p>Email: sales@hikvisionuae.ae</p>
            <p>Phone: +971 50 989 3134</p>
            <p>Address: No. 12, Al khabaisi, Abu hail</p>
            <p>Dubai, United Arab Emirates</p>
          </div>
        </section>

        <footer className="mt-12 text-sm text-gray-600">
          <p>Last updated: {currentDate}</p>
        </footer>
      </div>
    </>
  );
};

export default PrivacyPolicy;



