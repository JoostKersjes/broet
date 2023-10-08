/*
 * Adapted from to-px package
 * https://github.com/mikolalysenko/to-px
 */
import { parseUnit } from "./parseUnit";

const PIXELS_PER_INCH = 96 as const;
const defaults = {
  ch: 8,
  ex: 7.15625,
  em: 16,
  rem: 16,
  in: PIXELS_PER_INCH,
  cm: PIXELS_PER_INCH / 2.54,
  mm: PIXELS_PER_INCH / 25.4,
  pt: PIXELS_PER_INCH / 72,
  pc: PIXELS_PER_INCH / 6,
  px: 1,
} as const;

export const toPixels = (str?: string): number | undefined => {
  if (!str) return undefined;

  if (str in defaults) {
    return defaults[str as keyof typeof defaults];
  }

  // detect number of units
  const [number, unit] = parseUnit(str);
  if (isNaN(number)) return undefined;

  if (unit) {
    const px = toPixels(unit);
    return typeof px === "number" ? number * px : undefined;
  }

  return number;
};
