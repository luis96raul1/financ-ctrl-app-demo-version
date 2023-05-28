/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/auth/login",
        permanent: true,
      },
      { source: "/categoryView", destination: "/auth/login", permanent: true },
    ];
  },
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
