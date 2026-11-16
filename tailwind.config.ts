import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'
import tailwindcssTypography from '@tailwindcss/typography'

const hsl = (v: string) => `hsl(var(--${v}))`

const config = {
  darkMode: ['class', '.dark'],
  content: ['./src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: { center: true, padding: '1.5rem', screens: { '2xl': '1240px' } },
    extend: {
      colors: {
        border: hsl('border'),
        input: hsl('input'),
        ring: hsl('ring'),
        background: hsl('background'),
        foreground: hsl('foreground'),
        primary: { DEFAULT: hsl('primary'), foreground: hsl('primary-foreground') },
        secondary: { DEFAULT: hsl('secondary'), foreground: hsl('secondary-foreground') },
        destructive: { DEFAULT: hsl('destructive'), foreground: hsl('destructive-foreground') },
        muted: { DEFAULT: hsl('muted'), foreground: hsl('muted-foreground') },
        accent: { DEFAULT: hsl('accent'), foreground: hsl('accent-foreground') },
        popover: { DEFAULT: hsl('popover'), foreground: hsl('popover-foreground') },
        card: { DEFAULT: hsl('card'), foreground: hsl('card-foreground') },
        loch: { DEFAULT: hsl('loch'), deep: hsl('loch-deep') },
        mist: { DEFAULT: hsl('mist'), 2: hsl('mist-2') },
        heather: { DEFAULT: hsl('heather'), soft: hsl('heather-soft') },
        gorse: hsl('gorse'),
        pine: hsl('pine'),
        slate: hsl('slate'),
        line: hsl('line'),
        season: hsl('season'),
      },
      fontFamily: {
        sans: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'ui-serif', 'Georgia', 'serif'],
      },
      boxShadow: {
        lift: '0 30px 60px -30px hsl(198 62% 10% / 0.45)',
        soft: '0 14px 34px -22px hsl(198 62% 10% / 0.35)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [tailwindcssAnimate, tailwindcssTypography],
} satisfies Config

export default config
