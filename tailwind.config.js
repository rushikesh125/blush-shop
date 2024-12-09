/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
       "accent-color":"#f472af",
       "accent-color-dark":"#ed64a6"
      },
      
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"), // Add this plugin
  ],
};
