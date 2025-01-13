import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          0: '#000',
          10: '#00B6AD',
          20: '#1ABDB5',
          30: '#33C5BD',
          40: '#4DCCC6',
          50: '#66D3CE',
          60: '#80DBD6',
          70: '#99E2DE',
          80: '#B2E9E6',
          90: '#CCF0EF',
          95: '#F2FBFB',
          99: '#FCFEFE',
          100: '#FFFFFF',
        },
        heart: '#FF0040',
      },
      fontSize: {
        title: ['16pt', { lineHeight: '1.5' }],
        basic: ['14pt', { lineHeight: '1.5' }],
        small: ['12pt', { lineHeight: '1.5' }],
        tiny: ['10pt', { lineHeight: '1.5' }],
        label: ['18pt', { lineHeight: '1.5' }],
      },
      spacing: {
        mobileInputHeight: '40px',
        tabletInputHeight: '44px',
      },
    },
  },
  plugins: [],
} satisfies Config;
