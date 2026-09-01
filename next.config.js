/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html",
        permanent: false,
      },
      {
        source: "/insights",
        destination: "/newsletter",
        permanent: true,
      },
      {
        source: "/insights/:slug",
        destination: "/newsletter/:slug",
        permanent: true,
      },
    ];
  },
};
module.exports = nextConfig;
