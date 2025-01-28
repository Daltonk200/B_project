/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        sm: '640px',   // Small screens
        md: '768px',   // Medium screens
        lg: '1024px',  // Large screens
        xl: '1280px',  // Extra large screens
        '2xl': '1536px', // 2X large screens
      },
    },
  },
  plugins: [],
};