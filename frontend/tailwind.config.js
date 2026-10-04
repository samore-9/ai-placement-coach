/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Base surfaces
        surface: {
          light: '#F7F8FB',
          card: '#FFFFFF',
          dark: '#0B0F19',
          'dark-card': '#121826',
        },
        // Primary: "signal blue" - confident, technical, not the generic
        // purple/violet AI default. Used for CTAs, active states, links.
        signal: {
          50: '#EEF2FF',
          100: '#DCE4FF',
          300: '#8FA4FF',
          500: '#3557F0', // primary
          600: '#2842C7',
          700: '#1F359E',
          900: '#141F5C',
        },
        // Progress/streak accent - amber, distinct hue from primary so
        // "readiness" and "achievement" states are visually unambiguous
        streak: {
          400: '#FDB750',
          500: '#F59B12',
          600: '#C97C0A',
        },
        // Status colors for scores/readiness bands
        status: {
          danger: '#E5484D',
          warning: '#F5A623',
          success: '#1AAE7A',
        },
        ink: {
          900: '#0B0F19',
          700: '#1E2534',
          500: '#4A5468',
          300: '#8A93A6',
          100: '#E4E7EC',
        },
      },
      fontFamily: {
        // Display: geometric, technical personality for headings/scores
        display: ['"Space Grotesk"', 'sans-serif'],
        // Body: neutral, highly readable for dense dashboard content
        body: ['"Inter"', 'sans-serif'],
        // Mono: for ATS scores, code blocks, streak counters, IDs
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(11,15,25,0.04), 0 1px 6px -1px rgba(11,15,25,0.06)',
        'card-hover': '0 4px 12px -2px rgba(11,15,25,0.10)',
      },
      backgroundImage: {
        'gradient-signal': 'linear-gradient(135deg, #3557F0 0%, #1F359E 100%)',
        'gradient-streak': 'linear-gradient(135deg, #FDB750 0%, #F59B12 100%)',
      },
    },
  },
  plugins: [],
};
