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
    BE_HOST: "http://192.168.0.176:80"
  }
};

export default nextConfig;
