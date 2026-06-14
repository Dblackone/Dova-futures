/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages — no server runtime.
  output: 'export',
  // GitHub Pages has no image optimization server.
  images: { unoptimized: true },
  // Emit /route/index.html so directory URLs resolve on Pages.
  trailingSlash: true,
  // Custom domain (dovafutures.com) is served at the root, so no basePath.
  reactStrictMode: true,
};

module.exports = nextConfig;
