/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "assets.gogetfunding.com"],
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
