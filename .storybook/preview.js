export const parameters = {
  backgrounds: {
    default: "white",
    values: [
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
