const Solid = require("vite-plugin-solid");

module.exports = {
  stories: ["../src/components/**/*.stories.@(jsx|tsx)"],
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
  async viteFinal(config, { configType }) {
    config.plugins.unshift(Solid({ hot: false }));

    return config;
  },
  // https://storybook.js.org/docs/react/addons/writing-presets#previewmanager-templates
  // TODO: duplicate. Use tailwind.config.js
  previewHead: (head) => `
  ${head}
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css">
    <style>
      body {
        background-color: #f5f5f5;
      }
    </style>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ["Inter var"],
          },
        },
      },
    }
    </script>
    <script>
      window.global = window;
    </script>
  `,
};
