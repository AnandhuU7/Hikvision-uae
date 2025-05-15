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