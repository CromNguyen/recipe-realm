/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd0kmv3ziqbi5ebqj.public.blob.vercel-storage.com',
        port: '',
      },
    ],
  },
}

export default nextConfig
