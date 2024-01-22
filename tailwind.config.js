/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },

  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
        
"primary": "#111827",
        
"secondary": "#374151",
        
"accent": "#ffffff",
        
"neutral": "#ffffff",
        
"base-100": "#000000",
        
"info": "#ffffff",
        
"success": "#34d399",
        
"warning": "#ffffff",
        
"error": "#ffffff",
"--border-btn": "1px",
        },
      },
    ],
  },
}

