import React from 'react'
import './styles.css'
import { Header } from '@/Header/Component'
import configPromise from '@payload-config'
import { Media } from '@/payload-types'
import { getPayload } from 'payload'
import ModernFooter from '@/components/ModernFooter'
import { getFooterData } from '@/utilities/getFooterData'
import CookieConsent from '@/components/CookieConsent'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  
  let favicon: Media | null = null;
  
  try {
    const payload = await getPayload({ config: configPromise })
    const siteSettings = await payload.findGlobal({ slug: 'site-settings' })
    favicon = siteSettings?.favicon as Media
  } catch (err) {
    console.error('Failed to initialize Payload:', err)
  }

  // Fetch footer data
  const footerData = await getFooterData()

  return (
    <html lang="en">
      <head>{favicon?.url && <link href={favicon.url} rel="icon" sizes="32x32" />}</head>
      <body suppressHydrationWarning>
        <Header />
        <main>
          {children}
          <CookieConsent />
        </main>
        <ModernFooter {...footerData} />
      </body>
    </html>
  )
}