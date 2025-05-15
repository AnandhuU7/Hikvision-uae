# blank

blank

## Attributes

- **Database**: mongodb
- **Storage Adapter**: localDisk









//Component.tsx

// This should be a server component (no 'use client' directive)
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import ClientHeader from '@/Header/ClientHeader'
import { SiteSetting, Media } from '@/payload-types'

export async function Header() {
  // Initialize with empty arrays/values
  let navItems: any[] = []
  let socialLinks: any[] = []
  let logoUrl: string | null = null
  
  try {
    const payload = await getPayload({ config: configPromise })
    // Use 'site-settings' which is a valid global slug 
    const siteSettings = await payload.findGlobal({ 
      slug: 'site-settings' 
    }) as SiteSetting
    
    // Add debug logs to see what's coming back
    console.log('Site settings received:', JSON.stringify({
      navItems: siteSettings?.navItems,
      socialLinks: siteSettings?.socialLinks
    }, null, 2))
    
    // Make sure we're extracting the correct properties
    navItems = siteSettings?.navItems || []
    socialLinks = siteSettings?.socialLinks || []
    
    // Fixed: Handle the case where logo could be a string or Media object
    if (siteSettings?.logo) {
      if (typeof siteSettings.logo === 'object') {
        logoUrl = (siteSettings.logo as Media)?.url || null
      } else if (typeof siteSettings.logo === 'string') {
        logoUrl = siteSettings.logo
      }
    }
  } catch (err) {
    console.error('Failed to load data from Payload:', err)
  }
  
  return <ClientHeader 
    navItems={navItems} 
    socialLinks={socialLinks}
    logoUrl={logoUrl || ''}
  />
}




ClientHeader

'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, ChevronDown, Menu, X } from 'lucide-react'
import { Logo } from '@/components/Logo/Logo'

