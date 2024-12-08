/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ['./projects/docs/src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#fbbf24',
        textPrimary: '#09090b',
      },
    },
  },
  plugins: [],
};
