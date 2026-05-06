/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./layout/**/*.liquid",
    "./presets/**/*.html",
    "./snippets/**/*.liquid",
    "./templates/**/*.liquid",
    "./statics/**/*.liquid"
  ],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset"
    ],
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
  darkMode: 'class',
  theme: {
    extend: {
      colors: () => {
        return {
          ...["primary", "secondary", "accent", "info", "success", "warning"].reduce((map, name) => {
            return {
              ...map,
              [name]: {
                DEFAULT: `hsl(var(--theme-color-${name}) / <alpha-value>)`,
                lighten: `hsl(var(--theme-color-${name}-hsl-h) var(--theme-color-${name}-hsl-s) calc(var(--theme-color-${name}-hsl-l) + 15%))`,
                darken: `hsl(var(--theme-color-${name}-hsl-h) var(--theme-color-${name}-hsl-s) calc(var(--theme-color-${name}-hsl-l) - 15%))`,
                ...[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].reduce((map,lightness) => {
                  return {
                    ...map,
                    [lightness]: `hsl(var(--theme-color-${name}-hsl-h) var(--theme-color-${name}-hsl-s) ${100 - lightness/10*0.8}%)`
                  }
                }, {})
              }
            }
          }, {}),
          // 错误色永远是红色，饱和度与主色调保持一致
          error: {
            DEFAULT: `hsl(355 75% var(--theme-color-primary-hsl-l) / <alpha-value>)`,
            lighten: `hsl(355 75% calc(var(--theme-color-primary-hsl-l) + 15%))`,
            darken: `hsl(355 75% calc(var(--theme-color-primary-hsl-l) - 15%))`,
            ...[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].reduce((map,lightness) => {
              return {
                ...map,
                [lightness]: `hsl(355 75% ${100 - lightness/10*0.8}%)`
              }
            }, {})
          }
        }
      }
    },
  },
  plugins: [
    //require("@tailwindcss/typography"),
    require('daisyui')
  ]
}
