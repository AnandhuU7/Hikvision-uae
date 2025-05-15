import { CollectionConfig } from 'payload/types'
import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const GalleryCategories: CollectionConfig = {
  slug: 'galleryCategories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        description: 'Order in which to display this category (lower numbers first)',
      },
    },
  ],
}