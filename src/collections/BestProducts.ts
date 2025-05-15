import type { CollectionConfig } from 'payload/types'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const BestProducts: CollectionConfig = {
  slug: 'best-products',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Featured Content',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'ribbonText',
      type: 'text',
      label: 'Ribbon Text',
      admin: {
        description: 'Text to display on the ribbon (e.g., "UAE TOP 1", "Dubai Hikvision")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Short Description',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 100,
      admin: {
        description: 'Display order (lower numbers appear first)',
      }
    },
  ],
}