"use client"
import React, { useState, ReactNode, ReactElement } from 'react'

import { MapPin, Phone, Mail, Clock, Send, Check, Loader2, ExternalLink, ArrowRight } from 'lucide-react'
import { Toaster, toast } from 'react-hot-toast'

// Define interface for FlipCard props with specific type instead of any
interface FlipCardProps {
  icon: ReactElement<React.SVGProps<SVGSVGElement>>; // Replace 'any' with specific SVG type
  title: string;
  frontContent: ReactNode;
  backContent: ReactNode;
  iconBgColor?: string;
  iconColor?: string;
}

// FlipCard Component with proper TypeScript types - removed unused accentColor
const FlipCard = ({ 
  icon, 
  title, 
  frontContent, 
  backContent, 
  iconBgColor = "bg-red-50",
  iconColor = "text-red-600"
}: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <div 
      className="flip-card h-[320px] w-full perspective-1000 cursor-pointer" 
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`flip-card-inner relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front of Card */}
        <div className="flip-card-front absolute w-full h-full backface-hidden bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:border-red-200 hover:shadow-md transition-all text-center flex flex-col items-center justify-center">
          <div className={`${iconBgColor} w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center`}>
            {React.cloneElement(icon, { className: `h-7 w-7 ${iconColor}` })}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
          <div className="text-gray-600">{frontContent}</div>
          
          <div className="absolute bottom-5 right-5 text-gray-400 flex items-center gap-1 text-sm">
            <span>Flip</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>
        
        {/* Back of Card */}
        <div className="flip-card-back absolute w-full h-full backface-hidden bg-gradient-to-br from-gray-900 to-black text-white rounded-xl p-8 shadow-lg rotate-y-180 flex flex-col items-center justify-center">
          <h3 className="text-xl font-bold mb-4">{title}</h3>
          <div className="text-gray-200">{backContent}</div>
          
          <div className="absolute bottom-5 left-5 text-gray-400 flex items-center gap-1 text-sm">
            <ArrowRight className="h-3.5 w-3.5 rotate-180" />
            <span>Back</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Contact Cards Section With Flip Animation
const ContactCardsSection = () => {
  return (
    <section className="py-16 bg-white">
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
      
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Location Card */}
          <FlipCard
            icon={<MapPin />}
            title="Our Location"
            frontContent={
              <p>
                Dubai Silicon Oasis<br />
                Building A1, Office 302<br />
                Dubai, UAE
              </p>
            }
            backContent={
              <div className="flex flex-col items-center">
                <p className="mb-3">Visit us during working hours</p>
                <a 
                  href="https://goo.gl/maps/1ZZZZzzzzzzzzzzzz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors text-sm mt-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-4 w-4" />
                  View on Map
                </a>
              </div>
            }
          />
          
          {/* Call Us Card */}
          <FlipCard
            icon={<Phone />}
            title="Call Us"
            frontContent={
              <>
                <p className="mb-1">Sales: +971 4 123 4567</p>
                <p className="mb-1">Support: +971 4 123 4568</p>
                <p>Fax: +971 4 123 4569</p>
              </>
            }
            backContent={
              <div className="flex flex-col items-center gap-3">
                <a 
                  href="tel:+97141234567" 
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors text-sm"
                >
                  Call Sales Now
                </a>
                <a 
                  href="tel:+97141234568" 
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-md transition-colors text-sm"
                >
                  Call Support
                </a>
              </div>
            }
          />
          
          {/* Email Card */}
          <FlipCard
            icon={<Mail />}
            title="Email Us"
            frontContent={
              <>
                <p className="mb-1">info@hikvisiondubai.com</p>
                <p className="mb-1">support@hikvisiondubai.com</p>
                <p>sales@hikvisiondubai.com</p>
              </>
            }
            backContent={
              <div className="flex flex-col items-center gap-3">
                <a 
                  href="mailto:info@hikvisiondubai.com" 
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors text-sm"
                >
                  General Inquiry
                </a>
                <a 
                  href="mailto:sales@hikvisiondubai.com" 
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-md transition-colors text-sm"
                >
                  Sales Inquiry
                </a>
              </div>
            }
          />
          
          {/* Hours Card */}
          <FlipCard
            icon={<Clock />}
            title="Working Hours"
            frontContent={
              <>
                <p className="mb-1">Monday-Friday: 9:00 AM - 6:00 PM</p>
                <p className="mb-1">Saturday: 9:00 AM - 1:00 PM</p>
                <p>Sunday: Closed</p>
              </>
            }
            backContent={
              <div className="text-center">
                <p className="mb-3">Need after-hours support?</p>
                <p className="text-sm">Our emergency support team is available 24/7</p>
                <a 
                  href="tel:+97141234567" 
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors text-sm mt-3"
                >
                  Call Emergency Support
                </a>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState('sales')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  // Updated handleSubmit function to send data to Payload CMS
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send form data to your API endpoint that connects to Payload CMS
      const response = await fetch('/api/contact-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          // Add additional metadata if needed
          department: activeTab,
          submitDate: new Date().toISOString(),
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      
      // Show success notification with custom message
      toast.success('Thank you! Our team will soon reach you.', {
        duration: 5000,
        icon: '👍',
      });
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white min-h-screen">
      {/* Notification Toaster */}
      <Toaster position="top-right" />
    
      {/* Modern Contact Header with Solid Black Background */}
      <section className="relative bg-black py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute inset-0 bg-[url('/patterns/circuit-pattern.png')] bg-repeat"></div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-20">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path fill="#E60000" d="M42.8,-62.2C54.2,-56.3,61.3,-41.5,65,-26.6C68.7,-11.7,69,3.3,65.4,17.3C61.8,31.3,54.3,44.2,43.2,53.8C32.1,63.4,16.1,69.7,-0.2,69.9C-16.5,70.2,-33,64.3,-47.4,54.5C-61.8,44.7,-74.1,31,-78.1,14.6C-82.1,-1.7,-77.9,-20.7,-67.7,-34.9C-57.5,-49.1,-41.4,-58.5,-26.6,-62.9C-11.9,-67.2,2.5,-66.6,16.6,-64.1C30.8,-61.6,31.4,-68.1,42.8,-62.2Z" transform="translate(100 100)" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-1/4 h-full opacity-10">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path fill="#FFFFFF" d="M47.7,-57.2C59,-47.3,63.9,-29.7,66.4,-12.2C68.8,5.3,68.8,22.8,61.1,36.9C53.4,51,38.1,61.8,21.1,67.9C4.1,74,-14.6,75.5,-30.2,69C-45.8,62.5,-58.3,48.1,-65.6,31.1C-73,14,-75.2,-5.7,-70.1,-23.1C-65.1,-40.6,-52.7,-55.8,-38,-63.4C-23.2,-71,-11.6,-71,3.9,-75.8C19.4,-80.6,36.4,-67.1,47.7,-57.2Z" transform="translate(100 100)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Text content */}
            <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
              <div className="inline-block bg-red-600 h-1 w-20 mb-6"></div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Get In Touch
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
                Have questions about our security solutions? Our team is ready to assist you.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a href="#contact-form" className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-medium transition-all flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Contact Us
                </a>
                <a href="tel:+97141234567" className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-medium transition-all flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  +971 4 123 4567
                </a>
              </div>
            </div>
            
            {/* Icons grid with connecting lines */}
            <div className="md:w-1/2 relative">
              <div className="relative w-full max-w-md mx-auto">
                {/* Communication icon grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="aspect-square bg-gray-800 backdrop-blur-sm rounded-xl flex items-center justify-center p-4 hover:bg-red-900/30 transition-all">
                    <Mail className="h-10 w-10 text-white" />
                  </div>
                  <div className="aspect-square bg-red-900/30 backdrop-blur-sm rounded-xl flex items-center justify-center p-4 hover:bg-red-900/50 transition-all">
                    <Phone className="h-10 w-10 text-white" />
                  </div>
                  <div className="aspect-square bg-gray-800 backdrop-blur-sm rounded-xl flex items-center justify-center p-4 hover:bg-red-900/30 transition-all">
                    <MapPin className="h-10 w-10 text-white" />
                  </div>
                  <div className="aspect-square bg-red-900/30 backdrop-blur-sm rounded-xl flex items-center justify-center p-4 hover:bg-red-900/50 transition-all">
                    <Clock className="h-10 w-10 text-white" />
                  </div>
                  <div className="aspect-square bg-gray-800 backdrop-blur-sm rounded-xl flex items-center justify-center p-4 hover:bg-red-900/30 transition-all">
                    <Send className="h-10 w-10 text-white" />
                  </div>
                  <div className="aspect-square bg-red-900/30 backdrop-blur-sm rounded-xl flex items-center justify-center p-4 hover:bg-red-900/50 transition-all">
                    <Check className="h-10 w-10 text-white" />
                  </div>
                </div>
                
                {/* Connecting lines overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <svg width="100%" height="100%" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" className="opacity-30">
                    <line x1="50" y1="50" x2="250" y2="250" stroke="white" strokeWidth="1" />
                    <line x1="150" y1="50" x2="50" y2="150" stroke="white" strokeWidth="1" />
                    <line x1="250" y1="50" x2="150" y2="150" stroke="white" strokeWidth="1" />
                    <line x1="50" y1="250" x2="250" y2="150" stroke="white" strokeWidth="1" />
                    <line x1="150" y1="250" x2="50" y2="150" stroke="white" strokeWidth="1" />
                    <line x1="250" y1="250" x2="150" y2="150" stroke="white" strokeWidth="1" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Info Cards */}
      <ContactCardsSection />
      
      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Form */}
              <div className="p-8 md:p-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                <p className="text-gray-600 mb-8">Fill out the form below and we&apos;ll get back to you as soon as possible.</p>
                
                {/* Department Selector */}
                <div className="mb-8">
                  <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      className={`flex-1 py-3 px-4 text-center ${activeTab === 'sales' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                      onClick={() => setActiveTab('sales')}
                    >
                      Sales Inquiry
                    </button>
                    <button
                      className={`flex-1 py-3 px-4 text-center ${activeTab === 'support' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                      onClick={() => setActiveTab('support')}
                    >
                      Technical Support
                    </button>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-gray-800"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-gray-800"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-gray-800"
                        placeholder="+971 XX XXX XXXX"
                      />
                    </div>
                    <div className="relative">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors appearance-none bg-white pr-10 text-gray-800 font-medium"
                        required
                        style={{ textIndent: '0.01px', textOverflow: '' }}
                      >
                        <option value="" disabled className="text-gray-500">Select a subject</option>
                        <option value="Product Inquiry" className="py-2 text-gray-800">Product Inquiry</option>
                        <option value="Technical Support" className="py-2 text-gray-800">Technical Support</option>
                        <option value="Installation Service" className="py-2 text-gray-800">Installation Service</option>
                        <option value="Quote Request" className="py-2 text-gray-800">Quote Request</option>
                        <option value="Other" className="py-2 text-gray-800">Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none" style={{top: '24px'}}>
                        <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors text-gray-800"
                      placeholder="Please describe how we can help you..."
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
              
              {/* Map */}
              <div className="bg-gray-100 h-full min-h-[500px] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.743370568286!2d55.37220027547251!3d25.120993033241535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f654ac7f5a525%3A0xc7b96e83ad8b968a!2sDubai%20Silicon%20Oasis!5e0!3m2!1sen!2sae!4v1714502767425!5m2!1sen!2sae"
                  className="w-full h-full absolute top-0 left-0 border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}