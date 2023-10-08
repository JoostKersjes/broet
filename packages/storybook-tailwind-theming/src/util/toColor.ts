const defaults = {
  transparent: "rgba(0, 0, 0, 0)",
  currentColor: "#e5e5e5",
} as const;

export const toColor = (str?: string): string | undefined => {
  if (!str) return undefined;

  if (str in defaults) {
    return defaults[str as keyof typeof defaults];
  }

  return str;
};
