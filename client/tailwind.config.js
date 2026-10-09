/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neo: {
          bg: '#FDFBF7',
          surface: '#F5EFEB',
          dark: '#121212',
          yellow: '#FFE600',
          pink: '#FF4365',
          cyan: '#00F0FF',
          lime: '#B8FF00',
          purple: '#A388EE',
          orange: '#FF6B00',
          blue: '#3B82F6'
        }
      },
      boxShadow: {
        'brutal-sm': '2px 2px 0px #000',
        'brutal': '4px 4px 0px #000',
        'brutal-lg': '6px 6px 0px #000',
        'brutal-xl': '8px 8px 0px #000',
        'brutal-2xl': '12px 12px 0px #000',
        'brutal-yellow': '5px 5px 0px #FFE600',
        'brutal-pink': '5px 5px 0px #FF4365',
        'brutal-cyan': '5px 5px 0px #00F0FF',
        'brutal-lime': '5px 5px 0px #B8FF00',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounceSubtle 2s infinite ease-in-out',
        'wiggle': 'wiggle 0.3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        }
      }
    },
  },
  plugins: [],
}

