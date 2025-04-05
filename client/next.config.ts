import type { NextConfig } from "next";
import type { Rewrite } from "next/dist/lib/load-custom-routes";

const nextConfig: NextConfig = {
  async rewrites(): Promise<Rewrite[]> {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
