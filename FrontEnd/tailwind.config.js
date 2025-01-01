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
        secondary: "#0097b2",
        phover: "#0badc9",
        pactive: "#0a9ab2",
        light: "#e7f9fc",
        lhover: "#dbf6fa",
        lactive: "#b4ebf5",
        dark: "#1c5c73",
        dhover: "#077386",
        dactive: "#055664",
        darker: "#04434e",
        white: "#FFFFFF",
        gray: "#babfc6",
        lgray: "#EBEBEB",
        black: "#272A28",
      },
    },
  },
  plugins: [],
};
