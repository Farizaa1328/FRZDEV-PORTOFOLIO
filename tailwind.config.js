/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Refined Executive Red-Black Palette (Obsidian & Precision Crimson)
        crimson: {
          DEFAULT: '#E11D48',
          50: '#FFF1F2',
          100: '#FFE4E6',
          200: '#FECDD3',
          300: '#FDA4AF',
          400: '#FB7185',
          500: '#F43F5E',
          600: '#E11D48', // Luxury Crimson
          700: '#BE123C',
          800: '#9F1239',
          900: '#881337',
          950: '#4C0519',
        },
        onyx: {
          950: '#050508', // Cinematic Pitch Black matching Reference
          900: '#0B0B10', // Deep Card Surface
          850: '#14141C', // Hover Surface
          800: '#1F1F28', // Hairline Border
          700: '#2E2E3A',
        },
        primary: {
          DEFAULT: '#E11D48',
          50: '#FFF1F2',
          100: '#FFE4E6',
          200: '#FECDD3',
          300: '#FDA4AF',
          400: '#FB7185',
          500: '#F43F5E',
          600: '#E11D48',
          700: '#BE123C',
          800: '#9F1239',
          900: '#881337',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        '3d-card': '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.08)',
        '3d-float': '0 30px 60px -15px rgba(225, 29, 72, 0.3), 0 0 30px 0 rgba(244, 63, 94, 0.15)',
        'glow-crimson': '0 0 35px -4px rgba(225, 29, 72, 0.45)',
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.08)',
        'soft-hover': '0 20px 40px -5px rgba(225, 29, 72, 0.2)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'sheen': 'sheen 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(1.02)' },
        },
        sheen: {
          '0%': { transform: 'translateX(-100%)' },
          '50%, 100%': { transform: 'translateX(200%)' },
        },
      },
    },
  },
  plugins: [],
}
