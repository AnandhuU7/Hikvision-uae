import configPromise from '@/payload.config';
import { getPayload } from 'payload';
import type { Media, Product } from '@/payload-types';
import { draftMode } from 'next/headers';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise })

  const product = (
    await payload.find({
      collection: 'products',
      draft: false,
      limit: 1,
      overrideAccess: false,
      pagination: false,
      where: {
        slug: {
          equals: params.slug,
        },
      },
    })
  ).docs[0]
  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }
  return {
    title: product.title,
    description: product.meta?.description ?? '',
    metadataBase: new URL('http://localhost:3000'),
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/en-US',
      },
    },
    openGraph: {
      title: product.title,
      url: (product.meta?.image as Media)?.url!,
      description: product?.meta?.description ?? '',
      siteName: 'https://totalengg.in',
      images: [
        {
          url: (product.meta?.image as Media)?.url!,
          width: '800',
          height: '800',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const products = await payload.find({
    collection: 'products',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
  })

  const params = products.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: {
    slug: string
  }
}

export default async function Product({ params: params }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = params
  const url = '/products/' + slug
  const payload = await getPayload({ config: configPromise })
  const product = (
    await payload.find({
      collection: 'products',
      draft,
      limit: 1,
      overrideAccess: false,
      pagination: false,
      where: {
        slug: {
          equals: slug,
        },
      },
    })
  ).docs[0]

  return (
    <>
      <div>
        <h1>Product Page for {product.title}</h1>
        <p>{product.meta?.description}</p>
        {product.meta?.title}
        {product.heroImage && typeof product.heroImage !== 'string' && (
          <img src={product.heroImage.url!} alt="" />
        )}
      </div>
    </>
  )
}