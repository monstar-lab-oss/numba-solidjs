// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const forms = require("@tailwindcss/forms");

module.exports = {
  content: ["./src/index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "figma-gray": "#e6e6e6",
        // same color as `disabled` on components/constants.ts
        "dark-gray": "#b2b2b2",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    // NOTE: We added this plugin middle if develop, So we just apply only specific components.
    forms({
      strategy: "class",
    }),
  ],
};
