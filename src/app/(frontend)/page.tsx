import { notFound } from 'next/navigation'
import EnhancedHeroSlider from '@/components/slider/enhanced-slider'
import ItemCarousel from '@/components/ItemCarousel'
import Gallery from '@/components/Gallery'
import FAQs from '@/components/FAQs'
// import BestProducts from '@/components/BestProducts'
import { Metadata } from 'next'
import ServiceGrid from '@/components/ServiceGrid'
import CCTVShowcase from '@/components/CCTVShowcase'

export const metadata: Metadata = {
  title: 'Hikvision UAE - Home',
  description: 'Hikvision UAE CCTV & Security Solutions',
}

async function fetchHomepage() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/globals/homepage?depth=3`, {
      cache: 'no-store',
    })
    
    if (!res.ok) {
      console.error('Failed to fetch homepage data:', res.status)
      return null
    }
    
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching homepage:', error)
    return null
  }
}

async function fetchGalleryData() {
  try {
    const [galleryRes, categoriesRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/gallery?depth=2&limit=100`, {
        cache: 'no-store'
      }),
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/galleryCategories?limit=100`, {
        cache: 'no-store'
      })
    ])
    
    if (!galleryRes.ok || !categoriesRes.ok) {
      console.error('Failed to fetch gallery data')
      return { items: [], categories: [] }
    }
    
    const [galleryData, categoriesData] = await Promise.all([
      galleryRes.json(),
      categoriesRes.json()
    ])
    
    return {
      items: galleryData.docs || [],
      categories: categoriesData.docs || []
    }
  } catch (error) {
    console.error('Error fetching gallery data:', error)
    return { items: [], categories: [] }
  }
}

async function fetchFAQs() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/faqs?limit=100&sort=order`,
      { cache: 'no-store' }
    )
    
    if (!res.ok) {
      console.error('Failed to fetch FAQs data')
      return []
    }
    
    const data = await res.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return []
  }
}

async function fetchBestProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/best-products?limit=8&sort=displayOrder`,
      { cache: 'no-store' }
    )
    
    if (!res.ok) {
      console.error('Failed to fetch best products')
      return []
    }
    
    const data = await res.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching best products:', error)
    return []
  }
}

export default async function Page() {
  const [homepage, galleryData, faqs, bestProducts] = await Promise.all([
    fetchHomepage(),
    fetchGalleryData(),
    fetchFAQs(),
    fetchBestProducts()
  ])

  if (!homepage) {
    return notFound()
  }

  const carouselItems = homepage.carouselItems || []
  const { items: galleryItems, categories: galleryCategories } = galleryData

  return (
    <div>
      <EnhancedHeroSlider homepage={homepage} />
      <ItemCarousel items={carouselItems} />
      {/* <BestProducts products={bestProducts} title="Hikvision Premium Security Solutions" /> */}
      <Gallery 
        items={galleryItems} 
        categories={galleryCategories}
        title="Hikvision Installation Gallery" 
      />
      <CCTVShowcase />
      <FAQs 
        items={faqs}
        title="Frequently Asked Questions" 
      />
      <ServiceGrid />
      
      {/* Rest of your homepage content */}
    </div>
  )
}