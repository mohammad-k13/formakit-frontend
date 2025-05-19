import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
      /* config options here */
      images: {
            remotePatterns: [{hostname: "source.unsplash.com",protocol: 'https',}] 
      }
};

export default nextConfig;
