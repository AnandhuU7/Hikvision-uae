"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Head from "next/head";
import Script from "next/script";

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://hikvisionuae.ae/Contact",
  name: "Contact Hikvision Dubai - 24/7 Support for Security Camera Solutions",
  description:
    "Get in touch with Hikvision Dubai's support team for all your security camera needs. Professional assistance for CCTV installation, maintenance, and technical support available 24/7.",
  url: "https://hikvisionuae.ae/Contact",
  keywords:
    "Hikvision Dubai contact, CCTV support UAE, security camera installation Dubai, Hikvision technical support, CCTV maintenance UAE, security system help Dubai hikvision uae, hikvision dubai, hikvision middle east, hikvision distributor uae, hikvision supplier uae, hikvision authorized distributor in uae, hikvision support uae, hikvision dealer dubai",
  mainEntity: {
    "@type": "Organization",
    name: "Hikvision Dubai",

    telephone: "+971 50 989 3134",
    email: "sales@hikvisionuae.ae",
    address: {
      "@type": "PostalAddress",
      streetAddress: "No. 12, Al khabaisi, Abu hail",
      addressLocality: "UAE",
      addressRegion: "Dubai",
      addressCountry: "United Arab Emirates",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+971 50 989 3134",
        contactType: "customer service",
        areaServed: "United Arab Emirates",
        availableLanguage: ["English", "Arabic"],
        contactOption: "TollFree",
        hoursAvailable: "Mo-Fr 09:00-18:00",
      },
    ],
  },
};

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      toast.error("Error sending message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Hikvision Dubai | Official Hikvision Dealer UAE</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Primary Meta Tags */}
        <meta
          name="title"
          content="Contact Hikvision Dubai | Official Hikvision Dealer UAE | Security Camera Solutions"
        />
        <meta
          name="description"
          content="Official Hikvision dealer in UAE. Get expert support for Hikvision security cameras, CCTV installation, and maintenance in Dubai. 24/7 technical assistance available. Best prices on Hikvision products."
        />
        <meta
          name="keywords"
          content="hikvision uae,hikvision dealer uae, hikvision distributor dubai, hikvision security camera uae, hikvision cctv dubai, hikvision price uae, hikvision support dubai, hikvision installation uae, hikvision products dubai"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://hikvisionuae.ae/Contact" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hikvisionuae.ae/Contact" />
        <meta
          property="og:title"
          content="Contact Hikvision Dubai | Official Hikvision Dealer UAE"
        />
        <meta
          property="og:description"
          content="Official Hikvision dealer in UAE. Expert support for security cameras, CCTV installation, and maintenance in Dubai. 24/7 technical assistance available."
        />
        <meta
          property="og:image"
          content="https://hikvisionuae.ae/images/hikvision-contact.jpg"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://hikvisionuae.ae/Contact"
        />
        <meta
          property="twitter:title"
          content="Contact Hikvision Dubai | Official Hikvision Dealer UAE"
        />
        <meta
          property="twitter:description"
          content="Official Hikvision dealer in UAE. Expert support for security cameras, CCTV installation, and maintenance in Dubai. 24/7 technical assistance available."
        />
        <meta
          property="twitter:image"
          content="https://hikvisionuae.ae/images/hikvision-contact.jpg"
        />
      </Head>

      <Script
        id="contact-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 transform hover:scale-105 transition-transform duration-300">
            <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent animate-fade-in">
              Contact Hikvision Support
            </h1>
            <p className="text-xl text-gray-600 animate-slide-up">
              We're here to help with your security camera needs
            </p>
          </div>

          {/* Contact Information Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-red-600">
              <div className="text-red-600 mb-4 animate-bounce">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">
                Phone Support
              </h3>
              <p className="text-lg text-gray-600 text-center hover:text-red-600 transition-colors">
                +971 50 989 3134
              </p>
              <p className="text-gray-600 text-center">Mon-Fri: 9AM-6PM</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-red-600">
              <div className="text-red-600 mb-4 animate-bounce">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">
                Email Support
              </h3>
              <p className="text-lg text-gray-600 text-center hover:text-red-600 transition-colors">
                sales@hikvisionuae.ae
              </p>
              <p className="text-gray-600 text-center">24/7 Response</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-red-600">
              <div className="text-red-600 mb-4 animate-bounce">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">
                Office Location
              </h3>
              <p className="text-lg text-gray-600 text-center hover:text-red-600 transition-colors">
                No. 12, Al khabaisi, Abu hail
              </p>
              <p className="text-gray-600 text-center">
                Dubai, United Arab Emirates
              </p>
            </div>
          </div>

          {/* Contact Form and Map Section */}
          <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-10 hover:shadow-2xl transition-shadow duration-300 border border-gray-100 backdrop-blur-lg bg-opacity-95">
              <h2 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                Get in Touch
              </h2>
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="peer w-full border-b-2 border-gray-300 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal outline outline-0 transition-all focus:border-red-500 focus:outline-0"
                      placeholder=" "
                      required
                    />
                    <label className="pointer-events-none absolute -top-1.5 left-0 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-focus:-top-1.5 peer-focus:text-red-500">
                      Full Name *
                    </label>
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-red-500 transition-all duration-300 group-hover:w-full"></div>
                  </div>
                  <div className="relative group">
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="peer w-full border-b-2 border-gray-300 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal outline outline-0 transition-all focus:border-red-500 focus:outline-0"
                      placeholder=" "
                      required
                    />
                    <label className="pointer-events-none absolute -top-1.5 left-0 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-focus:-top-1.5 peer-focus:text-red-500">
                      Email Address *
                    </label>
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-red-500 transition-all duration-300 group-hover:w-full"></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="peer w-full border-b-2 border-gray-300 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal outline outline-0 transition-all focus:border-red-500 focus:outline-0"
                      placeholder=" "
                      maxLength="20"
                      required
                    />
                    <label className="pointer-events-none absolute -top-1.5 left-0 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-focus:-top-1.5 peer-focus:text-red-500">
                      Phone Number *
                    </label>
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-red-500 transition-all duration-300 group-hover:w-full"></div>
                  </div>
                  <div className="relative group">
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="peer w-full border-b-2 border-gray-300 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal outline outline-0 transition-all focus:border-red-500 focus:outline-0"
                      placeholder=" "
                      required
                    />
                    <label className="pointer-events-none absolute -top-1.5 left-0 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-focus:-top-1.5 peer-focus:text-red-500">
                      Subject *
                    </label>
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-red-500 transition-all duration-300 group-hover:w-full"></div>
                  </div>
                </div>

                <div className="relative group">
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="peer w-full border-b-2 border-gray-300 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal outline outline-0 transition-all focus:border-red-500 focus:outline-0 resize-none"
                    placeholder=" "
                    required
                  ></textarea>
                  <label className="pointer-events-none absolute -top-1.5 left-0 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-focus:-top-1.5 peer-focus:text-red-500">
                    Your Message *
                  </label>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-red-500 transition-all duration-300 group-hover:w-full"></div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-red-600 to-red-800 px-8 py-4 text-white transition-all hover:from-red-700 hover:to-red-900 disabled:opacity-70"
                  >
                    <span className="relative z-10 text-lg font-semibold flex items-center justify-center">
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </span>
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-red-700 to-red-900 transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
                  </button>
                </div>
              </form>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-2xl shadow-xl p-10 hover:shadow-2xl transition-shadow duration-300 border border-gray-100 backdrop-blur-lg bg-opacity-95">
              <h2 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                Our Location
              </h2>
              <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-[1.02]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14430.21166502169!2d55.320008945276676!3d25.285620944405984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5ca49a4520a5%3A0xbaed472d137799a8!2sAbu%20Hail%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sus!4v1739600844093!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="filter contrast-125"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
