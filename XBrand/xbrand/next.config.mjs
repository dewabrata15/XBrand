/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.uniqlo.com",
      },
    ],
  },
};

export default nextConfig;
