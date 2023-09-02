/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com"]
  },
  reactStrictMode: false,
  experimental: {
    mdxRs: true
  }
}

const withMDX = require("@next/mdx")()
module.exports = withMDX(nextConfig)
