import broetConfig from "@broet/tailwind-config";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [broetConfig],
  content: ["./src/components/**/*.{vue,js,ts,jsx,tsx}"],
};
