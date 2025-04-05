import type { NextConfig } from "next";
import type { Rewrite } from "next/dist/lib/load-custom-routes";

const nextConfig: NextConfig = {
  async rewrites(): Promise<Rewrite[]> {
    return [
      {
        source: "/api/:path*",
        destination: "http://3.89.85.107:4000/:path*", 
      },
    ];
  },
};

export default nextConfig;
