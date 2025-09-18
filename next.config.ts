/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    },
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  },
  images: {
    domains: ['res.cloudinary.com', 'localhost', 'hikvisionuae.ae',],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },


  typescript: {
    // This will allow the build to continue even with type errors
    // Remove this once you've fixed all type issues
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
