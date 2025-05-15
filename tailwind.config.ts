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
        button: {
          background: 'var(--button-background)',
          foreground: 'var(--button-foreground)',
          border: 'var(--button-border)',
          pdf: {
            DEFAULT: 'var(--button-pdf)',
            hovered: 'var(--button-pdf-hovered)',
            foreground: {
              DEFAULT: 'var(--button-pdf-foreground)',
              hovered: 'var(--button-pdf-foreground-hovered)',
            },
            edge: 'var(--button-pdf-edge)',
          },
          project: {
            DEFAULT: 'var(--button-project)',
            hovered: 'var(--button-project-hovered)',
            foreground: {
              DEFAULT: 'var(--button-project-foreground)',
              hovered: 'var(--button-project-foreground-hovered)',
            },
            edge: 'var(--button-project-edge)',
          },
          github: {
            DEFAULT: 'var(--button-github)',
            hovered: 'var(--button-github-hovered)',
            foreground: {
              DEFAULT: 'var(--button-github-foreground)',
              hovered: 'var(--button-github-foreground-hovered)',
            },
            edge: 'var(--button-github-edge)',
          }
        },
        sun: {
          icon: 'var(--sun-icon)',
        },
        moon: {
          icon: 'var(--moon-icon)',
        },
        icon: {
          fill: 'var(--icon-fill)',
          accent: 'var(--icon-accent)',
        },
        sub: 'var(--sub)',
        orbit: 'var(--orbit)',
        particle:{
          glow: 'var(--particle-glow)',
        },
        block: {
          border: 'var(--block-border)',
        },
        underline: {
          DEFAULT: 'var(--underline)',
        },

        // shadcn/ui colors
        background: {
          DEFAULT: 'var(--background)',
          gradation: {
            1: 'var(--background-gradation-1)',
            2: 'var(--background-gradation-2)',
          },
          line: 'var(--background-line)',
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
      backdropBlur: {
        xs: '2px',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)']
      },
      fontSize: {
        xxs: ["0.65rem", { lineHeight: "1.6", letterSpacing: "0.05em" }],
      },
      animation: {
        "pulsate-fwd": "pulsate-fwd 0.2s linear   both",
        "rotate-in-center": "rotate-in-center 0.4s cubic-bezier(0.455, 0.030, 0.515, 0.955)   both",
        "rotate-out-center": "rotate-out-center 0.4s cubic-bezier(0.645, 0.045, 0.355, 1.000)   both",
        'shining': 'shining 1.2s ease-in-out infinite',
        'spin-slow-1': 'spin 40s linear infinite',
        'spin-slow-2': 'spin 32s linear infinite',
        'spin-slow-3': 'spin 15s linear infinite',
        'spin-slow-4': 'spin 10s linear infinite',
        'spin-fast-1': 'spin 10s linear infinite',
        'spin-fast-2': 'spin 8s linear infinite',
        'spin-fast-3': 'spin 4s linear infinite',
        'spin-fast-4': 'spin 2.5s linear infinite',
        "scale-up-sm": "scale-up-sm 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both",
        "scale-up-md": "scale-up-md 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both",
        "scale-down-md": "scale-down-md 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both",
        "bg-animated": "bg-animated 1s ease infinite",
        "simple-grid": "simple-grid 1s linear infinite",
        "fade-in-top": "fade-in-top 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both",
        "fade-out-top": "fade-out-top 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both",
        "slide-in-left": "slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
        "slide-in-right": "slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
      },
      keyframes: {
        "pulsate-fwd": {
          "0%,to": {
            transform: "scale(1)"
          },
          "50%": {
            transform: "scale(1.2)"
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
        'shining' : {
          '0%': {
            'width': '0',
          },
          '50%' : {
            'width': '30px',
          },
          '100%': {
            'width': '0',
          },
        },
        "scale-up-sm": {
          "0%": {
            transform: "scale(1)"
          },
          to: {
            transform: "scale(1.05)"
          }
        },
        "scale-up-md": {
          "0%": {
            transform: "scale(1)"
          },
          to: {
            transform: "scale(1.2)"
          }
        },
        "scale-down-md": {
          "0%": {
            transform: "scale(1.2)"
          },
          to: {
            transform: "scale(1)"
          }
        },
        "bg-animated": {
          "0%": {
            backgroundPosition: "0% 50%"
          },
          "50%": {
            backgroundPosition: "100% 50%"
          },
          "100%": {
            backgroundPosition: "0% 50%"
          }
        },
        "simple-grid": {
          "0%": {
            backgroundPosition: "0 0"
          },
          "100%": {
            backgroundPosition: "20px 20px"
          }
        },
        "fade-in-top": {
          "0%": {
            transform: "translateY(-10px)",
            opacity: "0"
          },
          to: {
            transform: "translateY(0)",
            opacity: "1"
          }
        },
        "fade-out-top": {
          "0%": {
            transform: "translateY(0)",
            opacity: "1"
          },
          to: {
            transform: "translateY(-10px)",
            opacity: "0"
          }
        },
        "slide-in-left": {
          "0%": {
            transform: "translateX(-1000px)",
            opacity: "0"
          },
          to: {
            transform: "translateX(0)",
            opacity: "1"
          }
        },
        "slide-in-right": {
          "0%": {
            transform: "translateX(1000px)",
            opacity: "0"
          },
          to: {
            transform: "translateX(0)",
            opacity: "1"
          }
        },
      },
    },
  },
  plugins: [require('tailwindcss-animated')],
} satisfies Config

export default config
