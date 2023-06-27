import type { StorybookConfig } from "storybook-solidjs-vite";

const config: StorybookConfig = {
  stories: [
    "../src/components/**/*.stories.@(jsx|tsx)",
    // TODO: Fix it with another PR and remove the comment.
    // "../src/components/**/*.stories.mdx",
    "./stories/**/*.stories.@(jsx|tsx)",
    // TODO: Fix it with another PR and remove the comment.
    // "./stories/**/*.stories.mdx",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "storybook-solidjs-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  // https://storybook.js.org/docs/react/addons/writing-presets#previewmanager-templates
  previewHead: (head) => `
    ${head}
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css">
    <script>window.global = window;</script>
  `,
};
export default config;
