import { type Config } from "tailwindcss";
import resolveConfig from "tailwindcss/resolveConfig";
import { type ThemeConfigProperty } from "./util/types";

const height = "100%" as const;
const defineViewport = <TName extends string, TWidth extends string>(
  name: TName,
  width: TWidth,
) => {
  return {
    name,
    styles: {
      width,
      height,
    },
  };
};

const defaultViewports = {
  sm: defineViewport("sm", "640px"),
  md: defineViewport("md", "768px"),
  lg: defineViewport("lg", "1024px"),
  xl: defineViewport("xl", "1280px"),
  "2xl": defineViewport("2xl", "1536px"),
};

const normalizeScreens = (screens: ThemeConfigProperty<"screens">) => {
  const normalized: { name: string; width: string }[] = [];

  if (Array.isArray(screens)) {
    // No documentation on this from Tailwind, so currently not supported
    return [];
  }

  for (const name in screens) {
    const value = screens[name];

    if (typeof value === "string") {
      normalized.push({ name, width: value });
      continue;
    }

    // TODO Add support for multi-range breakpoints https://tailwindcss.com/docs/screens#multi-range-breakpoints
    const screen = Array.isArray(value) ? value[0] : value;
    if (!screen || "raw" in screen) continue;

    if ("min" in screen) {
      normalized.push({ name, width: screen.min });
      continue;
    }

    normalized.push({ name, width: screen.max });
  }

  return normalized;
};

const toViewports = (screens: { name: string; width: string }[]) => {
  const result: Record<string, ReturnType<typeof defineViewport>> = {};
  for (const screen of screens) {
    result[screen.name] = defineViewport(screen.name, screen.width);
  }
  return result;
};

export const createViewports = (
  tailwindConfig: Config,
): Record<string, ReturnType<typeof defineViewport>> => {
  const { theme } = resolveConfig(tailwindConfig);
  if (!theme?.screens) {
    return defaultViewports;
  }

  const normalized = normalizeScreens(theme.screens);
  return toViewports(normalized);
};
