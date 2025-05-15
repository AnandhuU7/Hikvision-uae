import { CollectionConfig } from 'payload/types'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  access: {
    // Allow anyone to create (submit form)
    create: anyone,
    // Only admin can read, update, delete
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    group: 'Leads',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'mobile',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'product',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Closed', value: 'closed' },
      ],
    },
  ],
}