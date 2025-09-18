// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

// Import images
import banner from '../../../public/banner.jpg';
import darkfighter from '../../../public/darkfighter.png';
import tandemvu from '../../../public/tandem.png';
import colorvu from '../../../public/color.png';
import banner2 from '../../../public/banner2.jpg';

// Combined Schemas
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
};

const supportSchema = {
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

const supportFaqSchema = {
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

const lookingSchema = {
  "@context": "https://schema.org",
  "@type": ["Service", "Organization"],
  "@id": "https://hikvisionuae.ae/",
  "name": "Professional Hikvision Security Solutions UAE",
  "headline": "Professional Hikvision Security Solutions in UAE",
  "description": "Leading Hikvision distributor in UAE offering comprehensive security solutions and professional-grade surveillance equipment. Expert technical support and competitive pricing available.",
  "brand": {
    "@type": "Brand",
    "name": "Hikvision"
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
  "offers": {
    "@type": "Offer",
    "priceCurrency": "AED",
    "price": "199.00",
    "availability": "https://schema.org/InStock"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+971 50 989 3134",
    "contactType": "sales",
    "areaServed": "UAE",
    "availableLanguage": ["English", "Arabic"]
  },
  "sameAs": [
    "https://hikvisionuae.ae",
    "https://www.instagram.com/hikvison_uae.01",
  ],
  "areaServed": [
    "Dubai",
    "Abu Dhabi",
    "Sharjah",
    "Ajman",
    "Ras Al Khaimah",
    "Fujairah",
    "Umm Al Quwain"
  ],
  "hasMap": "https://www.google.com/maps?cid=YOUR_GOOGLE_BUSINESS_ID",
  "priceRange": "AED 199 - AED 9999"
};

const lookingFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Who is the official Hikvision distributor in UAE?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We are the authorized Hikvision distributor in UAE, providing genuine products, professional installation, and 24/7 technical support across Dubai and all emirates."
      }
    },
    {
      "@type": "Question",
      "name": "Where can I buy Hikvision cameras in UAE?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can buy genuine Hikvision cameras from our showroom in Dubai or through our authorized dealers across UAE. We offer installation services and technical support."
      }
    },
    {
      "@type": "Question",
      "name": "What are Hikvision camera prices in UAE?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hikvision camera prices in UAE start from AED 199 for basic models to AED 9999 for advanced systems. Contact us for the best deals and package prices."
      }
    }
  ]
};

const textImageSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Hikvision Security Solutions UAE",
  "description": "Experience cutting-edge security technology with Hikvision in the UAE. Comprehensive security solutions featuring advanced surveillance systems, smart cameras, and integrated security platforms.",
  "brand": {
    "@type": "Brand",
    "name": "Hikvision"
  },
  "image": banner2.src,
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "AED",
    "price": "199.00",
    "priceValidUntil": "2025-12-31",
    "seller": {
      "@type": "Organization",
      "name": "Hikvision UAE"
    }
  },
  "provider": {
    "@type": "Organization",
    "name": "Hikvision UAE",
    "url": "https://hikvisionuae.ae"
  }
};

