/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    externalDir: true,
    outputFileTracingIncludes: {
      "/blog": ["./lib/blog/posts/**"],
      "/blog/[slug]": ["./lib/blog/posts/**"],
    },
  },
};

module.exports = nextConfig;
