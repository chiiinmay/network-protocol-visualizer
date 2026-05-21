/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        application: '#FF6B6B',
        presentation: '#4ECDC4',
        session: '#45B7D1',
        transport: '#FFA07A',
        network: '#98D8C8',
        datalink: '#F7DC6F',
        physical: '#BB8FCE',
      }
    },
  },
  plugins: [],
}
