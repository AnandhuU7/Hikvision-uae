'use client'

import { useState, useCallback, useEffect, useRef, memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import hikvisionLogo from '../../../public/logo.png'
import { usePathname, useRouter } from 'next/navigation'

const dropdownMenus = {
  technologies: [
    { title: 'Tandemvu-technology', href: 'Tandemvu' },
    { title: 'Acusense-technology', href: 'Acusense' },
    { title: 'Darkfighter-technology', href: 'Darkfighter' },
    { title: 'Colorvu-technology', href: 'Colorvu' },
  ],
  solutions: [
    { title: 'Manufacturing solution in Dubai', href: 'Manufacturing' },
    { title: 'Retail solution in Dubai', href: 'Retail' },
    { title: 'Healthcare solution in Dubai', href: 'Healthcare' },
    { title: 'Education Solution in Dubai', href: 'Education' },
  ],
}

interface NavbarCategory {
  _id: string;
  name: string;
  slug: string;
  order: number;
  isActive: boolean;
  createdAt: string;
}

// Dropdown menu component for desktop
const DropdownMenu = memo(function DropdownMenu({
  label,
  items,
  active,
  onOpen,
  pathname,
}: {
  label: string
  items: { title: string; href: string }[]
  active: boolean
  onOpen: (open: boolean) => void
  pathname: string
}) {
  return (
    <div
      className="relative group"
      onMouseEnter={() => onOpen(true)}
      onMouseLeave={() => onOpen(false)}
    >
      <motion.button
        className="flex items-center text-gray-800 font-medium text-base lg:text-lg"
        aria-haspopup="true"
        aria-expanded={active}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.span 
          className="relative px-3 py-1 rounded-lg"
          whileHover={{ 
            backgroundColor: "rgba(254, 242, 242, 0.7)",
            color: "#dc2626"
          }}
          transition={{ duration: 0.3 }}
        >
          {label}
          <motion.span 
            className="absolute inset-0 rounded-lg border border-red-200 opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.span>
        <motion.svg 
          className={`w-3 h-3 ml-1.5 ${active ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          animate={{ rotate: active ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>
      
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-lg py-3 mt-2 border border-gray-100 z-20"
            style={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
            role="menu"
          >
            {items.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <Link
                  href={`/${item.href}`}
                  className={`flex items-center px-5 py-2.5 text-gray-700 hover:text-red-600 transition-all duration-300 rounded-lg ${pathname === '/' + item.href ? 'text-red-600 font-medium bg-red-50' : ''}`}
                >
                  <motion.div 
                    className="w-1.5 h-1.5 rounded-full bg-red-400 mr-3"
                    whileHover={{ scale: 2, backgroundColor: "#dc2626" }}
                    transition={{ duration: 0.2 }}
                  />
                  <span className="text-sm">{item.title}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navRef = useRef<HTMLDivElement>(null)
  const [navbarCategories, setNavbarCategories] = useState<NavbarCategory[]>([])
  const [productsOpen, setProductsOpen] = useState(false)
  const [technologiesOpen, setTechnologiesOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname();
  const router = useRouter();

  // Detect scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const fetchNavbarCategories = async () => {
      try {
        const response = await fetch('/api/navbar-categories');
        const data = await response.json();
        setNavbarCategories(data);
      } catch (error) {
        console.error('Failed to fetch navbar categories:', error);
      }
    };
    fetchNavbarCategories();
  }, []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
        setIsOpen(false)
        setIsSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null)
        setIsOpen(false)
        setIsSearchOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  // Dropdown open/close handlers
  const handleDropdown = useCallback((dropdown: string | null) => {
    setActiveDropdown(dropdown)
  }, [])

  // Navigate to best search match using API (product > subcategory > category), fallback to /search
  const navigateToBestSearchResult = useCallback(async (query: string) => {
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, { cache: 'no-store' });
      if (!res.ok) throw new Error('Search request failed');
      const data = await res.json();

      const normalize = (s: unknown) => (typeof s === 'string' ? s.trim().toLowerCase() : '');
      const qn = normalize(query);

      // Prefer exact matches by type: category > subcategory > product
      const exactCategory = data?.categories?.find((c: any) => normalize(c.name) === qn || normalize(c.slug) === qn);
      if (exactCategory?.url) {
        router.push(exactCategory.url);
        return;
      }
      const exactSubcategory = data?.subcategories?.find((s: any) => normalize(s.name) === qn || normalize(s.slug) === qn);
      if (exactSubcategory?.url) {
        router.push(exactSubcategory.url);
        return;
      }
      const exactProduct = data?.products?.find((p: any) => normalize(p.name) === qn || normalize(p.slug) === qn);
      if (exactProduct?.url) {
        router.push(exactProduct.url);
        return;
      }

      // Otherwise prioritize broader pages: category > subcategory > product
      const topCategory = data?.categories?.[0];
      if (topCategory?.url) {
        router.push(topCategory.url);
        return;
      }
      const topSubcategory = data?.subcategories?.[0];
      if (topSubcategory?.url) {
        router.push(topSubcategory.url);
        return;
      }
      const topProduct = data?.products?.[0];
      if (topProduct?.url) {
        router.push(topProduct.url);
        return;
      }

      router.push(`/search?q=${encodeURIComponent(query)}`);
    } catch (err) {
      console.error('Search navigation error:', err);
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  }, [router]);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      navigateToBestSearchResult(q);
      setSearchQuery('');
      setIsSearchOpen(false);
      setIsOpen(false);
    }
  }

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-sm shadow-xl lg:max-w-7xl lg:mx-auto lg:rounded-2xl' 
          : 'bg-transparent w-full'
      }`} 
      ref={navRef}
    >
      {/* Top bar - only show when not scrolled */}
      {!isScrolled && (
        <div className="bg-gradient-to-r from-red-900 to-red-900 text-white py-2 px-4">
          <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-4">
              <a href="tel:+971509893134" className="flex items-center hover:text-white/80 transition group">
                <div className="bg-white/10 rounded-full p-1.5 mr-2 group-hover:bg-white/20 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                +971 50 989 3134
              </a>
              <a href="mailto:sales@hikvisionuae.ae" className="flex items-center hover:text-white/80 transition group">
                <div className="bg-white/10 rounded-full p-1.5 mr-2 group-hover:bg-white/20 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                sales@hikvisionuae.ae
              </a>
            </div>
          </div>
        </div>
      )}

      <nav className={`container mx-auto px-2 sm:px-6 py-3 sm:py-4 transition-all duration-300 ${isScrolled ? 'py-2 sm:py-3' : ''}`}>
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 ml-2 sm:ml-8">
            <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
              <div className="relative h-14 w-[180px] sm:w-[220px]">
                <Image
                  src={hikvisionLogo.src}
                  alt="Hikvision Dubai"
                  width={200}
                  height={50}
                  className={`h-12 w-auto object-contain transition-all duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                  priority
                  quality={100}
                  onLoad={() => setIsLoading(false)}
                />
                {isLoading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded-2xl" />
                )}
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Only show on larger screens */}
          <div className="hidden lg:flex flex-1 justify-center items-center space-x-6 lg:space-x-10">
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.3 }}>
              <Link
                href="/"
                className={`text-gray-800 font-medium text-base lg:text-lg relative ${pathname === '/' ? 'text-red-600' : ''}`}
              >
                <motion.span 
                  className="relative px-3 py-1 rounded-lg"
                  whileHover={{ 
                    backgroundColor: "rgba(254, 242, 242, 0.7)",
                    color: "#dc2626"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  Home
                  <motion.span 
                    className="absolute inset-0 rounded-lg border border-red-200 opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.span>
              </Link>
            </motion.div>

            {/* Products Dropdown */}
            <DropdownMenu
              label="Products"
              items={navbarCategories.map(c => ({ title: c.name, href: c.slug }))}
              active={activeDropdown === 'products'}
              onOpen={open => handleDropdown(open ? 'products' : null)}
              pathname={pathname}
            />

            {/* Technologies Dropdown */}
            <DropdownMenu
              label="Technologies"
              items={dropdownMenus.technologies}
              active={activeDropdown === 'technologies'}
              onOpen={open => handleDropdown(open ? 'technologies' : null)}
              pathname={pathname}
            />

            {/* Solutions Dropdown */}
            <DropdownMenu
              label="Solutions"
              items={dropdownMenus.solutions}
              active={activeDropdown === 'solutions'}
              onOpen={open => handleDropdown(open ? 'solutions' : null)}
              pathname={pathname}
            />

            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.3 }}>
              <Link
                href="/About"
                className={`text-gray-800 font-medium text-base lg:text-lg relative ${pathname === '/About' ? 'text-red-600' : ''}`}
              >
                <motion.span 
                  className="relative px-3 py-1 rounded-lg"
                  whileHover={{ 
                    backgroundColor: "rgba(254, 242, 242, 0.7)",
                    color: "#dc2626"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  About Us
                  <motion.span 
                    className="absolute inset-0 rounded-lg border border-red-200 opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.span>
              </Link>
            </motion.div>

            {/* Search Input/Button - Enhanced with border */}
            <div 
              className="relative"
              onMouseEnter={() => setIsSearchOpen(true)}
              onMouseLeave={() => setIsSearchOpen(false)}
            >
              <motion.button 
                className="p-2 rounded-full bg-gray-50 text-gray-500 border border-gray-200"
                whileHover={{ 
                  backgroundColor: "#fef2f2", 
                  color: "#dc2626",
                  scale: 1.1,
                  borderColor: "#fca5a5"
                }}
                transition={{ duration: 0.3 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </motion.button>
              
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`absolute top-full right-0 mt-2 w-80 ${
                      isScrolled 
                        ? 'bg-white/90 backdrop-blur-sm' 
                        : 'bg-white'
                    } rounded-xl shadow-lg border border-gray-200 z-20 overflow-hidden`}
                    style={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
                  >
                    <form onSubmit={handleSearch} className="flex">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="flex-1 px-4 py-2 text-gray-700 bg-transparent focus:outline-none border-r border-gray-200"
                        autoFocus
                      />
                      <button 
                        type="submit"
                        className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/Contact"
                className="inline-flex items-center px-5 py-2 text-white font-medium rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-sm shadow-md"
              >
                <span>Contact Us</span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button - Show on tablet and mobile */}
          <motion.button
            className="lg:hidden p-2 rounded-full border-2 border-red-500 bg-white shadow-sm"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>

        {/* Mobile menu content - Top to bottom animation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-[9999]"
              style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
            >
              {/* Overlay */}
              <motion.div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
              />
              
              {/* Menu Panel - Top to bottom animation */}
              <motion.div
                className="absolute top-0 left-0 w-full max-h-[90vh] bg-white rounded-b-3xl shadow-2xl overflow-hidden flex flex-col"
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 150, duration: 0.5 }}
              >
                {/* Header with Close Button */}
                <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100 bg-gradient-to-r from-red-600 to-red-700 text-white flex-shrink-0">
                  <span className="text-xl font-bold tracking-wide">Menu</span>
                  <motion.button
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close menu"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                {/* Menu Items */}
                <nav className="flex flex-col px-4 py-6 overflow-y-auto flex-grow">
                  <motion.div 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Link 
                      href="/" 
                      className={`flex items-center space-x-3 px-5 py-4 rounded-xl mb-2 text-base font-medium ${
                        pathname === '/' ? 'bg-red-600 text-white shadow-md' : 'text-gray-700 hover:bg-red-50'
                      }`} 
                      onClick={() => setIsOpen(false)}
                    >
                      <div className={`p-2 rounded-lg ${pathname === '/' ? 'bg-white/20' : 'bg-red-100 text-red-600'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <span>Home</span>
                    </Link>
                  </motion.div>

                  {/* Products Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    className="mb-2"
                  >
                    <motion.button
                      className={`w-full flex items-center justify-between px-5 py-4 rounded-xl text-base font-medium ${
                        productsOpen ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-red-50'
                      }`}
                      onClick={() => setProductsOpen(!productsOpen)}
                      aria-expanded={productsOpen}
                      aria-controls="mobile-products-menu"
                      aria-haspopup="true"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${productsOpen ? 'bg-red-600 text-white' : 'bg-red-100 text-red-600'}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                        <span>Products</span>
                      </div>
                      <motion.svg 
                        className="w-4 h-4 text-red-600"
                        animate={{ rotate: productsOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </motion.button>
                    
                    <AnimatePresence>
                      {productsOpen && (
                        <motion.div
                          id="mobile-products-menu"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-3 py-2 space-y-1 ml-14">
                            {navbarCategories.map((category, index) => (
                              <motion.div
                                key={category._id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                              >
                                <Link
                                  href={`/${category.slug}`}
                                  className={`flex items-center px-4 py-3 rounded-lg text-sm ${
                                    pathname === '/' + category.slug 
                                      ? 'bg-red-50 text-red-700 font-medium' 
                                      : 'text-gray-600 hover:bg-gray-50'
                                  }`}
                                  onClick={() => setIsOpen(false)}
                                >
                                  <div className="w-2 h-2 rounded-full bg-red-400 mr-3" />
                                  {category.name}
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Technologies Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="mb-2"
                  >
                    <motion.button
                      className={`w-full flex items-center justify-between px-5 py-4 rounded-xl text-base font-medium ${
                        technologiesOpen ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-red-50'
                      }`}
                      onClick={() => setTechnologiesOpen(!technologiesOpen)}
                      aria-expanded={technologiesOpen}
                      aria-controls="mobile-technologies-menu"
                      aria-haspopup="true"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${technologiesOpen ? 'bg-red-600 text-white' : 'bg-red-100 text-red-600'}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <span>Technologies</span>
                      </div>
                      <motion.svg 
                        className="w-4 h-4 text-red-600"
                        animate={{ rotate: technologiesOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </motion.button>
                    
                    <AnimatePresence>
                      {technologiesOpen && (
                        <motion.div
                          id="mobile-technologies-menu"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-3 py-2 space-y-1 ml-14">
                            {dropdownMenus.technologies.map((item, index) => (
                              <motion.div
                                key={item.href}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                              >
                                <Link
                                  href={`/${item.href}`}
                                  className={`flex items-center px-4 py-3 rounded-lg text-sm ${
                                    pathname === '/' + item.href 
                                      ? 'bg-red-50 text-red-700 font-medium' 
                                      : 'text-gray-600 hover:bg-gray-50'
                                  }`}
                                  onClick={() => setIsOpen(false)}
                                >
                                  <div className="w-2 h-2 rounded-full bg-red-400 mr-3" />
                                  {item.title}
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Solutions Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.25 }}
                    className="mb-2"
                  >
                    <motion.button
                      className={`w-full flex items-center justify-between px-5 py-4 rounded-xl text-base font-medium ${
                        solutionsOpen ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-red-50'
                      }`}
                      onClick={() => setSolutionsOpen(!solutionsOpen)}
                      aria-expanded={solutionsOpen}
                      aria-controls="mobile-solutions-menu"
                      aria-haspopup="true"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${solutionsOpen ? 'bg-red-600 text-white' : 'bg-red-100 text-red-600'}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                        </div>
                        <span>Solutions</span>
                      </div>
                      <motion.svg 
                        className="w-4 h-4 text-red-600"
                        animate={{ rotate: solutionsOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </motion.button>
                    
                    <AnimatePresence>
                      {solutionsOpen && (
                        <motion.div
                          id="mobile-solutions-menu"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-3 py-2 space-y-1 ml-14">
                            {dropdownMenus.solutions.map((item, index) => (
                              <motion.div
                                key={item.href}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                              >
                                <Link
                                  href={`/${item.href}`}
                                  className={`flex items-center px-4 py-3 rounded-lg text-sm ${
                                    pathname === '/' + item.href 
                                      ? 'bg-red-50 text-red-700 font-medium' 
                                      : 'text-gray-600 hover:bg-gray-50'
                                  }`}
                                  onClick={() => setIsOpen(false)}
                                >
                                  <div className="w-2 h-2 rounded-full bg-red-400 mr-3" />
                                  {item.title}
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <Link
                      href="/About"
                      className={`flex items-center space-x-3 px-5 py-4 rounded-xl text-base font-medium ${
                        pathname === '/About' ? 'bg-red-600 text-white shadow-md' : 'text-gray-700 hover:bg-red-50'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className={`p-2 rounded-lg ${pathname === '/About' ? 'bg-white/20' : 'bg-red-100 text-red-600'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span>About Us</span>
                    </Link>
                  </motion.div>
                </nav>

                {/* Search Bar and Contact Button at the bottom */}
                <div className="px-6 pb-5 bg-gray-50 border-t border-gray-100">
                  {/* Search Bar */}
                  <motion.form 
                    className="mb-4"
                    onSubmit={handleSearch}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="w-full px-4 py-3 pl-12 text-gray-700 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <motion.button
                        type="submit"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </motion.button>
                    </div>
                  </motion.form>

                  {/* Contact Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href="/Contact"
                      className="flex items-center justify-center w-full px-5 py-3 text-white font-medium rounded-lg bg-gradient-to-r from-red-600 to-red-700 shadow-md"
                      onClick={() => setIsOpen(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Contact Us
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

export default Navbar