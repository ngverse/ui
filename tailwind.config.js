/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ['./projects/docs/src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#0284c7',
      },
    },
  },
  plugins: [],
};
