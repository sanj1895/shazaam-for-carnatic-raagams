/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Lora"', 'Georgia', 'serif'],
      },
      colors: {
        c: {
          bg:           '#FAF4E8',
          surface:      '#F3EAD6',
          card:         '#EDE0C4',
          border:       '#C8A872',
          'border-hi':  '#9A7640',
          gold:         '#8B5C10',
          'gold-light': '#B07820',
          'gold-dim':   '#C89840',
          'gold-faint': '#F5EAD0',
          cream:        '#1E0C04',
          'cream-dim':  '#5A3420',
          'cream-dark': '#9A7050',
          maroon:       '#7A1E14',
          navy:         '#122240',
          teal:         '#0E2820',
        },
      },
      animation: {
        'fade-in':  'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'marquee':  'marquee 30s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
