/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-primary': '#789D8A',
        'orange-secondary': '#E29578',
        'purple-tertiary': '#9A8C98',
        'brown-neutral': '#6D597A',
        'brown-90': '#4E3D42',
        'gray-60': '#71717A',
        'yellow-zen': '#F4D35E',
        'streak-fire': '#FF5F1F'
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        heading: ['Nunito Sans', 'sans-serif'],
      },
      borderRadius: {
        'xl-20': '20px',
        '2xl-24': '24px',
      }
    }
  },
  plugins: [],
}
