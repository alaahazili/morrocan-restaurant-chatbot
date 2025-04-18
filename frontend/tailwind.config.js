module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Moroccan color palette
      colors: {
        'moroccan-blue': '#1E6F8C',
        'moroccan-red': '#C1272D',
        'moroccan-gold': '#D4AF37',
        'moroccan-green': '#2A5C45',
      },
      // Arabic-inspired fonts
      fontFamily: {
        'arabic': ['"Amiri"', 'serif'],
        'display': ['"Amiri"', 'Georgia', 'serif'],
      },
      // Moroccan geometric patterns (for backgrounds)
      backgroundImage: {
        'moroccan-pattern': "url('./src/assets/moroccan-pattern.png')",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // For styled form elements
  ],
}