const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
    function({ addUtilities }) {
      const newUtilities = {
        '.no-spinners': {
          '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
          },
          '-moz-appearance': 'textfield',
        }
      };
      addUtilities(newUtilities, ['responsive']);
    }
  ],
}
