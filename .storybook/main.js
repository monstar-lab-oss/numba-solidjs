const Solid = require("vite-plugin-solid");
const { mergeConfig } = require('vite');
const path = require("path");

module.exports = {
  stories: [
    "../src/components/**/*.stories.@(jsx|tsx)",
    "../src/components/**/*.stories.mdx",
    "./stories/**/*.stories.@(jsx|tsx)",
    "./stories/**/*.stories.mdx",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/html",
  core: {
    builder: "@storybook/builder-vite",
  },
  features: {
    storyStoreV7: true,
  },
  async viteFinal(config) {
    config.plugins.unshift(Solid({ hot: false }));
    return mergeConfig(config, {
      resolve: {
        alias: { '@': path.resolve(path.dirname(__dirname), "src")},
      },
    });
  },
  // https://storybook.js.org/docs/react/addons/writing-presets#previewmanager-templates
  previewHead: (head) => `
    ${head}
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css">
    <script>window.global = window;</script>
  `,
};
