export const Homepage = {
  slug: 'homepage',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
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
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          admin: {
            description: 'Optional title to display over the image',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          admin: {
            description: 'Optional description to display over the image',
          },
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link URL',
          admin: {
            description: 'Optional URL to link this slide to',
          },
        },
      ],
    },
    {
      name: 'featuredProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      label: 'Featured Products',
      admin: {
        description: 'Select products to showcase in the product carousel',
      },
    },
  ],
};
