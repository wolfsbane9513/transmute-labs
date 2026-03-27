/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        deep: '#050510',
        base: '#0A0E1A',
        elevated: '#111827',
        glass: 'rgba(255, 255, 255, 0.05)',
        'border-subtle': 'rgba(255, 255, 255, 0.08)',
        'border-hover': 'rgba(59, 130, 246, 0.5)',
        'text-primary': '#F1F5F9',
        'text-secondary': '#94A3B8',
        'text-muted': '#64748B',
        'accent-blue': '#2563EB',
        'accent-amber': '#F59E0B',
        'accent-green': '#22C55E',
        'accent-purple': '#8B5CF6',
      },
      borderRadius: {
        '2xl': '1rem',
      },
      animation: {
        'blob1': 'blob1 8s ease-in-out infinite',
        'blob2': 'blob2 10s ease-in-out infinite',
        'blob3': 'blob3 12s ease-in-out infinite',
      },
      keyframes: {
        blob1: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(30px, -20px)' },
        },
        blob2: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-20px, 30px)' },
        },
        blob3: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(15px, 25px)' },
        },
      },
    },
  },
  plugins: [],
}
