'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link'
import banner from '../../../public/banner.jpg'
import Head from 'next/head'
import Script from 'next/script'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer';

// Banner Schema
const bannerSchema = {
  "@context": "https://schema.org",
  "@type": ["WebPage", "Organization"],
  "@id": "https://hikvisionuae.ae/",
  "name": "Hikvision UAE Official Distributor",
  "headline": "Professional Security Solutions in UAE",
  "description": "Leading Hikvision distributor and supplier in UAE. Authorized dealer for CCTV cameras, security systems & support in Dubai. Contact us for Hikvision products, pricing & technical support.",
  "keywords": "Hikvision UAE, CCTV cameras UAE, security systems UAE, Dubai security solutions, Hikvision distributor UAE, Hikvision supplier UAE, Hikvision authorized distributor in UAE, Hikvision support UAE, Hikvision dealer Dubai, hikvision uae, hikvision dubai, hikvision security solutions, hikvision cctv, hikvision access control, hikvision intercom, hikvision video door phone, hikvision security cameras, hikvision security systems, hikvision security products, hikvision security solutions dubai, hikvision cctv dubai, hikvision access control dubai, hikvision intercom dubai, hikvision video door phone dubai, hikvision security cameras dubai, hikvision security systems dubai, hikvision security products dubai",
  "image": {
    "@type": "ImageObject",
    "url": "https://hikvisionuae.ae/banner.jpg",
    "width": 1200,
    "height": 630
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://hikvisionuae.ae/"
  },
  "datePublished": "2024-01-01T08:00:00+04:00",
  "dateModified": new Date().toISOString(),
  "provider": {
    "@type": "Organization",
    "name": "Hikvision UAE",
    "url": "https://hikvisionuae.ae",
    "logo": {
      "@type": "ImageObject",
      "url": "https://hikvisionuae.ae/logo.png"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "156",
    "bestRating": "5",
    "worstRating": "1"
  },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "AED",
    "price": "199.00",
    "lowPrice": 199,
    "highPrice": 9999,
    "offerCount": "100+",
    "availability": "https://schema.org/InStock"
  }
}

