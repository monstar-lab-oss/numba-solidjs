import type { Preview } from "storybook-solidjs";
import "../src/components/index.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
  },
};

export default preview;
