module.exports = {
  plugins: [
    require("postcss-nested-import"),
    require("postcss-nested"),
    require("autoprefixer"),
    require("postcss-replace")({
      pattern: /:root/g,
      data: {
        replaceAll: ""
      }
    })
  ],
};