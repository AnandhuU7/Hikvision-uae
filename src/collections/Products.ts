import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    meta: {
      image: true,
      description: true,
    },
  },

  admin: {
    useAsTitle: 'title',
    group: 'Products',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'productImages',
      type: 'array',
      label: 'Additional Product Images',
      minRows: 0,
      maxRows: 8,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt Text',
          required: true,
        },
      ],
      admin: {
        description: 'Add multiple product images for the gallery view',
      },
    },
    {
      name: 'isNew',
      type: 'checkbox',
      label: 'New Product',
      defaultValue: false,
    },
    {
      name: 'subtitle',
      type: 'text',
      admin: {
        description: 'Secondary title/description like "2 MP AcuSense Fixed Cube Network Camera"',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'This will be used for the product URL',
      },
    },
    {
      name: 'mainCategory',
      type: 'select',
      required: true,
      options: [
        { label: 'Network Products', value: 'network-products' },
        { label: 'Turbo Hd Products', value: 'turbo-hd-products' },
        { label: 'Access Control', value: 'access-control' },
        { label: 'Display And Control', value: 'display-and-control' },
        { label: 'Solution', value: 'solution' },
      ],
      admin: {
        description: 'Select the main product category',
      },
    },
    {
      name: 'productType',
      type: 'select',
      required: true,
      options: [
        // Network Products subcategories
        { label: 'Network Camera', value: 'network-camera' },
        { label: 'PTZ Camera', value: 'ptz-camera' },
        { label: 'NVR', value: 'nvr' },

        // Turbo HD Products subcategories
        { label: 'Turbo Hd Cameras', value: 'turbo-hd-cameras' },
        { label: 'DVR', value: 'dvr' },

        // Display And Control subcategories
        { label: 'Monitors', value: 'monitors' },
        { label: 'Digital Signage', value: 'digital-signage' },
        { label: 'Controllers', value: 'controllers' },
        { label: 'LCD Video Walls', value: 'lcd-video-walls' },
        { label: 'LED Displays', value: 'led-displays' },

        // Access Control subcategories
        { label: 'Controllers', value: 'access-controllers' },
        { label: 'Visitors Terminals', value: 'visitors-terminals' },
        { label: 'Electrical Locks', value: 'electrical-locks' },
        { label: 'Face Recognition Terminal', value: 'face-recognition-terminal' },
        { label: 'Readers', value: 'readers' },
        { label: 'Kits', value: 'kits' },
        { label: 'Card Terminals', value: 'card-terminals' },
        { label: 'FingerPrint Terminals', value: 'fingerprint-terminals' },
      ],
      admin: {
        description: 'Select the specific product type',
        condition: (data) => !!data.mainCategory,
      },
    },
    {
      name: 'series',
      type: 'select',
      required: true,
      options: [
        // Turbo HD Cameras series
        { label: 'Value Series', value: 'value-series' },
        { label: 'Turbo HD Cameras with ColorVu', value: 'turbo-hd-cameras-with-colorvu' },
        { label: 'Pro Series', value: 'pro-series' },
        { label: 'Webcam Series', value: 'webcam-series' },
        { label: 'IOT Series', value: 'iot-series' },
        { label: 'Audio & Video Collaboration Solution', value: 'audio-video-collaboration-solution' },
        { label: 'Ultra Series', value: 'ultra-series' },

        // Keep other existing series options
        { label: 'Easy Series', value: 'easy-series' },
        { label: 'Special Series', value: 'special-series' },
        { label: 'Covert Series', value: 'covert-series' },
        { label: 'Mobile Series', value: 'mobile-series' },
        { label: 'Positioning System', value: 'positioning-system' },
        { label: 'Pro PTZ Series', value: 'pro-ptz' },
        { label: 'Ultra PTZ Series', value: 'ultra-ptz' },
        { label: 'Pro NVR Series', value: 'pro-nvr' },
        { label: 'Ultra NVR Series', value: 'ultra-nvr' },
        { label: 'Value NVR Series', value: 'value-nvr' },
        { label: 'Standard Series', value: 'standard-series' },
        { label: 'Advanced Series', value: 'advanced-series' },
        { label: 'Premium Series', value: 'premium-series' },
        { label: 'Enterprise Series', value: 'enterprise-series' },
        { label: 'Budget Series', value: 'budget-series' },
      ],
      admin: {
        description: 'Select the product series',
        condition: (data) => !!data.productType,
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      maxLength: 200,
      admin: {
        description: 'A short one-line description (max 200 chars)',
      },
    },
    {
      name: 'featureIcons',
      type: 'array',
      label: 'Feature Icons',
      minRows: 0,
      maxRows: 10,
      fields: [
        {
          name: 'iconType',
          type: 'select',
          required: true,
          options: [
            { label: 'PIR', value: 'pir' },
            { label: 'SD Card', value: 'sd-card' },
            { label: 'H.265+', value: 'h265' },
            { label: 'Audio', value: 'audio' },
            { label: 'WDR', value: 'wdr' },
            { label: 'Vehicle Detection', value: 'vehicle' },
            { label: '4K', value: '4k' },
            { label: 'Night Vision', value: 'night-vision' },
            { label: 'AI', value: 'ai' },
            { label: 'Water Resistant', value: 'waterproof' },
          ],
        },
        {
          name: 'customIcon',
          type: 'upload',
          relationTo: 'media',
          label: 'Custom Icon Image',
          admin: {
            description: 'Optional: Upload a custom icon instead of using a predefined one',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Custom Label',
          admin: {
            description: 'Optional: Override the default label for this icon',
          },
        },
      ],
      admin: {
        description: 'Select feature icons to display on product page',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
        {
          name: 'details',
          label: 'Product Details',
          fields: [
            {
              name: 'features',
              type: 'array',
              label: 'Product Features',
              fields: [
                {
                  name: 'feature',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'specifications',
              type: 'array',
              label: 'Technical Specifications Categories',
              fields: [
                {
                  name: 'category',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Specification category (e.g., Camera, Lens, Video)',
                  }
                },
                {
                  name: 'specs',
                  type: 'array',
                  label: 'Specifications',
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'value',
                      type: 'richText',
                      required: true,
                      admin: {
                        description: 'Can include detailed formatted specifications'
                      }
                    }
                  ]
                }
              ],
              admin: {
                description: 'Add specifications by category',
              }
            },
          ],
        },
      ],
    },
  ],
};
