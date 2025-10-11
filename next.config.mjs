/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com", // also needed for raw image links
      },
      {
        protocol: "https",
        hostname: "user-images.githubusercontent.com", // common for GitHub image uploads
      },
    ],
  },
};

export default nextConfig;
