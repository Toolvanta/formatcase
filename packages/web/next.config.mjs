/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@formatcase/core'],
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
};

export default nextConfig;
