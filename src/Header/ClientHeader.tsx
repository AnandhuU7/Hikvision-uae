'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, ChevronDown, Menu, X, ShoppingCart, User, Phone, Mail, ChevronRight, Sun, Moon } from 'lucide-react'
import { Logo } from '@/components/Logo/Logo'
import { AnimatePresence, motion } from 'framer-motion'

// Update NavItem type to support three levels of categories and add icon field
export type NavItem = {
  url?: string;
  label?: string;
  id?: string;
  categories?: Array<{
    name: string;
    url: string;
    id?: string;
    icon?: string; // Add icon field
    subcategories?: Array<{
      name: string;
      url: string;
      id?: string;
      icon?: string; // Add icon field
      tertiaryCategories?: Array<{  // New third level
        name: string;
        url: string;
        id?: string;
        icon?: string; // Add icon field
      }>;
    }>;
  }>;
}

type SocialLink = {
  platform?: string;
  url?: string;
  icon?: string;
}

type ClientHeaderProps = {
  navItems: NavItem[];
  socialLinks?: SocialLink[];
  logoUrl?: string;
}

// Social media icon components for common platforms
const SocialIcon = ({ platform, className = "h-5 w-5" }: { platform?: string; className?: string }) => {
  switch (platform?.toLowerCase()) {
    case 'facebook':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      );
    case 'twitter':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      );
    case 'youtube':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    default:
      // Generic icon for other platforms
      return (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </>
      );
  }
};

// Category icon component for rendering different icons
const CategoryIcon = ({ iconName, className = "w-5 h-5 mr-3" }: { iconName?: string; className?: string }) => {
  switch (iconName?.toLowerCase()) {
    case 'camera':
    case 'cameras':
      return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>;
    case 'recorder':
    case 'recorders':
    case 'nvr':
    case 'dvr':
      return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4"/><path d="M14 12h4"/></svg>;
    case 'software':
      return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>;
    case 'alarm':
    case 'alarms':
      return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
    case 'access':
    case 'access control':
      return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
    case 'network':
    case 'networking':
      return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="10" x2="6" y2="14"/><line x1="18" y1="10" x2="18" y2="14"/></svg>;
    case 'storage':
      return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 6v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6"/><path d="M18 6V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2"/><line x1="12" y1="10" x2="12" y2="16"/><line x1="9" y1="13" x2="15" y2="13"/></svg>;
    default:
      // Default icon for all categories
      return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="m16 10-4 4-4-4"/></svg>;
  }
};

