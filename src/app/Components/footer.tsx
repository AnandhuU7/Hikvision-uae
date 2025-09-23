"use client"
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import Script from 'next/script';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Successfully subscribed to newsletter!');
        setEmail('');
      } else {
        toast.error(data.message || 'Failed to subscribe');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "SecurityBusiness",
    "name": "Hikvision UAE",
    "description": "Leading provider of Hikvision security cameras and surveillance solutions in UAE, Dubai, and Middle East",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "No. 12, Al khabaisi, Abu hail",
      "addressLocality": "Dubai",
      "addressCountry": "UAE"
    },
    "telephone": "+971 50 989 3134",
    "sameAs": [
      "https://www.linkedin.com/company/hikvision-uae/",
      "https://www.facebook.com/hikvisionuae"
    ],
    "keywords": "Hikvision UAE, security cameras Dubai, Hikvision Dubai, surveillance systems UAE, Hikvision Middle East, CCTV Dubai, security solutions UAE",
    "areaServed": ["Dubai", "UAE", "Middle East"],
    "openingHours": "Mo-Fr 09:00-18:00"
  };

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <footer className="relative bg-white text-neutral-800 overflow-hidden">
        {/* Main Footer Content */}
        <div className="relative z-10 pt-8 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              
              {/* Brand & Social */}
              <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex flex-col gap-4">
                <div className="space-y-3">
                  <span className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-700 tracking-widest uppercase">
                    Hikvision UAE
                  </span>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-red-500 to-red-700 rounded-full"></div>
                  <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
                    Trusted security partner in Dubai & UAE.<br />
                    <span className="text-red-600 font-medium">Hikvision authorized distributor.</span>
                  </p>
                </div>
                
                <div className="flex space-x-3">
                  <a 
                    href="https://www.facebook.com/hikvisionuae" 
                    target="_blank" 
                    rel="noopener" 
                    aria-label="Facebook" 
                    className="group p-2 bg-neutral-100 rounded-lg hover:bg-red-600 transition-all duration-300 hover:scale-105"
                  >
                    <svg className="h-4 w-4 text-neutral-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
                    </svg>
                  </a>
                  <a 
                    href="https://www.linkedin.com/company/hikvision-uae/" 
                    target="_blank" 
                    rel="noopener" 
                    aria-label="LinkedIn" 
                    className="group p-2 bg-neutral-100 rounded-lg hover:bg-red-600 transition-all duration-300 hover:scale-105"
                  >
                    <svg className="h-4 w-4 text-neutral-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-red-600 font-bold text-base mb-3 flex items-center">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></div>
                    Quick Links
                  </h3>
                  <ul className="space-y-2">
                    {[
                      { href: "/", label: "Home" },
                      { href: "/About", label: "About Us" },
                      { href: "/Contact", label: "Contact Us" }
                    ].map((link) => (
                      <li key={link.href}>
                        <Link 
                          href={link.href} 
                          className="group flex items-center text-neutral-600 hover:text-red-600 transition-all duration-300 text-sm"
                        >
                          <span className="w-0 group-hover:w-1.5 h-0.5 bg-red-500 rounded-full transition-all duration-300 mr-0 group-hover:mr-2"></span>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-red-600 font-bold text-base mb-3 flex items-center">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></div>
                    Technologies
                  </h3>
                  <ul className="space-y-2">
                    {[
                      { href: "/Tandemvu", label: "Tandemvu" },
                      { href: "/Acusense", label: "Acusense" },
                      { href: "/Darkfighter", label: "Darkfighter" },
                      { href: "/Colorvu", label: "Colorvu" }
                    ].map((link) => (
                      <li key={link.href}>
                        <Link 
                          href={link.href} 
                          className="group flex items-center text-neutral-600 hover:text-red-600 transition-all duration-300 text-sm"
                        >
                          <span className="w-0 group-hover:w-1.5 h-0.5 bg-red-500 rounded-full transition-all duration-300 mr-0 group-hover:mr-2"></span>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Newsletter & Contact */}
              <div className="space-y-4">
                {/* Newsletter Card */}
                <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 backdrop-blur-sm rounded-xl p-4 border border-neutral-200 shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mr-2">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-neutral-800 font-bold text-base">Newsletter</h3>
                  </div>
                  <p className="text-neutral-600 text-xs mb-3">Stay updated with our latest security solutions</p>
                  <button
                    onClick={() => window.location.href = 'https://mail.lovosis.com/index.php/lists/at045rwmtg476/subscribe'}
                    className="group w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-3 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-sm"
                  >
                    <span className="mr-1">Subscribe Now</span>
                    <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>

                {/* Contact Info */}
                <div className="space-y-3" itemScope itemType="https://schema.org/LocalBusiness">
                  <div className="flex items-start space-x-2 group">
                    <div className="w-6 h-6 bg-neutral-100 rounded-lg flex items-center justify-center mt-0.5 group-hover:bg-red-50 transition-colors">
                      <svg className="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="text-neutral-600 text-xs leading-relaxed" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                      <span itemProp="streetAddress">No. 12, Al khabaisi, Abu hail</span>,<br/>
                      <span itemProp="addressLocality">Dubai</span>, <span itemProp="addressCountry">UAE</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 group">
                    <div className="w-6 h-6 bg-neutral-100 rounded-lg flex items-center justify-center group-hover:bg-red-50 transition-colors">
                      <svg className="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <a href="tel:+971509893134" className="text-red-600 hover:text-red-700 font-semibold transition-colors text-xs" itemProp="telephone">
                      +971 50 989 3134
                    </a>
                  </div>

                  <div className="flex items-center space-x-2 group">
                    <div className="w-6 h-6 bg-neutral-100 rounded-lg flex items-center justify-center group-hover:bg-red-50 transition-colors">
                      <svg className="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <a href="mailto:support@hikvisionuae.ae" className="text-neutral-600 hover:text-red-600 transition-colors text-xs break-all">
                      support@hikvisionuae.ae
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative z-10 border-t border-neutral-200 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
              <p className="text-neutral-500 text-xs sm:text-sm text-center sm:text-left">
                © {new Date().getFullYear()} 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-700 font-bold mx-1">
                  Hikvision UAE
                </span>
                All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                {[
                  { href: "/privacy", label: "Privacy Policy" },
                  { href: "/terms", label: "Terms of Service" },
                  { href: "/cookies", label: "Cookie Policy" }
                ].map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className="text-neutral-500 hover:text-red-600 transition-colors text-xs sm:text-sm relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 rounded-full transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;