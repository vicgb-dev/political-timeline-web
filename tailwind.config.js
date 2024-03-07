/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
// eslint-disable-next-line @typescript-eslint/no-var-requires
export default {
  content: ['./src/**/*.{html,ts,tsx}'],
  theme: {
    screens: {
      // 'sm': '640px',
      // => @media (min-width: 640px) { ... }

      mobile: { max: '768px' },
      // => @media (min-width: 768px) { ... }

      // 'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      laptop: { max: '1280px' },
      // => @media (min-width: 1280px) { ... }

      desktop: { max: '1500px' }
      // => @media (min-width: 1536px) { ... }
    },
    extend: {}
  },
  plugins: [
    require('tailwindcss-radix')({
      variantPrefix: 'rdx'
    })]
}
