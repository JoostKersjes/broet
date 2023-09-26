import { create as storybookCreate } from "@storybook/theming/create";
import { type Config } from "tailwindcss";
import resolveConfig from "tailwindcss/resolveConfig";
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
      colorPrimary: fromConfig(colors, ["colorPrimary", "colorSecondary"], {
        light: "sky-600",
        dark: "sky-500",
      }),
      colorSecondary: fromConfig(colors, ["colorSecondary"], {
        light: "sky-600",
        dark: "sky-500",
      }),

      // UI
      appBg: fromConfig(backgroundColor, ["appBg"], {
        light: "white",
        dark: "neutral-900",
      }),
      appContentBg: fromConfig(backgroundColor, ["appContentBg"], {
        light: "neutral-50",
        dark: "neutral-800",
      }),
      appBorderColor: fromConfig(borderColor, ["appBorderColor"], {
        light: "DEFAULT",
        dark: "neutral-700",
      }),
      appBorderRadius: toPixels(
        fromConfig(borderRadius, ["appBorderRadius"], "lg") ?? "",
      ),

      // Text colors
      textColor: fromConfig(textColor, ["textColor"], {
        light: "neutral-900",
        dark: "neutral-50",
      }),
      textInverseColor: fromConfig(textColor, ["textInverseColor", "appBg"], {
        light: "white",
        dark: "neutral-900",
      }),
      textMutedColor: fromConfig(textColor, ["textMutedColor"], {
        light: "neutral-500",
        dark: "neutral-400",
      }),

      // Toolbar default and active colors
      barTextColor: fromConfig(textColor, ["barTextColor", "textMutedColor"], {
        light: "neutral-500",
        dark: "neutral-400",
      }),
      barSelectedColor: fromConfig(
        textColor,
        ["barSelectedColor", "textColor"],
        {
          light: "neutral-900",
          dark: "neutral-50",
        },
      ),
      barBg: fromConfig(backgroundColor, ["barBg", "appContentBg"], {
        light: "neutral-50",
        dark: "neutral-800",
      }),

      // Addons form elements
      buttonBg: fromConfig(backgroundColor, ["buttonBg", "appBg"], {
        light: "white",
        dark: "neutral-900",
      }),
      buttonBorder: fromConfig(
        borderColor,
        ["buttonBorder", "appBorderColor"],
        {
          light: "DEFAULT",
          dark: "neutral-700",
        },
      ),
      booleanBg: fromConfig(borderColor, ["booleanBg", "appBorderColor"], {
        light: "DEFAULT",
        dark: "neutral-700",
      }),
      booleanSelectedBg: fromConfig(
        backgroundColor,
        ["booleanSelectedBg", "appBg"],
        {
          light: "white",
          dark: "neutral-900",
        },
      ),
      inputBg: fromConfig(backgroundColor, ["inputBg", "appBg"], {
        light: "white",
        dark: "neutral-900",
      }),
      inputBorder: fromConfig(borderColor, ["inputBorder", "appBorderColor"], {
        light: "DEFAULT",
        dark: "neutral-700",
      }),
      inputTextColor: fromConfig(textColor, ["inputTextColor", "textColor"], {
        light: "neutral-900",
        dark: "neutral-50",
      }),
      inputBorderRadius: toPixels(
        fromConfig(borderRadius, ["inputBorderRadius"], "DEFAULT") ?? "",
      ),
    },
    rest,
  );
};
