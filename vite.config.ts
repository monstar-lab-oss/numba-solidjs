/// <reference types="vitest" />
import path from "path";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import solidPlugin from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  // root: path.resolve(__dirname, "src"),
  test: {
    environment: 'jsdom',
      globals: true,
      transformMode: { web: [/\.[jt]sx?$/] },
    include: ["**/hooks/*.test.tsx"]
  },
  plugins: [solidPlugin(), tsconfigPaths(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    target: "ESNext",
    emptyOutDir: false,
    minify: false,
    outDir: path.resolve(__dirname, "dist"),
  },
  define: {
    '__APP_VERSION__': JSON.stringify(process.env.npm_package_version),
  },
});
