import type { Config } from "tailwindcss";


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
        white: '#ffffff',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        xxl: '32px',
      },
      fontSize: {
        '3xl': ['32px', '52px'],
        '2xl': ['24px', '36px'],
        'xl': ['18px', '24px'],
        'base': ['14px', '20px'],
        'sm': ['10px', '16px']
      }
    },
  },
  plugins: [],
} satisfies Config;
