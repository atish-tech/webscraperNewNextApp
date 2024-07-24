/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "*" }],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  compress: true,
  reactStrictMode: false,

  webpack: (config) => {
    // Solution 1: Ignore source map files
    config.module.rules.push({
      test: /\.js\.map$/,
      use: "ignore-loader",
    });

    // Solution 2: Add source map loader (optional if ignoring works)
    config.module.rules.push({
      test: /\.js\.map$/,
      use: "  source-map-loader",
      enforce: "pre",
    });

    return config;
  },
};

export default nextConfig;
