import { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'site-name',
      label: 'Site Name',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'favicon',
      label: 'Favicon',
      type: 'upload',
      relationTo: 'media',
    },
    // Navigation Items with Categories Support
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Items',
      admin: {
        description: 'Add navigation items for the header'
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        // Categories for dropdown
        {
          name: 'categories',
          type: 'array',
          label: 'Dropdown Categories',
          admin: {
            description: 'Add categories for dropdown menu (if any)'
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
            // Add subcategories field
            {
              name: 'subcategories',
              type: 'array',
              label: 'Subcategories',
              admin: {
                description: 'Add subcategories for this category (if any)'
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
                // Add tertiary categories field
                {
                  name: 'tertiaryCategories',
                  type: 'array',
                  label: 'Tertiary Categories',
                  admin: {
                    description: 'Add third-level categories for this subcategory (if any)'
                  },
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'url',
                      type: 'text',
                      required: true,
                    }
                  ]
                }
              ]
            }
          ]
        },
      ],
    },
    // Social Media Links
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      admin: {
        description: 'Add social media links for the header',
      },
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
          ],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
