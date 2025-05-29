import type { Config } from "tailwindcss";
import defaultTheme from 'tailwindcss/defaultTheme';

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
        // PRD specific colors accessible as Tailwind classes
        'app-surface': 'hsl(var(--card))', // PRD: surface -> maps to card
        'primary-text': 'hsl(var(--foreground))', // PRD: primaryText -> maps to foreground
        'secondary-text': 'hsl(var(--muted-foreground))', // PRD: secondaryText -> maps to muted-foreground
        'accent-orange': 'hsl(var(--accent))', // PRD: accentOrange -> maps to accent
        'accent-blue': 'hsl(var(--primary))', // PRD: accentBlue -> maps to primary
        'accent-green': 'hsl(var(--accent-green-hsl))', // PRD: accentGreen, uses custom CSS var
        'accent-red': 'hsl(var(--destructive))', // PRD: accentRed -> maps to destructive
        'app-border': 'hsl(var(--border))', // PRD: border -> maps to border

        // Sidebar theme colors based on PRD
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
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans], // PRD: primaryFont
      },
			borderRadius: {
        DEFAULT: 'var(--radius)', // 0.375rem (PRD default: "rounded-md")
        md: 'var(--radius)',      // 0.375rem (maps to "rounded-md")
				lg: '0.5rem',            // Standard larger radius (Tailwind's default lg)
				sm: '0.25rem',           // Standard smaller radius (Tailwind's default sm or 'rounded')
        button: '0.25rem',       // PRD buttons: "rounded" (0.25rem)
        full: '9999px',          // PRD full: "rounded-full"
			},
      boxShadow: {
        DEFAULT: '0 1px 2px 0 rgb(0 0 0 / 0.05)', // PRD default: "shadow-sm"
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',      // Explicitly "shadow-sm"
      },
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
