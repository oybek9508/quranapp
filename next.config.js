/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [
      "cdn.qurancdn.com",
      "static.qurancdn.com",
      "vercel.com",
      "now.sh",
      "quran.com",
    ],
  },
};

module.exports = nextConfig;
