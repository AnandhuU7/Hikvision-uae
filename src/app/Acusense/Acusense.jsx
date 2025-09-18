import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { FaUserShield, FaCar, FaWind, FaCogs, FaRegClock, FaNetworkWired } from "react-icons/fa";

// SEO Schema for AcuSense
const acusenseSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "Product"],
  "@id": "https://hikvisionuae.ae/Acusense",
  "name": "Hikvision AcuSense Security Cameras",
  "headline": "Hikvision AcuSense Technology in UAE",
  "description": "AI-powered security cameras for precise human and vehicle detection. Optimized for UAE conditions. Reduce false alarms and enhance property protection.",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "150",
    "bestRating": "5"
  },
  "brand": {
    "@type": "Brand",
    "name": "Hikvision"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://hikvisionuae.ae/Acusense"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dubai",
    "addressRegion": "Dubai",
    "addressCountry": "UAE"
  }
};

const iconList = [
  <FaUserShield className="text-[#8B1818] text-3xl mb-2" />,
  <FaWind className="text-[#8B1818] text-3xl mb-2" />,
  <FaCar className="text-[#8B1818] text-3xl mb-2" />,
  <FaRegClock className="text-[#8B1818] text-3xl mb-2" />,
  <FaCogs className="text-[#8B1818] text-3xl mb-2" />,
  <FaNetworkWired className="text-[#8B1818] text-3xl mb-2" />,
];

const features = [
  {
    title: "Advanced Security for UAE Properties",
    description: "AcuSense cameras provide precise detection between humans and vehicles, ensuring optimal security for high-value assets and properties across the UAE."
  },
  {
    title: "Desert-Optimized Performance",
    description: "Specially calibrated for UAE’s unique environment, AcuSense minimizes false alarms from sandstorms, wildlife, and harsh weather for reliable surveillance."
  },
  {
    title: "Smart Event Detection",
    description: "Detects perimeter breaches, unauthorized access, and suspicious gatherings—ideal for commercial centers, compounds, and industrial zones."
  },
  {
    title: "Efficient Monitoring",
    description: "Organizes footage by human and vehicle events, streamlining surveillance for busy locations like malls, communities, and business districts."
  },
  {
    title: "Customizable & Compliant",
    description: "Fully customizable to align with UAE security regulations, allowing tailored surveillance solutions for local standards."
  },
  {
    title: "Seamless Integration",
    description: "Integrates with existing UAE security networks and smart city initiatives, compatible with local VMS and security protocols."
  }
];

const Acusense = () => (
  <>
    <Head>
      <title>Hikvision AcuSense UAE | AI Security Cameras & Solutions</title>
      <meta name="description" content="AI-powered Hikvision AcuSense cameras for Dubai & UAE. Reduce false alarms, enhance security, and get expert installation. Official distributor." />
      <meta name="keywords" content="Hikvision AcuSense UAE, AI security cameras Dubai, CCTV installation UAE, smart surveillance Dubai, AcuSense distributor UAE" />
      <meta property="og:title" content="Hikvision AcuSense UAE - AI Security Solutions" />
      <meta property="og:description" content="Official Hikvision AcuSense distributor in UAE. Advanced AI security cameras, expert installation, and support." />
      <meta property="og:url" content="https://hikvisionuae.ae/Acusense" />
      <meta property="og:type" content="website" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://hikvisionuae.ae/Acusense" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>

    <Script
      id="acusense-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(acusenseSchema) }}
    />

    {/* HERO SECTION */}
    <section className="relative bg-gradient-to-br from-white via-red-50 to-red-100 py-10 px-4 sm:px-0 border-b border-red-200">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="mb-4">
          <span className="inline-block px-5 py-1.5 bg-[#8B1818] text-white rounded-full text-xs font-bold tracking-widest uppercase shadow-lg">
            Hikvision AcuSense
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#8B1818] mb-4 drop-shadow">
          AcuSense Security in <span className="text-black">UAE</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-700 font-light w-full max-w-5xl mx-auto mb-6">
          AI-Powered Human &amp; Vehicle Detection for Modern UAE Security
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
          AcuSense Solutions for UAE
        </h2>
        <p className="text-lg text-gray-700">
          Discover next-generation surveillance with Hikvision AcuSense. Our AI-driven cameras are engineered for the UAE’s unique environment, reducing false alarms and delivering reliable protection for homes, businesses, and public spaces. Benefit from local expertise, support, and installation.
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

export default Acusense;
