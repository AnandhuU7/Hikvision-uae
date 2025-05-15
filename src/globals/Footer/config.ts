import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'

export const FooterConfig: any = {
  slug: 'footer',
  access: {
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Site Configuration',
  },
  fields: [
    {
      name: 'footerLogo',
      type: 'upload',
      relationTo: 'media',
      label: 'Footer Logo',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Footer Description',
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Footer Columns',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Column Title',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          label: 'Column Links',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Link Text',
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              label: 'Link URL',
            }
          ]
        }
      ]
    },
    {
      name: 'contactInfo',
      type: 'group',
      label: 'Contact Information',
      fields: [
        {
          name: 'address',
          type: 'textarea',
          label: 'Address',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Phone',
        },
        {
          name: 'email',
          type: 'text',
          label: 'Email',
        },
        {
          name: 'workingHours',
          type: 'text',
          label: 'Working Hours',
        }
      ]
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'WhatsApp', value: 'whatsapp' }
          ],
          required: true,
          label: 'Platform',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'Profile URL',
        }
      ]
    },
    {
      name: 'copyrightText',
      type: 'text',
      label: 'Copyright Text',
      defaultValue: '© 2025 Security Solutions. All rights reserved.',
    },
    {
      name: 'navLinks',
      type: 'array',
      label: 'Bottom Navigation Links',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Link Text',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'Link URL',
        }
      ]
    }
  ],
}