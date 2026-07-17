import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        lg: "1120px",
        xl: "1280px",
      },
    },
    extend: {
      colors: {
        sable: {
          DEFAULT: "#F7F3EA",
          50: "#FDFCF9",
          100: "#F7F3EA",
          200: "#EFE7D4",
          300: "#E4D6B4",
        },
        marine: {
          DEFAULT: "#101B2E",
          50: "#1C2C46",
          100: "#152238",
          200: "#101B2E",
          300: "#0B1220",
          400: "#070C15",
        },
        brass: {
          DEFAULT: "#B8935A",
          50: "#EFDFC4",
          100: "#DCC091",
          200: "#B8935A",
          300: "#96723F",
          400: "#755530",
        },
        terracotta: {
          DEFAULT: "#B3562F",
          100: "#D68A63",
          200: "#B3562F",
          300: "#8A4023",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
