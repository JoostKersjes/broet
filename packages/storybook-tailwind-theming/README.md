# storybook-tailwind-theming

Create a Storybook theme using your Tailwind config.

## Installation

```
pnpm add -D storybook-tailwind-theming @storybook/manager-api @storybook/theming
```

## Theme

In your project, create a `.storybook/themes.ts` file:

```typescript
import { createTheme } from "storybook-tailwind-theming";
import tailwindConfig from "../tailwind.config";

export const light = createTheme(tailwindConfig, {
  brandTitle: "My custom Storybook",
  brandUrl: "https://example.com",
  brandImage: "https://storybook.js.org/images/placeholders/350x150.png",
  brandTarget: "_self",
});
```

Then, in your `.storybook/manager.ts` file:

```typescript
import { addons } from "@storybook/manager-api";
import { light } from "./themes";

addons.setConfig({
  theme: light,
});
```

### Customizing

You can customize all the colors in your theme by referring to your Tailwind
values like this:

```typescript
export const dark = createTheme(tailwindConfig, {
  base: "dark",
  colorSecondary: "sky-500",
  appBg: "slate-900",
  appContentBg: "slate-800",
  appBorderColor: "slate-700",
  textColor: "slate-50",
  textMutedColor: "slate-400",
});
```

The colors seen above are used as default values for any undefined colors.

> **Note:** `colorPrimary` is practically never used in the Storybook UI. You
> probably want to use `colorSecondary` instead.

### Dark mode switch

You can add a theme switch to your Storybook with the [`storybook-dark-mode`]() package:

```
pnpm add -D storybook-dark-mode
```

1. Add `"storybook-dark-mode"` to your `addons` array in your `.storybook/main.ts` file.
2. Create an extra theme in your `.storybook/themes.ts` file:

   ```typescript
   import { createTheme } from "storybook-tailwind-theming";
   import tailwindConfig from "../tailwind.config";

   const sharedProperties = {
     brandTitle: "My custom Storybook",
     brandUrl: "https://example.com",
     brandImage: "https://storybook.js.org/images/placeholders/350x150.png",
     brandTarget: "_self",
   };

   export const light = createTheme(tailwindConfig, {
     ...sharedProperties,
     base: "light",
     // Add custom light-mode colors here
   });

   export const dark = createTheme(tailwindConfig, {
     ...sharedProperties,
     base: "dark",
     // Add custom dark-mode colors here
   });
   ```

3. Add the themes to the addon parameters in `.storybook/preview.ts` like so:

   ```typescript
   import { type Preview } from "@storybook/vue3";
   import { dark, light } from "./themes";

   const preview: Preview = {
     parameters: {
       darkMode: { dark, light, current: "dark" },
     },
   };
   ```

## Viewports

In your `.storybook/preview.ts` file:

```typescript
import { createViewports } from "storybook-tailwind-theming";
import { type Preview } from "@storybook/vue3";
import tailwindConfig from "../tailwind.config";

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: createViewports(tailwindConfig),
    },
  },
};
```
