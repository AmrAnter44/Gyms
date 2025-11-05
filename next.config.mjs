/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  distDir: '.next',
  poweredByHeader: false,
  compress: true,

  // إعدادات الأداء
  swcMinify: true,

  // إعدادات الصور
  images: {
    domains: ['localhost'],
    unoptimized: true, // مهم لـ Electron
  },

  // إعدادات TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },

  // إعدادات ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },

  // إعدادات Webpack
  webpack: (config, { isServer }) => {
    config.infrastructureLogging = { level: 'error' }

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        path: false,
        os: false,
      }
    }

    return config
  },

  experimental: {
    outputFileTracingRoot: undefined,
    serverMinification: true,
      serverMinification: true,
  dynamicIO: true, // ✅ تسمح بتشغيل routes ديناميكية بدون static errors
  },

  basePath: '',
  assetPrefix: '',

  // ✅ شيل NODE_ENV تمامًا وخلي باقي متغيراتك هنا لو عايز
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
}

export default nextConfig
