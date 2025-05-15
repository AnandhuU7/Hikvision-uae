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
import { Inquiries } from './collections/Inquiries'
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
    Inquiries,
    {
      slug: 'contact-submissions',
      admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'email', 'subject', 'status', 'submitDate'],
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'email',
          type: 'email',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'subject',
          type: 'text',
          required: true,
        },
        {
          name: 'message',
          type: 'textarea',
          required: true,
        },
        {
          name: 'department',
          type: 'select',
          options: [
            { label: 'Sales', value: 'sales' },
            { label: 'Support', value: 'support' },
          ],
        },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'new',
          options: [
            { label: 'New', value: 'new' },
            { label: 'In Progress', value: 'in-progress' },
            { label: 'Completed', value: 'completed' },
          ],
          admin: {
            position: 'sidebar',
          },
        },
        {
          name: 'submitDate',
          type: 'date',
          admin: {
            position: 'sidebar',
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
      ],
    },
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