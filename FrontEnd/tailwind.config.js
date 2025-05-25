/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
      colors: {
        primary: "#0CC0DF",
        secondary: "#B4EBF5",
        phover: "#0badc9",
        pactive: "#0a9ab2",
        light: "#e7f9fc",
        lhover: "#dbf6fa",
        lactive: "#D6F0F3",
        dark: "#1c5c73",
        dhover: "#077386",
        dactive: "#055664",
        darker: "#04434e",
        white: "#FFFFFF",
        // gray: "#D9DCE0",
        gray: { light: "#EBEBEB", dark: "#2E2E2E" },
        black: "#272A28",
      },
    },
  },
  plugins: [],
};
