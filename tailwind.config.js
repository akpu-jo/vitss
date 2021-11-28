module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          purple: '#9169fa',
          green: '#69fa91',
          brick: '#fa9169'
        },
        secondary: {
          red: '#ea1f59',
          pink: '#ea1f6d',
          red2: '#ea1f45',
          black: '#131313'
        },
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
