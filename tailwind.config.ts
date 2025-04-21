
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/extension/popup.html',
    './src/components/**/*.tsx',
    './src/content-scripts/**/*.tsx',
  ],
  theme: {
    extend: {},
  },
  prefix:"tw-",
  plugins: [],
}