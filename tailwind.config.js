/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Add this line if it's missing
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
