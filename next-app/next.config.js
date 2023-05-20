/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['user-images.githubusercontent.com', 'www.creativefabrica.com'],
  },
}

module.exports = nextConfig
