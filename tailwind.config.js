/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      white: "#ffffff",
      black: "#1A1A1A",
      dark: "#ffffff25",
      light: "#383838",
      primary: "#EB9B19",
      secondary: "#AE00FF",
      useful: "#DED9CE",
      good: "#57DF5D",
      excellent: "#2400FF",
      mysterious: "#FF007F",
    },
    extend: {
      fontFamily: {
        sans: ["MontserratLight", "Helvetica", "Arial", "sans-serif"],
        montserratBlack: ["MontserratBlack"],
        montserratSemiBold: ["MontserratSemiBold"],
      },
      screens: {
        xs: "450px",
      },
      borderRadius: {
        big: "60px",
      },
      blur: {
        "4xl": "80px",
        "5xl": "100px",
        "6xl": "130px",
        "7xl": "200px",
      },
    },
  },
  daisyui: {
    base: false,
    darkTheme: "dark",
    themes: [
      {
        mytheme: {
          primary: "#eb9b19",
          secondary: "#7e22ce",
          accent: "#2563eb",
          neutral: "#383838",
          "base-100": "#1A1A1A",
          info: "#1e3a8a",
          success: "#15803d",
          warning: "#a16207",
          error: "#7f1d1d",
        },
      },
    ],
    logs: false,
  },
  plugins: [require("daisyui")],
}
