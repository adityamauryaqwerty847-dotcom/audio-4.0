/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#080b14',
          card: '#111625',
          cardLight: '#171e30',
          border: '#283148',
          text: '#f5f7ff',
          muted: '#9aa5ba',
        },
        brand: {
          purple: '#8b5cf6',
          indigo: '#6366f1',
          violet: '#7c3aed',
          green: '#22c55e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 25px -5px rgba(139, 92, 246, 0.3)',
        'glow-lg': '0 0 40px -5px rgba(99, 102, 241, 0.4)',
      }
    },
  },
  plugins: [],
}
