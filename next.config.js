/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      // Proxy /eleview and all sub-paths to the standalone Eleview deployment.
      // This makes joepeck.ai/eleview serve the Eleview demo without a separate domain.
      {
        source: "/eleview",
        destination: "https://eleview-demo-build.vercel.app/eleview",
      },
      {
        source: "/eleview/:path*",
        destination: "https://eleview-demo-build.vercel.app/eleview/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
