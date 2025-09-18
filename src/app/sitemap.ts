import { MetadataRoute } from 'next'
import connectDB from '@/app/config/db'
import NavbarCategory from '@/app/models/NavbarCategory'
import Category from '@/app/models/Category'
import SubCategory from '@/app/models/SubCategory'
import Product from '@/app/models/Product'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://hikvisionuae.ae'
  
  // Connect to database
  await connectDB()
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Technology Pages
    {
      url: `${baseUrl}/acusense`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/colorvu`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/darkfighter`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tandemvu`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Industry Solutions
    {
      url: `${baseUrl}/manufacturing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/healthcare`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/retail`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/education`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Policy Pages
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Dynamic pages from database
  const dynamicPages = []

  try {
    // 1. Get all navbar categories
    const navbarCategories = await NavbarCategory.find({ isActive: true })
    
    // Add navbar category pages
    for (const navbarCategory of navbarCategories) {
      dynamicPages.push({
        url: `${baseUrl}/${navbarCategory.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })

      // 2. Get categories for this navbar category
      const categories = await Category.find({ 
        navbarCategory: navbarCategory._id,
        isActive: true 
      })

      // Add category pages
      for (const category of categories) {
        dynamicPages.push({
          url: `${baseUrl}/${navbarCategory.slug}/${category.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        })

        // 3. Get subcategories for this category
        const subcategories = await SubCategory.find({ 
          category: category._id,
          isActive: true 
        })

        // Add subcategory pages
        for (const subcategory of subcategories) {
          dynamicPages.push({
            url: `${baseUrl}/${navbarCategory.slug}/${category.slug}/${subcategory.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
          })

          // 4. Get products for each subcategory
          for (const subcategory of subcategories) {
            // Add products to sitemap
            const products = await Product.find({ 
              subcategory: subcategory._id,
              isActive: true 
            })

            for (const product of products) {
              dynamicPages.push({
                url: `${baseUrl}/${navbarCategory.slug}/${category.slug}/${subcategory.slug}/${product.slug}`,
                lastModified: new Date(product.createdAt),
                changeFrequency: 'monthly',
                priority: 0.5,
              })
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('Error generating dynamic sitemap entries:', error)
    // Continue with static pages if there's an error with dynamic pages
  }

  // Combine static and dynamic pages
  return [...staticPages, ...dynamicPages] as MetadataRoute.Sitemap
}