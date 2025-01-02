/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./projects/docs/src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
