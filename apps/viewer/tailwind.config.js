import tailwindcssMotion from "tailwindcss-motion"

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				background: "var(--color-background)",
				"on-background": "var(--color-on-background)",
				error: "var(--color-error)",
			},
			fontFamily: {
				mono: ["iosevka"],
			},
		},
	},
	plugins: [tailwindcssMotion],
}
