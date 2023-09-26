/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // output: 'export',
  // images: {
  //   unoptimized: true
  // },
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  future: { 
    webpack5: true, 
  },  
  basePath: '/login',
};

module.exports = nextConfig