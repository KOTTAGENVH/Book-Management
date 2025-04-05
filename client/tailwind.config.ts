/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        zilla: ['Zilla Slab', 'serif'],
        inter: ['Inter', 'sans-serif'],
        consolas: ['Consolas', 'monospace'],
        cabinet: ['"Cabinet Grotesk Variable"', 'sans-serif'],
      },
      animation: {
        loading: "loading 4s ease-out infinite",
        blink: "blink 1.5s infinite",
      },
      keyframes: {
        loading: {
          "0%": { width: "0%" },
          "80%": { width: "100%" },
          "100%": { width: "100%" },
        },
        blink: {
          "0%, 100%": { opacity: "0" },
          "50%": { opacity: "1" },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customOrange: 'rgb(255, 75, 7)',
        customBrown: 'rgb(75, 1, 1)',

         // Gradient Colors (as CSS variables)
         gradientOne: "var(--gradient-one)",
         gradientTwo: "var(--gradient-two)",
         gradientThree: "var(--gradient-three)",
         gradientFour: "var(--gradient-four)",
         gradientFive: "var(--gradient-five)",
         gradientSix: "var(--gradient-six)",
         gradientSeven: "var(--gradient-seven)",
         gradientEight: "var(--gradient-eight)",
      },
      backgroundImage: {
        'bg-Logo': "url('/logo.png')",
        'text-gradient': 'linear-gradient(0deg,  rgba(255,173,64,0.6474964985994398) 0%, rgba(255,217,185,1) 100%)',
        'hover-h-bg-gradient': 'linear-gradient(to right, #8e9eab, #eef2f3);',
        'hover-h-bg-gradient-two': 'linear-gradient(to right, #616161, #9bc5c3);',
        'bg-gradient-one': 'linear-gradient(to right, #bdc3c7, #2c3e50);',
        'bg-gradient-two': 'linear-gradient(to right, #0f2027, #203a43, #2c5364);',
        'bg-gradient-three': 'linear-gradient(to right, #bdc3c7, #2c3e50);'
      },
      backgroundSize: {
        '90%': '90%',
        '80%': '80%',
      },
    },
  },
};
export default config;
