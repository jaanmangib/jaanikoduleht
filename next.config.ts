import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // jätame pildid optimeerimata (sobib GitHub Pagesile)
    domains: ["cdn.discordapp.com"], // ← lisa see rida
  },
  output: "export",
};

export default nextConfig;