export default function ClientHeader({ navItems = [], socialLinks = [], logoUrl }: ClientHeaderProps) {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartCount, setCartCount] = useState(2) // Example cart count
  const [darkMode, setDarkMode] = useState(false) // Dark mode state
  
  const headerRef = useRef<HTMLElement>(null)
  
  // Handle scroll events for sticky header
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const toggleTheme = () => {
    setDarkMode(prev => !prev)
    // Apply dark mode class if you implement it later
  }
  
  if (!mounted) {
    return (
      <header className="header-placeholder" suppressHydrationWarning>
        <div className="h-24 bg-white"></div>
      </header>
    )
  }
  
  return (
    <header 
      ref={headerRef}
      className={`w-full bg-white z-50 fixed top-0 left-0 right-0 transition-all duration-300
      ${isScrolled ? 'shadow-lg' : 'shadow-sm'}`} 
      suppressHydrationWarning
    >
      {/* Top Bar with social links - only visible when not scrolled */}
      <div className={`bg-gradient-to-r from-gray-900 to-black text-white transition-all duration-300 overflow-hidden
        ${isScrolled ? 'h-0 opacity-0' : 'h-auto opacity-100'}`}>
        <div className="container mx-auto px-4 py-2 flex flex-col md:flex-row justify-between items-center">
          {/* Social Icons - From CMS */}
          <div className="flex space-x-4 mb-2 md:mb-0">
            {socialLinks && socialLinks.length > 0 ? (
              socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-red-400 transition transform hover:scale-110"
                >
                  <SocialIcon platform={social.platform} />
                </a>
              ))
            ) : (
              // Fallback icons if none provided from CMS
              <>
                <a href="#" className="hover:text-red-400 transition transform hover:scale-110">
                  <SocialIcon platform="facebook" />
                </a>
                <a href="#" className="hover:text-red-400 transition transform hover:scale-110">
                  <SocialIcon platform="twitter" />
                </a>
                <a href="#" className="hover:text-red-400 transition transform hover:scale-110">
                  <SocialIcon platform="youtube" />
                </a>
                <a href="#" className="hover:text-red-400 transition transform hover:scale-110">
                  <SocialIcon platform="linkedin" />
                </a>
                <a href="#" className="hover:text-red-400 transition transform hover:scale-110">
                  <SocialIcon platform="instagram" />
                </a>
              </>
            )}
          </div>
          
          {/* Contact Info */}
          <div className="flex flex-col md:flex-row md:space-x-6 text-sm">
            <a href="tel:+971509893134" className="flex items-center mb-1 md:mb-0 hover:text-red-400 transition group">
              <div className="bg-red-700 p-1 rounded-full mr-2 group-hover:bg-red-500 transition-colors">
                <Phone size={14} />
              </div>
              <span>+971 50 989 3134</span>
            </a>
            <a href="mailto:sales@hikvision-uae.ae" className="flex items-center hover:text-red-400 transition group">
              <div className="bg-red-700 p-1 rounded-full mr-2 group-hover:bg-red-500 transition-colors">
                <Mail size={14} />
              </div>
              <span>sales@hikvision-uae.ae</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <div className={`bg-white transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo 
              image={logoUrl || ''} 
              className={`transition-all duration-300 ${isScrolled ? 'h-10' : 'h-12'} w-auto`}
            />
          </Link>

          {/* Middle Navigation with Dropdown Support */}
          <nav className="hidden xl:flex items-center justify-center flex-1 mx-8">
            <ul className="flex space-x-6 font-medium">
              {/* Only render nav items from CMS */}
              {navItems && navItems.length > 0 ? (
                navItems.map((item, i) => {
                  const url = item?.url || '';
                  const label = item?.label || '';
                  const hasCategories = item?.categories && item.categories.length > 0;
                  
                  return (url && label) ? (
                    <li 
                      key={item.id || i} 
                      className="relative group"
                      onMouseEnter={() => setActiveDropdown(item.id || `nav-${i}`)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <Link 
                        href={hasCategories ? '#' : url}
                        className="text-[15px] font-medium transition-all duration-300
                        hover:text-red-600 flex items-center py-2 px-1 relative"
                        style={{ color: '#1f2937' }} // Explicit color style (gray-800)
                        onClick={(e) => hasCategories && e.preventDefault()}
                      >
                        {label}
                        {hasCategories && (
                          <ChevronDown 
                            size={16} 
                            className="ml-1 transition-transform duration-300 group-hover:rotate-180" 
                          />
                        )}
                        <span className="absolute bottom-0 left-0 h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                      </Link>
                      
                      {/* Hikvision-Style Dropdown Menu */}
                      {hasCategories && (
                        <div 
                          className={`absolute top-full left-0 bg-white shadow-md border border-gray-100 z-50
                          transition-all duration-200 min-w-[280px] py-1
                          ${activeDropdown === (item.id || `nav-${i}`) ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                        >
                          {item.categories?.map((category, idx) => {
                            const hasSubcategories = category.subcategories && category.subcategories.length > 0;
                            const categoryName = category.name?.toLowerCase() || '';
                            
                            return (
                              <div key={category.id || idx} className="relative group/subcategory">
                                <Link 
                                  href={hasSubcategories ? '#' : category.url}
                                  className="flex items-center justify-between px-5 py-3 text-gray-800 hover:text-red-600 hover:bg-gray-50
                                    transition-colors w-full border-b border-gray-50 last:border-b-0"
                                  style={{color: '#333'}} 
                                  onClick={(e) => hasSubcategories && e.preventDefault()}
                                >
                                  <div className="flex items-center">
                                    <CategoryIcon iconName={category.icon || categoryName} className="w-5 h-5 mr-3 text-gray-500" />
                                    <span className="text-current font-normal">{category.name}</span>
                                  </div>
                                  {hasSubcategories && (
                                    <ChevronRight size={14} className="text-gray-400" />
                                  )}
                                </Link>
                                
                                {/* Subcategories dropdown - Hikvision style with icons */}
                                {hasSubcategories && (
                                  <div className="absolute top-0 left-full bg-white shadow-md border border-gray-100
                                    opacity-0 invisible group-hover/subcategory:opacity-100 group-hover/subcategory:visible
                                    transition-all duration-200 min-w-[280px]">
                                    {category.subcategories?.map((subcategory, subIdx) => {
                                      const hasTertiaryCategories = subcategory.tertiaryCategories && 
                                        subcategory.tertiaryCategories.length > 0;
                                      const subcategoryName = subcategory.name?.toLowerCase() || '';
                                      
                                      return (
                                        <div key={subcategory.id || subIdx} className="relative group/tertiary">
                                          <Link
                                            href={hasTertiaryCategories ? '#' : subcategory.url}
                                            className="flex items-center justify-between px-5 py-3 text-gray-800 hover:text-red-600 hover:bg-gray-50
                                              transition-colors w-full border-b border-gray-50 last:border-b-0"
                                            style={{color: '#333'}}  
                                            onClick={(e) => hasTertiaryCategories && e.preventDefault()}
                                          >
                                            <div className="flex items-center">
                                              <CategoryIcon iconName={subcategory.icon || subcategoryName} className="w-4 h-4 mr-3 text-gray-500" />
                                              <span className="text-current font-normal">{subcategory.name}</span>
                                            </div>
                                            {hasTertiaryCategories && (
                                              <ChevronRight size={14} className="text-gray-400" />
                                            )}
                                          </Link>
                                          
                                          {/* Tertiary categories dropdown - Hikvision style with icons */}
                                          {hasTertiaryCategories && (
                                            <div className="absolute top-0 left-full bg-white shadow-md border border-gray-100
                                              opacity-0 invisible group-hover/tertiary:opacity-100 group-hover/tertiary:visible
                                              transition-all duration-200 min-w-[280px]">
                                              {subcategory.tertiaryCategories?.map((tertiary, tertiaryIdx) => {
                                                const tertiaryName = tertiary.name?.toLowerCase() || '';
                                                
                                                return (
                                                  <Link
                                                    key={tertiary.id || tertiaryIdx}
                                                    href={tertiary.url}
                                                    className="flex items-center px-5 py-3 text-gray-800 hover:text-red-600 hover:bg-gray-50
                                                      transition-colors border-b border-gray-50 last:border-b-0"
                                                    style={{color: '#333'}}
                                                  >
                                                    <div className="flex items-center">
                                                      <CategoryIcon iconName={tertiary.icon || tertiaryName} className="w-4 h-4 mr-3 text-gray-500" />
                                                      <span className="text-current font-normal">{tertiary.name}</span>
                                                    </div>
                                                  </Link>
                                                );
                                              })}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </li>
                  ) : null;
                })
              ) : (
                <li>
                  <Link 
                    href="/" 
                    className="text-[15px] text-gray-800 font-medium hover:text-red-600 transition-all duration-300 py-2 px-1 relative group"
                  >
                    Home
                    <span className="absolute bottom-0 left-0 h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          {/* Right Side - Enhanced UI Elements */}
          <div className="flex items-center space-x-6">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="hidden md:flex items-center text-gray-700 hover:text-red-600 transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <div className="bg-gray-100 p-2 rounded-full hover:bg-red-50 transition-colors">
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </div>
            </button>
            
            {/* Search Bar */}
            <div className="hidden md:block relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-red-500 transition-colors">
                <Search size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-[220px] py-2 pl-10 pr-4 border border-gray-300 rounded-full 
                focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600
                shadow-sm group-hover:shadow-md transition-all duration-300 text-sm"
              />
            </div>
            
            {/* User Account */}
            <Link href="/account" className="hidden md:flex items-center text-gray-700 hover:text-red-600 transition-colors">
              <div className="bg-gray-100 p-2 rounded-full hover:bg-red-50 transition-colors">
                <User size={20} />
              </div>
            </Link>
            
            {/* Shopping Cart */}
            <Link href="/cart" className="hidden md:flex items-center text-gray-700 hover:text-red-600 transition-colors">
              <div className="bg-gray-100 p-2 rounded-full hover:bg-red-50 transition-colors relative">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="xl:hidden flex items-center text-gray-700 hover:text-red-600 transition-colors"
            >
              <div className="bg-gray-100 p-2 rounded-full hover:bg-red-50 transition-colors">
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Using AnimatePresence for smooth transitions */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="xl:hidden bg-white border-t border-gray-200 shadow-lg overflow-hidden"
          >
            {/* Mobile Search */}
            <div className="p-4 border-b border-gray-100">
              <div className="relative w-full">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search size={18} />
                </div>
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full py-2.5 pl-10 pr-3 border border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
                />
              </div>
            </div>
            
            {/* Mobile Icons - Account & Cart */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <Link href="/account" className="flex items-center space-x-2 text-gray-800">
                <div className="bg-gray-100 p-2 rounded-full">
                  <User size={20} />
                </div>
                <span>My Account</span>
              </Link>
              
              <Link href="/cart" className="flex items-center space-x-2 text-gray-800">
                <div className="bg-gray-100 p-2 rounded-full relative">
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span>Cart</span>
              </Link>
            </div>
            
            {/* Mobile Nav Links with Accordion */}
            <nav className="py-2">
              <ul className="divide-y divide-gray-100">
                {/* Only render mobile nav items from CMS */}
                {navItems && navItems.length > 0 && navItems.map((item, i) => {
                  const url = item?.url || '';
                  const label = item?.label || '';
                  const hasCategories = item?.categories && item.categories.length > 0;
                  const isActive = activeDropdown === (item.id || `nav-${i}`);

                  return (url && label) ? (
                    <li key={item.id || i}>
                      <div 
                        className="flex items-center justify-between px-4 py-3 cursor-pointer"
                        onClick={() => hasCategories && setActiveDropdown(isActive ? null : (item.id || `nav-${i}`))}
                      >
                        <Link
                          href={hasCategories ? '#' : url}
                          className="text-gray-800 font-medium"
                          onClick={(e) => hasCategories && e.preventDefault()}
                        >
                          {label}
                        </Link>
                        {hasCategories && (
                          <ChevronDown 
                            size={18} 
                            className={`transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} 
                          />
                        )}
                      </div>

                      {/* Mobile submenu */}
                      {hasCategories && (
                        <motion.div
                          initial={false}
                          animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden bg-gray-50"
                        >
                          {item.categories?.map((category, idx) => (
                            <Link
                              key={category.id || idx}
                              href={category.url}
                              className="block px-6 py-2 text-gray-700 hover:text-red-600 hover:bg-gray-100 transition-colors"
                            >
                              {category.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </li>
                  ) : null;
                })}
              </ul>
            </nav>

            {/* Contact Info in Mobile Menu */}
            <div className="bg-gray-50 p-4">
              <div className="flex flex-col space-y-3">
                <a href="tel:+971509893134" className="flex items-center text-gray-700 hover:text-red-600 transition-colors">
                  <Phone size={16} className="mr-2" />
                  <span>+971 50 989 3134</span>
                </a>
                <a href="mailto:sales@hikvision-uae.ae" className="flex items-center text-gray-700 hover:text-red-600 transition-colors">
                  <Mail size={16} className="mr-2" />
                  <span>sales@hikvision-uae.ae</span>
                </a>
              </div>
              
              {/* Social Icons in Mobile Menu */}
              <div className="flex space-x-4 mt-4">
                {socialLinks && socialLinks.length > 0 ? (
                  socialLinks.map((social, index) => (
                    <a 
                      key={index}
                      href={social.url || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-200 p-2 rounded-full hover:bg-red-600 hover:text-white transition-colors"
                    >
                      <SocialIcon platform={social.platform} className="h-4 w-4" />
                    </a>
                  ))
                ) : (
                  <>
                    <a href="#" className="bg-gray-200 p-2 rounded-full hover:bg-red-600 hover:text-white transition-colors">
                      <SocialIcon platform="facebook" className="h-4 w-4" />
                    </a>
                    <a href="#" className="bg-gray-200 p-2 rounded-full hover:bg-red-600 hover:text-white transition-colors">
                      <SocialIcon platform="twitter" className="h-4 w-4" />
                    </a>
                    <a href="#" className="bg-gray-200 p-2 rounded-full hover:bg-red-600 hover:text-white transition-colors">
                      <SocialIcon platform="instagram" className="h-4 w-4" />
                    </a>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to compensate for fixed header height */}
      <div className={`h-[${isScrolled ? '56px' : '124px'}] transition-all duration-300`}></div>
    </header>
  )
}