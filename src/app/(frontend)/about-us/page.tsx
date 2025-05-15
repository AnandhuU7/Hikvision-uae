"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Check, MapPin, Shield, Clock, Users } from 'lucide-react'

export default function AboutUsPage() {
  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Carousel slides data
  const slides = [
    {
      image: "/img1.jpg",
      id: "shopping-mall"
    },
    {
      image: "/images/shopping-mall.jpg",
      id: "enterprise"
    },
    {
      image: "/images/classroom-hub.jpg",
      id: "classroom-hub"
    },
    {
      image: "/images/command-center.jpg", // Replace with actual command center image
      id: "command-center"
    }
  ];

  // Navigation items
  const navItems = [
    { name: "Shopping Mall", id: 0 },
    { name: "Enterprise", id: 1 },
    { name: "Classroom Hub", id: 2 },
    { name: "Command Center", id: 3 }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Carousel Section */}
      <section className="relative w-full h-[400px] overflow-hidden bg-black">
        {/* Carousel slides */}
        <div className="relative h-full w-full">
          {slides.map((slide, index) => (
            <div 
              key={index} 
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentSlide === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <div className="relative h-full w-full bg-black">
                <Image 
                  src={slide.image} 
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover opacity-60"
                  priority
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation buttons at bottom - styled with red color and increased height */}
        <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center">
          <div className="flex bg-white/90 rounded-full py-2.5 px-2 shadow-sm">
            {navItems.map((item, index) => (
              <button 
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`px-8 py-3 ${
                  currentSlide === index 
                    ? 'bg-red-600 text-white rounded-full' 
                    : 'text-gray-700 hover:bg-gray-100/80 rounded-full'
                } text-sm font-medium transition-colors`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Content Section - Enhanced with modern design */}
      <section className="py-24 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-red-50 rounded-full -mr-20 -mt-20 opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-50 rounded-full -ml-32 -mb-32 opacity-70"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Section heading with accent */}
          <div className="mb-16 max-w-xl">
            <div className="w-16 h-1 bg-red-600 mb-6"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 leading-tight">
              Your Trusted Partner in Security Solutions
            </h2>
            <p className="text-red-600 text-lg font-medium">Hikvision Authorized Distributor</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="transform transition-all hover:translate-y-[-5px] duration-300">
              {/* Left column content */}
              <div className="prose prose-lg max-w-none mb-10">
                <p className="text-gray-700 leading-relaxed">
                  Established in Dubai, we bring Hikvision&apos;s world-renowned security and surveillance solutions to the UAE market. With years of experience in the security industry, we&apos;ve grown to become a leading distributor and integrator of Hikvision&apos;s advanced technology products.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We combine global technology leadership with local expertise to deliver tailored security solutions for businesses, government agencies, and residential customers throughout the UAE. Our team of certified professionals ensures that every installation meets the highest standards of quality and reliability.
                </p>
              </div>
              
              {/* Features grid with enhanced styling */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
                  <div className="flex items-start">
                    <div className="bg-red-100 p-3 rounded-full mr-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
                      <Shield className="h-6 w-6 text-red-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg mb-2">Certified Quality</h3>
                      <p className="text-gray-600">Official authorized distributor of Hikvision products</p>
                    </div>
                  </div>
                </div>
                
                <div className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
                  <div className="flex items-start">
                    <div className="bg-red-100 p-3 rounded-full mr-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
                      <Clock className="h-6 w-6 text-red-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg mb-2">24/7 Support</h3>
                      <p className="text-gray-600">Round-the-clock technical assistance</p>
                    </div>
                  </div>
                </div>
                
                <div className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
                  <div className="flex items-start">
                    <div className="bg-red-100 p-3 rounded-full mr-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
                      <Users className="h-6 w-6 text-red-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg mb-2">Expert Team</h3>
                      <p className="text-gray-600">Certified professionals with industry experience</p>
                    </div>
                  </div>
                </div>
                
                <div className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
                  <div className="flex items-start">
                    <div className="bg-red-100 p-3 rounded-full mr-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
                      <MapPin className="h-6 w-6 text-red-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg mb-2">Local Presence</h3>
                      <p className="text-gray-600">Based in Dubai with service across UAE</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced image presentation - bright red with proper styling */}
            <div className="relative">
              <div className="h-[550px] rounded-lg overflow-hidden" style={{ backgroundColor: "#E60000" }}>
                {/* Image option if you want to use it */}
                <Image 
                  src="/img3.png" 
                  alt="Hikvision Dubai Office" 
                  fill
                  className="object-cover"
                />
                
                {/* Simple text in bottom left */}
                <div className="absolute bottom-0 left-0 p-8 text-white">

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              To provide innovative security solutions that empower our customers to protect what matters most through cutting-edge technology and exceptional service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-red-600 w-12 h-12 rounded-full mb-6 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We continuously seek innovative solutions to stay ahead of emerging security challenges and provide our customers with the most advanced technology.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-red-600 w-12 h-12 rounded-full mb-6 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality</h3>
              <p className="text-gray-600">
                We are committed to delivering the highest quality products and services, ensuring reliability and performance in every security solution we provide.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-red-600 w-12 h-12 rounded-full mb-6 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Customer Focus</h3>
              <p className="text-gray-600">
                We prioritize our customers&apos; needs, providing personalized solutions and exceptional support to ensure their complete satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative rounded-lg overflow-hidden h-[610px] shadow-xl">
                <Image 
                  src="/img4.png" 
                  alt="Hikvision Products" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Hikvision Dubai
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                As the official distributor of Hikvision products in Dubai, we offer unparalleled expertise, premium products, and exceptional service that sets us apart in the security industry.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-red-600 mr-3 flex-shrink-0" />
                  <p className="text-gray-600">Full range of Hikvision products with authenticated warranty</p>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-red-600 mr-3 flex-shrink-0" />
                  <p className="text-gray-600">Comprehensive security solutions tailored to your specific needs</p>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-red-600 mr-3 flex-shrink-0" />
                  <p className="text-gray-600">Professional installation and configuration by certified technicians</p>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-red-600 mr-3 flex-shrink-0" />
                  <p className="text-gray-600">Ongoing technical support and maintenance services</p>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-red-600 mr-3 flex-shrink-0" />
                  <p className="text-gray-600">Competitive pricing with flexible payment options</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl p-8 md:p-12 shadow-lg border border-gray-100 max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ready to Enhance Your Security?
              </h2>
              <p className="text-xl text-gray-600">
                Browse our professional series of network security cameras.
              </p>
            </div>
            <div className="flex justify-center">
              <Link 
                href="/network-products/network-cameras/pro-series" 
                className="bg-red-600 hover:bg-red-700 text-white text-center py-3 px-8 rounded-md font-medium transition-colors"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}