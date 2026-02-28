/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans TC", "PingFang TC", "Microsoft JhengHei", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 24px -4px rgb(0 0 0 / 0.06), 0 8px 16px -6px rgb(0 0 0 / 0.04)",
        "card-hover": "0 12px 40px -8px rgb(0 0 0 / 0.1), 0 8px 24px -8px rgb(0 0 0 / 0.06)",
        "card-latte": "0 4px 28px -4px rgb(125 110 102 / 0.12), 0 8px 20px -6px rgb(125 110 102 / 0.06)",
        "result-latte": "0 8px 32px -8px rgb(125 110 102 / 0.2), inset 0 1px 0 0 rgb(255 255 255 / 0.8)",
        cta: "0 4px 14px -2px rgb(0 0 0 / 0.2), 0 6px 20px -4px rgb(0 0 0 / 0.12)",
        "cta-hover": "0 8px 24px -4px rgb(0 0 0 / 0.25), 0 12px 28px -6px rgb(0 0 0 / 0.15)",
      },
    },
  },
  plugins: [],
};
