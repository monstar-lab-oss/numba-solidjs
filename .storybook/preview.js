import { render } from "solid-js/web";
import "../src/components/index.css";

let disposeStory;

export const decorators = [
  (Story) => {
    if (disposeStory) {
      disposeStory();
    }
    const root = document.getElementById("root");
    const solid = document.createElement("div");

    solid.setAttribute("id", "solid-root");
    root.appendChild(solid);
    disposeStory = render(Story, solid);
    return solid;
    // return createRoot(() => Story()); // do not work correctly https://github.com/solidjs/solid/issues/553
  },
];

export const parameters = {
  backgrounds: {
    default: "figmagray",ちぇ
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
