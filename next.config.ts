import type { NextConfig } from "next";

const isProd = process.env.DEPLOY_ENV === "production";

const nextConfig: NextConfig = {
  output: 'export',
  assetPrefix: isProd ? '/fate-domination-card-maker/' : "",
  basePath: isProd ? '/fate-domination-card-maker/' : "",
};

export default nextConfig;