// Card Variants
const cardVariants = {
  offscreen: {
    y: 100,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};


// Technology Card Component
interface TechnologyCardProps {
  title: string;
  logoSrc: string;
  description?: string;
  learnMoreUrl?: string;
  logoAlt?: string;
  delay?: number;
}

const TechnologyCard = ({
  title,
  logoSrc,
  description,
  learnMoreUrl,
  logoAlt,
  delay = 0
}: TechnologyCardProps) => {
  return (
    <motion.div
      className="relative flex flex-col items-center bg-white rounded-2xl shadow-xl border border-red-100 overflow-hidden min-h-[420px]"
      role="article"
      tabIndex={0}
      variants={cardVariants}
      initial="offscreen"
      whileInView="onscreen"
      whileHover="hover"
      whileTap="tap"
      viewport={{ once: true, margin: "-50px" }}
      custom={delay}
    >
      {/* Vertical red accent bar */}
      <motion.div 
        className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-red-600 via-red-400 to-white"
        variants={{
          offscreen: { height: 0 },
          onscreen: { 
            height: "100%",
            transition: {
              duration: 0.8,
              delay: delay * 0.2 + 0.2
            }
          }
        }}
      />
      
      {/* Floating Icon */}
      <motion.div 
        className="relative mt-6 mb-4 z-10 flex justify-center w-full"
        variants={{
          offscreen: { scale: 0.5, opacity: 0 },
          onscreen: { 
            scale: 1,
            opacity: 1,
            transition: {
              type: "spring",
              delay: delay * 0.2 + 0.3
            }
          }
        }}
      >
        <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-red-100 via-white to-red-200 shadow-lg border-4 border-white">
          <Image
            src={logoSrc}
            alt={logoAlt || `${title} logo`}
            width={80}
            height={80}
            className="object-contain"
            priority={true}
          />
        </div>
      </motion.div>
      
      <div className="flex flex-col flex-1 px-6 pb-8 pt-2 w-full items-center">
        <motion.h2 
          className="text-xl font-bold text-red-700 mb-2 text-center tracking-tight"
          variants={{
            offscreen: { opacity: 0, y: 20 },
            onscreen: { 
              opacity: 1, 
              y: 0,
              transition: {
                delay: delay * 0.2 + 0.4
              }
            }
          }}
        >
          {title}
        </motion.h2>
        
        {description && (
          <motion.p 
            className="text-gray-700 text-center text-base mb-6 leading-relaxed font-medium"
            variants={{
              offscreen: { opacity: 0, y: 20 },
              onscreen: { 
                opacity: 1, 
                y: 0,
                transition: {
                  delay: delay * 0.2 + 0.45
                }
              }
            }}
          >
            {description}
          </motion.p>
        )}
        
        {learnMoreUrl && (
          <motion.a
            href={learnMoreUrl}
            className="mt-auto inline-flex items-center gap-2 px-6 py-2 rounded-lg font-semibold text-base bg-red-700 text-white shadow hover:bg-red-700 transition-all duration-200"
            aria-label={`Learn more about ${title}`}
            variants={{
              offscreen: { opacity: 0, scale: 0.8 },
              onscreen: { 
                opacity: 1, 
                scale: 1,
                transition: {
                  type: "spring",
                  delay: delay * 0.2 + 0.5
                }
              }
            }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#b91c1c",
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Banner Component
function Banner() {
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
            className="inline-block bg-gradient-to-r from-red-800 to-red-700 text-white px-4 sm:px-5 py-1.5 rounded-full text-xs font-bold tracking-widest shadow-lg mb-3 sm:mb-4"
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700 via-red-680 to-red-700">
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
                className="absolute inset-0 bg-gradient-to-r from-red-900 via-red-700 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
  );
}

// Technology Grid Component
function TechnologyGrid() {
  const technologies: TechnologyCardProps[] = [
    {
      title: "DarkFighter Technology",
      logoSrc: darkfighter.src,
      description: "Advanced low-light imaging technology optimized for UAE's challenging lighting conditions. Perfect for 24/7 surveillance in Dubai's diverse environments.",
      learnMoreUrl: "/Darkfighter",
      logoAlt: "DarkFighter Technology UAE",
      delay: 0
    },
    {
      title: "TandemVu Technology",
      logoSrc: tandemvu.src,
      description: "Dual-lens security solution designed for UAE's commercial spaces. Combines thermal and optical imaging for comprehensive surveillance coverage.",
      learnMoreUrl: "/Tandemvu",
      logoAlt: "TandemVu Technology UAE",
      delay: 1
    },
    {
      title: "ColorVu Technology",
      logoSrc: colorvu.src,
      description: "Full-color night vision technology adapted for UAE conditions. Delivers crystal-clear color imaging even in complete darkness.",
      learnMoreUrl: "/Colorvu",
      logoAlt: "ColorVu Technology UAE",
      delay: 2
    },
    {
      title: "AcuSense Technology",
      logoSrc: darkfighter.src,
      description: "AI-powered security detection optimized for UAE businesses. Reduces false alarms while ensuring accurate threat detection.",
      learnMoreUrl: "/Acusense",
      logoAlt: "AcuSense Technology UAE",
      delay: 3
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.h1 
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center mb-12 leading-tight tracking-tight"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <span className="text-black">Our </span>
          <span className="bg-gradient-to-r from-red-600 via-red-400 to-black bg-clip-text text-transparent">Technologies</span>
        </motion.h1>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 xl:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <AnimatePresence>
            {technologies.map((tech) => (
              <TechnologyCard key={tech.title} {...tech} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// TextImage Component
function TextImage() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-14">
          {/* Image Section */}
          <div
            className="w-full md:w-1/2 flex justify-center"
          >
            <div className="relative rounded-3xl overflow-hidden border-4 border-red-100 group transition-all duration-300 hover:scale-[1.03]">
              <Image
                src={banner2.src}
                alt="Hikvision Security Solutions"
                width={1000}
                height={450}
                className="w-full h-[350px] object-cover rounded-2xl"
                priority
                quality={90}
              />
            </div>
          </div>

          {/* Content Section */}
          <div
            className="w-full md:w-1/2 space-y-7 md:ml-[-96px]"
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-400 to-black">Hikvision UAE</span>{' '}
              <span className="text-black">Security Solutions</span>
            </h2>
            <p className="text-lg text-gray-800 leading-relaxed">
              Experience <span className="text-red-600 font-semibold">cutting-edge security technology</span> with Hikvision in the UAE. We provide comprehensive security solutions featuring advanced surveillance systems, smart cameras, and integrated security platforms designed for the unique needs of UAE businesses and properties.
            </p>
            <div
              className="bg-white/80 border border-red-100 rounded-2xl shadow p-6"
            >
              <p className="text-black font-semibold mb-3">Choose Hikvision UAE for:</p>
              <ul className="list-none space-y-3">
                <li className="flex items-center gap-3">
                  <span className="inline-block w-3 h-3 rounded-full bg-gradient-to-br from-red-600 to-red-400" />
                  <span>Complete range of Hikvision products</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-block w-3 h-3 rounded-full bg-gradient-to-br from-red-600 to-red-400" />
                  <span>Professional system integration</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-block w-3 h-3 rounded-full bg-gradient-to-br from-red-600 to-red-400" />
                  <span>Local technical support</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-block w-3 h-3 rounded-full bg-gradient-to-br from-red-600 to-red-400" />
                  <span>Customized security solutions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Customer Support Component
function CustomerSupport() {
  return (
    <section className="py-20 px-4 bg-white min-h-[80vh] relative overflow-hidden">
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-14">
          <span className="inline-block bg-gradient-to-r from-red-700 to-red-700 text-white px-6 py-2 rounded-full text-xs font-bold tracking-widest shadow mb-6 uppercase">
            Hikvision UAE Support
          </span>
          <h1 className="text-5xl font-extrabold mb-4 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700 via-red-600 to-black">24/7 Customer Support</span>
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
            className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl font-extrabold text-lg bg-gradient-to-r from-red-800 via-red-700 to-red-600 text-white shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
          >
            <svg className="w-7 h-7 mr-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
            Call Now: +971 50 989 3134
          </a>
        </div>
      </div>
    </section>
  );
}

// Why Choose Us Component
function WhyChooseUs() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-red-700">Why Choose</span>
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
            <h3 className="text-xl font-bold mb-4 text-red-700">Premium Quality</h3>
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
            <h3 className="text-xl font-bold mb-4 text-red-700">Expert Team</h3>
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
            <h3 className="text-xl font-bold mb-4 text-red-700">Guaranteed Results</h3>
            <p className="text-gray-600">
              We stand behind our work with comprehensive warranties and guaranteed customer satisfaction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Looking Component
function Looking() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-8">
        <span className="text-black">Professional </span>
        <span className="text-red-700">Hikvision Security Solutions in UAE</span>
      </h1>
      
      <h2 className="text-2xl font-semibold mb-6">
        Authorized Hikvision Distributor - UAE
      </h2>
      
      <p className="text-lg leading-relaxed">
        As a trusted Hikvision distributor in UAE, we offer comprehensive security solutions and professional-grade surveillance equipment. Our extensive inventory includes the latest Hikvision products at competitive prices. For detailed product information and pricing, please contact our technical sales team at <a href="tel:+971 50 989 3134" className="text-blue-600 hover:underline">+971 50 989 3134</a>. Our experts will assist you in selecting the right security solutions tailored to your requirements.
      </p>
    </div>
  );
}

// Home Page Component
export default function Home() {
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

      {/* Schema Scripts */}
      <Script
        id="banner-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bannerSchema) }}
      />
      <Script
        id="support-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(supportSchema) }}
      />
      <Script
        id="support-faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(supportFaqSchema) }}
      />
      <Script
        id="looking-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lookingSchema) }}
      />
      <Script
        id="looking-faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lookingFaqSchema) }}
      />
      <Script
        id="textimage-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(textImageSchema) }}
      />

      <Banner />
      <Looking />
      <TechnologyGrid />
      <TextImage />
      <CustomerSupport />
      <WhyChooseUs />


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
  );
}