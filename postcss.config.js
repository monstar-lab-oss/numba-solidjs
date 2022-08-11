module.exports = {
  // TODO: Make sure we need the `purge` option
  purge: ["./src/index.html", "./src/components/**/*.{tsx,css}"],
  plugins: {
    "postcss-import": {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
