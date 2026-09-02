import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every route is exported at build time. The production app is only
  // HTML/CSS/JS; all decisions live in localStorage in the visitor's browser.
  output: "export",
};

export default nextConfig;
