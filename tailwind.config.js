// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "figma-gray": "#e6e6e6",
        // same color as `disabled` on components/constants.ts
        "numba-blue": "#0082ff",
        "numba-red": "#ff0000",
        "numba-white-gray": "#f3f3f3",
        "numba-gray": "#e6e6e6",
        "numba-dark-gray": "#b2b2b2",
        "numba-black": "#000000",
        "numba-white": "#FFFFFF",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
