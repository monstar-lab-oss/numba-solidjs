import "../src/components/index.css";

export const parameters = {
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
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
