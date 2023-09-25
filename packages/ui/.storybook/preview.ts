import type { Preview } from "@storybook/vue3";

import "./tailwind.css";

const viewports = {
  sm: {
    name: "sm",
    styles: {
      width: "640px",
      height: "100%",
    },
  },
  md: {
    name: "md",
    styles: {
      width: "768px",
      height: "100%",
    },
  },
  lg: {
    name: "lg",
    styles: {
      width: "1024px",
      height: "100%",
    },
  },
  xl: {
    name: "xl",
    styles: {
      width: "1280px",
      height: "100%",
    },
  },
  "2xl": {
    name: "2xl",
    styles: {
      width: "1536px",
      height: "100%",
    },
  },
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports,
    },
  },
};

export default preview;
