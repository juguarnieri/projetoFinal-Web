/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'ichef.bbci.co.uk',
      },
      {
        protocol: 'https',
        hostname: 's2-oglobo.glbimg.com',
      },
      {
        protocol: 'https',
        hostname: 'imagenes.elpais.com',
      },
    ],
  },
};

module.exports = nextConfig;

