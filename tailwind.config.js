/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      // Add your font families here
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        'roboto-mono': ['"Roboto Mono"', 'monospace'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}