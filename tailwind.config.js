const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/index.html", "./src/components/**/*.{tsx,css}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
