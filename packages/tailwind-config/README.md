# broet / tailwind-config

In your project, create a `tailwind.config.js` file:

```js
import broetConfig from "@broet/tailwind-config";

/** @type {import('tailwindcss').Config} */
export default {
  ...broetConfig,
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
};

```
