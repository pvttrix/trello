/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'base-col': '#E2EDEE',
        'primary-col': '#4F9692',
        'secondary-col': '#274242',
        'white-accent': '#ffffff',
      },
    },
  },
  plugins: [],
}
