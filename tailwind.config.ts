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

        // shadcn/ui colors
        background: {
          DEFAULT: 'var(--background)',
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
    },
  },
  plugins: [require('tailwindcss-animated')],
} satisfies Config

export default config
