import Solid from "vite-plugin-solid";
import { mergeConfig } from 'vite';
const path = require("path");

const config = {
  core: {},
  features: {
    storyStoreV7: true,
  },
  framework: {
    name: "@storybook/html-vite",
    options: {}
  },
  stories: ["../src/components/**/*.stories.@(jsx|tsx)",
  // TODO: Fix it with another PR and remove the comment.
  // "../src/components/**/*.stories.mdx",
  "./stories/**/*.stories.@(jsx|tsx)"
  // TODO: Fix it with another PR and remove the comment.
  // "./stories/**/*.stories.mdx",
  ],

  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  docs: {
    autodocs: "tag"
  },
  // https://storybook.js.org/docs/react/addons/writing-presets#previewmanager-templates
  previewHead: head => `
    ${head}
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css">
    <script>window.global = window;</script>
  `,
  async viteFinal(config, {
    configType
  }) {
    config.plugins.unshift(Solid({
      hot: false
    }));
    return mergeConfig(config, {
      resolve: {
        alias: { '@': path.resolve(path.dirname(__dirname), "src")},
      },
    });
  }
};
export default config;
