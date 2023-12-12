/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: '0.60em'
      }, 
      colors: {
        blue: '#32B8DC', 
        greenLime: '#77D721', 
        greenLeaf: '#B9F46E', 
        greenLemon: '#DCFF06'
      
      }
    },
  },
  plugins: [],
}

