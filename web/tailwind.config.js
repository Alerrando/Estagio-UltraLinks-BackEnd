/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        modal: "rgba(0, 0, 0, 0.5)",
      },
      gridTemplateColumns: {
        "login": "45% 55%",
        "inputs-register": "repeat(auto-fit, minmax(50%, 1fr))"
      }
    },
  },
  plugins: [],
}

