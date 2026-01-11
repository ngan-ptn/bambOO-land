/** @type {import('tailwindcss').Config} */
export default {
  // Enable dark mode via class strategy (not used in MVP but ready for future)
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // DLS-workflow: Clean, systematic color palette
      colors: {
        // === Foundation: Neutral grays and whites ===
        // High contrast foundation with professional warmth
        neutral: {
          50: '#FAFAFA',   // Pure white with slight warmth
          100: '#F5F5F5',  // Card backgrounds
          200: '#E5E5E5',  // Subtle borders
          300: '#D4D4D4',  // Muted elements
          400: '#A3A3A3',  // Secondary text
          500: '#737373',  // Body text
          600: '#525252',  // Headings
          700: '#404040',  // Strong text
          800: '#262626',  // High contrast text
          900: '#171717',  // Primary text (not pure black)
        },

        // === Strategic Accents: Minimal but purposeful ===
        // Blue for primary actions and trust
        blue: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',  // Primary actions
          600: '#2563EB',  // Hover states
          700: '#1D4ED8',  // Active states
          800: '#1E40AF',
          900: '#1E3A8A',
        },

        // Green for success and positive feedback
        green: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',  // Success states
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },

        // Orange for warnings and attention
        orange: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',  // Warning states
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },

        // === Semantic Tokens ===
        primary: {
          DEFAULT: '#3B82F6',  // blue-500
          light: '#60A5FA',    // blue-400
          dark: '#2563EB',     // blue-600
          foreground: '#FFFFFF',
        },

        secondary: {
          DEFAULT: '#737373',  // neutral-500
          light: '#A3A3A3',    // neutral-400
          dark: '#525252',     // neutral-600
          foreground: '#FFFFFF',
        },

        // Background system
        background: {
          DEFAULT: '#FAFAFA',  // neutral-50 - main background
          card: '#FFFFFF',     // Pure white for cards
          elevated: '#F5F5F5', // neutral-100 - subtle elevation
        },

        // Text hierarchy
        foreground: {
          DEFAULT: '#171717',  // neutral-900 - primary text
          secondary: '#525252', // neutral-600 - headings
          muted: '#737373',     // neutral-500 - body text
          subtle: '#A3A3A3',    // neutral-400 - captions
        },

        // Semantic states
        success: '#22C55E',    // green-500
        warning: '#F97316',    // orange-500
        error: '#DC2626',      // Red for errors (not in palette but standard)

        // Interactive elements
        border: '#E5E5E5',     // neutral-200 - subtle borders
        ring: '#3B82F6',       // blue-500 - focus rings
        hover: '#F5F5F5',      // neutral-100 - hover states
      },

      // Border radius following design system
      borderRadius: {
        'card': '20px',
        'pill': '9999px',
        'sheet': '24px',
        'chip': '12px',
        'input': '16px',
      },

      // Shadows: very soft, 0-4px blur, low opacity
      boxShadow: {
        'card': '0 2px 4px rgba(55, 35, 21, 0.04)',
        'sheet': '0 -2px 8px rgba(55, 35, 21, 0.06)',
        'tile': '0 1px 3px rgba(55, 35, 21, 0.05)',
      },

      // DLS: Typography - 'Outfit' geometric sans-serif
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // DLS: Typography scale - exact matches from design system
        'h1': ['2.25rem', { lineHeight: '2.5rem', fontWeight: '700', letterSpacing: '-0.02em' }],
        'h2': ['1.875rem', { lineHeight: '2.25rem', fontWeight: '700', letterSpacing: '-0.02em' }],
        'h3': ['1.5rem', { lineHeight: '2rem', fontWeight: '700', letterSpacing: '-0.02em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],
        'caption': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],
        'label': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }],
        // Add headline for backward compatibility
        'headline': ['2rem', { lineHeight: '2.25rem', fontWeight: '800', letterSpacing: '-0.02em' }],
        // Legacy aliases for backward compatibility
        'title': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }],
        'numeric-lg': ['1.75rem', { lineHeight: '2.25rem', fontWeight: '600' }],
        'numeric': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }],
      },

      // Animation for progress ring and transitions
      animation: {
        'ring-fill': 'ringFill 700ms ease-out forwards',
        'slide-up': 'slideUp 300ms ease-out',
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
