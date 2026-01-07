/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputFileTracingIncludes: {
      "/blog": ["./lib/blog/posts/**"],
      "/blog/[slug]": ["./lib/blog/posts/**"],
      "/api/images/posts/[slug]": ["./wordpress-data/uploads/**"]
    }
  }
};

module.exports = nextConfig;
