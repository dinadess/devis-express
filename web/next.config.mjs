/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    resolveAlias: {
      html2canvas: "html2canvas-pro",
    },
  },
};

export default nextConfig;
