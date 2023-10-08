import { createTheme } from "storybook-tailwind-theming";
import tailwindConfig from "../tailwind.config";

const sharedProperties = {
  appBorderRadius: "lg",
  brandTitle: "broet / ui",
  brandUrl: "https://github.com/JoostKersjes/broet/tree/main/packages/ui",
  brandTarget: "_self",
};

export const light = createTheme(tailwindConfig, {
  ...sharedProperties,
  base: "light",
  colorSecondary: "primary-600",
  appBg: "white",
  appContentBg: "neutral-50",
  appBorderColor: "black",
  barBg: "secondary-100",
  textColor: "black",
  textMutedColor: "neutral-700",
});

export const dark = createTheme(tailwindConfig, {
  ...sharedProperties,
  base: "dark",
  colorSecondary: "primary-600",
  appBg: "neutral-900",
  appContentBg: "neutral-800",
  appBorderColor: "black",
  barBg: "secondary-900",
  textColor: "white",
  textMutedColor: "neutral-300",
});
