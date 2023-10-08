import { create as storybookCreate } from "@storybook/theming/create";
import { type Config } from "tailwindcss";
import resolveConfig from "tailwindcss/resolveConfig";
import { toColor } from "./util/toColor";
import { toPixels } from "./util/toPixels";
import { type ThemeConfigProperty } from "./util/types";

const normalizeColors = (
  colors: ThemeConfigProperty<"colors">,
  prefix?: string,
) => {
  let normalized: Record<string, string> = {};

  for (const name in colors) {
    const value = colors[name];

    if (typeof value === "string") {
      const key = prefix ? `${prefix}${name}` : name;
      normalized[key] = value;
      continue;
    }

    const nested = normalizeColors(value, `${name}-`); // Recursive
    normalized = {
      ...normalized,
      ...nested,
    };
  }

  return normalized;
};

export const hasDefaultFontSettings = (
  font: ThemeConfigProperty<"fontFamily">[string],
): font is Exclude<
  ThemeConfigProperty<"fontFamily">[string],
  string | string[]
> => {
  return (
    Array.isArray(font) && font.length === 2 && typeof font[1] === "object"
  );
};

const normalizeFontFamily = (fontFamily: ThemeConfigProperty<"fontFamily">) => {
  const normalized: Record<string, string> = {};

  for (const name in fontFamily) {
    const value = fontFamily[name];
    let family: string | string[];
    if (hasDefaultFontSettings(value)) {
      family = value[0]; // Ignores font settings, not supported by Storybook
    } else {
      family = value;
    }

    if (!family) continue;

    normalized[name] = Array.isArray(family) ? family.join(",") : family;
  }

  return normalized;
};

type VarsKey = keyof Exclude<Parameters<typeof storybookCreate>[0], undefined>;
type BorderRadiusStrings = {
  appBorderRadius: string;
  inputBorderRadius: string;
};
type ReplaceBorderRadius<T> = Omit<
  Exclude<T, undefined>,
  keyof BorderRadiusStrings
> &
  BorderRadiusStrings;

export const createTheme = (
  tailwindConfig: Config,
  vars?: Partial<ReplaceBorderRadius<Parameters<typeof storybookCreate>[0]>>,
  rest?: Parameters<typeof storybookCreate>[1],
) => {
  const fromConfig = (
    normalizedConfig: Record<string, string>,
    userKeys: VarsKey[],
    fallback: string | { light: string; dark: string },
  ) => {
    for (const key of userKeys) {
      if (!vars?.[key]) continue;

      const userDefined = vars[key];
      if (typeof userDefined !== "string") {
        return undefined;
      }

      return userDefined in normalizedConfig
        ? normalizedConfig[userDefined]
        : userDefined;
    }

    const base = vars?.base ?? "light";
    const fallbackKey =
      typeof fallback === "string" ? fallback : fallback[base];
    return fallbackKey in normalizedConfig
      ? normalizedConfig[fallbackKey]
      : undefined;
  };

  const { theme } = resolveConfig(tailwindConfig);

  const colors = normalizeColors(theme?.colors || {});
  const textColor = normalizeColors(theme?.textColor || {});
  const backgroundColor = normalizeColors(theme?.backgroundColor || {});
  const borderColor = normalizeColors(theme?.borderColor || {});
  const fontFamily = normalizeFontFamily(theme?.fontFamily || {});
  const borderRadius = theme?.borderRadius ?? {};
  // TODO https://github.com/storybookjs/storybook/issues/19815

  return storybookCreate(
    {
      ...vars,
      base: vars?.base ?? "light",

      // Typography
      fontBase: fromConfig(fontFamily, ["fontBase"], "sans"),
      fontCode: fromConfig(fontFamily, ["fontCode"], "mono"),

      // Color palette
      colorPrimary: toColor(
        fromConfig(colors, ["colorPrimary"], {
          light: "neutral-900",
          dark: "neutral-50",
        }),
      ),
      colorSecondary: toColor(
        fromConfig(colors, ["colorSecondary"], {
          light: "primary-600",
          dark: "primary-600",
        }),
      ),

      // UI
      appBg: toColor(
        fromConfig(backgroundColor, ["appBg"], {
          light: "white",
          dark: "neutral-900",
        }),
      ),
      appContentBg: toColor(
        fromConfig(backgroundColor, ["appContentBg"], {
          light: "neutral-50",
          dark: "neutral-800",
        }),
      ),
      appBorderColor: toColor(
        fromConfig(borderColor, ["appBorderColor"], {
          light: "neutral-200",
          dark: "neutral-700",
        }),
      ),
      appBorderRadius: toPixels(
        fromConfig(borderRadius, ["appBorderRadius"], "lg"),
      ),

      // Text colors
      textColor: toColor(
        fromConfig(textColor, ["textColor"], {
          light: "neutral-900",
          dark: "neutral-50",
        }),
      ),
      textInverseColor: toColor(
        fromConfig(textColor, ["textInverseColor", "appBg"], {
          light: "white",
          dark: "neutral-900",
        }),
      ),
      textMutedColor: toColor(
        fromConfig(textColor, ["textMutedColor"], {
          light: "neutral-500",
          dark: "neutral-400",
        }),
      ),

      // Toolbar default and active colors
      barTextColor: toColor(
        fromConfig(textColor, ["barTextColor", "textMutedColor"], {
          light: "neutral-500",
          dark: "neutral-400",
        }),
      ),
      barSelectedColor: toColor(
        fromConfig(textColor, ["barSelectedColor", "textColor"], {
          light: "neutral-900",
          dark: "neutral-50",
        }),
      ),
      barBg: toColor(
        fromConfig(backgroundColor, ["barBg", "appContentBg"], {
          light: "neutral-50",
          dark: "neutral-800",
        }),
      ),

      // Addons form elements
      buttonBg: toColor(
        fromConfig(backgroundColor, ["buttonBg", "appBg"], {
          light: "white",
          dark: "neutral-900",
        }),
      ),
      buttonBorder: toColor(
        fromConfig(borderColor, ["buttonBorder", "appBorderColor"], {
          light: "neutral-200",
          dark: "neutral-700",
        }),
      ),
      booleanBg: toColor(
        fromConfig(borderColor, ["booleanBg", "appBorderColor"], {
          light: "neutral-200",
          dark: "neutral-700",
        }),
      ),
      booleanSelectedBg: toColor(
        fromConfig(backgroundColor, ["booleanSelectedBg", "appBg"], {
          light: "white",
          dark: "neutral-900",
        }),
      ),
      inputBg: toColor(
        fromConfig(backgroundColor, ["inputBg", "appBg"], {
          light: "white",
          dark: "neutral-900",
        }),
      ),
      inputBorder: toColor(
        fromConfig(borderColor, ["inputBorder", "appBorderColor"], {
          light: "neutral-200",
          dark: "neutral-700",
        }),
      ),
      inputTextColor: toColor(
        fromConfig(textColor, ["inputTextColor", "textColor"], {
          light: "neutral-900",
          dark: "neutral-50",
        }),
      ),
      inputBorderRadius: toPixels(
        fromConfig(borderRadius, ["inputBorderRadius"], "DEFAULT"),
      ),
    },
    rest,
  );
};