// Update NavItem type to support three levels of categories
type NavItem = {
  url?: string;
  label?: string;
  id?: string;
  categories?: Array<{
    name: string;
    url: string;
    id?: string;
    subcategories?: Array<{
      name: string;
      url: string;
      id?: string;
      tertiaryCategories?: Array<{  // New third level
        name: string;
        url: string;
        id?: string;
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

export default function ClientHeader({ navItems = [], socialLinks = [], logoUrl }: ClientHeaderProps) {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return (
      <header className="header-placeholder" suppressHydrationWarning>
        <div className="h-24 bg-white"></div>
      </header>
    )
  }
  
  return (
    <header className="w-full bg-white shadow-md z-50" suppressHydrationWarning>
      {/* Top Bar with social links */}
      <div className=" bg-black         text-white">
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
                  className="hover:text-gray-200 transition"
                >
                  <SocialIcon platform={social.platform} />
                </a>
              ))
            ) : (
              // Fallback icons if none provided from CMS
              <>
                <a href="#" className="hover:text-gray-200 transition">
                  <SocialIcon platform="facebook" />
                </a>
                <a href="#" className="hover:text-gray-200 transition">
                  <SocialIcon platform="twitter" />
                </a>
                <a href="#" className="hover:text-gray-200 transition">
                  <SocialIcon platform="youtube" />
                </a>
                <a href="#" className="hover:text-gray-200 transition">
                  <SocialIcon platform="linkedin" />
                </a>
                <a href="#" className="hover:text-gray-200 transition">
                  <SocialIcon platform="instagram" />
                </a>
              </>
            )}
          </div>
          
          {/* Logo (Centered) */}
          <Link href="/" className="hidden md:block flex-shrink-0 mx-4">
            <Logo 
              image={logoUrl || ''} 
              className="h-10 w-auto"
            />
          </Link>
          
          {/* Contact Info */}
          <div className="flex flex-col md:flex-row md:space-x-6 text-sm">
            <a href="tel:+971509893134" className="flex items-center mb-1 md:mb-0 hover:text-gray-200 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+971 50 989 3134</span>
            </a>
            <a href="mailto:sales@hikvision-uae.ae" className="flex items-center hover:text-gray-200 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>sales@hikvision-uae.ae</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Left Side Navigation with Dropdown Support */}
          <nav className="hidden md:flex items-center">
            <ul className="flex space-x-8 font-medium">
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
                        className="text-lg !text-black font-semibold transition-all duration-300 py-2 px-3 
                        border-b-2 border-transparent hover:border-red-800 hover:text-red-800 
                        flex items-center"
                        style={{color: '#000', fontWeight: 600}}
                      >
                        {label}
                        {hasCategories && (
                          <ChevronDown size={16} className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
                        )}
                      </Link>
                      
                      {/* Dropdown Menu - Updated with subcategories */}
                      {hasCategories && (
                        <div 
                          className={`absolute top-full left-0 w-64 bg-white shadow-lg py-2 mt-1 z-50 border-t-2 border-red-800
                          transition-all duration-300 ${activeDropdown === (item.id || `nav-${i}`) ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                        >
                          {item.categories?.map((category, idx) => {
                            const hasSubcategories = category.subcategories && category.subcategories.length > 0;
                            
                            return (
                              <div key={category.id || idx} className="relative group/subcategory">
                                <Link 
                                  href={hasSubcategories ? '#' : category.url}
                                  className="flex items-center justify-between px-6 py-3 text-black font-medium hover:bg-red-50 hover:text-red-800 
                                    transition-colors border-l-4 border-transparent hover:border-red-800 w-full"
                                  style={{color: '#000'}}
                                  onClick={(e) => hasSubcategories && e.preventDefault()}
                                >
                                  <span>{category.name}</span>
                                  {hasSubcategories && (
                                    <ChevronDown size={14} className="ml-1 transform -rotate-90 transition-transform duration-300 group-hover/subcategory:rotate-0" />
                                  )}
                                </Link>
                                
                                {/* Subcategories dropdown */}
                                {hasSubcategories && (
                                  <div className="absolute top-0 left-full bg-white w-64 shadow-lg py-2 
                                    opacity-0 invisible group-hover/subcategory:opacity-100 group-hover/subcategory:visible
                                    transition-all duration-300 border-l-2 border-red-800">
                                    {category.subcategories?.map((subcategory, subIdx) => {
                                      // Check if there are tertiary categories
                                      const hasTertiaryCategories = subcategory.tertiaryCategories && 
                                        subcategory.tertiaryCategories.length > 0;
                                      
                                      return (
                                        <div key={subcategory.id || subIdx} className="relative group/tertiary">
                                          <Link
                                            href={hasTertiaryCategories ? '#' : subcategory.url}
                                            className="flex items-center justify-between px-6 py-2.5 text-black font-medium 
                                              hover:bg-red-50 hover:text-red-800 transition-colors 
                                              border-l-4 border-transparent hover:border-red-800 w-full"
                                            style={{color: '#000'}}
                                            onClick={(e) => hasTertiaryCategories && e.preventDefault()}
                                          >
                                            <span>{subcategory.name}</span>
                                            {hasTertiaryCategories && (
                                              <ChevronDown 
                                                size={14} 
                                                className="ml-1 transform -rotate-90 transition-transform 
                                                  duration-300 group-hover/tertiary:rotate-0" 
                                              />
                                            )}
                                          </Link>
                                          
                                          {/* Tertiary categories dropdown - third level */}
                                          {hasTertiaryCategories && (
                                            <div className="absolute top-0 left-full bg-white w-64 shadow-lg py-2
                                              opacity-0 invisible group-hover/tertiary:opacity-100 group-hover/tertiary:visible
                                              transition-all duration-300 border-l-2 border-red-800">
                                              {subcategory.tertiaryCategories?.map((tertiary, tertiaryIdx) => (
                                                <Link
                                                  key={tertiary.id || tertiaryIdx}
                                                  href={tertiary.url}
                                                  className="block px-6 py-2.5 text-black font-medium 
                                                    hover:bg-red-50 hover:text-red-800 transition-colors
                                                    border-l-4 border-transparent hover:border-red-800"
                                                  style={{color: '#000'}}
                                                >
                                                  {tertiary.name}
                                                </Link>
                                              ))}
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
                  <Link href="/" className="text-lg font-semibold py-2 px-3" style={{color: '#000'}}>Home</Link>
                </li>
              )}
            </ul>
          </nav>

          {/* Right Side - Enhanced Beautiful Search Bar */}
          <div className="hidden md:flex flex-none max-w-md ml-auto">
            <div className="relative w-full group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-gray-600 transition-colors">
                <Search size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Search For Product" 
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full py-2.5 pl-10 pr-14 border border-gray-300 rounded-full 
                focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black
                shadow-sm hover:shadow-md transition-all duration-300 text-sm font-medium"
              />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-black text-white 
                px-4 py-1.5 rounded-full hover:bg-gray-800 transition-all duration-300
                shadow-sm hover:shadow-md flex items-center justify-center">
                <span className="mr-1 text-sm font-medium">Search</span>
                <Search size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="text-gray-700 hover:text-red-800 transition"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          {/* Mobile Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search For Product" 
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-red-800 focus:border-red-800"
              />
              <button className="absolute right-0 top-0 bottom-0 bg-red-800 text-white px-4 rounded-r-md hover:bg-red-900 transition">
                <Search size={20} />
              </button>
            </div>
          </div>
          
          {/* Mobile Nav Links - ONLY CMS LINKS */}
          <nav className="py-2">
            <ul className="space-y-1">
              {/* Only render mobile nav items from CMS */}
              {navItems && navItems.length > 0 && navItems.map((item, i) => {
                const url = item?.url || '';
                const label = item?.label || '';
                
                return (url && label) ? (
                  <li key={item.id || i} className="border-t border-gray-100">
                    <Link 
                      href={url} 
                      className="block px-4 py-2 text-black hover:bg-red-800 hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ) : null;
              })}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}










<!-- Product.ts  -->

import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    meta: {
      image: true,
      description: true,
    },
  },

  admin: {
    useAsTitle: 'title',
    group: 'Products',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'productImages',
      type: 'array',
      label: 'Additional Product Images',
      minRows: 0,
      maxRows: 8,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt Text',
          required: true,
        },
      ],
      admin: {
        description: 'Add multiple product images for the gallery view',
      },
    },
    {
      name: 'isNew',
      type: 'checkbox',
      label: 'New Product',
      defaultValue: false,
    },
    {
      name: 'subtitle',
      type: 'text',
      admin: {
        description: 'Secondary title/description like "2 MP AcuSense Fixed Cube Network Camera"',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'This will be used for the product URL',
      },
    },
    {
      name: 'mainCategory',
      type: 'select',
      required: true,
      options: [
        { label: 'Network Products', value: 'network-products' },
        { label: 'Thermal Products', value: 'thermal-products' },
        { label: 'Access Control', value: 'access-control' },
        { label: 'Video Intercom', value: 'video-intercom' },
        { label: 'Alarm', value: 'alarm' },
        { label: 'Storage', value: 'storage' },
        { label: 'Software', value: 'software' },
        { label: 'Solution', value: 'solution' },
      ],
      admin: {
        description: 'Select the main product category',
      },
    },
    {
      name: 'productType',
      type: 'select',
      required: true,
      options: [
        // Network Products subcategories
        { label: 'Network Camera', value: 'network-camera' },
        { label: 'PTZ Camera', value: 'ptz-camera' },
        { label: 'NVR', value: 'nvr' },
        { label: 'Digital Signage', value: 'digital-signage' },
        { label: 'Encoders & Decoders', value: 'encoders-decoders' },
        { label: 'Video Management', value: 'video-management' },
        { label: 'Network Switches', value: 'network-switches' },

        // Thermal Products subcategories
        { label: 'Thermal Camera', value: 'thermal-camera' },
        { label: 'Thermal Temperature Screening', value: 'thermal-screening' },
        { label: 'Thermal Handheld', value: 'thermal-handheld' },

        // Access Control subcategories
        { label: 'Access Controller', value: 'access-controller' },
        { label: 'Time Attendance', value: 'time-attendance' },
        { label: 'Turnstiles', value: 'turnstiles' },
        { label: 'Card Readers', value: 'card-readers' },

        // Video Intercom subcategories
        { label: 'Door Station', value: 'door-station' },
        { label: 'Indoor Station', value: 'indoor-station' },
        { label: 'Master Station', value: 'master-station' },

        // Alarm subcategories
        { label: 'Alarm Panel', value: 'alarm-panel' },
        { label: 'Detectors', value: 'detectors' },
        { label: 'Keypads', value: 'keypads' },

        // Storage subcategories
        { label: 'HDD', value: 'hdd' },
        { label: 'NAS', value: 'nas' },
        { label: 'SAN', value: 'san' },
      ],
      admin: {
        description: 'Select the specific product type',
        condition: (data) => !!data.mainCategory,
      },
    },
    {
      name: 'series',
      type: 'select',
      required: true,
      options: [
        // Network Camera series
        { label: 'Pro Series', value: 'pro-series' },
        { label: 'Value Series', value: 'value-series' },
        { label: 'Ultra Series', value: 'ultra-series' },
        { label: 'Easy Series', value: 'easy-series' },
        { label: 'Special Series', value: 'special-series' },
        { label: 'Covert Series', value: 'covert-series' },
        { label: 'Mobile Series', value: 'mobile-series' },

        // PTZ series
        { label: 'Positioning System', value: 'positioning-system' },
        { label: 'Pro PTZ Series', value: 'pro-ptz' },
        { label: 'Ultra PTZ Series', value: 'ultra-ptz' },

        // NVR series
        { label: 'Pro NVR Series', value: 'pro-nvr' },
        { label: 'Ultra NVR Series', value: 'ultra-nvr' },
        { label: 'Value NVR Series', value: 'value-nvr' },

        // Generic series for other product types
        { label: 'Standard Series', value: 'standard-series' },
        { label: 'Advanced Series', value: 'advanced-series' },
        { label: 'Premium Series', value: 'premium-series' },
        { label: 'Enterprise Series', value: 'enterprise-series' },
        { label: 'Budget Series', value: 'budget-series' },
      ],
      admin: {
        description: 'Select the product series',
        condition: (data) => !!data.productType,
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      maxLength: 200,
      admin: {
        description: 'A short one-line description (max 200 chars)',
      },
    },
    {
      name: 'featureIcons',
      type: 'array',
      label: 'Feature Icons',
      minRows: 0,
      maxRows: 10,
      fields: [
        {
          name: 'iconType',
          type: 'select',
          required: true,
          options: [
            { label: 'PIR', value: 'pir' },
            { label: 'SD Card', value: 'sd-card' },
            { label: 'H.265+', value: 'h265' },
            { label: 'Audio', value: 'audio' },
            { label: 'WDR', value: 'wdr' },
            { label: 'Vehicle Detection', value: 'vehicle' },
            { label: '4K', value: '4k' },
            { label: 'Night Vision', value: 'night-vision' },
            { label: 'AI', value: 'ai' },
            { label: 'Water Resistant', value: 'waterproof' },
          ],
        },
        {
          name: 'customIcon',
          type: 'upload',
          relationTo: 'media',
          label: 'Custom Icon Image',
          admin: {
            description: 'Optional: Upload a custom icon instead of using a predefined one',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Custom Label',
          admin: {
            description: 'Optional: Override the default label for this icon',
          },
        },
      ],
      admin: {
        description: 'Select feature icons to display on product page',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
        {
          name: 'details',
          label: 'Product Details',
          fields: [
            {
              name: 'features',
              type: 'array',
              label: 'Product Features',
              fields: [
                {
                  name: 'feature',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'specifications',
              type: 'array',
              label: 'Technical Specifications Categories',
              fields: [
                {
                  name: 'category',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Specification category (e.g., Camera, Lens, Video)',
                  }
                },
                {
                  name: 'specs',
                  type: 'array',
                  label: 'Specifications',
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'value',
                      type: 'richText',
                      required: true,
                      admin: {
                        description: 'Can include detailed formatted specifications'
                      }
                    }
                  ]
                }
              ],
              admin: {
                description: 'Add specifications by category',
              }
            },
          ],
        },
      ],
    },
  ],
};

















Product.ts

import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    meta: {
      image: true,
      description: true,
    },
  },

  admin: {
    useAsTitle: 'title',
    group: 'Products',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'productImages',
      type: 'array',
      label: 'Additional Product Images',
      minRows: 0,
      maxRows: 8,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt Text',
          required: true,
        },
      ],
      admin: {
        description: 'Add multiple product images for the gallery view',
      },
    },
    {
      name: 'isNew',
      type: 'checkbox',
      label: 'New Product',
      defaultValue: false,
    },
    {
      name: 'subtitle',
      type: 'text',
      admin: {
        description: 'Secondary title/description like "2 MP AcuSense Fixed Cube Network Camera"',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'This will be used for the product URL',
      },
    },
    {
      name: 'mainCategory',
      type: 'select',
      required: true,
      options: [
        { label: 'Network Products', value: 'network-products' },
        { label: 'Turbo Hd Products', value: 'turbo-hd-products' },
        { label: 'Access Control', value: 'access-control' },
        { label: 'Display And Control', value: 'display-and-control' },
        { label: 'Solution', value: 'solution' },
      ],
      admin: {
        description: 'Select the main product category',
      },
    },
    {
      name: 'productType',
      type: 'select',
      required: true,
      options: [
        // Network Products subcategories
        { label: 'Network Camera', value: 'network-camera' },
        { label: 'PTZ Camera', value: 'ptz-camera' },
        { label: 'NVR', value: 'nvr' },

        // Turbo HD Products subcategories
        { label: 'Turbo Hd Cameras', value: 'turbo-hd-cameras' },
        { label: 'DVR', value: 'dvr' },

        // Display And Control subcategories
        { label: 'Monitors', value: 'monitors' },
        { label: 'Digital Signage', value: 'digital-signage' },
        { label: 'Controllers', value: 'controllers' },
        { label: 'LCD Video Walls', value: 'lcd-video-walls' },
        { label: 'LED Displays', value: 'led-displays' },

        // Access Control subcategories
        { label: 'Controllers', value: 'access-controllers' },
        { label: 'Visitors Terminals', value: 'visitors-terminals' },
        { label: 'Electrical Locks', value: 'electrical-locks' },
        { label: 'Face Recognition Terminal', value: 'face-recognition-terminal' },
        { label: 'Readers', value: 'readers' },
        { label: 'Kits', value: 'kits' },
        { label: 'Card Terminals', value: 'card-terminals' },
        { label: 'FingerPrint Terminals', value: 'fingerprint-terminals' },
      ],
      admin: {
        description: 'Select the specific product type',
        condition: (data) => !!data.mainCategory,
      },
    },
    {
      name: 'series',
      type: 'select',
      required: true,
      options: [
        // Turbo HD Cameras series
        { label: 'Value Series', value: 'value-series' },
        { label: 'Turbo HD Cameras with ColorVu', value: 'turbo-hd-cameras-with-colorvu' },
        { label: 'Pro Series', value: 'pro-series' },
        { label: 'Webcam Series', value: 'webcam-series' },
        { label: 'IOT Series', value: 'iot-series' },
        { label: 'Audio & Video Collaboration Solution', value: 'audio-video-collaboration-solution' },
        { label: 'Ultra Series', value: 'ultra-series' },

        // Keep other existing series options
        { label: 'Easy Series', value: 'easy-series' },
        { label: 'Special Series', value: 'special-series' },
        { label: 'Covert Series', value: 'covert-series' },
        { label: 'Mobile Series', value: 'mobile-series' },
        { label: 'Positioning System', value: 'positioning-system' },
        { label: 'Pro PTZ Series', value: 'pro-ptz' },
        { label: 'Ultra PTZ Series', value: 'ultra-ptz' },
        { label: 'Pro NVR Series', value: 'pro-nvr' },
        { label: 'Ultra NVR Series', value: 'ultra-nvr' },
        { label: 'Value NVR Series', value: 'value-nvr' },
        { label: 'Standard Series', value: 'standard-series' },
        { label: 'Advanced Series', value: 'advanced-series' },
        { label: 'Premium Series', value: 'premium-series' },
        { label: 'Enterprise Series', value: 'enterprise-series' },
        { label: 'Budget Series', value: 'budget-series' },
      ],
      admin: {
        description: 'Select the product series',
        condition: (data) => !!data.productType,
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      maxLength: 200,
      admin: {
        description: 'A short one-line description (max 200 chars)',
      },
    },
    {
      name: 'featureIcons',
      type: 'array',
      label: 'Feature Icons',
      minRows: 0,
      maxRows: 10,
      fields: [
        {
          name: 'iconType',
          type: 'select',
          required: true,
          options: [
            { label: 'PIR', value: 'pir' },
            { label: 'SD Card', value: 'sd-card' },
            { label: 'H.265+', value: 'h265' },
            { label: 'Audio', value: 'audio' },
            { label: 'WDR', value: 'wdr' },
            { label: 'Vehicle Detection', value: 'vehicle' },
            { label: '4K', value: '4k' },
            { label: 'Night Vision', value: 'night-vision' },
            { label: 'AI', value: 'ai' },
            { label: 'Water Resistant', value: 'waterproof' },
          ],
        },
        {
          name: 'customIcon',
          type: 'upload',
          relationTo: 'media',
          label: 'Custom Icon Image',
          admin: {
            description: 'Optional: Upload a custom icon instead of using a predefined one',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Custom Label',
          admin: {
            description: 'Optional: Override the default label for this icon',
          },
        },
      ],
      admin: {
        description: 'Select feature icons to display on product page',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
        {
          name: 'details',
          label: 'Product Details',
          fields: [
            {
              name: 'features',
              type: 'array',
              label: 'Product Features',
              fields: [
                {
                  name: 'feature',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'specifications',
              type: 'array',
              label: 'Technical Specifications Categories',
              fields: [
                {
                  name: 'category',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Specification category (e.g., Camera, Lens, Video)',
                  }
                },
                {
                  name: 'specs',
                  type: 'array',
                  label: 'Specifications',
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'value',
                      type: 'richText',
                      required: true,
                      admin: {
                        description: 'Can include detailed formatted specifications'
                      }
                    }
                  ]
                }
              ],
              admin: {
                description: 'Add specifications by category',
              }
            },
          ],
        },
      ],
    },
  ],
};











payload.config.ts


import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { SiteSettings } from './globals/Settings/config'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { ServicePage } from './collections/services'
import { Products } from './collections/Products'
import { Categories } from './collections/Categories'
import { Gallery } from './collections/Gallery'
import { GalleryCategories } from './collections/GalleryCategories'
import { FAQs } from './collections/FAQs'
import { BestProducts } from './collections/BestProducts'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { revalidateRedirects } from './hooks/revalidateRedirects'
import { FooterConfig } from './globals/Footer/config'
// import { Field } from 'payload/types'
import type { Field } from 'payload'

// Create a proper global config for Homepage
const HomepageGlobal = {
  slug: 'homepage',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Content',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'sliderImage',
      type: 'array',
      label: 'Slider Images',
      admin: {
        description: 'Add images for the homepage carousel slider',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'altText',
          type: 'text',
          label: 'Alt Text',
          admin: {
            description: 'Alternative text for accessibility',
          },
          required: true,
        },
      ],
    },
    {
      name: 'carouselItems',
      type: 'array',
      label: 'Carousel Items',
      admin: {
        description: 'Add items to display in the carousel section',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Item Title'
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Item Image'
        }
      ]
    },
  ],
}

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    ServicePage,
    Products,
    Categories,
    Gallery,
    GalleryCategories,
    FAQs,
    BestProducts,
  ],
  editor: lexicalEditor(),
  globals: [SiteSettings, HomepageGlobal, FooterConfig],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  plugins: [
    seoPlugin({
      collections: ['ServicePage', 'products'], // Add products collection to use SEO
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `Hikvision UAE — ${doc.title}`,
      generateDescription: ({ doc }) => {
        // Try to use shortDescription field first (from your Products collection)
        if (doc.shortDescription) {
          return doc.shortDescription.substring(0, 155) + (doc.shortDescription.length > 155 ? '...' : '');
        }
        
        // Fallback to other possible content fields
        if (doc.description) {
          return doc.description.substring(0, 155) + (doc.description.length > 155 ? '...' : '');
        }
        
        // Default fallback with product title
        return `Discover ${doc.title} - Professional security solutions from Hikvision UAE. View specifications, features and more.`;
      },
      tabbedUI: true,
    }),
    redirectsPlugin({
      collections: ['products'],
      overrides: {
        // FIX: Use type assertion to ensure compatible types
        fields: ({ defaultFields }: { defaultFields: Field[] }) => {
          const updatedFields = defaultFields.map((field) => {
            if ('name' in field && field.name === 'from') {
              return {
                ...field,
                admin: {
                  ...field.admin,
                  description: 'You will need to rebuild the website when changing this field.',
                },
              }
            }
            return field
          })
          
          // Return with explicit type assertion
          return updatedFields as Field[]
        },
        hooks: {
          afterChange: [revalidateRedirects],
        },
      },
    }),
  ],
})






ClientHeader.tsx

'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, ChevronDown, Menu, X } from 'lucide-react'
import { Logo } from '@/components/Logo/Logo'

// Update NavItem type to support three levels of categories
export type NavItem = {
  url?: string;
  label?: string;
  id?: string;
  categories?: Array<{
    name: string;
    url: string;
    id?: string;
    subcategories?: Array<{
      name: string;
      url: string;
      id?: string;
      tertiaryCategories?: Array<{  // New third level
        name: string;
        url: string;
        id?: string;
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

export default function ClientHeader({ navItems = [], socialLinks = [], logoUrl }: ClientHeaderProps) {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return (
      <header className="header-placeholder" suppressHydrationWarning>
        <div className="h-24 bg-white"></div>
      </header>
    )
  }
  
  return (
    <header className="w-full bg-white shadow-md z-50" suppressHydrationWarning>
      {/* Top Bar with social links */}
      <div className=" bg-black         text-white">
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
                  className="hover:text-gray-200 transition"
                >
                  <SocialIcon platform={social.platform} />
                </a>
              ))
            ) : (
              // Fallback icons if none provided from CMS
              <>
                <a href="#" className="hover:text-gray-200 transition">
                  <SocialIcon platform="facebook" />
                </a>
                <a href="#" className="hover:text-gray-200 transition">
                  <SocialIcon platform="twitter" />
                </a>
                <a href="#" className="hover:text-gray-200 transition">
                  <SocialIcon platform="youtube" />
                </a>
                <a href="#" className="hover:text-gray-200 transition">
                  <SocialIcon platform="linkedin" />
                </a>
                <a href="#" className="hover:text-gray-200 transition">
                  <SocialIcon platform="instagram" />
                </a>
              </>
            )}
          </div>
          
          {/* Logo (Centered) */}
          <Link href="/" className="hidden md:block flex-shrink-0 mx-4">
            <Logo 
              image={logoUrl || ''} 
              className="h-10 w-auto"
            />
          </Link>
          
          {/* Contact Info */}
          <div className="flex flex-col md:flex-row md:space-x-6 text-sm">
            <a href="tel:+971509893134" className="flex items-center mb-1 md:mb-0 hover:text-gray-200 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+971 50 989 3134</span>
            </a>
            <a href="mailto:sales@hikvision-uae.ae" className="flex items-center hover:text-gray-200 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>sales@hikvision-uae.ae</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Left Side Navigation with Dropdown Support */}
          <nav className="hidden md:flex items-center">
            <ul className="flex space-x-8 font-medium">
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
                        className="text-lg !text-black font-semibold transition-all duration-300 py-2 px-3 
                        border-b-2 border-transparent hover:border-red-800 hover:text-red-800 
                        flex items-center"
                        style={{color: '#000', fontWeight: 600}}
                      >
                        {label}
                        {hasCategories && (
                          <ChevronDown size={16} className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
                        )}
                      </Link>
                      
                      {/* Dropdown Menu - Updated with subcategories */}
                      {hasCategories && (
                        <div 
                          className={`absolute top-full left-0 w-64 bg-white shadow-lg py-2 mt-1 z-50 border-t-2 border-red-800
                          transition-all duration-300 ${activeDropdown === (item.id || `nav-${i}`) ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                        >
                          {item.categories?.map((category, idx) => {
                            const hasSubcategories = category.subcategories && category.subcategories.length > 0;
                            
                            return (
                              <div key={category.id || idx} className="relative group/subcategory">
                                <Link 
                                  href={hasSubcategories ? '#' : category.url}
                                  className="flex items-center justify-between px-6 py-3 text-black font-medium hover:bg-red-50 hover:text-red-800 
                                    transition-colors border-l-4 border-transparent hover:border-red-800 w-full"
                                  style={{color: '#000'}}
                                  onClick={(e) => hasSubcategories && e.preventDefault()}
                                >
                                  <span>{category.name}</span>
                                  {hasSubcategories && (
                                    <ChevronDown size={14} className="ml-1 transform -rotate-90 transition-transform duration-300 group-hover/subcategory:rotate-0" />
                                  )}
                                </Link>
                                
                                {/* Subcategories dropdown */}
                                {hasSubcategories && (
                                  <div className="absolute top-0 left-full bg-white w-64 shadow-lg py-2 
                                    opacity-0 invisible group-hover/subcategory:opacity-100 group-hover/subcategory:visible
                                    transition-all duration-300 border-l-2 border-red-800">
                                    {category.subcategories?.map((subcategory, subIdx) => {
                                      // Check if there are tertiary categories
                                      const hasTertiaryCategories = subcategory.tertiaryCategories && 
                                        subcategory.tertiaryCategories.length > 0;
                                      
                                      return (
                                        <div key={subcategory.id || subIdx} className="relative group/tertiary">
                                          <Link
                                            href={hasTertiaryCategories ? '#' : subcategory.url}
                                            className="flex items-center justify-between px-6 py-2.5 text-black font-medium 
                                              hover:bg-red-50 hover:text-red-800 transition-colors 
                                              border-l-4 border-transparent hover:border-red-800 w-full"
                                            style={{color: '#000'}}
                                            onClick={(e) => hasTertiaryCategories && e.preventDefault()}
                                          >
                                            <span>{subcategory.name}</span>
                                            {hasTertiaryCategories && (
                                              <ChevronDown 
                                                size={14} 
                                                className="ml-1 transform -rotate-90 transition-transform 
                                                  duration-300 group-hover/tertiary:rotate-0" 
                                              />
                                            )}
                                          </Link>
                                          
                                          {/* Tertiary categories dropdown - third level */}
                                          {hasTertiaryCategories && (
                                            <div className="absolute top-0 left-full bg-white w-64 shadow-lg py-2
                                              opacity-0 invisible group-hover/tertiary:opacity-100 group-hover/tertiary:visible
                                              transition-all duration-300 border-l-2 border-red-800">
                                              {subcategory.tertiaryCategories?.map((tertiary, tertiaryIdx) => (
                                                <Link
                                                  key={tertiary.id || tertiaryIdx}
                                                  href={tertiary.url}
                                                  className="block px-6 py-2.5 text-black font-medium 
                                                    hover:bg-red-50 hover:text-red-800 transition-colors
                                                    border-l-4 border-transparent hover:border-red-800"
                                                  style={{color: '#000'}}
                                                >
                                                  {tertiary.name}
                                                </Link>
                                              ))}
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
                  <Link href="/" className="text-lg font-semibold py-2 px-3" style={{color: '#000'}}>Home</Link>
                </li>
              )}
            </ul>
          </nav>

          {/* Right Side - Enhanced Beautiful Search Bar */}
          <div className="hidden md:flex flex-none max-w-md ml-auto">
            <div className="relative w-full group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-gray-600 transition-colors">
                <Search size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Search For Product" 
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full py-2.5 pl-10 pr-14 border border-gray-300 rounded-full 
                focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black
                shadow-sm hover:shadow-md transition-all duration-300 text-sm font-medium"
              />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-black text-white 
                px-4 py-1.5 rounded-full hover:bg-gray-800 transition-all duration-300
                shadow-sm hover:shadow-md flex items-center justify-center">
                <span className="mr-1 text-sm font-medium">Search</span>
                <Search size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="text-gray-700 hover:text-red-800 transition"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          {/* Mobile Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search For Product" 
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-red-800 focus:border-red-800"
              />
              <button className="absolute right-0 top-0 bottom-0 bg-red-800 text-white px-4 rounded-r-md hover:bg-red-900 transition">
                <Search size={20} />
              </button>
            </div>
          </div>
          
          {/* Mobile Nav Links - ONLY CMS LINKS */}
          <nav className="py-2">
            <ul className="space-y-1">
              {/* Only render mobile nav items from CMS */}
              {navItems && navItems.length > 0 && navItems.map((item, i) => {
                const url = item?.url || '';
                const label = item?.label || '';
                
                return (url && label) ? (
                  <li key={item.id || i} className="border-t border-gray-100">
                    <Link 
                      href={url} 
                      className="block px-4 py-2 text-black hover:bg-red-800 hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ) : null;
              })}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}














payload.config.ts

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { SiteSettings } from './globals/Settings/config'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { ServicePage } from './collections/services'
import { Products } from './collections/Products'
import { Categories } from './collections/Categories'
import { Gallery } from './collections/Gallery'
import { GalleryCategories } from './collections/GalleryCategories'
import { FAQs } from './collections/FAQs'
import { BestProducts } from './collections/BestProducts'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { revalidateRedirects } from './hooks/revalidateRedirects'
import { FooterConfig } from './globals/Footer/config'
// import { Field } from 'payload/types'
import type { Field } from 'payload'

// Create a proper global config for Homepage
const HomepageGlobal = {
  slug: 'homepage',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Content',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'sliderImage',
      type: 'array',
      label: 'Slider Images',
      admin: {
        description: 'Add images for the homepage carousel slider',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'altText',
          type: 'text',
          label: 'Alt Text',
          admin: {
            description: 'Alternative text for accessibility',
          },
          required: true,
        },
      ],
    },
    {
      name: 'carouselItems',
      type: 'array',
      label: 'Carousel Items',
      admin: {
        description: 'Add items to display in the carousel section',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Item Title'
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Item Image'
        }
      ]
    },
  ],
}

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    ServicePage,
    Products,
    Categories,
    Gallery,
    GalleryCategories,
    FAQs,
    BestProducts,
  ],
  editor: lexicalEditor(),
  globals: [SiteSettings, HomepageGlobal, FooterConfig],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  plugins: [
    seoPlugin({
      collections: ['ServicePage', 'products'], // Add products collection to use SEO
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `Hikvision UAE — ${doc.title}`,
      generateDescription: ({ doc }) => {
        // Try to use shortDescription field first (from your Products collection)
        if (doc.shortDescription) {
          return doc.shortDescription.substring(0, 155) + (doc.shortDescription.length > 155 ? '...' : '');
        }
        
        // Fallback to other possible content fields
        if (doc.description) {
          return doc.description.substring(0, 155) + (doc.description.length > 155 ? '...' : '');
        }
        
        // Default fallback with product title
        return `Discover ${doc.title} - Professional security solutions from Hikvision UAE. View specifications, features and more.`;
      },
      tabbedUI: true,
    }),
    redirectsPlugin({
      collections: ['products'],
      overrides: {
        // FIX: Use type assertion to ensure compatible types
        fields: ({ defaultFields }: { defaultFields: Field[] }) => {
          const updatedFields = defaultFields.map((field) => {
            if ('name' in field && field.name === 'from') {
              return {
                ...field,
                admin: {
                  ...field.admin,
                  description: 'You will need to rebuild the website when changing this field.',
                },
              }
            }
            return field
          })
          
          // Return with explicit type assertion
          return updatedFields as Field[]
        },
        hooks: {
          afterChange: [revalidateRedirects],
        },
      },
    }),
  ],
})




<!-- About -->

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, MapPin, Shield, Clock, Users, ChevronRight } from 'lucide-react'

export default function AboutUsPage() {
  return (
    <div className="bg-white min-h-screen pt-20">
      {/* About Us Content - Now First Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Your Trusted Partner in Security Solutions
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Established in Dubai, we bring Hikvision's world-renowned security and surveillance solutions to the UAE market. With years of experience in the security industry, we've grown to become a leading distributor and integrator of Hikvision's advanced technology products.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We combine global technology leadership with local expertise to deliver tailored security solutions for businesses, government agencies, and residential customers throughout the UAE. Our team of certified professionals ensures that every installation meets the highest standards of quality and reliability.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-3">
                    <Shield className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Certified Quality</h3>
                    <p className="text-sm text-gray-600">Official authorized distributor of Hikvision products</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-3">
                    <Clock className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">24/7 Support</h3>
                    <p className="text-sm text-gray-600">Round-the-clock technical assistance</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-3">
                    <Users className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Expert Team</h3>
                    <p className="text-sm text-gray-600">Certified professionals with industry experience</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-3">
                    <MapPin className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Local Presence</h3>
                    <p className="text-sm text-gray-600">Based in Dubai with service across UAE</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <Image 
                src="/images/hikvision-office.jpg" 
                alt="Hikvision Dubai Office" 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

   {/* other section */}

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
                We prioritize our customers' needs, providing personalized solutions and exceptional support to ensure their complete satisfaction.
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
              <div className="relative rounded-lg overflow-hidden h-[400px] shadow-xl">
                <Image 
                  src="/images/hikvision-products.jpg" 
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