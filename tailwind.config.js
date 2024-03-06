/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [
    require('tailwindcss-radix')({
      variantPrefix: 'rdx'
    })]
}