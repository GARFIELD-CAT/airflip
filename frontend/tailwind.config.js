/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    fontFamily: {
      arial: ["Arial", "sans-serif"],
      montreal: ["Montreal", "sans-serif"],
      aeonik: ["AeonikPro", "sans-serif"],
    },
    fontSize: {
      'xs': ['0.8125rem', {lineHeight: '0.975rem',}],
      'sm': ['0.875rem', {lineHeight: '1.25rem'}],
      'semi-base': ['0.9375rem', {lineHeight: '1.125rem'}],
      'base': ['1rem', {lineHeight: '1.2rem'}],
      'md': ['1.1875rem', {lineHeight: '1.425rem'}],
      'lg': ['1.125rem', {lineHeight: '1.75rem'}],
      'xl': ['1.375rem', {lineHeight: '1.65rem'}],
      '2xl': ['1.5rem', {lineHeight: '1.8rem'}],
      '2.5xl': ['1.75rem', {lineHeight: '2.1rem'}],
      '3xl': ['1.875rem', {lineHeight: '2.25rem'}],
      '4xl': ['2.5rem', {lineHeight: '3rem'}],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // V2 Color System - Primary colors
        bg: 'var(--bg)',
        white: 'var(--white)',
        'cards-widget': 'var(--cards-widget)',
        'alerts-alert': 'var(--alterts-alert)',
        
        // Green colors
        green: {
          11100: 'var(--green-11100)',
          1100: 'var(--green-1100)',
          115: 'var(--green-115)',
          12100: 'var(--green-12100)',
          130: 'var(--green-130)',
          150: 'var(--green-150)',
          180: 'var(--green-180)',
          // Legacy aliases
          100: 'var(--green-100)',
          15: 'var(--green-15)',
          30: 'var(--green-30)',
          50: 'var(--green-50)',
          80: 'var(--green-80)',
        },
        
        // Input colors
        input: {
          active: 'var(--input-active)',
          default: 'var(--input-default)',
          error: 'var(--input-error)',
        },
        
        // Main colors
        main: {
          100: 'var(--main-100)',
          15: 'var(--main-15)',
          30: 'var(--main-30)',
          50: 'var(--main-50)',
          10: 'var(--main-10)',
          8: 'var(--main-8)',
          80: 'var(--main-80)',
        },
        
        // Red colors
        red: {
          100: 'var(--red-100)',
          15: 'var(--red-15)',
          30: 'var(--red-30)',
          5: 'var(--red-5)',
          50: 'var(--red-50)',
          80: 'var(--red-80)',
        },
        
        // Stroke colors
        stroke: {
          100: 'var(--stroke-100)',
          40100: 'var(--stroke-40100)',
          element: 'var(--stroke-element)',
        },
        
        // Text colors - V2 system with proper naming
        'text-1100': 'var(--text-1100)',
        'text-170': 'var(--text-170)',
        'text-100': 'var(--text-100)',
        'text-2100': 'rgb(var(--text-2100))',
        'text-260': 'var(--text-260)',
        'text-270': 'var(--text-270)',
        'text-20': 'var(--text-20)',
        'text-3100': 'rgb(var(--text-3100))',
        'text-30': 'var(--text-30)',
        'text-30100': 'var(--text-30100)',
        'text-4100': 'var(--text-4100)',
        'text-4030': 'var(--text-4030)',
        'text-50': 'var(--text-50)',
        'text-60': 'var(--text-60)',
        'text-5070': 'var(--text-5070)',
        'text-80100': 'var(--text-80100)',
        
        // Violet colors
        violet: {
          100: 'var(--violet-100)',
          15: 'var(--violet-15)',
          30: 'var(--violet-30)',
          50: 'var(--violet-50)',
          80: 'var(--violet-80)',
        },

        // Legacy color aliases for backward compatibility
        'card': 'var(--card)',
        'main-15': 'var(--main-15)',
        'logo': 'var(--logo)',
        'button-40': 'var(--button-40)',
        'text': 'var(--text)',
        'text-dark': 'rgb(var(--text-dark))',
        'text-white': 'var(--text-white)',
        'text-90': 'var(--text-90)',
        'text-80': 'var(--text-80)',
        'text-5': 'var(--text-5)',
        'error': 'var(--error)',
        'error-card-40': 'var(--error-card-40)',
        'violet-text': 'var(--violet-violet-text)',
        'input-default': 'var(--input-default)',
        'input-active': 'var(--input-active)',
        'input-error': 'var(--input-error)',
        'blue1': 'var(--dark-blue-100)',
        'dark-blue': {
          15: 'var(--dark-blue-15)',
          30: 'var(--dark-blue-30)',
          100: 'var(--dark-blue-100)',
        },
        'blue2': 'var(--blue-blue2)',
        'light-blue': {
          100: 'var(--light-blue-100)',
          15: 'var(--light-blue-15)',
          30: 'var(--light-blue-30)',
          50: 'var(--light-blue-50)',
          80: 'var(--light-blue-80)',
        },
        'orange': {
          100: 'var(--orange-100)',
          15: 'var(--orange-15)',
        },
        'gray': {
          100: 'var(--gray-100)',
          80: 'var(--gray-80)',
          70: 'var(--gray-70)',
          50: 'var(--gray-50)',
          20: 'var(--gray-20)',
        },
        'dark-bg': 'var(--dark-bg)',
        'cards': 'var(--cards)',
        'cards-hover': 'var(--cards-hover)',
        'dark-cards': {
          100: 'var(--dark-cards-100)',
          70: 'var(--dark-cards-70)',
        },
        'dark-default-input-4': 'var(--dark-default-input-4)',
        'dark-some-button': 'var(--dark-some-button)',
        'mobile-dark-bg': 'var(--mobile-dark-bg)',
        'mobile-dark-white': 'var(--mobile-dark-white)',
        'mobile-dark-green': 'var(--mobile-dark-green)',
        'mobile-dark-blue-1': 'var(--mobile-dark-blue-1)',
        'mobile-dark-blue-20': 'var(--mobile-dark-blue-20)',
        'mobile-dark-blue-2': 'var(--mobile-dark-blue-2)',
        'mobile-dark-gray-text': 'var(--mobile-dark-gray-text)',
        'mobile-dark-gray-70-bg-card': 'var(--mobile-dark-gray-70-bg-card)',
        'mobile-dark-violet-100': 'var(--mobile-dark-violet-100)',
        'mobile-dark-violet-15': 'var(--mobile-dark-violet-15)',
        'mobile-dark-violet-4': 'var(--mobile-dark-violet-4)',
      },
      boxShadow: {
        'shadow': 'var(--shadow)',
        'shadow--hover': 'var(--shadow-hover)',
        'dark-shadow': 'var(--dark-shadow)',
        'dark-shadow--hover': 'var(--dark-shadow-hover)',
        'test': 'var(--shadow-test)',
        'test-2': 'var(--shadow-test-2)',
        'block': '0px 6px 66px 0px rgba(97, 96, 255, 0.15), 0px 6px 9px 0px rgba(97, 96, 255, 0.04)',
        'button': "box-shadow: 0px 6px 66px 0px rgba(0, 0, 0, 0.03), 0px 6px 9px 0px rgba(0, 0, 0, 0.02);",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        moonArc: {
          '0%': { transform: 'translate(20px, 20px) rotate(0deg)' },
          '50%': { transform: 'translate(10px, 10px) rotate(180deg)' },
          '100%': { transform: 'translate(0, 0) rotate(360deg)' },
        },
        sunArc: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(10px, -10px) rotate(180deg)' },
          '100%': { transform: 'translate(0, 0) rotate(360deg)' },
        },
        translateIn: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        shimmer: {
          '0%': { transform: 'translateX(-200%)', width: '50%' },
          '100%': { transform: 'translateX(calc(100% + 100/50*100%))', width: '50%' },
        },
        'gradient-rotate': {
          '0%': { 'background-position': '0% 0%' },
          '100%': { 'background-position': '100% 100%' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
          moonArc: 'moonArc 0.3s ease-in-out forwards',
          sunArc: 'sunArc 0.3s ease-in-out forwards',
          translateIn: 'translateIn 0.15s ease-in-out forwards',
          "caret-blink": "caret-blink 1.25s ease-out infinite",
          shimmer: 'shimmer 3s infinite linear',
          'gradient-rotate': 'gradient-rotate 3s linear infinite',
        },
        fillOpacity: {
          '0': '0',
          '25': '0.25',
          '50': '0.5',
          '75': '0.75',
          '100': '1',
        },
      },
    variants: {
      extend: {
        fillOpacity: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}