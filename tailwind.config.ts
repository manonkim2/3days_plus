import type { Config } from "tailwindcss";

const colors = require('tailwindcss/colors')

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#020617',
        secondary: '#d7ff00',
        fontPrimary: '#333333',
        fontSecondary: '#b6b3b3',
        bgPrimary: '#f4f6f9',
        white: colors.white,
        black: colors.black,
      },      
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        xxl: '32px',
      },
      borderRadius: {
        box: '32px',
        btn: '36px',
      },
    },
  },
  plugins: [],
} satisfies Config;
