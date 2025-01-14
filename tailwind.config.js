/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ejs,js}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
}

