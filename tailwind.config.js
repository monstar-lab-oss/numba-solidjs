const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/index.html", "./src/components/**/*.{tsx,css}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "figma-gray": "#e6e6e6",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
