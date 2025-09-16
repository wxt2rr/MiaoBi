/** @type {import('next').NextConfig} */
const nextConfig = {
  // 减少水合不匹配警告
  reactStrictMode: true,
  
  // 优化开发体验
  experimental: {
    // 启用 Turbopack
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // 减少控制台警告
  onDemandEntries: {
    // 页面在内存中保持的时间（毫秒）
    maxInactiveAge: 25 * 1000,
    // 同时保持的页面数
    pagesBufferLength: 2,
  },

  // 优化构建
  swcMinify: true,
  
  // 处理外部依赖
  transpilePackages: [
    'markdown-it',
    'highlight.js',
  ],

  // 减少开发模式下的警告
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // 减少开发模式下的警告
      config.devtool = 'eval-cheap-module-source-map';
    }
    
    return config;
  },
};

module.exports = nextConfig;