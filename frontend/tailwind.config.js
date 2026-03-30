import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				primary: [
					"Momo Trust Display",
					"Open Sans",
					"ui-sans-serif",
					"system-ui",
					"sans-serif",
				],
			},
			colors: {
				dark: {
					bg: "#0a0a0a",
					surface: "#1a1a1a",
					card: "#262626",
					border: "#404040",
					text: {
						primary: "#ffffff",
						secondary: "#a3a3a3",
						muted: "#737373",
					},
				},
				light: {
					bg: "#ffffff",
					surface: "#f5f5f5",
					card: "#ffffff",
					border: "#e5e5e5",
					text: {
						primary: "#0a0a0a",
						secondary: "#525252",
						muted: "#737373",
					},
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					light: "#f97316",
					dark: "#c2410c",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					light: "#f472b6",
					dark: "#be185d",
					foreground: "hsl(var(--secondary-foreground))",
				},
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					1: "hsl(var(--chart-1))",
					2: "hsl(var(--chart-2))",
					3: "hsl(var(--chart-3))",
					4: "hsl(var(--chart-4))",
					5: "hsl(var(--chart-5))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [tailwindcssAnimate],
};
