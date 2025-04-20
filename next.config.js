const { paraglide } = require('@inlang/paraglide-next/plugin');
/** @type {import('next').NextConfig} */

const isProd = process.env.NEXT_PUBLIC_ENV === 'production';
const nextConfig = {
  output: isProd ? 'export' : undefined,
  rewrites: isProd
    ? undefined
    : async () => {
        return [
          //127.0.0.1
          {
            source: '/api/:path*',
            destination: 'https://flair.arabot.io/api/:path*', //https://flair.arabot.io OR http://127.0.0.1:42110
          },
          {
            source: '/auth/:path*',
            destination: 'http://127.0.0.1:42110/auth/:path*',
          },
          {
            source: '/static/:path*',
            destination: 'http://127.0.0.1:42110/static/:path*',
          },
        ];
      },
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
};

module.exports = paraglide({
  paraglide: {
    project: './project.inlang',
    outdir: './src/paraglide',
  },
  ...nextConfig,
});
