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
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com",
                port: "",
                pathname: "bcheung98/irminsul-gg/**",
                search: "",
            },
        ],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: "4mb",
        },
        webpackMemoryOptimizations: true,
    },
};

export default nextConfig;
