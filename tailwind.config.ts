
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				// Coastal Blue Cyberpunk Palette
				coastal: {
					900: '#012A4A',  // Darkest blue - main backgrounds
					800: '#013A63',  // Dark blue - containers
					700: '#01497C',  // Medium dark - cards
					600: '#014F86',  // Medium - accents
					500: '#2A6F97',  // Medium light - interactive elements
					400: '#2C7DA0',  // Light - hover states
					300: '#468FAF',  // Lighter - text on dark
					200: '#61A5C2',  // Very light - borders
					100: '#89C2D9',  // Ultra light - subtle effects
					50: '#A9D6E5',   // Lightest - highlights
				},
				// Legacy support - map to coastal blue
				cyber: {
					primary: '#012A4A',    // coastal-400
					secondary: '#468FAF',  // coastal-300
					accent: '#89C2D9',     // coastal-100
					dark: '#012A4A',       // coastal-900
					light: '#A9D6E5',      // coastal-50
					neon: '#61A5C2',       // coastal-200 (main neon)
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'pulse-glow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.6' }
				},
				'flow-left': {
					'0%': { backgroundPosition: '0% 50%' },
					'100%': { backgroundPosition: '100% 50%' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'scale-up': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-out': 'fade-out 0.5s ease-out',
				'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'flow-left': 'flow-left 15s linear infinite',
				'float': 'float 3s ease-in-out infinite',
				'scale-up': 'scale-up 0.3s ease-out'
			},
			fontSize: {
				'heading-xl': ['4rem', { lineHeight: '1.1', fontWeight: '800' }],
				'heading-lg': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
				'heading-md': ['2rem', { lineHeight: '1.3', fontWeight: '600' }],
				'heading-sm': ['1.5rem', { lineHeight: '1.4', fontWeight: '500' }],
			},
			fontFamily: {
				'orbitron': ['Orbitron', 'monospace'],
				'rajdhani': ['Rajdhani', 'sans-serif'],
				'tech': ['Share Tech Mono', 'monospace'],
			},
			backgroundImage: {
				'circuit-pattern': "url('/circuit-pattern.svg')",
				'cyber-gradient': 'linear-gradient(90deg, #1A1F2C 0%, #33C3F0 100%)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;