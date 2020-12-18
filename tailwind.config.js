module.exports = {
  purge: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: [
    "responsive",
    "group-hover",
    "group-focus",
    "focus-within",
    "hover",
    "focus",
    "active",
    "disabled"
  ],
  plugins: []
};
