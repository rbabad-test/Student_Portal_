/** @type {import('next').NextConfig} 
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
};

module.exports = nextConfig; */

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Tells Next.js to generate static HTML/CSS/JS files
  images: {
    unoptimized: true, // Required for static exports on GitHub Pages
  },
  // OPTIONAL: If your repo is NOT named "username.github.io" (e.g., repository name is "student-portal"):
  // basePath: '/student-portal',
};

module.exports = nextConfig;