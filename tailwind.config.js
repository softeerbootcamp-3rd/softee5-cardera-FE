/** @type {import('tailwindcss').Config} */

const PX0_300 = { ...Array.from(Array(301)).map((_, i) => `${i / 10}rem`) }
const PX0_50 = { ...Array.from(Array(51)).map((_, i) => `${i / 10}rem`) }

module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      violet: {
        50: '#F0EFFE',
        75: '#C8C4F6',
        100: '#9791E7',
        200: '#6A61DD',
        300: '#4C41D6',
        400: '#352E96',
        500: '#211C66',
      },
      gray: {
        50: '#F8FAFC',
        100: '#F4F6FA',
        200: '#EAEDF4',
        300: '#D7DCE5',
        400: '#AFBAC8',
        500: '#818A9C',
        600: '#646E82',
        700: '#475067',
        800: '#373F57',
        900: '#292E41',
      },
      black: '#000000',
      white: '#ffffff',
    },

    extend: {
      spacing: PX0_300,
      borderRadius: PX0_50,
      minWidth: PX0_300,
      maxWidth: PX0_300,
      minHeight: PX0_300,

      fontSize: {
        // Headline
        h1: [
          '2.4rem',
          {
            lineHeight: '3.2rem',
            letterSpacing: '0',
            fontWeight: '600',
          },
        ],
        h2: [
          '2.2rem',
          {
            lineHeight: '3.2rem',
            letterSpacing: '0',
            fontWeight: '600',
          },
        ],
        h3: [
          '2.0rem',
          {
            lineHeight: '2.8rem',
            letterSpacing: '0',
            fontWeight: '600',
          },
        ],

        // Body
        'b1-semibold': [
          '1.8rem',
          {
            lineHeight: '2.2rem',
            letterSpacing: '0em',
            fontWeight: '600',
          },
        ],
        'b2-semibold': [
          '1.6rem',
          {
            lineHeight: '2.0rem',
            letterSpacing: '0.008em',
            fontWeight: '600',
          },
        ],
        'b2-regular': [
          '1.6rem',
          {
            lineHeight: '2.0rem',
            letterSpacing: '0.008em',
            fontWeight: '400',
          },
        ],
        'b3-semibold': [
          '1.5rem',
          {
            lineHeight: '2.0rem',
            letterSpacing: '0.008em',
            fontWeight: '600',
          },
        ],
        'b3-regular': [
          '1.5rem',
          {
            lineHeight: '2.0rem',
            letterSpacing: '0.008em',
            fontWeight: '400',
          },
        ],

        // Caption
        'c1-semibold': [
          '1.4rem',
          {
            lineHeight: '1.8rem',
            letterSpacing: '0.008em',
            fontWeight: '600',
          },
        ],
        'c1-regular': [
          '1.4rem',
          {
            lineHeight: '1.8rem',
            letterSpacing: '0.008em',
            fontWeight: '400',
          },
        ],
        c2: [
          '1.2rem',
          {
            lineHeight: '1.6rem',
            letterSpacing: '0.008em',
            fontWeight: '400',
          },
        ],
        c3: [
          '1.1rem',
          {
            lineHeight: '1.4rem',
            letterSpacing: '0.008em',
            fontWeight: '400',
          },
        ],
      },
    },
  },
  plugins: [],
}
