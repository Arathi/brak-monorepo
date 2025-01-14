import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginLess } from "@rsbuild/plugin-less";

export default defineConfig({
  html: {
    title: "数据结构生成器",
  },
  source: {
    alias: {
      "@": "./src",
    },
  },
  plugins: [pluginReact(), pluginLess()],
});
