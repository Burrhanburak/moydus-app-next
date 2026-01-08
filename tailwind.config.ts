// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    // Radix ve after içerikleri için
    {
      pattern:
        /(after:content-|'after:content-')|(group-data-\[state=open\]:translate-y-0\.5)/,
    },
  ],
  theme: {
    extend: {
      spacing: {
        '0.5': '0.125rem',
        '1.5': '0.375rem',
        '2.5': '0.625rem',
        '3.5': '0.875rem',
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '6.25': '1.5625rem',
        '10.5': '2.625rem',
        '14.5': '3.625rem',
        '15': '3.75rem',
        '15.5': '3.875rem',
        '20': '5rem',
        '25': '6.25rem',
        '30': '7.5rem',
        '31.5': '7.875rem',
        '34.5': '8.625rem',
        '36.5': '9.125rem',
        '42': '10.5rem',
        '49.5': '12.375rem',
        '50': '12.5rem',
        '61.5': '15.375rem',
        '64': '16rem',
        '70': '17.5rem',
        '71': '17.75rem',
        '75': '18.75rem',
        '121': '30.25rem',
      },
      zIndex: {
        '-1': '-1',
      },
      keyframes: {
        'orbit-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'orbit-slow': 'orbit-slow 40s linear infinite',
      },
    },
  },
  plugins: [],
};
