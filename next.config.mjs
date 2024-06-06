/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.api-sports.io",
      },
    ],
  },
  env: {
    BE_HOST: "https://euro2024-vm-be.onrender.com"
  }
};

export default nextConfig;
