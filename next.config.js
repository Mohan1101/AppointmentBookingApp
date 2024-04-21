/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'https://appointment-booking-app.vercel.app'],
  },
  experimental: {
    serverActions: true,
  },

}

module.exports = nextConfig
