module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Open Sans'],
      serif: ['Comfortaa', 'cursive'],
      mono: ['Fira Code', 'monospace'],
    },
  },
  variants: {
    extend: {
      margin: ['first'],
      backgroundColor: ['active'],
    },
  },
  plugins: [],
};