export default function Banner() {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView();
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const floatItem = {
    hidden: { y: 0 },
    visible: {
      y: [0, -15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <Head>
        <title>Hikvision UAE - #1 Official Distributor & Security Solutions Provider</title>
        <meta
          name="description"
          content="Official Hikvision distributor in UAE offering premium security cameras & CCTV systems. Expert installation, 24/7 support & best prices in Dubai. Visit our showroom or call +971 50 989 3134."
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="Hikvision UAE | Official Distributor & Security Solutions Provider" />
        <meta property="og:description" content="Authorized Hikvision distributor in UAE. Expert supplier of CCTV cameras, security systems & technical support in UAE. Get official Hikvision products & solutions." />
        <meta property="og:image" content={banner.src} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hikvisionuae.ae" />
        <meta property="og:site_name" content="Hikvision UAE Official Distributor" />
        <meta property="og:locale" content="en_AE" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hikvision UAE - Official Distributor & Security Solutions Provider" />
        <meta name="twitter:description" content="Leading Hikvision distributor and supplier in UAE. Authorized dealer for CCTV cameras, security systems & support in Dubai." />
        <meta name="twitter:image" content={banner.src} />
        <meta name="twitter:creator" content="@hikvisionuae" />
        <meta name="twitter:site" content="@hikvisionuae" />

        {/* SEO Essentials */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://hikvisionuae.ae" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="hikvision uae, best cameras in uae, hikvision dubai, hikvision middle east, best cameras in dubai, hikvision distributor uae, hikvision supplier uae, hikvision authorized distributor in uae, hikvision support uae, hikvision dealer dubai" />
      </Head>

      <Script
        id="banner-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bannerSchema) }}
      />

      <motion.div
        ref={ref}
        className="relative min-h-[70vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f9f9ff 100%)"
        }}
        initial={{ opacity: 0 }}
        animate={controls}
        variants={container}
      >
        {/* Animated floating elements */}
        <motion.div 
          className="absolute top-[15%] left-[15%] w-32 h-32 rounded-full bg-red-500/10 blur-3xl"
          variants={floatItem}
        />
        
        <motion.div 
          className="absolute bottom-[20%] right-[15%] w-24 h-24 rounded-full bg-blue-500/10 blur-3xl"
          variants={floatItem}
          animate={{
            y: [0, 25, 0],
            transition: {
              duration: 7,
              delay: 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
        
        <motion.div 
          className="absolute top-[30%] right-[30%] w-20 h-20 rounded-full bg-amber-500/10 blur-3xl"
          variants={floatItem}
          animate={{
            y: [0, -20, 0],
            transition: {
              duration: 8,
              delay: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />

        <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between w-full max-w-6xl mx-auto px-3 sm:px-6 py-8 sm:py-20 gap-6 sm:gap-10">
          {/* Left: Text & CTA */}
          <motion.div
            className="flex-1 flex flex-col items-center lg:items-start justify-center max-w-xl text-center lg:text-left"
            variants={container}
          >
            <motion.span 
              className="inline-block bg-gradient-to-r from-red-600 to-red-500 text-white px-4 sm:px-5 py-1.5 rounded-full text-xs font-bold tracking-widest shadow-lg mb-3 sm:mb-4"
              variants={item}
              animate={{
                y: [0, -5, 0],
                transition: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              #1 Hikvision Distributor in UAE
            </motion.span>
            
            <motion.h1 
              className="text-3xl xs:text-4xl sm:text-5xl lg:text-[3.2rem] font-bold leading-tight tracking-tight mb-4 sm:mb-6"
              variants={item}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-red-700">
                Professional Security
              </span>
              <br />
              <span className="text-gray-900">Solutions for UAE</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl text-gray-700 font-medium mb-6 sm:mb-8 max-w-lg"
              variants={item}
            >
              Empowering your safety with <span className="text-red-600 font-semibold">cutting-edge surveillance</span> and <span className="text-red-500 font-semibold">trusted support</span>. Your peace of mind is our priority.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
              variants={item}
            >
              <Link
                href="/Contact"
                className="relative inline-flex items-center justify-center px-6 sm:px-8 py-3.5 rounded-xl font-bold text-base sm:text-lg bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 group w-full sm:w-auto overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-red-800 via-red-700 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ 
                    x: isHovered ? 0 : -100,
                    transition: { duration: 0.4, ease: "easeOut" }
                  }}
                />
                <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
                Get Started
              </Link>
              
              <Link
                href="tel:+971509893134"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 rounded-xl font-bold text-base sm:text-lg bg-white/90 text-red-700 border-2 border-red-200 shadow hover:bg-red-50 hover:text-red-900 hover:border-red-300 transition-all duration-300 w-full sm:w-auto group"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </Link>
            </motion.div>
            
            <motion.div 
              className="mt-8 flex items-center gap-4 flex-wrap justify-center lg:justify-start"
              variants={item}
            >
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((item) => (
                    <motion.div 
                      key={item}
                      className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"
                      style={{ 
                        backgroundImage: `url(https://i.pravatar.cc/150?img=${item + 10})`,
                        backgroundSize: 'cover',
                        zIndex: 3 - item
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 * item }}
                    />
                  ))}
                </div>
                <span className="ml-3 text-sm font-medium text-gray-600">1000+ Businesses Trust Us</span>
              </div>
              
              <div className="flex items-center">
                <motion.div 
                  className="flex items-center justify-center w-8 h-8 bg-amber-100 rounded-full mr-2"
                  animate={{ rotate: [0, 15, 0, -15, 0] }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </motion.div>
                <span className="text-sm font-medium text-gray-600">4.8/5 (156 Reviews)</span>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right: Product Card */}
          <motion.div
            className="flex-1 flex items-center justify-center w-full max-w-md"
            variants={item}
          >
            <motion.div
              className="relative w-full rounded-3xl shadow-2xl bg-gradient-to-br from-white via-white to-red-50 border-2 border-white p-2 flex flex-col items-center overflow-hidden"
              animate={{ 
                y: [0, -10, 0],
                transition: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              {/* Shiny border effect */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-transparent via-white/70 to-transparent"></div>
              </div>
              
              {/* Floating product image with reflection */}
              <motion.div
                className="relative w-full overflow-hidden rounded-2xl border-4 border-white shadow-xl"
                animate={{ 
                  y: [0, -15, 0],
                }}
                transition={{ 
                  duration: 7, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                }}
              >
                <motion.img
                  src={banner.src}
                  alt="Hikvision UAE Security Solutions"
                  className="w-full h-64 object-cover"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent"></div>
              </motion.div>
              
              {/* Product badge */}
              <motion.div 
                className="absolute -top-3 right-4 bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-lg z-10"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                Official Distributor
              </motion.div>
              
              {/* Product info */}
              <motion.div 
                className="mt-4 mb-2 text-center w-full px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <h3 className="text-lg font-bold text-gray-900">Hikvision Security Ecosystem</h3>
                <p className="text-sm text-gray-600 mt-1">Complete security solutions for homes and businesses</p>
                
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {['CCTV', 'Access', 'Alarms'].map((item, index) => (
                    <motion.div 
                      key={item}
                      className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 1.0 + (index * 0.1) }}
                      whileHover={{ 
                        y: -5,
                        boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
                      }}
                    >
                      <div className="text-xs font-semibold text-red-600">{item}</div>
                      <div className="text-[10px] text-gray-500">Systems</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Smooth animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1) rotate(-2deg);}
          50% { transform: translateY(-24px) scale(1.07) rotate(4deg);}
        }
        
        @keyframes float2 {
          0%, 100% { transform: translateY(0) scale(1) rotate(2deg);}
          50% { transform: translateY(24px) scale(1.05) rotate(-3deg);}
        }
        
        .animate-float {
          animation: float 8s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        }
        
        .animate-float2 {
          animation: float2 9s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        }
        
        .banner-fade-in {
          animation: banner-fade-in 1.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        
        @keyframes banner-fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .gradient-border {
          position: relative;
          background-clip: padding-box;
          border: solid 3px transparent;
        }
        
        .gradient-border:before {
          content: '';
          position: absolute;
          top: -3px;
          right: -3px;
          bottom: -3px;
          left: -3px;
          z-index: -1;
          margin: -3px;
          border-radius: inherit;
          background: linear-gradient(45deg, #ef4444, #dc2626, #b91c1c);
        }
      `}</style>
    </>
  )
}