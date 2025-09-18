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
      <footer className="bg-white text-neutral-800 pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand & Social */}
          <div className="flex flex-col gap-4">
            <span className="text-3xl font-black text-red-700 tracking-widest uppercase mb-2">Hikvision UAE</span>
            <p className="text-neutral-500 text-sm">
              Trusted security partner in Dubai & UAE.<br />
              Hikvision authorized distributor.
            </p>
            <div className="flex space-x-3 mt-2">
              <a href="https://www.facebook.com/hikvisionuae" target="_blank" rel="noopener" aria-label="Facebook" className="hover:text-red-700 transition">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/hikvision-uae/" target="_blank" rel="noopener" aria-label="LinkedIn" className="hover:text-red-700 transition">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-red-700 font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-red-700">Home</Link></li>
              <li><Link href="/About" className="hover:text-red-700">About Us</Link></li>
              <li><Link href="/Contact" className="hover:text-red-700">Contact Us</Link></li>
            </ul>
          </div>
          {/* Technologies */}
          <div>
            <h3 className="text-red-700 font-semibold mb-3">Technologies</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/Tandemvu" className="hover:text-red-700">Tandemvu</Link></li>
              <li><Link href="/Acusense" className="hover:text-red-700">Acusense</Link></li>
              <li><Link href="/Darkfighter" className="hover:text-red-700">Darkfighter</Link></li>
              <li><Link href="/Colorvu" className="hover:text-red-700">Colorvu</Link></li>
            </ul>
          </div>
          {/* Newsletter & Contact */}
          <div>
            <div className="bg-neutral-100 rounded-xl p-6 shadow-lg mb-4">
              <h3 className="text-red-700 font-semibold mb-2">Newsletter</h3>
              <button
                onClick={() => window.location.href = 'https://mail.lovosis.com/index.php/lists/at045rwmtg476/subscribe'} // 👈 Replace with your desired URL
                className="bg-gradient-to-r from-red-700 to-red-400 text-white px-4 py-2 rounded font-semibold hover:from-red-700 hover:to-red-500 transition text-sm"
              >
                Subscribe
              </button>
            </div>

            <div className="text-neutral-500 text-sm" itemScope itemType="https://schema.org/LocalBusiness">
              <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <span itemProp="streetAddress">No. 12, Al khabaisi, Abu hail</span>,&nbsp;
                <span itemProp="addressLocality">Dubai</span>,&nbsp;
                <span itemProp="addressCountry">UAE</span>
              </div>
              <div>
                <a href="tel:+971509893134" className="hover:text-red-700 font-semibold" itemProp="telephone">+971 50 989 3134</a>
              </div>
              <div>
                <a href="mailto:support@hikvisionuae.ae" className="hover:text-red-700">support@hikvisionuae.ae</a>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="border-t border-neutral-200 mt-10 pt-4 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 text-xs text-neutral-500 gap-2">
          <p>
            © {new Date().getFullYear()} <span className="text-red-700 font-bold">Hikvision UAE</span>. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link href="/privacy" className="hover:text-red-700">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-red-700">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-red-700">Cookie Policy</Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

