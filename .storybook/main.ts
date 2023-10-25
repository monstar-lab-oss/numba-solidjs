import type { StorybookConfig } from "storybook-solidjs-vite";

const config: StorybookConfig = {
  stories: ["../src/components/**/*.stories.@(ts|tsx)"],
  framework: {
    name: "storybook-solidjs-vite",
    options: {},
  },
  addons: [
    "@storybook/addon-essentials",
    "@storybook/docs-tools"
  ],
  previewHead: (head) => `
    ${head}
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css">
    <script>window.global = window;</script>
  `,
};
export default config;
