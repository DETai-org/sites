/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingIncludes: {
    "/app/blog/[slug]/page": ["./lib/blog/posts/**"],
    "/app/api/images/posts/[slug]/route": ["./wordpress-data/uploads/**"]
  }
};

module.exports = nextConfig;
