"use client"
import Image from 'next/image'
import { motion, Variants, AnimatePresence } from 'framer-motion'
import darkfighter from '../../../public/darkfighter.png'
import tandemvu from '../../../public/tandem.png'
import colorvu from '../../../public/color.png'

interface TechnologyCardProps {
  title: string;
  logoSrc: string;
  description?: string;
  learnMoreUrl?: string;
  logoAlt?: string;
  delay?: number;
}

const cardVariants: Variants = {
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

const hoverVariants = {
  hover: {
    y: -15,
    scale: 1.03,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  tap: {
    scale: 0.98
  }
};

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
            className="mt-auto inline-flex items-center gap-2 px-6 py-2 rounded-lg font-semibold text-base bg-red-600 text-white shadow hover:bg-red-700 transition-all duration-200"
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const TechnologyGrid = () => {
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
};

export default function Page() {
  return (
    <>
      <TechnologyGrid />
    </>
  );
}