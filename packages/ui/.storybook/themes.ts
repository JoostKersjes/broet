import { createTheme } from "@broet/storybook-theming-tailwind";
import tailwindConfig from "../tailwind.config";

const sharedProperties = {
  brandTitle: "broet / ui",
  brandUrl: "https://github.com/JoostKersjes/broet/tree/main/packages/ui",
  brandTarget: "_self",
};

export const light = createTheme(tailwindConfig, {
  ...sharedProperties,
  base: "light",
});

export const dark = createTheme(tailwindConfig, {
  ...sharedProperties,
  base: "dark",
});
