const path = require("path");
const webpack = require("webpack");
/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
    deviceSizes: [600, 768, 1024, 1280, 1440, 1920],
    imageSizes: [96, 128, 256, 384]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
};
