import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "assets.irminsul.gg",
                port: "",
                pathname: "/**",
                search: "",
            },
        ],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: "4mb",
        },
    },
};

export default nextConfig;
