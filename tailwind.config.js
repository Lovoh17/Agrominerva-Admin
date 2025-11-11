/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ===== COLORES PERSONALIZADOS =====
      colors: {
        // Primario - Verde AgroMinerva
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',  // Color principal
          600: '#16a34a',  // Verde oscuro
          700: '#15803d',  // Verde muy oscuro
          800: '#166534',
          900: '#145231',
        },

        // Secundario - Rojo/Coral
        secondary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',  // Rojo vibrante
          600: '#dc2626',  // Rojo oscuro
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },

        // Terciario - Verde Oscuro
        tertiary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#10593b',  // Verde oscuro
          600: '#0d4a2f',
          700: '#0a3924',
          800: '#072f1a',
          900: '#051f10',
        },

        // Cuaternario - Amarillo/Oro
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#faaa21',  // Amarillo/Oro
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },

        // Neutrales
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
      },

      // ===== ESPACIADO PERSONALIZADO =====
      spacing: {
        'sidebar-width': '280px',
        'sidebar-minimized': '80px',
        'topbar-height': '70px',
      },

      // ===== TAMAÑOS PERSONALIZADOS =====
      width: {
        'sidebar': '16rem',      // 256px
        'sidebar-min': '4.5rem', // 72px
      },

      height: {
        'topbar': '4rem', // 64px
      },

      // ===== TRANSICIONES =====
      transitionDuration: {
        '350': '350ms',
      },

      // ===== TIPOGRAFÍA =====
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'sans-serif',
        ],
      },

      fontSize: {
        xs: ['12px', { lineHeight: '16px' }],
        sm: ['14px', { lineHeight: '20px' }],
        base: ['16px', { lineHeight: '24px' }],
        lg: ['18px', { lineHeight: '28px' }],
        xl: ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '40px' }],
      },

      // ===== SOMBRAS PERSONALIZADAS =====
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px rgba(0, 0, 0, 0.1)',
      },

      // ===== BORDES REDONDEADOS =====
      borderRadius: {
        'xs': '4px',
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
  ],
}

