/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // DLS Flat Design Color System
      colors: {
        // === Core Palette ===
        background: '#FFFFFF',
        foreground: '#111827',

        // Primary: Action color (Blue 500)
        primary: {
          DEFAULT: '#3B82F6',
          light: '#60A5FA',
          dark: '#2563EB',
          foreground: '#FFFFFF',
        },

        // Secondary: Supporting accent (Emerald 500)
        secondary: {
          DEFAULT: '#10B981',
          light: '#34D399',
          dark: '#059669',
          foreground: '#FFFFFF',
        },

        // Accent: Highlights/badges (Amber 500)
        accent: {
          DEFAULT: '#F59E0B',
          light: '#FBBF24',
          dark: '#D97706',
          foreground: '#FFFFFF',
        },

        // Muted: Secondary backgrounds
        muted: {
          DEFAULT: '#F3F4F6',
          foreground: '#6B7280',
        },

        // Border
        border: '#E5E7EB',

        // Semantic states
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',

        // Gray scale for text hierarchy
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },

      // DLS Border Radius: consistent, moderate
      borderRadius: {
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        'card': '8px',
        'pill': '9999px',
        'sheet': '12px',
        'chip': '6px',
        'input': '6px',
      },

      // DLS: NO SHADOWS - flat design
      boxShadow: {
        'none': 'none',
        'card': 'none',
        'sheet': 'none',
        'tile': 'none',
      },

      // DLS Typography: Outfit font
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Headings: Bold, tight letter-spacing
        'h1': ['2rem', { lineHeight: '2.5rem', fontWeight: '700', letterSpacing: '-0.02em' }],
        'h2': ['1.5rem', { lineHeight: '2rem', fontWeight: '700', letterSpacing: '-0.02em' }],
        'h3': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600', letterSpacing: '-0.02em' }],

        // Body
        'body-lg': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        'caption': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],

        // Numeric displays
        'numeric-lg': ['1.75rem', { lineHeight: '2.25rem', fontWeight: '700' }],
        'numeric': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }],

        // Legacy aliases
        'headline': ['2rem', { lineHeight: '2.5rem', fontWeight: '700' }],
        'title': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }],
      },

      // DLS Motion: Snappy, 200ms
      animation: {
        'ring-fill': 'ringFill 700ms ease-out forwards',
        'slide-up': 'slideUp 200ms ease-out',
        'fade-in': 'fadeIn 200ms ease-out',
      },
      keyframes: {
        ringFill: {
          '0%': { strokeDashoffset: '251.2' },
          '100%': { strokeDashoffset: 'var(--ring-offset)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
