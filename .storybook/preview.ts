import type { Preview } from "storybook-solidjs";
import "../src/components/index.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "figmagray",
      values: [
        {
          name: "figmagray",
          value: "#e6e6e6",
        },
        {
          name: "white",
          value: "#fff",
        },
        {
          name: "black",
          value: "#333",
        },
        {
          name: "blue",
          value: "#00aced",
        },
      ],
    },
  },
};

export default preview;
