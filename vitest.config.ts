import solidPlugin from "vite-plugin-solid";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [solidPlugin()],
  test: {
    environment: "jsdom",
    transformMode: { web: [/\.[jt]sx?$/] },
    include: ["**/hooks/*.test.tsx"],
  },
});
