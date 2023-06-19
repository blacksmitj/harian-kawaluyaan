/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "api.dicebear.com",
      "res.cloudinary.com"
    ]
  }
}

module.exports = nextConfig
