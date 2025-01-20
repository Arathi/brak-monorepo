import { defineConfig } from "@rslib/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginLess } from "@rsbuild/plugin-less";

export default defineConfig({
  source: {
    entry: {
      index: ["./src/**"],
    },
  },
  resolve: {
    alias: {
      "@": "./src",
    },
  },
  lib: [
    {
      bundle: false,
      dts: true,
      format: "esm",
    },
  ],
  output: {
    target: "web",
  },
  plugins: [pluginReact(), pluginLess()],
});
