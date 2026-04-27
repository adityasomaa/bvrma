import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
          remotePatterns: [
            { protocol: "https", hostname: "cdn.sanity.io" },
            { protocol: "https", hostname: "bvrma.org" },
                ],
    },
    typescript: {
          // TODO: remove after fixing Sanity schema TS errors (defineField/prepare callbacks)
      ignoreBuildErrors: true,
    },
    eslint: {
          // TODO: remove after cleaning up lint warnings
      ignoreDuringBuilds: true,
    },
    async redirects() {
          return [];
    },
};

export default withNextIntl(nextConfig);
