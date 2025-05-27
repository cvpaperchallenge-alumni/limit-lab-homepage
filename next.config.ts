/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  devIndicators: {
    appIsrStatus: false,
  },
  trailingSlash: true,
}

export default nextConfig
