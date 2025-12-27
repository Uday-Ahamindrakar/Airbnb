/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./projects/**/*.{html,ts}" // safe guard for monorepo
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
  