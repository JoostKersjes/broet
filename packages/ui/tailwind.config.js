import broetConfig from "@broet/tailwind-config";

/** @type {import('tailwindcss').Config} */
export default {
  ...broetConfig,
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
};
