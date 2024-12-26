import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // original component colors
        loading: {
          border: 'var(--loading-border)',
        },
        header: {
          foreground: {
            DEFAULT: 'var(--header-foreground)',
          },
        },
        tab: {
          border: 'var(--tab-border)',
          foreground: 'var(--tab-foreground)',
          background: {
            DEFAULT: 'var(--tab-background)',
            selected: 'var(--tab-background-selected)',
          },
        },
        sun: {
          icon: 'var(--sun-icon)',
        },
        moon: {
          icon: 'var(--moon-icon)',
        },
        sub: 'var(--sub)',
        startail: 'var(--startail)',

        // shadcn/ui colors
        background: {
          DEFAULT: 'var(--background)',
          gradation: {
            1: 'var(--background-gradation-1)',
            2: 'var(--background-gradation-2)',
          }
        },
        foreground: {
          DEFAULT: 'var(--foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        input: {
          DEFAULT: 'var(--input)',
          border: 'var(--input-border)',
          background: 'var(--input-background)',
        },
        ring: 'var(--ring)',
        chart: {
          '1': 'var(--chart-1)',
          '2': 'var(--chart-2)',
          '3': 'var(--chart-3)',
          '4': 'var(--chart-4)',
          '5': 'var(--chart-5)',
        },
      },
      screens: {
        xs: '350px'
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)']
      },
      fontSize: {
        xxxs: ["0.65rem", { lineHeight: "1.6", letterSpacing: "0.05em" }],
        xxs: ["0.75rem", { lineHeight: "1.6", letterSpacing: "0.05em" }],
        xs: ["0.8125rem", { lineHeight: "1.6", letterSpacing: "0.05em" }],
        s: ["0.875rem", { lineHeight: "1.6", letterSpacing: "0.05em" }],
        m: ["1rem", { lineHeight: "1.6", letterSpacing: "0.05em" }],
        l: ["1.125rem", { lineHeight: "1.6", letterSpacing: "0.05em" }],
        xl: ["1.25rem", { lineHeight: "1.6", letterSpacing: "0.05em" }],
        xxl: ["1.5rem", { lineHeight: "1.6", letterSpacing: "0.05em" }],
        xxxl: ["1.625rem", { lineHeight: "1.6", letterSpacing: "0.05em" }],
        xxxxl: ["2rem", { lineHeight: "1.6", letterSpacing: "0.05em" }],
      },
      animation: {
        "pulsate-fwd": "pulsate-fwd 0.2s linear   both",
        "rotate-in-center": "rotate-in-center 0.4s cubic-bezier(0.455, 0.030, 0.515, 0.955)   both",
        "rotate-out-center": "rotate-out-center 0.4s cubic-bezier(0.645, 0.045, 0.355, 1.000)   both",
        'tail-fade': 'tail-fade 2.5s ease-out infinite',
        'obit-wave-1': 'obit-wave-1 1s linear infinite',
        'obit-wave-2': 'obit-wave-2 1s linear infinite',
        'obit-wave-3': 'obit-wave-3 1s linear infinite',
        'obit-wave-4': 'obit-wave-4 1s linear infinite',
      },
      keyframes: {
        "pulsate-fwd": {
          "0%,to": {
            transform: "scale(1)"
          },
          "50%": {
            transform: "scale(1.1)"
          }
        },
        "rotate-in-center": {
          "0%": {
            transform: "rotate(-360deg)",
            opacity: "0"
          },
          to: {
            transform: "rotate(0)",
            opacity: "1"
          }
        },
        "rotate-out-center": {
          "0%": {
            transform: "rotate(0)",
            opacity: "1"
          },
          to: {
            transform: "rotate(-360deg)",
            opacity: "0"
          }
        },
        'tail-fade': {
          '0%': {
            transform: 'scale(0.8)',
            opacity: '0.3',
          },
          '50%': {
            transform: 'scale(1.2)',
            opacity: '0.1',
          },
          '100%': {
            transform: 'scale(1.5)',
            opacity: '0',
          },
        },
         // -----------------------------
        // 1. Wave 1: 6角形に近いまるみ
        // -----------------------------
        'obit-wave-1': {
          '0%': {
            transform: 'rotate(0deg) translateX(50px) rotate(0deg)',
          },
          '16.6%': {
            transform: 'rotate(60deg) translateX(70px) rotate(-60deg)',
          },
          '33.2%': {
            transform: 'rotate(120deg) translateX(50px) rotate(-120deg)',
          },
          '49.8%': {
            transform: 'rotate(180deg) translateX(70px) rotate(-180deg)',
          },
          '66.4%': {
            transform: 'rotate(240deg) translateX(50px) rotate(-240deg)',
          },
          '83%': {
            transform: 'rotate(300deg) translateX(70px) rotate(-300deg)',
          },
          '100%': {
            transform: 'rotate(360deg) translateX(50px) rotate(-360deg)',
          },
        },

        // -----------------------------
        // 2. Wave 2: 8枚の花びら
        // -----------------------------
        'obit-wave-2': {
          '0%': {
            transform: 'rotate(0deg) translateX(10px) rotate(0deg)',
          },
          '12.5%': {
            transform: 'rotate(45deg) translateX(100px) rotate(-45deg)',
          },
          '25%': {
            transform: 'rotate(90deg) translateX(10px) rotate(-90deg)',
          },
          '37.5%': {
            transform: 'rotate(135deg) translateX(100px) rotate(-135deg)',
          },
          '50%': {
            transform: 'rotate(180deg) translateX(10px) rotate(-180deg)',
          },
          '62.5%': {
            transform: 'rotate(225deg) translateX(100px) rotate(-225deg)',
          },
          '75%': {
            transform: 'rotate(270deg) translateX(10px) rotate(-270deg)',
          },
          '87.5%': {
            transform: 'rotate(315deg) translateX(100px) rotate(-315deg)',
          },
          '100%': {
            transform: 'rotate(360deg) translateX(10px) rotate(-360deg)',
          },
        },

        // -----------------------------
        // 3. Wave 3: 三つ葉のように3回ふくらむ
        // -----------------------------
        'obit-wave-3': {
          '0%': {
            transform: 'rotate(0deg) translateX(70px) rotate(0deg)',
          },
          '33%': {
            transform: 'rotate(120deg) translateX(30px) rotate(-120deg)',
          },
          '66%': {
            transform: 'rotate(240deg) translateX(100px) rotate(-240deg)',
          },
          '100%': {
            transform: 'rotate(360deg) translateX(70px) rotate(-360deg)',
          },
        },

        // -----------------------------
        // 4. Wave 4: 細かいギザギザ (12ローブ)
        // -----------------------------
        'obit-wave-4': {
          '0%': {
            transform: 'rotate(0deg) translateX(50px) rotate(0deg)',
          },
          '8%': {
            transform: 'rotate(30deg) translateX(80px) rotate(-30deg)',
          },
          '16%': {
            transform: 'rotate(60deg) translateX(40px) rotate(-60deg)',
          },
          '24%': {
            transform: 'rotate(90deg) translateX(80px) rotate(-90deg)',
          },
          '32%': {
            transform: 'rotate(120deg) translateX(50px) rotate(-120deg)',
          },
          '40%': {
            transform: 'rotate(150deg) translateX(75px) rotate(-150deg)',
          },
          '48%': {
            transform: 'rotate(180deg) translateX(50px) rotate(-180deg)',
          },
          '56%': {
            transform: 'rotate(210deg) translateX(80px) rotate(-210deg)',
          },
          '64%': {
            transform: 'rotate(240deg) translateX(40px) rotate(-240deg)',
          },
          '72%': {
            transform: 'rotate(270deg) translateX(80px) rotate(-270deg)',
          },
          '80%': {
            transform: 'rotate(300deg) translateX(40px) rotate(-300deg)',
          },
          '88%': {
            transform: 'rotate(330deg) translateX(80px) rotate(-330deg)',
          },
          '100%': {
            transform: 'rotate(360deg) translateX(50px) rotate(-360deg)',
          },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animated')],
} satisfies Config

export default config
