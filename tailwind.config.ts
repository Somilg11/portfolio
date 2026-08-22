import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sf)"],
        mono: ["var(--font-sf-mono)"],
      },
      colors: {
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
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
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
        /* macOS traffic lights */
        traffic: {
          close: "#ff5f57",
          min: "#febc2e",
          zoom: "#28c840",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        mac: "8px",
        window: "10px",
      },
      boxShadow: {
        "mac-1": "var(--mac-elev-1)",
        "mac-2": "var(--mac-elev-2)",
        "mac-3": "var(--mac-elev-3)",
      },
      transitionTimingFunction: {
        mac: "cubic-bezier(0.32, 0.72, 0, 1)",
        "mac-spring": "cubic-bezier(0.2, 0.9, 0.3, 1.1)",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { boxShadow: "0 0 0 0 var(--pulse-color)" },
          "50%": { boxShadow: "0 0 0 8px var(--pulse-color)" },
        },
        "window-in": {
          from: { opacity: "0", transform: "scale(0.96) translateY(8px)" },
          to: { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        "dock-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-14px)" },
          "70%": { transform: "translateY(-4px)" },
        },
      },
      animation: {
        pulse: "pulse var(--duration) ease-out infinite",
        "window-in": "window-in 320ms cubic-bezier(0.32, 0.72, 0, 1) both",
        "dock-bounce": "dock-bounce 700ms cubic-bezier(0.32, 0.72, 0, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
export default config;
