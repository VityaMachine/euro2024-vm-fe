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
    BE_HOST: "http://localhost:80"
  }
};

export default nextConfig;
