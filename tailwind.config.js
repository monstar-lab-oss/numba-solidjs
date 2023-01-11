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
        "numba-blue": "#0082ff",
        "numba-red": "#ff0000",
        "numba-white-gray": "#f3f3f3",
        "numba-gray": "#e6e6e6",
        "numba-dark-gray": "#b2b2b2",
        // NOTE: we use the color black as secondary color
        "numba-black": "#000000",
        "numba-white": "#FFFFFF",
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
    require('flowbite/plugin')
  ],
};
