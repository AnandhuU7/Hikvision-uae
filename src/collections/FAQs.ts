import { CollectionConfig } from 'payload/types' // Fixed import path
import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'question',
    group: 'Content',
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
    },
    {
      name: 'category',
      type: 'text',
      admin: {
        description: 'Optional category for grouping FAQs',
      }
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        description: 'Display order (lower numbers appear first)',
      }
    },
  ],
}