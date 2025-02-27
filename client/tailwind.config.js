/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], 
  theme: {
    extend: {
      colors: {
        primary: "#FF6600", 
        secondary: "#F5F5F5", 
        danger: "#FF3B30", 
      },
      borderRadius: {
        xl: "12px",
      },
      boxShadow: {
        custom: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
