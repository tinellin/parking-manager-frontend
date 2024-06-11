/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{jsx,js}',
    './src/components/**/*.{jsx,js}',
  ],
  theme: {
    extend: {
      colors: {
        "my-gray": {
          '900': '#181b23',
          '800': '#1f2029',
          '700': '#353646',
          '600': '#4b4d63',
          '500': '#616480',
          '400': '#797d9a',
          '300': '#9699b0',
          '200': '#b3b5c6',
          '100': '#d1d2dc',
          '50': '#eeeef2',
        }
      }
    },
  },
  plugins: [],
}

