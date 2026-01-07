/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputFileTracingIncludes: {
      "/blog": ["./lib/blog/posts/**"],
      "/blog/[slug]": ["./lib/blog/posts/**"]
    }
  }
};

module.exports = nextConfig;
