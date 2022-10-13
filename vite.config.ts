import path from "path";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  root: path.resolve(__dirname, "src"),
  plugins: [solidPlugin(), viteSingleFile()],
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
});
