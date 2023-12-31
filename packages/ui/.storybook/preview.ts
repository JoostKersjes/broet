import { createViewports } from "storybook-tailwind-theming";
import { type Preview } from "@storybook/vue3";
import tailwindConfig from "../tailwind.config";
import { dark, light } from "./themes";

import "./tailwind.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    darkMode: { dark, light, current: "dark" },
    docs: { theme: light },
    viewport: {
      viewports: createViewports(tailwindConfig),
    },
  },
};

export default preview;
