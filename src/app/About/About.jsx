import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import img from '../../../public/Hikvision about.jpg';

// SEO Schema
const aboutSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": "https://hikvisionuae.ae/About",
  "name": "Hikvision UAE - Official Security Solutions Provider",
  "description": "Leading authorized Hikvision distributor in UAE. Expert security camera solutions, CCTV installation, and surveillance systems across Dubai, Abu Dhabi, and UAE.",
  "url": "https://hikvisionuae.ae",
  "logo": "https://hikvisionuae.ae/images/hikvision-logo.png",
  "image": "https://hikvisionuae.ae/images/hikvision-about.jpg",
  "telephone": "+971 50 989 3134",
  "email": "sales@hikvisionuae.ae",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "No. 12, Al khabaisi, Abu hail",
    "addressLocality": "Dubai",
    "addressRegion": "Dubai",
    "addressCountry": "UAE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "25.2048",
    "longitude": "55.2708"
  },
  "sameAs": [
    "https://www.facebook.com/HikvisionUAE",
    "https://twitter.com/HikvisionUAE",
    "https://www.linkedin.com/company/hikvision-uae"
  ]
};

const coreTechnologies = [
  {
    title: "AI & Deep Learning",
    description: "Advanced artificial intelligence and deep learning algorithms power our smart cameras and analytics systems, enabling features like facial recognition, behavior analysis, and intelligent vehicle monitoring."
  },
  {
    title: "Video Technology",
    description: "Industry-leading video compression, 4K resolution support, and low-light performance ensure superior image quality and efficient storage utilization."
  },
  {
    title: "IoT & Cloud",
    description: "Cloud-based video services and IoT platform integration enable remote access, real-time monitoring, and seamless device management across locations."
  }
];

const productCategories = [
  { title: 'Video Security', count: '1000+' },
  { title: 'Access Control', count: '200+' },
  { title: 'Video Intercom', count: '150+' },
  { title: 'Alarm Systems', count: '300+' },
];

const globalPresence = [
  {
    heading: "International Operations",
    items: [
      "Regional headquarters in multiple continents",
      "R&D centers in North America, Europe, and Asia",
      "Local support teams in 150+ countries",
      "ISO 9001:2015 certified manufacturing facilities"
    ]
  },
  {
    heading: "Industry Recognition",
    items: [
      "Forbes Global 2000 Company",
      "Top Security Manufacturer Worldwide",
      "Multiple Innovation Awards",
      "Leading Patent Holder in Security Industry"
    ]
  }
];

const About = () => {
  return (
    <>
      <Head>
        <title>Hikvision UAE | #1 Security Camera & CCTV Solutions Provider Dubai</title>
        <meta 
          name="description" 
          content="Leading Hikvision distributor in UAE offering professional security cameras, CCTV systems & surveillance solutions. Best prices & expert installation in Dubai, Abu Dhabi & UAE."
        />
        <meta 
          name="keywords" 
          content="Hikvision UAE, Hikvision Dubai, CCTV Dubai, security cameras UAE, Hikvision distributor UAE, CCTV installation Dubai, surveillance systems UAE, Hikvision dealer Dubai, security solutions UAE"
        />
        <meta property="og:title" content="Hikvision UAE | #1 Security Camera & CCTV Solutions Provider Dubai" />
        <meta property="og:description" content="Leading Hikvision distributor in UAE offering professional security cameras, CCTV systems & surveillance solutions. Best prices & expert installation in Dubai." />
        <meta property="og:image" content="https://hikvisionuae.ae/images/hikvision-about.jpg" />
        <meta property="og:url" content="https://hikvisionuae.ae/About" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hikvision UAE - Official Security Solutions Provider" />
        <meta name="twitter:description" content="Professional security cameras & CCTV solutions in UAE. Authorized Hikvision distributor offering expert installation & support." />
        <meta name="twitter:image" content="https://hikvisionuae.ae/images/hikvision-about.jpg" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://hikvisionuae.ae/About" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Script
        id="about-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-white via-red-50 to-red-100 py-10 px-4 sm:px-0 border-b border-red-200">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="mb-4">
            <span className="inline-block px-5 py-1.5 bg-[#8B1818] text-white rounded-full text-xs font-bold tracking-widest uppercase shadow-lg">
              About Us
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#8B1818] mb-4 drop-shadow">
            Hikvision UAE – <span className="text-black">Your Trusted Reseller</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-700 font-light w-full max-w-5xl mx-auto mb-6">
            Leading authorized Hikvision distributor in UAE. Expert security camera solutions, CCTV installation, and surveillance systems across Dubai, Abu Dhabi, and UAE.
          </p>
          <div className="flex justify-center">
            <span className="inline-block w-24 h-1 rounded-full bg-gradient-to-r from-[#8B1818] via-red-400 to-[#8B1818]"></span>
          </div>
          <a
            href="#core"
            className="mt-8 inline-block px-8 py-3 rounded-full bg-[#8B1818] text-white font-semibold shadow hover:bg-[#a83232] transition-colors"
          >
            Explore More
          </a>
        </div>
      </section>

      {/* OVERVIEW SECTION */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src={img.src}
              alt="Hikvision Security Products"
              className="rounded-lg shadow-xl w-full h-auto max-h-[600px] object-cover"
              width={600}
              height={400}
              sizes="(max-width: 400px) 100vw, 100vw"
            />
          </div>
          <div className="space-y-6">
            <p className="text-gray-600 leading-relaxed">
              At Hikvision-Dubai, we take pride in being a recognized and authorized Reseller of Hikvision technologies in Dubai, UAE. Our vast inventory boasts a diverse range of state-of-the-art Hikvision products designed to cater to the modern-day security needs. From hybrid DVRs and NVRs to high-definition IP cameras, network PTZ cameras, speed domes, and compression cards, our product portfolio is comprehensive and cutting-edge.
            </p>
            <p className="text-gray-600 leading-relaxed">
              With a keen eye for detail and a commitment to delivering unmatched quality, we have carved a niche for ourselves as a leading Hikvision Reseller in Dubai. Our reputation is underpinned by the trust and loyalty of a broad clientele base spanning various sectors, including educational institutions and corporate enterprises. The surveillance solutions we offer aren't just about products; they are tailored experiences optimized to address the unique security challenges of each domain.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our core strength lies in understanding our clients' requirements and delivering solutions that not only meet but often exceed their expectations. Offering superior products at cost-effective prices is a promise we've held dear since our inception.
            </p>
          </div>
        </div>
      </section>

      {/* CORE TECHNOLOGIES SECTION */}
      <section id="core" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Core Technologies</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {coreTechnologies.map((tech, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-red-700 mb-4">{tech.title}</h3>
                <p className="text-gray-600">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT CATEGORIES SECTION */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Product Categories</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {productCategories.map((category, index) => (
              <div key={index} className="text-center p-6 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600 mb-2">{category.count}</div>
                <div className="text-gray-700">{category.title} Products</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL PRESENCE SECTION */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Global Presence</h2>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="grid md:grid-cols-2 gap-8">
              {globalPresence.map((presence, index) => (
                <div key={index}>
                  <h3 className="text-xl font-bold text-red-700 mb-4">{presence.heading}</h3>
                  <ul className="space-y-3 text-gray-600">
                    {presence.items.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
