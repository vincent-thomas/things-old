/** @type {import('tailwindcss').Config} */
import { fontFamily } from 'tailwindcss/defaultTheme';
import { join } from 'path';

module.exports = {
  content: [
    join(__dirname, './src/**/*.tsx'),
    join(__dirname, './src/**/*.stories.tsx'),
    join(__dirname, './src/**/*.mdx'),
  ],
  theme: {
    extend: {
      colors: {
        border: {
          DEFAULT: 'var(--border)',
          placeholder: 'var(--border-placeholder)',
        },
        input: 'var(--input)',
        background: 'var(--background)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
          muted: 'var(--primary-muted)',
          ghost: 'var(--primary-ghost)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        // muted: {
        //   DEFAULT: 'hsl(var(--muted))',
        //   foreground: 'var(--muted-foreground)',
        // },
        // accent: {
        //   DEFAULT: 'hsl(var(--accent))',
        //   foreground: 'hsl(var(--accent-foreground))',
        // },
        // popover: {
        //   DEFAULT: 'hsl(var(--popover))',
        //   foreground: 'hsl(var(--popover-foreground))',
        // },
        // card: {
        //   DEFAULT: 'hsl(var(--card))',
        //   foreground: 'hsl(var(--card-foreground))',
        // },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
};
